## 微信小游戏“跳一跳”的半自动Node版本
> 需要手动在页面测量每一步的距离来辅助得分

> 思路借鉴于这个牛逼的项目：https://github.com/wangshub/wechat_jump_game

### 页面
![11][1]


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
- 确认服务启动后(输出websocket listening port 8899...)，在Chrome打开index.html，并根据页面指示操作即可


### Good Luck!


[1]: http://static.zybuluo.com/dmq/homu43qg8711810igjjhkedh/image.png