# 数据来源与许可

本项目使用 **BBBC039v1**：真实 U2OS 细胞 DNA 通道荧光显微图像及人工细胞核标注。官方来源为 [Broad Bioimage Benchmark Collection](https://bbbc.broadinstitute.org/BBBC039)，于 **2026-10-14** 实际访问并下载。

官方页面明确将 BBBC039v1 标为 **CC0**；[CC0 1.0 官方说明](https://creativecommons.org/publicdomain/zero/1.0/)允许复制、修改与分发。这里署名用于科学溯源，不表示 Broad 或原作者认可本教学项目。项目代码仍遵循仓库代码许可；由其产生的预处理图像/掩膜按 CC0 提供。

下载入口、精确字节数及 SHA256 固定于 sources.json：

- images.zip：77,915,748 bytes。
- masks.zip：2,753,811 bytes。
- metadata.zip：17,816 bytes。
- 合计 **80,687,375 bytes**；不需要账号。下载器检查固定长度及校验和，不接受来源内容静默改变。

官方共有200个视野，每幅520×696像素。按官方 training/validation/test 文件名排序，分别取前12/6/6幅，不依据标签质量或结果挑选。不同原图不跨集合；源plate编号记录在manifest中。**各集合存在plate重叠**，因此不是plate/批次/独立实验留出评估。

原始PNG第一通道含实例编码；参考[官方链接的解码示例](https://gist.github.com/jccaicedo/15e811722fca51e3ae90e8b43057f075)。本项目只取该通道非零像素的并，做**二值语义分割**：接触实例可能合成同一连通分量，β0不是原标注的细胞核实例数。未复制解码示例代码。

为在CPU快速训练，图像按8×8块平均，掩膜按块内至少一半为前景，得到65×87网格。24幅图的原始/粗化Betti数记录在 data/manifest.json，**24幅均发生变化**。结果只评价明确的粗化任务，不能称原分辨率实例分割基准。

科学来源：

- Juan C. Caicedo et al., *Evaluation of Deep Learning Strategies for Nucleus Segmentation in Fluorescence Images*, Cytometry Part A, 2019。[出版方 DOI 入口](https://doi.org/10.1002/cyto.a.23863)。
- Vebjorn Ljosa, Katherine L. Sokolnicki, Anne E. Carpenter, *Annotated high-throughput microscopy image sets for validation*, Nature Methods, 2012。[DOI 入口](https://doi.org/10.1038/nmeth.2083)，由BBBC官方页面提供。

原始归档只缓存在Git忽略的 data/archives/。提交的 prepared.npz 含固定24幅预处理图及掩膜；manifest保存原图/标注字节哈希、原始ID、plate、划分、归一化参数和粗化数组哈希。下载器可从固定归档重新产生它们。
