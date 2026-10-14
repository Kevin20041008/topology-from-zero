"""Embed the provenance of each HTML document, captured before rendering."""
import html
import json
import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from course_inventory import inventory

INFO = None


def git(*args):
    result = subprocess.run(['git', *args], cwd=ROOT, capture_output=True, text=True)
    return result.stdout.strip() if result.returncode == 0 else None


def on_config(config, **kwargs):
    global INFO
    run = os.environ.get('GITHUB_RUN_ID')
    event = os.environ.get('GITHUB_EVENT_NAME')
    INFO = {
        'schema': 2,
        'commit': git('rev-parse', 'HEAD'),
        'dirty': bool(git('status', '--porcelain', '--untracked-files=normal')),
        'build_kind': 'pull-request' if event == 'pull_request' else 'main-workflow' if run and os.environ.get('GITHUB_REF') == 'refs/heads/main' else 'local',
        'workflow_url': f'https://github.com/{os.environ["GITHUB_REPOSITORY"]}/actions/runs/{run}' if run and os.environ.get('GITHUB_REPOSITORY') else None,
        'review_status': 'See chapter review records; no book-wide human peer review claimed.',
        **inventory(),
    }
    return config


def on_page_markdown(markdown, **kwargs):
    def replace(match):
        key = match.group(1)
        if key not in INFO['counts']:
            raise ValueError(f'Unknown course count: {key}')
        return str(INFO['counts'][key])
    return re.sub(r'\{\{\s*course\.(\w+)\s*\}\}', replace, markdown)


def embed_metadata(output, info, page_path='index.md'):
    tags = ''.join(f'<meta name="topology-{name}" content="{html.escape(str(value), quote=True)}">\n'
                   for name, value in [('build-commit', info['commit'] or 'unknown'),
                                       ('inventory-sha256', info['inventory_sha256']),
                                       ('build-dirty', str(info['dirty']).lower()),
                                       ('page-path', page_path)])
    if '</head>' not in output:
        raise ValueError('Page has no head')
    output = output.replace('</head>', tags + '</head>', 1)
    label = f'本页构建：{(info["commit"] or "unknown")[:7]}{" + 本地修改" if info["dirty"] else ""} · {info["build_kind"]}。构建成功不代表数学审查完成。'
    return re.sub(r'(<div data-build-info>).*?(</div>)', lambda m: m[1] + html.escape(label) + m[2], output, flags=re.S)


def on_post_page(output, page, **kwargs):
    return embed_metadata(output, INFO, page.file.src_uri)


def on_post_template(output, template_name, **kwargs):
    return embed_metadata(output, INFO, template_name) if '</head>' in output else output


def on_post_build(config, **kwargs):
    (Path(config['site_dir']) / 'build-info.json').write_text(json.dumps(INFO, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
