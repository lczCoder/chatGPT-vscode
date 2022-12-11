const vscode = require("vscode");


/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
  console.log("插件 【chatgpt-vscode】开始工作了!", context);

  // chatgpt-explain
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

async function userLogin() {
  const { ChatGPTAPI } = await import('chatgpt')
  // vscode.window.showInformationMessage("Hello World from chatGPT-vscode!");
  const result = vscode.window.showInputBox({
    prompt: "在chat.openai.com/chat网页中获取cookie",
    value: "",
    placeHolder: "请输入身份标识",
  });
  result.then(async (inputValue) => {
    // 是按下ESC键
    if (typeof inputValue === "undefined") return;
    //按下enter键
    const api = new ChatGPTAPI({
      sessionToken: inputValue,
    })
    await api.ensureAuth()
    const response = await api.sendMessage('写一个小说')
    console.log(response)
  });
}

module.exports = {
  activate,
  deactivate,
};
