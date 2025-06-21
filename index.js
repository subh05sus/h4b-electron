const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "Cypher – One line ahead of every error.",
    backgroundColor: '#ffffff',
    titleBarStyle: 'default', // or 'hidden' if you want a frameless look
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadURL('http://localhost:3000');

  win.webContents.on('did-fail-load', () => {
    win.loadURL('data:text/html,<h1>Failed to load http://localhost:3000</h1><p>Is your server running?</p>');
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

