const fs = require("fs");
const path = require("path");
const tokenFilePath = path.resolve(__dirname, "data.json"); // token存储路径

/**
 * @desc 获取本地存储的chatgpt cookie信息
 * @returns cookie值
 */
const readTokenSync = () => {
  const result = fs.readFileSync(tokenFilePath, "utf8");
  return JSON.parse(result);
};

/**
 * @desc 更新本地存储的chatgpt cookie信息
 */
const updateTokenSync = (status, token) => {
  let result = JSON.stringify({
    loginStatus: status,
    sessionToken: token,
  });
  fs.writeFileSync(tokenFilePath, result, "utf8");
};

const getWebviewContent = (url)=>{
  return `<!DOCTYPE html>
		  <html lang="en">
		  <head>
			  <meta charset="UTF-8">
			  <meta name="viewport" content="width=device-width, initial-scale=1.0">
			  <title>Cat Coding</title>
		  </head>
		  <body>
			  <img src="${url}" width="300" />
		  </body>
		  </html>`;
}

module.exports = {
  readTokenSync,
  updateTokenSync,
  getWebviewContent
};
