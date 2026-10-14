"""Original NumPy teaching model; exact H0 pairing on a finite path.

Floating q values are used as supplied: positive intervals are NEVER thresholded.
The gradient is a fixed-pairing branch rule, not a classical derivative at ties.
"""
from __future__ import annotations

import numpy as np


def path_h0(q):
    """Return positive finite bars with endpoint vertex IDs, and one essential bar.

    The path is 0--1--...--(n-1). Vertex values are q and an edge enters at
    max(q[u], q[v]). Events use (value, vertex ID); at ties we activate the lower
    ID first. Union keeps the elder component, ordered by (birth value, ID).
    Zero intervals are omitted using death > birth, without a tolerance.
    """
    q = np.asarray(q, dtype=np.float64)
    if q.ndim != 1 or len(q) == 0 or not np.all(np.isfinite(q)):
        raise ValueError("q must be a nonempty finite 1D array")
    if np.any((q < 0) | (q > 1)):
        raise ValueError("q must lie in [0,1]")
    n = len(q)
    parent = list(range(n))
    active = [False] * n
    bars = []

    def find(i):
        while parent[i] != i:
            parent[i] = parent[parent[i]]
            i = parent[i]
        return i

    for v in sorted(range(n), key=lambda i: (q[i], i)):
        active[v] = True
        for w in (v - 1, v + 1):
            if w < 0 or w >= n or not active[w]:
                continue
            a, b = find(v), find(w)
            if a == b:
                continue
            old, young = sorted((a, b), key=lambda i: (q[i], i))
            birth, death = float(q[young]), float(q[v])
            if death > birth:
                bars.append({"birth": birth, "death": death,
                             "birth_vertex": int(young), "death_vertex": int(v)})
            parent[young] = old
    root = find(0)
    bars.sort(key=lambda b: (b["birth"], b["death"], b["birth_vertex"], b["death_vertex"]))
    return bars, {"birth": float(q[root]), "death": None, "birth_vertex": int(root)}


def finite_loss_gradient(q):
    """Sum squared positive finite H0 lifetimes, and the selected branch dq.

    No essential bar enters the sum. For representable extremely small positive
    lifetimes the square may underflow; the bar remains in path_h0's output.
    """
    bars, essential = path_h0(q)
    gradient = np.zeros(len(q), dtype=np.float64)
    loss = 0.0
    for bar in bars:
        lifetime = bar["death"] - bar["birth"]
        loss += lifetime * lifetime
        gradient[bar["death_vertex"]] += 2 * lifetime
        gradient[bar["birth_vertex"]] -= 2 * lifetime
    signature = tuple((b["birth_vertex"], b["death_vertex"]) for b in bars)
    return loss, gradient, signature, bars, essential


def beta0(mask):
    """Number of foreground runs in a nonempty fixed path (empty subset -> 0)."""
    mask = np.asarray(mask, dtype=bool)
    if mask.ndim != 1:
        raise ValueError("mask must be 1D")
    return int(np.count_nonzero(mask & np.r_[True, ~mask[:-1]])) if len(mask) else 0


def init_model(seed, vertices=12, hidden=24):
    rng = np.random.default_rng(seed)
    return {"W1": rng.normal(0, 1 / np.sqrt(vertices), (vertices, hidden)),
            "b1": np.zeros(hidden),
            "W2": rng.normal(0, 1 / np.sqrt(hidden), (hidden, vertices)),
            "b2": np.zeros(vertices)}


def forward(parameters, x):
    hidden = np.tanh(x @ parameters["W1"] + parameters["b1"])
    logits = hidden @ parameters["W2"] + parameters["b2"]
    probabilities = np.empty_like(logits)
    positive = logits >= 0
    probabilities[positive] = 1 / (1 + np.exp(-logits[positive]))
    exp_logits = np.exp(logits[~positive])
    probabilities[~positive] = exp_logits / (1 + exp_logits)
    return probabilities, hidden, logits


def objective_gradient(parameters, x, y, weight):
    """Mean BCE over all vertices + weight * mean sample PH penalty.

    This explicitly differentiates the actual MLP parameters. It is not a
    manually updated bridge scalar. Gradients at vertex ties are branch choices.
    """
    if weight < 0 or not np.isfinite(weight):
        raise ValueError("weight must be finite and nonnegative")
    p, hidden, logits = forward(parameters, x)
    n, vertices = p.shape
    bce = float(np.mean(np.logaddexp(0, logits) - y * logits))
    dq = np.zeros_like(p)
    topological = 0.0
    signatures = []
    tied_samples = 0
    for i in range(n):
        q = 1 - p[i]
        loss, dq[i], sig, _, _ = finite_loss_gradient(q)
        topological += loss / n
        signatures.append(sig)
        tied_samples += int(len(np.unique(q)) != vertices)
    dz = (p - y) / (n * vertices) - weight * dq * p * (1 - p) / n
    dhidden = (dz @ parameters["W2"].T) * (1 - hidden * hidden)
    gradient = {"W1": x.T @ dhidden,
                "b1": dhidden.sum(axis=0),
                "W2": hidden.T @ dz,
                "b2": dz.sum(axis=0)}
    stats = {"bce": bce, "topological_proxy": topological,
             "total": bce + weight * topological,
             "vertex_tie_samples": tied_samples}
    return stats, gradient, signatures


def adam_update(parameters, gradient, first, second, step, learning_rate):
    """Full-batch Adam with fixed standard moment constants; mutate parameters."""
    for key in parameters:
        first[key] *= 0.9
        first[key] += 0.1 * gradient[key]
        second[key] *= 0.999
        second[key] += 0.001 * gradient[key] ** 2
        m = first[key] / (1 - 0.9 ** step)
        v = second[key] / (1 - 0.999 ** step)
        parameters[key] -= learning_rate * m / (np.sqrt(v) + 1e-8)


def evaluate(parameters, x, y):
    p, _, logits = forward(parameters, x)
    hard = p >= 0.5
    truth = y.astype(bool)
    b0_pred = np.array([beta0(row) for row in hard])
    b0_true = np.array([beta0(row) for row in truth])
    denominator = hard.sum(axis=1) + truth.sum(axis=1)
    dice = np.divide(2 * (hard & truth).sum(axis=1), denominator,
                     out=np.ones(len(y), dtype=float), where=denominator != 0)
    proxy = [finite_loss_gradient(1 - row)[0] for row in p]
    metrics = {"bce": float(np.mean(np.logaddexp(0, logits) - y * logits)),
               "topological_proxy": float(np.mean(proxy)),
               "dice": float(dice.mean()), "pixel_accuracy": float((hard == truth).mean()),
               "beta0_mae": float(np.abs(b0_pred - b0_true).mean()),
               "beta0_accuracy": float((b0_pred == b0_true).mean()),
               "exact_mask_accuracy": float(np.all(hard == truth, axis=1).mean())}
    detail = {"probabilities": p.tolist(), "predicted_beta0": b0_pred.tolist(),
              "true_beta0": b0_true.tolist(), "dice": dice.tolist()}
    return metrics, detail
