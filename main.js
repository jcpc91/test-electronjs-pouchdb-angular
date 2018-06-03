const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const PouchDb = require('pouchdb')
PouchDb.plugin(require('relational-pouch'))
PouchDb.plugin(require('pouchdb-find'))

const dbname = 'test'

let win;

app.once('ready', () => {
    initAPP();
})

app.on('activate', () => {
    if (win === null) {
        initAPP()
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

function initAPP() {
    generarbasedatos()
    .then(() => {
        createWindow()
    })
    .catch(err => {
        console.log(err);
    })
}

function generarbasedatos() {
    const db = new PouchDb(dbname)
    db.setSchema([
        {
            singular: 'autor',
            plural: 'autores',
            relations: {
                articulos: { hasMany:'articulo' }
            }
        },
        {
            singular: 'articulo',
            plural: 'articulos',
            relations: {
                autor: { belongsTo: 'autor' },
                comentarios: { hasMany: 'comentario' }
            }
        },
        {
            singular: 'comentario',
            plural: 'comentarios',
            relations: {
                articulo: {belongsTo: 'articulo'}
            }
        }
    ])
    return db.info()
}

function createWindow(){
    console.log('generate windows');
        
    win = new BrowserWindow({width: 1024, height: 900})

    // load the dist folder from Angular
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }))
    
    // Open the DevTools optionally:
    win.webContents.openDevTools()
    win.on('closed', () => {
        win = null
    })
    win.webContents.once('did-finish-load', () =>  {} );
}