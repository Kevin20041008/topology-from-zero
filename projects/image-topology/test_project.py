"""Finite independent mathematical checks; derivative tolerance never alters topology."""
import itertools
import unittest
from unittest.mock import patch
import numpy as np
from topology import expected_euler_gradient,betti,matrix_betti,h0_bars
from model import init,objective,metrics
from data import load_split


def independent_h0(q):
    """F2 graph-boundary reduction; distinct implementation from elder union."""
    q=np.asarray(q)
    h,w=q.shape
    cells=[(float(v),(i,)) for i,v in enumerate(q.ravel())]
    for i in range(h*w):
        y,x=divmod(i,w)
        for j in range(i+1,h*w):
            u,v=divmod(j,w)
            if max(abs(y-u),abs(x-v))==1:
                cells.append((float(max(q[y,x],q[u,v])),(i,j)))
    cells.sort(key=lambda c:(c[0],len(c[1]),c[1]))
    vi={c[1][0]:i for i,c in enumerate(cells) if len(c[1])==1}
    pivots,paired,born={},set(),set()
    bars=[]
    for j,(death,simplex) in enumerate(cells):
        col=set() if len(simplex)==1 else {vi[x] for x in simplex}
        while col and max(col) in pivots:
            col.symmetric_difference_update(pivots[max(col)])
        if col:
            b=max(col);pivots[b]=col;paired.add(b)
            if death>cells[b][0]:bars.append((cells[b][0],death))
        elif len(simplex)==1:
            born.add(j)
    return sorted(bars),[(cells[i][0],None) for i in sorted(born-paired)]


