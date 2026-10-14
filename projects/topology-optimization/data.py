"""Deterministic synthetic paths; distinct IDs and RNG streams for every split."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

import numpy as np


DATA_SEEDS = {"connected": {"train": 7301, "validation": 7302, "test": 7303},
              "disconnected": {"train": 7401, "validation": 7402, "test": 7403}}
SPLIT_SIZES = {"train": 96, "validation": 32, "test": 64}


def generate(condition, split, size=None):
    if condition not in DATA_SEEDS or split not in SPLIT_SIZES:
        raise ValueError("unknown condition or split")
    rng = np.random.default_rng(DATA_SEEDS[condition][split])
    n = SPLIT_SIZES[split] if size is None else size
    if not isinstance(n, int) or n <= 0:
        raise ValueError("size must be a positive integer")
    x, y, ids = [], [], []
    for i in range(n):
        length = int(rng.integers(5, 10))
        start = int(rng.integers(1, 12 - length))
        target = np.zeros(12)
        target[start:start + length] = 1
        if condition == "disconnected":
            gap = int(rng.integers(start + 2, start + length - 2))
            target[gap] = 0
        observation = 0.1 + 0.8 * target + rng.normal(0, 0.24, 12)
        candidates = np.flatnonzero(target)[1:-1]
        observation[int(rng.choice(candidates))] -= 0.65
        background = np.flatnonzero(target == 0)
        observation[int(rng.choice(background))] += 0.45
        observation += rng.uniform(-0.08, 0.08)
        x.append(np.clip(observation, 0, 1).tolist())
        y.append(target.astype(int).tolist())
        ids.append(f"{condition}/{split}/{i:04d}")
    return {"condition": condition, "split": split,
            "seed": DATA_SEEDS[condition][split], "ids": ids, "x": x, "y": y}


def canonical_bytes(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True,
                      separators=(",", ":"), allow_nan=False).encode("utf-8")


def digest(value):
    return hashlib.sha256(canonical_bytes(value)).hexdigest()


def save_data(destination):
    destination = Path(destination)
    destination.mkdir(parents=True, exist_ok=True)
    manifest = []
    for condition in DATA_SEEDS:
        for split in SPLIT_SIZES:
            record = generate(condition, split)
            name = f"{condition}-{split}.json"
            (destination / name).write_bytes(canonical_bytes(record) + b"\n")
            manifest.append({"path": name, "sha256_canonical": digest(record),
                             "samples": len(record["ids"]), "seed": record["seed"]})
    (destination / "manifest.json").write_text(
        json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    return manifest
