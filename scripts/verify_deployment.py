"""Check normal public URLs against an expected source commit, without cache busting."""
import argparse
from datetime import datetime, timezone
from html.parser import HTMLParser
import json
from pathlib import Path
import time
from urllib.request import Request, urlopen

PAGES = {'': 'index.md', 'curriculum/': 'curriculum.md', 'start/': 'start/index.md',
         'computational/integer-homology/': 'computational/integer-homology.md',
         'algebraic/homology/cellular-coefficients/': 'algebraic/homology/cellular-coefficients.md',
         'algebraic/cohomology/cochains-products/': 'algebraic/cohomology/cochains-products.md',
         'algebraic/cohomology/duality/': 'algebraic/cohomology/duality.md',
         'exercises/proof-workshop/': 'exercises/proof-workshop.md',
         'labs/covering-space/': 'labs/covering-space.md',
         'ai/projects/image-topology/': 'ai/projects/image-topology.md'}


class Metadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.values = {}

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'meta' and attrs.get('name', '').startswith('topology-'):
            name = attrs['name']
            if name in self.values:
                raise ValueError(f'duplicate provenance: {name}')
            self.values[name] = attrs.get('content')


def compare_page(html, manifest, expected, require_clean=True, expected_path=None):
    parser = Metadata()
    parser.feed(html)
    failures = []
    checks = {'topology-build-commit': expected,
              'topology-inventory-sha256': manifest['inventory_sha256'],
              'topology-build-dirty': str(manifest['dirty']).lower()}
    if expected_path is not None:
        checks['topology-page-path'] = expected_path
    for key, value in checks.items():
        if parser.values.get(key) != value:
            failures.append(f'{key}: expected {value}, got {parser.values.get(key)}')
    if manifest['commit'] != expected:
        failures.append(f'manifest commit differs: {manifest["commit"]}')
    if require_clean and manifest['dirty']:
        failures.append('manifest contains uncommitted changes')
    return failures


def fetch(url):
    request = Request(url, headers={'User-Agent': 'TopologyFromZero-release-check/1'})
    with urlopen(request, timeout=25) as response:
        return response.read().decode('utf-8'), {
            'final_url': response.geturl(),
            **{k: response.headers.get(k) for k in ['Date', 'Last-Modified', 'Cache-Control', 'Age', 'ETag']}}


def check(base, expected, require_clean=True):
    record = {'time_utc': datetime.now(timezone.utc).isoformat(), 'base_url': base,
              'expected_commit': expected, 'pages': [], 'failures': []}
    try:
        raw, headers = fetch(base + 'build-info.json')
        manifest = json.loads(raw)
        record.update(manifest=manifest, manifest_headers=headers)
        for path in PAGES:
            try:
                html, headers = fetch(base + path)
                failures = compare_page(html, manifest, expected, require_clean, expected_path=PAGES[path])
                record['pages'].append({'path': path, 'headers': headers, 'failures': failures})
                record['failures'].extend(f'{path or "/"}: {f}' for f in failures)
            except Exception as error:
                record['failures'].append(f'{path}: {error}')
    except Exception as error:
        record['failures'].append(f'build manifest: {error}')
    return record


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--base-url', required=True)
    parser.add_argument('--expected', required=True)
    parser.add_argument('--attempts', type=int, default=1)
    parser.add_argument('--interval', type=int, default=30)
    parser.add_argument('--allow-dirty', action='store_true', help='Local validation only')
    parser.add_argument('--output', default='deployment-check.json')
    args = parser.parse_args()
    if not 1 <= args.attempts <= 20 or not 0 <= args.interval <= 60:
        parser.error('attempts must be 1..20; interval must be 0..60 seconds')
    attempts = []
    for i in range(args.attempts):
        result = check(args.base_url.rstrip('/') + '/', args.expected, not args.allow_dirty)
        attempts.append(result)
        Path(args.output).write_text(json.dumps(attempts, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        if not result['failures']:
            print(f'PASS {len(PAGES)} normal page URLs + manifest at {args.expected}')
            return
        print(f'Attempt {i + 1}: ' + '; '.join(result['failures']), flush=True)
        if i + 1 < args.attempts:
            time.sleep(args.interval)
    raise SystemExit('Deployment consistency failed; evidence saved. No deployment was changed.')


if __name__ == '__main__':
    main()
