const electron = require('electron');
const PDFWindow = require('electron-pdf-window');

const { app, Menu, BrowserWindow, session } = electron;
const path = require('path');

const {
    app, Menu, BrowserWindow, shell,
} = electron;
const isDev = process.argv[2] === '--dev';

let mainWindow;

function createMenu() {
    const template = [
        {
            label: 'Edit',
            submenu: [
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'delete' },
                { role: 'selectall' },
            ],
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' },
            ],
        },
        {
            role: 'window',
            submenu: [
                { role: 'minimize' },
                { role: 'close' },
            ],
        },
    ];

    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' },
            ],
        });

        // Edit menu
        template[1].submenu.push(
            { type: 'separator' },
            {
                label: 'Speech',
                submenu: [
                    { role: 'startspeaking' },
                    { role: 'stopspeaking' },
                ],
            },
        );

        // Window menu
        template[3].submenu = [
            { role: 'close' },
            { role: 'minimize' },
            { role: 'zoom' },
            { type: 'separator' },
            { role: 'front' },
        ];
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200, height: 900,
        titleBarStyle: 'hidden',
    });
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });


    mainWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    });

    createMenu();

    session.defaultSession.on('will-download', (e, item, webContents) => {
        switch (item.getMimeType()) {
            case 'application/pdf': {
                e.preventDefault();
                PDFWindow.addSupport(webContents);
                webContents.loadURL(item.getURL());
                break;
            }
        }
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
	
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
