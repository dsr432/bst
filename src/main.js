const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    x: 10,
    y: 10,
    width: 400,
    height: 50,
    frame: false,
    resizable: false,
    opacity: 0.9,
    skipTaskbar: true,
  });



  //works with show: false to only open after initialization finished
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'command/command.html'));

  // Open the DevTools if webContents.openDevTools(),
  //replaced with .DevTools = false, cuz who wants those lol
  mainWindow.webContents.DevTools = false;

  // shortcut for blurring mainWindow
//  const blurWin = new Menu()

  // This is a keyboard shortcut for focusing on the mainWindow
  //TODO fix this messed up thing
  app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+D', () => {
      if (mainWindow.isFocused() == false) {
        mainWindow.show();
      } else if (mainWindow.isFocused() == true) {
        mainWindow.blur();
      }
    })
  })

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
