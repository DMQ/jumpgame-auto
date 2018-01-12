## 微信小游戏“跳一跳”的半自动Node版本
> 没别的，就是感兴趣，重复造轮子

> 此版本是半自动版，需要手动在页面测量每一步的距离来辅助得分，后续会研究图像识别，实现自动版

> 目前已有的一些自动版程序，刷出来的分数都很容易被微信重置分数，主要原因是combo太多，得分太高，有一些程序加了随机的中心点偏移，就是控制不要每一次都跳中中心点，效果不错，不过预计也会持续的被微信打击

> 此版本对于长按位置坐标加了随机偏移，更不易被微信识别，因为是需要手动测量距离，所以这个版本操作比较慢，需要耐心才能得高分，建议不要高于1000分，不然容易被微信重置分数

> 思路借鉴于这个牛逼的项目：https://github.com/wangshub/wechat_jump_game

### 分数

![clipboard.png](https://sfault-image.b0.upaiyun.com/258/129/2581293026-5a5880c22b68d_articlex)


### 操作页面

![clipboard.png](https://segmentfault.com/img/bV1XfG?w=911&h=683)



### 环境准备
> 当前项目所有代码在 Node >= 8.1.0, Chrome 63.0.3239.132 调试运行正常
- 安装[Node环境](https://nodejs.org/zh-cn/)
- Adb工具下载及安装
    - [Windows Adb下载](https://dl.google.com/android/repository/platform-tools-latest-windows.zip)
    - [Windows配置Adb环境](https://jingyan.baidu.com/article/17bd8e52f514d985ab2bb800.html)
    - [Mac Adb下载](https://dl.google.com/android/repository/platform-tools-latest-darwin.zip)
    - [Mac配置Adb环境](http://blog.csdn.net/lihongxiangleo/article/details/52598233)


### 连接手机（暂不支持iPhone）
- 打开Android手机，开启USB调试模式（一般路径：设置 - 其他（高级）设置 - 开发者选项 - 开启开发者选项+开启USB调试，如果其他设置里面没有开发者选项，到关于手机选项里面开启），更多开启方式参考[这里](http://www.shuame.com/faq/usb-connect/9-usb.html)
- 用USB把Android手机连接上电脑，若手机弹出授权弹出，请选择允许！！
- 在Cmd(Windows)或终端(Mac) 输入命令 `adb devices` 确认Android手机已经正确连接，正常的话会输出类似这样的内容: `List of devices attached \n 3281219f        device`，如果没有输出 `xxxxxxx      device`的话则没有正常连接，请重试


### 使用教程
- 在Cmd(Windows)或终端(Mac) `cd` 到项目根目录，执行以下命令:
    ```
    npm i
    npm run start
    ```
- 确认服务启动后(输出websocket listening port 8899...)，在根目录找到index.html，用Chrome打开，并根据页面指示操作即可

- 如果出现端口8899被占用的情况，请自行在文件`server/index.js`, `index.html`中搜索8899替换成可用的端口


### Good Luck!


[1]: http://static.zybuluo.com/dmq/homu43qg8711810igjjhkedh/image.png