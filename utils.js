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

module.exports = {
  readTokenSync,
  updateTokenSync,
};
