"""Single count source for rendered pages and the generated README summary."""
import argparse
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def inventory(root=ROOT):
    def read(path):
        return json.loads((root / path).read_text(encoding='utf-8'))
    curriculum = read('scripts/curriculum.json')
    master = read('scripts/master-plan.json')
    labs = read('scripts/lab-inventory.json')['labs']
    chapters = curriculum['chapters']
    for key in ['code', 'path', 'exercise']:
        assert len({c[key] for c in chapters}) == len(chapters), key
    assert len({lab['id'] for lab in labs}) == len(labs)
    for c in chapters:
        assert (root / 'docs' / c['path']).is_file(), c['path']
    for lab in labs:
        assert lab['mount'] in (root / 'docs' / lab['path']).read_text(encoding='utf-8'), lab['id']
    for name in curriculum['notebooks']:
        assert (root / 'docs/labs/notebooks' / name).is_file(), name
    counts = {
        'chapters': len(chapters),
        'self_checks': len({c['exercise'] for c in chapters}),
        'template_chapters': sum(c.get('template') == 2 for c in chapters),
        'template_exercises': sum(c.get('exerciseCount', 0) for c in chapters),
        'labs': len(labs),
        'notebooks': len(curriculum['notebooks']),
        'planned_parts': len({u['part'] for u in master['units']}),
        'planned_units': len(master['units']),
    }
    source = {'chapters': chapters, 'notebooks': curriculum['notebooks'], 'labs': labs, 'units': master['units']}
    digest = hashlib.sha256(json.dumps(source, ensure_ascii=False, sort_keys=True).encode()).hexdigest()
    return {'counts': counts, 'inventory_sha256': digest}


def readme_summary(data):
    c = data['counts']
    return (f"<!-- course-counts:start -->\n"
            f"当前清单：**{c['chapters']} 篇正文、{c['self_checks']} 个章节自检、{c['labs']} 项浏览器实验、{c['notebooks']} 份 Notebook**。"
            f"{c['template_chapters']} 章采用十二项模板，包含 {c['template_exercises']} 道配套题解；项目课程与证明工作坊另计。"
            f"长期规划 {c['planned_parts']} 部分、{c['planned_units']} 单元，数量不代表证明或人类审查完成。\n"
            "<!-- course-counts:end -->")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    data = inventory()
    path = ROOT / 'README.md'
    text = path.read_text(encoding='utf-8')
    pattern = r'<!-- course-counts:start -->.*?<!-- course-counts:end -->'
    if not re.search(pattern, text, flags=re.S):
        raise SystemExit('README count markers missing')
    updated = re.sub(pattern, lambda _: readme_summary(data), text, flags=re.S)
    if args.check:
        if updated != text:
            raise SystemExit('README inventory stale: run python scripts/course_inventory.py')
    else:
        path.write_text(updated, encoding='utf-8')
    print(json.dumps(data, ensure_ascii=False))


if __name__ == '__main__':
    main()
