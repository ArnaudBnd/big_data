const fs = require('fs')
const path = './task'
const pm2 = require('pm2')
let indexFil = 0
let maxIndexFil = 99

/*
 * Creation d'un tableau avec tout les noms de fichier crées
 * @return promese
 */
const getNameTaskValue = () => {
  return new Promise((resolve) => {
    // get name csv
    // and push into tabl
    fs.readdir(path, function(err, items) {
      const fileTab = []
      for (var i=1; i<items.length; i++) {
        fileTab.push(items[i])
      }
      resolve(fileTab)
    })
  })
}

/*
 * Démarrer les process
 *
 */
const startProcess = (fileTab) => {
  pm2.connect(function(err) {
    if (err) {
      console.error(err)
      process.exit(2)
    }

    pm2.start({
      script: 'index.js',
      instances : 2,
      instance_var: 'INSTANCE_ID',
      env: {
          "NODE_ENV": "development"
      }
    }, function(err, apps) {
      if (err) throw err

      setTimeout(() => {
        apps.map(app => {
          pm2.sendDataToProcessId({
            type : 'startProcessInsert',
            id: app.pm2_env.pm_id,
            data : {
              fileIndex: indexFil
            },
            topic: 'DEFAULT_TOPIC'
          }, (err, res) => {
            console.log('instance', ' done')
          })
          indexFil++
        })
      }, 2000)
    })
  })
}

/*
 * Opens a message bus enter process
 *
 */
pm2.launchBus((err, bus) => {
  bus.on('process:msg', (packet) => {
    if (packet.data.success) {
      indexFil++

      pm2.sendDataToProcessId({
        type : 'startProcessInsert',
        id: packet.process.pm_id,
        data : {
          fileIndex: indexFil
        },
        topic: 'DEFAULT_TOPIC'
      }, (err, res) => {
        console.log('instance', ' done')
      })
    } else {
      console.log('process fail')
    }
  })
})

// EXECUTION
getNameTaskValue().then((res) => {
  startProcess(res)
})
