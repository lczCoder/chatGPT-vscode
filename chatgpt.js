const vscode = require("vscode");

class ChatgptVsCode {
  constructor() {}
  // 校验cookie合法
   checkUserToken(token) {
    return new Promise(async (resolve, reject) => {
        const { ChatGPTAPI } = await import("chatgpt");
        const api = new ChatGPTAPI({
          sessionToken: token,
        });
        api
          .ensureAuth()
          .then(() => resolve())
          .catch(() => reject());
    });
  }
}

module.exports = ChatgptVsCode;
