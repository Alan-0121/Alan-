// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: calendar;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: calendar;
/* ---------------- 歷史版本更新
 *
 *
 * 2024/09/
 * 2024/09/21   v 1.1   :  code完成
 * 2024/09/20   v 1.0   :  完成Alan-code 
*/ 
// 指定小部件專案的佈局 ----------------
const layout = `
  
   row 
    column
      date
      sunset
      battery
      space
      events
    
    column(90)
      space
      space
      space
       
`
//
/* date 日期      reminders 提醒
 * battery 電池   sunrise 日出日落
 * events 事件    current條件
 * greeting 問候  future 明日天氣
 * hourly預測清單  week 當前日期的週數
 * -------------------------------
 * openweathermap.org/appid
*/// 上方申請openweathermap-API金鑰.
const apiKey = "2f3b5f38c3275a8830a4cbb3c7291f80"

/* CODE.
 * 更仔細地編輯本節.
 * -------------------
*/// Alan-code元素的名稱.
const codeFilename = "Alan-code"
const gitHubUrl = "https://github.com/Alan-0121/Alan/blob/main/Alan-code.js"

// 確定使用者是否在使用iCloud.
let files = FileManager.local()
const iCloudInUse = files.isFileStoredIniCloud(module.filename)

// 如果是這樣，請使用iCloud檔案管理器.
files = iCloudInUse ? FileManager.iCloud() : files

// 確定Weather Cal程式碼是否存在，並在需要時下載.
const pathToCode = files.joinPath(files.documentsDirectory(), codeFilename + ".js")
if (!files.fileExists(pathToCode)) {
  const req = new Request(gitHubUrl)
  const codeString = await req.loadString()
  files.writeString(pathToCode, codeString)
}

// 匯入程式碼.
if (iCloudInUse) { await files.downloadFileFromiCloud(pathToCode) }
const code = importModule(codeFilename)

const custom = {

  // Custom items and backgrounds can be added here.

}

// Run the initial setup or settings menu.
let preview
if (config.runsInApp) {
  preview = await code.runSetup(Script.name(), iCloudInUse, codeFilename, gitHubUrl)
  if (!preview) return
}

// Set up the widget.
const widget = await code.createWidget(layout, Script.name(), iCloudInUse, custom)
Script.setWidget(widget)

// If we're in app, display the preview.
if (config.runsInApp) {
  if (preview == "small") { widget.presentSmall() }
  else if (preview == "medium") { widget.presentMedium() }
  else { widget.presentLarge() }
}


Script.complete()