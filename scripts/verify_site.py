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
    assert len(html_paths) >= 20, "Missing expected pages"
    for path in html_paths:
        soup = BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser")
        for element in soup.select("a[href], script[src], img[src], link[href]"):
            value = element.get("href", element.get("src", ""))
            target = urlsplit(value)
            if not value or target.scheme or target.netloc or value.startswith("#"):
                continue
            # 404.html uses root paths based on the configured deployment URL.
            if value.startswith("/"):
                continue
            resolved = (path.parent / unquote(target.path)).resolve()
            if resolved.is_dir():
                resolved = resolved / "index.html"
            if not resolved.is_file():
                failures.append(f"{path.relative_to(SITE)} -> {value}")
        assert soup.html.get("lang") == "zh", f"Missing Chinese lang: {path}"
    assert not failures, "Broken local references:\n" + "\n".join(failures)

    index = json.loads((SITE / "search/search_index.json").read_text(encoding="utf-8"))
    indexed = " ".join(item["text"] for item in index["docs"])
    assert "紧致" in indexed and "同调" in indexed, "Missing Chinese search content"
    assert set(index["config"]["lang"]) == {"zh", "en"}

    formula = BeautifulSoup((SITE / "math-check/index.html").read_text(encoding="utf-8"), "html.parser")
    assert len(formula.select(".arithmatex")) >= 6
    scripts = [tag.get("src", "") for tag in formula.select("script[src]")]
    assert any("assets/vendor/mathjax/tex-svg.js" in src for src in scripts)
    assert not any(src.startswith("http") for src in scripts), "Unexpected remote script"
    assert (SITE / "assets/vendor/mathjax/tex-svg.js").stat().st_size > 100000

    for chapter in ["introduction/01-spaces", "point-set/02-continuity", "algebraic/03-homology"]:
        page = BeautifulSoup((SITE / chapter / "index.html").read_text(encoding="utf-8"), "html.parser")
        text = page.get_text()
        for section in ["直观解释", "严格定义", "定理与证明", "正例与反例", "练习", "参考书目"]:
            assert section in text, f"Missing {section} in {chapter}"
        assert page.select(".md-footer__link--prev") and page.select(".md-footer__link--next")
    for page_name in ["triangle", "point-cloud", "surfaces"]:
        page = BeautifulSoup((SITE / "labs" / page_name / "index.html").read_text(encoding="utf-8"), "html.parser")
        assert page.select_one('[data-lab]'), f"Missing interactive lab: {page_name}"
        assert any('experiments.mjs' in tag.get('src', '') and tag.get('type') == 'module' for tag in page.select('script[src]'))
    assert (SITE / 'assets/vendor/three/three.module.js').is_file()
    assert (SITE / 'javascripts/topology-core.mjs').is_file()
    print(f"PASS {len(html_paths)} HTML pages: local links, Chinese search, chapters, navigation, math and interactive modules")


if __name__ == "__main__":
    main()
