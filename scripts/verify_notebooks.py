"""Validate and execute every source notebook without modifying it."""
from pathlib import Path
from tempfile import TemporaryDirectory
import sys

import nbformat
from nbclient import NotebookClient
from jupyter_client import KernelManager

ROOT = Path(__file__).resolve().parents[1]


def execute_notebook(path: Path, directory: str):
    notebook = nbformat.read(path, as_version=4)
    nbformat.validate(notebook)
    # Use this interpreter, even if a different global python3 kernel exists.
    manager = KernelManager(kernel_name="python3")
    manager.kernel_spec.argv = [
        sys.executable, "-m", "ipykernel_launcher", "-f", "{connection_file}"
    ]
    client = NotebookClient(
        notebook, km=manager, timeout=120, allow_errors=False,
        record_timing=False, resources={"metadata": {"path": directory}},
    )
    # A supplied manager is not owned by nbclient unless cleanup is explicit.
    # Shut it down before Windows removes the temporary working directory.
    client.execute(cleanup_kc=True)
    for cell in notebook.cells:
        if cell.cell_type == "code" and cell.source.strip():
            assert cell.execution_count is not None, "Unexecuted code cell"
            assert not any(o.output_type == "error" for o in cell.outputs)
    return notebook


def main():
    paths = sorted((ROOT / "docs/labs/notebooks").glob("*.ipynb"))
    assert len(paths) >= 2, "Expected the two teaching notebooks"
    for path in paths:
        with TemporaryDirectory(prefix="topology-notebook-") as directory:
            notebook = execute_notebook(path, directory)
        count = sum(c.cell_type == "code" for c in notebook.cells)
        print(f"PASS {path.name}: {count} code cells executed in a fresh kernel")


if __name__ == "__main__":
    main()
