"""Execute the three finite algebra examples and check their teaching contract.

Uses only the Python standard library.  These checks validate the specified
examples and document structure, not UCT naturality or Poincare duality.
"""
from pathlib import Path
import json
import re


ROOT = Path(__file__).resolve().parents[1]


def main():
    curriculum = json.loads((ROOT / "scripts/curriculum.json").read_text(encoding="utf-8"))
    ledger = json.loads((ROOT / "scripts/proof-ledger.json").read_text(encoding="utf-8"))
    statements = {entry["id"]: entry for entry in ledger["statements"]}
    block_count = 0
    answer_count = 0
    for code in ("H3", "Q1", "Q2"):
        chapter = next(c for c in curriculum["chapters"] if c["code"] == code)
        path = ROOT / "docs" / chapter["path"]
        source = path.read_text(encoding="utf-8")
        numbers = [int(n) for n in re.findall(r"^## (\d+)\.", source, re.M)]
        assert numbers == list(range(1, 13)), (code, numbers)
        exercises = source.split("## 9.", 1)[1].split("## 10.", 1)[0]
        assert [int(n) for n in re.findall(r"^(\d+)\. ", exercises, re.M)] == list(range(1, 9)), code
        solutions = (ROOT / "docs" / chapter["solutions"]).read_text(encoding="utf-8")
        assert [int(n) for n in re.findall(r"^## (\d+)\.", solutions, re.M)] == list(range(1, 9)), code
        answer_count += 8
        assert chapter["exerciseCount"] == 8 and chapter["template"] == 2
        assert chapter["solutions"].split("/")[-1] in source
        examples = re.findall(r"^~~~python\n(.*?)^~~~", source, re.M | re.S)
        assert len(examples) == 1, (code, len(examples))
        for example in examples:
            assert "assert " in example, code
            exec(compile(example, str(path), "exec"), {"__name__": "__chapter_example__"})
            block_count += 1
        for claim in re.findall(r"\*\*(?:引理|命题|定理) ([HQ][0-9]\.\d+)", source):
            assert claim in statements, claim
            entry = statements[claim]
            assert entry["path"] == chapter["path"]
            assert source.count(f'id="{entry["anchor"]}"') == 1, claim
    assert statements["H3.2"]["dependencies"] == ["H3.0"]
    assert statements["Q1.3"]["dependencies"] == ["Q1.0"]
    assert statements["Q1.cellular-comparison"]["kind"] == "external"
    assert "Q1.cellular-comparison" in statements["Q2.euler"]["dependencies"]
    print(f"PASS {block_count} finite Python examples, 3 twelve-section chapters, {answer_count} solutions, and local lemma/dependency contracts")
    print("Scope: finite examples and document consistency only; no automatic mathematical proof certification.")


if __name__ == "__main__":
    main()