class Tests(unittest.TestCase):
    def test_all_512_binary_cubical_complexes(self):
        for bits in itertools.product([False,True],repeat=9):
            mask=np.array(bits).reshape(3,3)
            b0,b1=betti(mask)
            self.assertEqual(matrix_betti(mask),(b0,b1,0))
            chi,_=expected_euler_gradient(mask.astype(float))
            self.assertEqual(chi,b0-b1)

    def test_pixel_conventions_and_euler_cancellation(self):
        self.assertEqual(betti(np.eye(2,dtype=bool)),(1,0))
        ring=np.ones((3,3),bool);ring[1,1]=False
        self.assertEqual(betti(ring),(1,1))
        different=np.zeros((5,8),bool);different[1:4,1:4]=ring;different[1,6]=True
        self.assertEqual(betti(different),(2,1))
        self.assertEqual(expected_euler_gradient(different.astype(float))[0],1)
        self.assertEqual(betti(np.ones((2,2),bool)),(1,0))
        self.assertEqual(betti(np.zeros((2,2),bool)),(0,0))

    def test_expected_euler_independent_bernoulli_enumeration(self):
        p=np.array([[0.2,0.4],[0.6,0.8]])
        expected=0.0
        for bits in itertools.product([False,True],repeat=4):
            mask=np.array(bits).reshape(2,2)
            probability=float(np.prod(np.where(mask,p,1-p)))
            b0,b1,b2=matrix_betti(mask)
            expected+=probability*(b0-b1+b2)
        value,_=expected_euler_gradient(p)
        self.assertAlmostEqual(value,expected,delta=2e-15)
        for p in [np.zeros((1,1)),np.ones((1,1))]:
            value,gradient=expected_euler_gradient(p)
            self.assertEqual(value,p[0,0]);self.assertEqual(gradient[0,0],1)

    def test_euler_polynomial_gradients(self):
        rng=np.random.default_rng(120)
        for shape in [(1,1),(1,4),(2,3),(4,5)]:
            p=rng.uniform(0.1,0.9,shape)
            _,gradient=expected_euler_gradient(p)
            for index in np.ndindex(shape):
                left,right=p.copy(),p.copy()
                left[index]-=1e-5;right[index]+=1e-5
                numerical=(expected_euler_gradient(right)[0]-expected_euler_gradient(left)[0])/2e-5
                self.assertAlmostEqual(numerical,gradient[index],delta=3e-9)

    def test_full_model_gradient(self):
        rng=np.random.default_rng(444)
        x=rng.normal(0,.2,(2,3,3,4));y=rng.integers(0,2,(2,3,3))
        targets=np.array([betti(row)[0]-betti(row)[1] for row in y])
        parameters=init(77,inputs=4,hidden=3)
        _,gradient=objective(parameters,x,y,targets,0.02)
        for key,array in parameters.items():
            for index in np.ndindex(array.shape):
                original=array[index];step=1e-5
                array[index]=original+step;right=objective(parameters,x,y,targets,.02)[0]["total"]
                array[index]=original-step;left=objective(parameters,x,y,targets,.02)[0]["total"]
                array[index]=original
                self.assertAlmostEqual((right-left)/(2*step),gradient[key][index],delta=3e-9)

    def test_all_729_grayscale_h0_inputs(self):
        for values in itertools.product([0,.25,1],repeat=6):
            q=np.array(values).reshape(2,3)
            bars,essential=h0_bars(q)
            oracle,infinite=independent_h0(q)
            self.assertEqual(bars,oracle);self.assertEqual([essential],infinite)
            for scale in [0,.125,.25,.75,1]:
                count=int(essential[0]<=scale)+sum(b<=scale<d for b,d in bars)
                self.assertEqual(count,betti(q<=scale)[0])

    def test_short_positive_intervals_and_invalid_inputs(self):
        for value in [1e-12,np.nextafter(0.0,1.0)]:
            bars,essential=h0_bars([[0,value,0]])
            self.assertEqual(bars,[(0,value)])
            self.assertEqual(essential,(0,None))
        for bad in [[],[0,1],[[np.nan]],[[np.inf]],[[-1]],[[2]]]:
            with self.assertRaises(ValueError):expected_euler_gradient(bad)

    def test_metrics_empty_and_exact(self):
        empty=np.zeros((5,5),bool)
        nonempty=empty.copy();nonempty[1:4,2]=True
        self.assertEqual(metrics(empty,empty)["dice"],1)
        self.assertEqual(metrics(empty,empty)["cldice"],1)
        self.assertEqual(metrics(empty,nonempty)["cldice"],0)
        self.assertEqual(metrics(nonempty,nonempty)["cldice"],1)
        self.assertEqual(metrics(nonempty,nonempty)["betti_exact"],1)

    def test_committed_real_data_integrity_and_grouping(self):
        ids=set()
        for split,count in [("training",12),("validation",6),("test",6)]:
            x,y,names=load_split(split)
            self.assertEqual(x.shape,(count,65,87));self.assertEqual(y.shape,x.shape)
            self.assertFalse(ids.intersection(names));ids.update(names)
            self.assertTrue(np.all(np.isfinite(x)))
            self.assertTrue(np.all((x>=0)&(x<=1)))
        self.assertEqual(len(ids),24)

    def test_nonempty_mask_empty_skeleton_is_rejected(self):
        mask=np.ones((2,2),bool)
        with patch("model.skeletonize",return_value=np.zeros((2,2),bool)):
            with self.assertRaisesRegex(ValueError,"empty skeleton"):
                metrics(mask,mask)

    def test_source_provenance_survives_git_lf_checkout(self):
        # These are byte hashes, not hashes of parsed JSON or normalized source.
        # A Windows newline conversion previously broke them on Linux checkout.
        from data import ROOT,sha
        import json
        report=json.loads((ROOT/"results/results.json").read_text())
        files={**report["source_sha256"],"data/manifest.json":report["data_manifest_sha256"]}
        for name,digest in files.items():
            content=(ROOT/name).read_bytes()
            self.assertEqual(sha(content),digest,name)
            self.assertNotIn(b"\r\n",content,name)


if __name__=="__main__":
    unittest.main(verbosity=2)
