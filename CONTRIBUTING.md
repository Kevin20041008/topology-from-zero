# 参与教材建设

先读[课程总计划](docs/project/COURRICULUM_MASTER_PLAN.md)、[状态与续作](docs/project/IMPLEMENTATION_STATUS.md)、[写作与审查协议](docs/project/MATH_REVIEW_PROTOCOL.md)和[贡献/版权](docs/contributing.md)。新章用十二项模板、6–12道分层题及完整解答，数学/实验状态分开记录。

在独立分支工作，检查未提交修改并保留旧URL；补数学修复时提供反例或完整论证。不改变浮点端点以迎合显示，不放宽精度断言。新生成文件先确认不存在；已有章须先读再改。

```sh
node --test scripts/test_topology.mjs scripts/test_curriculum.mjs scripts/test_foundations.mjs
python scripts/verify_independent.py
python scripts/verify_notebooks.py
python -m mkdocs build --strict
python scripts/verify_site.py
git diff --check
```

具体Python环境依README安装requirements-validation.txt。涉及公式/交互须增加浏览器验收，静态MathJax标记不能代替实际排版。PR写明内容、证明边界、逐文件清单、测试范围与未解决项；数学审阅通过且获维护者授权后才合并发布。

正文与原创插图CC BY 4.0、代码MIT，详见LICENSE.md、LICENSE-CODE。第三方素材需要可再利用许可；不复制或翻译受保护教材段落与解答。
