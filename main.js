
const { app, BrowserWindow } = require("electron");
const path = require("path");
const { menubar } = require('menubar');

const mb = menubar(
  {
  index: 'file://' + __dirname + '/dist/index.html',
  icon: path.resolve(__dirname, 'icons/MenuBarTemplate.png'),
  transparent: true,
  browserWindow: {
    width: 400,
    height: 700,
    minWidth: 400,
    minHeight: 700,
    maxWidth: 400,
    maxHeight: 700,
    useContentSize: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  }
  }
)

mb.on('ready', () => {
  console.log('app is ready');
})



// uncomment the below if you want the electron browserwindow to appear

// // // modify your existing createWindow() function
// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js')
//     }
//   })

//   win.loadFile(path.join(__dirname,'dist/index.html'));
// }



// app.whenReady().then(() => {
//     createWindow()
  
//     app.on('activate', () => {
//       if (BrowserWindow.getAllWindows().length === 0) createWindow()
//     })
//   })

//   app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') app.quit()
//   })