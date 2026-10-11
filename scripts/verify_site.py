"""Check generated local links, Chinese search and math integration.

This is a static check. Browser SVG rendering is a separate acceptance check.
"""
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site"


def main():
    assert SITE.is_dir(), "Run python -m mkdocs build --strict first"
    failures = []
    html_paths = sorted(SITE.rglob("*.html"))
    assert len(html_paths) >= 64, "Missing expected graduate course pages"
    parsed = {path.resolve(): BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser") for path in html_paths}
    for path in html_paths:
        soup = parsed[path.resolve()]
        for element in soup.select("a[href], script[src], img[src], link[href]"):
            value = element.get("href", element.get("src", ""))
            target = urlsplit(value)
            if not value or target.scheme or target.netloc:
                continue
            # 404.html uses root paths based on the configured deployment URL.
            if value.startswith("/"):
                continue
            resolved = (path.parent / unquote(target.path)).resolve() if target.path else path.resolve()
            if resolved.is_dir():
                resolved = resolved / "index.html"
            if not resolved.is_file():
                failures.append(f"{path.relative_to(SITE)} -> {value}")
            elif target.fragment and resolved in parsed:
                fragment = unquote(target.fragment)
                if not parsed[resolved].find(id=fragment):
                    failures.append(f"{path.relative_to(SITE)} -> missing fragment {value}")
        assert soup.html.get("lang") == "zh", f"Missing Chinese lang: {path}"
    assert not failures, "Broken local references:\n" + "\n".join(failures)

    # This inventory is captured from the published v0.2 commit, not from the
    # current build. Never regenerate it to accept a missing legacy URL/anchor.
    legacy_counts = []
    for inventory in ["legacy_urls.json", "legacy_urls_v03.json"]:
        legacy = json.loads((ROOT / "scripts" / inventory).read_text(encoding="utf-8"))
        legacy_counts.append(len(legacy["pages"]))
        for url, anchors in legacy["pages"].items():
            old_path = (SITE / url / "index.html").resolve()
            assert old_path in parsed, f"Removed legacy URL: {url} ({inventory})"
            ids = {element["id"] for element in parsed[old_path].select("[id]")}
            assert set(anchors) <= ids, f"Removed legacy anchors at {url}: {set(anchors) - ids}"

    index = json.loads((SITE / "search/search_index.json").read_text(encoding="utf-8"))
    # Material inserts zero-width word separators for Chinese tokenization.
    indexed = " ".join(item["text"] for item in index["docs"]).replace("\u200b", "")
    for term in ["紧致", "同调", "拓扑基", "子基", "道路连通", "基本群", "商空间", "陪集",
                 "覆盖", "上同调", "横截", "杯积", "配边", "数据泄漏", "超滤子"]:
        assert term in indexed, f"Missing Chinese search content: {term}"
    assert set(index["config"]["lang"]) == {"zh", "en"}
    # Removing zero-width separators can hide a broken Chinese query. Preserve
    # the mathematical search terms as actual contiguous index tokens too.
    segmented = ' '.join(item['title'] + ' ' + item['text'] for item in index['docs'])
    for term in ['拓扑基', '道路连通', '基本群', '上同调', '横截', '杯积', '配边', '超滤子', '数据泄漏']:
        assert term in segmented, f'Chinese mathematical term split by tokenizer: {term}'

    formula = BeautifulSoup((SITE / "math-check/index.html").read_text(encoding="utf-8"), "html.parser")
    assert len(formula.select(".arithmatex")) >= 6
    scripts = [tag.get("src", "") for tag in formula.select("script[src]")]
    assert any("assets/vendor/mathjax/tex-svg.js" in src for src in scripts)
    assert not any(src.startswith("http") for src in scripts), "Unexpected remote script"
    assert (SITE / "assets/vendor/mathjax/tex-svg.js").stat().st_size > 100000

    chapters = {"introduction/01-spaces": "spaces", "point-set/02-continuity": "continuity",
                "algebraic/03-homology": "homology", "point-set/bases-subbases": "bases",
                "point-set/connectedness": "connectedness", "algebraic/homotopy-fundamental-group": "homotopy",
                "point-set/quotient-spaces": "quotient", "algebraic/linear-algebra-primer": "linear-quotient"}
    curriculum = json.loads((ROOT / 'scripts/curriculum.json').read_text(encoding='utf-8'))
    registered = {c['path'].removesuffix('.md'): c['exercise'] for c in curriculum['chapters']}
    assert len(registered) >= 42
    assert chapters.items() <= registered.items(), 'Original chapter/exercise contract changed'
    chapters = registered
    for chapter, exercise in chapters.items():
        page = BeautifulSoup((SITE / chapter / "index.html").read_text(encoding="utf-8"), "html.parser")
        text = page.get_text()
        for section in ["直观解释", "严格定义", "定理与证明", "正例与反例", "练习", "参考书目"]:
            assert section in text, f"Missing {section} in {chapter}"
        assert page.select(".md-footer__link--prev") and page.select(".md-footer__link--next")
        assert page.select(".arithmatex"), f"Missing formula markup in {chapter}"
        # A single parsed formula does not guarantee that other formulas were
        # parsed: display delimiters need Markdown block boundaries too.
        prose = BeautifulSoup(str(page.select_one('.md-content__inner')), 'html.parser')
        for node in prose.select('.arithmatex, code, pre'):
            node.decompose()
        assert '$' not in prose.get_text(), f'Unparsed math delimiter in {chapter}'
        assert page.select_one(f'[data-exercise="{exercise}"]'), f"Missing exercise in {chapter}"
        assert len(page.select('[data-exercise]')) == 1, f"Ambiguous exercise mount in {chapter}"
        assert page.select_one('.md-content__inner details'), f"Missing written hints in {chapter}"
        assert any('exercises.mjs' in tag.get('src', '') and tag.get('type') == 'module' for tag in page.select('script[src]'))
    for page_name in ["triangle", "point-cloud", "surfaces"]:
        page = BeautifulSoup((SITE / "labs" / page_name / "index.html").read_text(encoding="utf-8"), "html.parser")
        assert page.select_one('[data-lab]'), f"Missing interactive lab: {page_name}"
        assert any('experiments.mjs' in tag.get('src', '') and tag.get('type') == 'module' for tag in page.select('script[src]'))
    assert (SITE / 'assets/vendor/three/three.module.js').is_file()
    assert (SITE / 'javascripts/topology-core.mjs').is_file()
    assert (SITE / 'javascripts/exercise-bank.mjs').is_file()
    assert (SITE / 'javascripts/graduate-exercises.mjs').is_file()
    for path, soup in parsed.items():
        article = soup.select_one('.md-content__inner')
        if article:
            ids = [e['id'] for e in article.select('[id]')]
            assert len(ids) == len(set(ids)), f'Duplicate article IDs in {path}'
            assert not any(ord(c) < 32 and c not in '\n\r\t' for c in article.get_text()), f'Control character in {path}'
    for name in curriculum['notebooks']:
        assert (SITE / 'labs/notebooks' / name).is_file(), f'Missing notebook download: {name}'
    print(f"PASS {len(html_paths)} HTML pages: local links/fragments, v0.2/v0.3 legacy inventories {legacy_counts}, Chinese search, {len(chapters)} chapters/exercises, navigation, math and interactive modules")


if __name__ == "__main__":
    main()
