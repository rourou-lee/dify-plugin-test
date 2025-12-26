// 1. 安装依赖：npm install express axios
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// 2. 定义接口，供 Dify 调用
app.post('/dify-okms-api', async (req, res) =>
{
  try {
    // 目标 API 地址
    const apiUrl = 'http://10.31.65.91/okmsApi/swchat/multipathRecall/list?isPage=false';

    // 请求头配置（核心：携带指定 Cookie）
    const headers = {
      'Cookie': 'OKMSID_DEV=JDJhJDEwJEFDOU5GWWlKejlwOS5senV4Vmd5VXVsOFR3WWNjSEI2ZnpRVHNXVURUNGlBQ04xR3VkemVl',
      'Content-Type': 'application/json' // 根据接口要求补充，若无则可省略
    };

    // 发送 GET 请求获取数据
    const response = await axios.get(apiUrl, {
      headers: headers,
      // 若接口有超时要求，可设置超时时间
      timeout: 10000
    });

    // 返回数据给 Dify（标准 JSON 格式）
    res.status(200).json({
      success: true,
      data: response.data
    });
  } catch (error) {
    // 错误处理
    console.error('请求失败：', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      detail: error.response?.data || '无返回数据'
    });
  }
});

// 启动服务，监听端口（例如 3000）
const port = 3000;
app.listen(port, () =>
{
  console.log(`服务已启动：http://localhost:${port}`);
});