"""Execute the original finite examples in the four v0.5 foundation chapters."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
paths = ['preliminaries/countability-choice.md', 'point-set/subspaces.md',
         'preliminaries/groups-modules.md', 'computational/integer-homology.md']
for path in paths:
    blocks = re.findall(r'^(?:```|~~~)python\n(.*?)^(?:```|~~~)', (ROOT / 'docs' / path).read_text(encoding='utf-8'), re.M | re.S)
    assert blocks, path
    for index, code in enumerate(blocks):
        exec(compile(code, path + ':' + str(index), 'exec'), {'__name__': '__main__'})
    print('PASS original finite examples:', path, len(blocks), 'blocks')
