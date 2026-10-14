"""Pinned public CC0 BBBC039 acquisition and fixed original-image split."""
import argparse
from io import BytesIO
import hashlib
import json
from pathlib import Path
from urllib.request import urlopen
from zipfile import ZipFile

import numpy as np
from PIL import Image
from scipy.ndimage import label

ROOT=Path(__file__).resolve().parent


def sha(data):
    return hashlib.sha256(data).hexdigest()


def canonical(obj):
    return json.dumps(obj,sort_keys=True,separators=(",",":"),allow_nan=False).encode()


def download():
    sources=json.loads((ROOT/"sources.json").read_text())
    cache=ROOT/"data"/"archives"
    cache.mkdir(parents=True,exist_ok=True)
    if sum(item["bytes"] for item in sources["archives"])>100_000_000:
        raise ValueError("total download cap exceeded")
    for item in sources["archives"]:
        target=cache/item["name"]
        if not target.exists():
            temp=target.with_suffix(".partial")
            size=0
            try:
                with urlopen(item["url"],timeout=60) as response,temp.open("wb") as f:
                    while block:=response.read(1024*1024):
                        size+=len(block)
                        if size>item["bytes"]:
                            raise ValueError("source size exceeds pinned size")
                        f.write(block)
                if sha(temp.read_bytes())!=item["sha256"]:
                    raise ValueError("download checksum mismatch")
                temp.replace(target)
            finally:
                if temp.exists():
                    temp.unlink()
        content=target.read_bytes()
        if len(content)!=item["bytes"] or sha(content)!=item["sha256"]:
            raise ValueError("archive differs from pinned source: "+item["name"])
    return cache


def raster_betti(mask):
    b0=label(mask,structure=np.ones((3,3),dtype=int))[1]
    b1=label(np.pad(~mask,1,constant_values=True))[1]-1
    return [int(b0),int(b1)]


def prepare():
    protocol=json.loads((ROOT/"protocol.json").read_text())
    cache=download()
    arrays={}
    records=[]
    seen=set()
    with ZipFile(cache/"images.zip") as images,ZipFile(cache/"masks.zip") as masks,ZipFile(cache/"metadata.zip") as metadata:
        plates=dict(line.split(",") for line in metadata.read("metadata/filenames_and_plates.csv").decode().splitlines() if line)
        for split,count in protocol["split_sizes"].items():
            names=sorted(metadata.read("metadata/"+split+".txt").decode().splitlines())[:count]
            xs,ys=[],[]
            for name in names:
                if name in seen: raise AssertionError("original image crosses split")
                seen.add(name)
                image_bytes=images.read("images/"+Path(name).stem+".tif")
                mask_bytes=masks.read("masks/"+name)
                raw=np.array(Image.open(BytesIO(image_bytes)),dtype=float)
                encoded=np.array(Image.open(BytesIO(mask_bytes)))
                mask=encoded[:,:,0]>0
                if raw.shape!=(520,696) or mask.shape!=raw.shape:
                    raise ValueError("unexpected source image shape")
                block=protocol["block_size"]
                h,w=raw.shape[0]//block,raw.shape[1]//block
                x=raw.reshape(h,block,w,block).mean(axis=(1,3))
                y=mask.reshape(h,block,w,block).mean(axis=(1,3))>=0.5
                low,high=np.percentile(x,[1,99])
                x=np.clip((x-low)/(high-low),0,1) if high>low else np.zeros_like(x)
                x=x.astype(np.float64)
                xs.append(x);ys.append(y)
                records.append({"id":name,"split":split,"source_plate":plates[name],"original_shape":list(raw.shape),
                                "image_sha256":sha(image_bytes),"mask_sha256":sha(mask_bytes),
                                "normalized_float64_sha256":sha(x.tobytes()),
                                "coarse_mask_sha256":sha(y.tobytes()),
                                "normalization_percentiles":[float(low),float(high)],
                                "raw_semantic_betti":raster_betti(mask),
                                "coarse_semantic_betti":raster_betti(y),
                                "coarse_foreground_pixels":int(y.sum())})
            arrays[split+"_x"]=np.array(xs)
            arrays[split+"_y"]=np.array(ys)
            arrays[split+"_ids"]=np.array(names)
    (ROOT/"data").mkdir(exist_ok=True)
    np.savez_compressed(ROOT/"data"/"prepared.npz",**arrays)
    report={"dataset":"BBBC039v1","access_date":"2026-10-14","license":"CC0-1.0",
            "source":"https://bbbc.broadinstitute.org/BBBC039",
            "source_decoder":"https://gist.github.com/jccaicedo/15e811722fca51e3ae90e8b43057f075",
            "protocol_sha256":sha(canonical(protocol)),
            "prepared_sha256":sha((ROOT/"data"/"prepared.npz").read_bytes()),
            "records":records,
            "scope":"Binary union of all annotated nuclei, not instance segmentation; block majority changes topology."}
    # Pin bytes across Windows and Linux so Git's LF checkout preserves provenance.
    (ROOT/"data"/"manifest.json").write_bytes((json.dumps(report,indent=2)+"\n").encode("utf8"))
    print("Prepared",len(records),"real images; topology changed in",
          sum(r["raw_semantic_betti"]!=r["coarse_semantic_betti"] for r in records))
    return report


def load_split(split):
    """Only access the requested split arrays, preserving original-image groups."""
    manifest=json.loads((ROOT/"data"/"manifest.json").read_text())
    file=ROOT/"data"/"prepared.npz"
    if sha(file.read_bytes())!=manifest["prepared_sha256"]:
        raise ValueError("prepared data checksum mismatch")
    with np.load(file,allow_pickle=False) as stored:
        return stored[split+"_x"].copy(),stored[split+"_y"].copy(),stored[split+"_ids"].tolist()


if __name__=="__main__":
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--download-only",action="store_true")
    args=parser.parse_args()
    download() if args.download_only else prepare()
