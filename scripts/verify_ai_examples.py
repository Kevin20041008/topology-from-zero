"""Execute the explicitly registered, original Python examples in AI chapters.

Runs repository code, not arbitrary fetched Markdown. Each chapter starts in a
fresh process and temporary directory; examples need only stdlib and NumPy.
"""
from pathlib import Path
import os
import re
import subprocess
import sys
from tempfile import TemporaryDirectory

ROOT = Path(__file__).resolve().parents[1]
CHAPTERS = ["topological-loss", "medical-topology", "higher-order-networks", "point-cloud-learning", "differentiable-persistence"]


def main():
    for slug in CHAPTERS:
        path = ROOT / "docs/ai" / (slug + ".md")
        blocks = re.findall(r"^```python\n(.*?)^```", path.read_text(encoding="utf-8"), re.M | re.S)
        assert blocks, f"Missing executable example in {slug}"
        with TemporaryDirectory(prefix="topology-ai-example-") as tmp:
            script = Path(tmp) / "example.py"
            script.write_text("\n\n".join(blocks), encoding="utf-8")
            run = subprocess.run([sys.executable, str(script)], cwd=tmp,
                                 env=dict(os.environ, PYTHONIOENCODING="utf-8"),
                                 capture_output=True, text=True, encoding="utf-8", timeout=30)
            assert run.returncode == 0, f"{slug}: {run.stdout}\n{run.stderr}"
            print(f"PASS {slug}: {len(blocks)} Python block(s), all assertions passed")
            if run.stdout.strip():
                print(run.stdout.strip())


if __name__ == "__main__":
    main()
