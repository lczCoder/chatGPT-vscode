const vscode = require("vscode");
const ChatgptVsCode = require("./chatgpt");
const chatGPT = new ChatgptVsCode();

const { readTokenSync, updateTokenSync } = require("./utils");
/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
  console.log("插件 【chatgpt-vscode】开始工作了!", context);

  let test = vscode.commands.registerCommand("chatgpt-explain", function (url) {
    console.log("url", url);
    vscode.window.showInformationMessage("代码解释");
  });

  let disposable = vscode.commands.registerCommand(
    "chatgpt-vscode.helloWorld",
    function () {
      vscode.window.showInformationMessage("Hello World from chatGPT-vscode!");
    }
  );

  let login = vscode.commands.registerCommand("chatgpt-login", userLogin);

  let textCom = vscode.commands.registerTextEditorCommand(
    "extension.selection",
    function (textEditor) {
      const text = textEditor.document.getText(textEditor.selection);
      console.log("选中的文本是:", text);
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(test);
  context.subscriptions.push(textCom);
  context.subscriptions.push(login); // chatgpt 账号登录
}

// This method is called when your extension is deactivated
function deactivate() {}

/**
 * @desc 用户登录
 */
function userLogin() {
  const result = vscode.window.showInputBox({
    prompt: "在chat.openai.com/chat网页中获取cookie",
    value: "",
    placeHolder: "请输入身份标识",
  });
  result.then(async (inputValue) => {
    // 是按下ESC键
    if (typeof inputValue === "undefined") return;
    //按下enter键
    chatGPT
      .checkUserToken(inputValue)
      .then(() => {
        updateTokenSync(true, inputValue);
        vscode.window.showInformationMessage("chatGPT登录成功，欢迎使用！");
      })
      .catch(() => {
        updateTokenSync(false, "");
        vscode.window.showErrorMessage("chatGPT登录失败，请确认cookie的合法性");
      });
  });
}

module.exports = {
  activate,
  deactivate,
};
