import {defineConfig} from '@playwright/test';
export default defineConfig({
  testDir:'./tests/browser',fullyParallel:true,workers:2,retries:0,timeout:45000,
  reporter:[['list'],['json',{outputFile:'test-results/browser-results.json'}]],
  use:{baseURL:'http://127.0.0.1:8123/topology-from-zero/',locale:'zh-CN',trace:'retain-on-failure',screenshot:'only-on-failure',
    launchOptions:{args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']}},
  projects:[{name:'desktop',use:{browserName:'chromium',viewport:{width:1280,height:900}}},
    {name:'mobile',use:{browserName:'chromium',viewport:{width:390,height:844},isMobile:true,hasTouch:true}}],
  webServer:{command:'node scripts/serve_test_site.mjs',url:'http://127.0.0.1:8123/topology-from-zero/',reuseExistingServer:false}
});
