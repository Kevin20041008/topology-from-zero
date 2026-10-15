"""Check executable teaching examples and exact, independently derived answers.

This is finite evidence for the specified examples, not a proof of excision or
cellular comparison. The general arguments require the separate math review.
"""
from pathlib import Path
import json
import re
import sys
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from scripts.integer_homology import ZMatrix, zeros, integer_homology


def main():
    curriculum = json.loads((ROOT / 'scripts/curriculum.json').read_text(encoding='utf-8'))
    chapter = next(c for c in curriculum['chapters'] if c['code'] == 'H2')
    text = (ROOT / 'docs' / chapter['path']).read_text(encoding='utf-8')
    solutions = (ROOT / 'docs' / chapter['solutions']).read_text(encoding='utf-8')
    assert [int(n) for n in re.findall(r'^## (\d+)\.', text, re.M)] == list(range(1, 13))
    exercise_text = text.split('## 9.', 1)[1].split('## 10.', 1)[0]
    assert [int(n) for n in re.findall(r'^(\d+)\. ', exercise_text, re.M)] == list(range(1, 9))
    assert [int(n) for n in re.findall(r'^## (\d+)\.', solutions, re.M)] == list(range(1, 9))
    for n in range(1, 7):
        assert text.count(f'{{#{n}}}') == 1
    assert text.splitlines()[0] == '# H2 · 相对同调、切除与 Mayer–Vietoris'
    blocks = re.findall(r'^~~~python\n(.*?)^~~~', text, re.M | re.S)
    assert len(blocks) == 1
    exec(compile(blocks[0], chapter['path'], 'exec'), {'__name__': '__chapter_example__'})
    for name in ['h2-subdivision.svg', 'h3-attachment-excision.svg']:
        svg = ElementTree.parse(ROOT / 'docs/assets' / name).getroot()
        assert svg.tag.endswith('svg') and svg.attrib.get('viewBox')
        assert svg.find('{http://www.w3.org/2000/svg}title') is not None

    def group(outgoing, incoming, rank, torsion=()):
        assert integer_homology(outgoing, incoming).description() == {
            'free_rank': rank, 'torsion': list(torsion)}

    # H3 exercise 10: multiplication by m has zero kernel iff m != 0;
    # coker has one cyclic factor |m|, with factors 1 omitted.
    for m in range(-5, 6):
        group(zeros(0, 1), zeros(1, 1), 1)  # H0
        group(zeros(1, 1), ZMatrix([[m]]), int(m == 0), [abs(m)] if abs(m) > 1 else [])
        group(ZMatrix([[m]]), zeros(1, 0), int(m == 0))

    # H3 exercises 11/12: exact kernels independently characterized by
    # 2*x-y=0 and d1's equations x=y=-z.
    graph_map = ZMatrix([[2, -1]])
    assert graph_map @ ZMatrix([[1], [2]]) == zeros(1, 1)
    d1 = ZMatrix([[-1, 0, -1], [1, -1, 0], [0, 1, 1]])
    cycle = ZMatrix([[1], [1], [-1]])
    assert d1 @ cycle == zeros(3, 1)
    group(d1, zeros(3, 0), 1)
    group(zeros(0, 3), d1, 1)
    flipped = ZMatrix([[-1, 0, 1], [1, -1, 0], [0, 1, -1]])
    assert flipped @ ZMatrix([[1], [1], [1]]) == zeros(3, 1)
    group(flipped, zeros(3, 0), 1)
    print('PASS H2 executable example, 12 sections/8 answers/7 legacy anchors, 2 SVG contracts')
    print('PASS H3: 11 signed attachment degrees and exact graph kernels/orientation changes')
    print('Scope: finite examples and document consistency; general proofs remain separately reviewed.')


if __name__ == '__main__':
    main()
