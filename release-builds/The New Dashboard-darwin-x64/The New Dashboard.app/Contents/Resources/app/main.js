const {BrowserWindow, app} = require('electron');
const os = require('os');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
      titleBarStyle: 'hidden',
      width: 800,
      height: 600,
      icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  });
  win.loadURL(`file:///${__dirname}/index.html`);
  require('./menu/mainmenu');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
