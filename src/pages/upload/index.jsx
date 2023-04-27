import React, { useState } from "react";
import axios from "axios";

// GitHub 仓库信息
const owner = "walkonairy";
const repo = "asow-image";

// 认证信息，使用 OAuth2 认证方式获取的访问令牌
const accessToken =
  "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";

function ImageUploader() {
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  async function handleUpload(event) {
    const file = event.target.files[0];
    const base64 = await fileToBase64(file);
    const path = `chat/${Date.now()}${file.name}`;

    // 构造请求地址和请求头
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${accessToken}`,
    };

    const data = JSON.stringify({
      message: "upload image from api",
      content: base64.split("base64,")[1],
    });

    // 发送 POST 请求
    axios
      .put(url, data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.content.download_url);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <input type="file" onChange={handleUpload} />
    </div>
  );
}

export default ImageUploader;
