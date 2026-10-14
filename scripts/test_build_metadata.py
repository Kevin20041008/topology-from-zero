"""Regressions for stale HTML being mislabelled by a newer build manifest."""
import unittest
from build_metadata import embed_metadata
from verify_deployment import compare_page


class ProvenanceTests(unittest.TestCase):
    def setUp(self):
        self.info = {'commit': 'a' * 40, 'dirty': False, 'inventory_sha256': 'b' * 64, 'build_kind': 'test'}
        self.page = '<html><head></head><body><div data-build-info>placeholder</div></body></html>'

    def test_static_identity_without_javascript(self):
        output = embed_metadata(self.page, self.info)
        self.assertIn('本页构建：aaaaaaa', output)
        self.assertEqual(compare_page(output, self.info, self.info['commit']), [])

    def test_fresh_json_cannot_certify_old_homepage(self):
        output = embed_metadata(self.page, self.info)
        fresh = dict(self.info, commit='c' * 40)
        errors = compare_page(output, fresh, fresh['commit'])
        self.assertTrue(any('topology-build-commit' in e for e in errors))

    def test_matching_pages_still_fail_if_manifest_is_stale(self):
        output = embed_metadata(self.page, self.info)
        stale = dict(self.info, commit='c' * 40)
        self.assertTrue(any('manifest commit' in e for e in compare_page(output, stale, self.info['commit'])))

    def test_inventory_or_dirty_mismatch_is_detected(self):
        output = embed_metadata(self.page, self.info)
        for patch in [{'inventory_sha256': 'd' * 64}, {'dirty': True}]:
            self.assertTrue(compare_page(output, dict(self.info, **patch), self.info['commit']))

    def test_missing_and_duplicate_metadata_fail(self):
        self.assertTrue(compare_page(self.page, self.info, self.info['commit']))
        output = embed_metadata(self.page, self.info)
        with self.assertRaises(ValueError):
            compare_page(embed_metadata(output, self.info), self.info, self.info['commit'])

    def test_same_version_homepage_cannot_substitute_for_a_requested_chapter(self):
        output = embed_metadata(self.page, self.info, 'index.md')
        self.assertTrue(compare_page(output, self.info, self.info['commit'], expected_path='curriculum.md'))
        self.assertEqual(compare_page(output, self.info, self.info['commit'], expected_path='index.md'), [])

    def test_local_dirty_is_explicit_and_never_release_clean(self):
        dirty = dict(self.info, dirty=True)
        output = embed_metadata(self.page, dirty)
        self.assertIn('本地修改', output)
        self.assertTrue(compare_page(output, dirty, dirty['commit']))
        self.assertEqual(compare_page(output, dirty, dirty['commit'], require_clean=False), [])


if __name__ == '__main__':
    unittest.main()
