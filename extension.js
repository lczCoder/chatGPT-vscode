const vscode = require("vscode");
const ChatgptVsCode = require("./chatgpt");
const chatGPT = new ChatgptVsCode();

const { updateTokenSync,getWebviewContent } = require("./utils");
/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
  console.log("插件 【chatgpt-vscode】开始工作了!", context);

  let chatgptExplain = vscode.commands.registerTextEditorCommand(
    "chatgpt-explain",
    codeExplain
  );

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
  context.subscriptions.push(chatgptExplain); // 代码解释器
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

function codeExplain(code) {
  const text = code.document.getText(code.selection);
  console.log("代码解释器", text);
  const panel = vscode.window.createWebviewPanel(
    'Test', // 标识webview的类型
    '代码解释器', // 展示给用户的面板的标题
    vscode.ViewColumn.One, // 显示webview面板以编辑器新列的方式.
    {} // webview其他的选项
  )
  panel.webview.html = getWebviewContent('https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif')
  let timer = setInterval(()=>{
    panel.webview.html = getWebviewContent('https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500')
    clearInterval(timer)
  },2000)
  // vscode.window.showInformationMessage("代码解释");
}

module.exports = {
  activate,
  deactivate,
};
