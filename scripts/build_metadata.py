"""Record source identity for each build; a build is not a release or a review."""
import json
import os
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def git(*args):
    result = subprocess.run(['git', *args], cwd=ROOT, capture_output=True, text=True)
    return result.stdout.strip() if result.returncode == 0 else None


def on_post_build(config, **kwargs):
    sha = git('rev-parse', 'HEAD')
    run = os.environ.get('GITHUB_RUN_ID')
    event = os.environ.get('GITHUB_EVENT_NAME')
    info = {
        'schema': 1,
        'commit': sha,
        'dirty': bool(git('status', '--porcelain', '--untracked-files=normal')),
        'build_kind': 'pull-request' if event == 'pull_request' else 'main-workflow' if run and os.environ.get('GITHUB_REF') == 'refs/heads/main' else 'local',
        'workflow_url': f'https://github.com/{os.environ["GITHUB_REPOSITORY"]}/actions/runs/{run}' if run and os.environ.get('GITHUB_REPOSITORY') else None,
        'review_status': 'See chapter review records; no book-wide human peer review claimed.',
    }
    (Path(config['site_dir']) / 'build-info.json').write_text(json.dumps(info, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
