
const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron')

/**
C:\Windows\System32\Macromed\Flash\pepflashplayer64_23_0_0_207.dl 
C:\Windows\SysWOW64\Macromed\Flash\pepflashplayer32_23_0_0_207.dll
 */
//此处仅兼容了Windows 的 32位 与 64位
const pepflashplayer = (process.arch == 'x64') ? 
    path.join(__dirname, `plugins`, `pepflashplayer64_27_0_0_183.dll`):
    path.join(__dirname, `plugins`, `pepflashplayer32_27_0_0_183.dll`);
//设定插件
app.commandLine.appendSwitch('ppapi-flash-path', pepflashplayer);
//设定插件版本（不知道是否真有用，不匹配貌似也能运行）
app.commandLine.appendSwitch('ppapi-flash-version', '27.0.0.183');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ 
        width: 1336, 
        height: 768,
        minWidth: 1336,
        minHeight: 768,
        icon: path.join(__dirname, 'static/images/favicon.ico'),
        resizable: true
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    //mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// ipcMain.on('new win', (event, arg) => {

//     // Create the browser window.
//     mainWindow = new BrowserWindow({ 
//         width: 1336, 
//         height: 768,
//         minWidth: 1336,
//         minHeight: 768,
//         resizable: false
//     })

//     // and load the index.html of the app.
//     mainWindow.loadURL('http://s212.hero.9wee.com/')
// });