const fs = require('fs')
const path = './task'
const pm2 = require('pm2')

// EXECUTION
getNameTaskValue().then((res) => {
  startProcess(res)
})

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

// Démarrer les process
const startProcess = (fileTab) => {
  pm2.connect(function(err) {
    if (err) {
      console.error(err)
      process.exit(2)
    }

    pm2.start({
      script: 'index.js',
      instances : 6,
      instance_var: 'INSTANCE_ID',
      env: {
          "NODE_ENV": "development"
      }
    }, function(err, apps) {
      if (err) throw err

      /*apps.map(app => {
        console.log('here')
        pm2.sendDataToProcessId({
          type: 'process:msg',
          data: `/Users/benede.a/Documents/mds.master.bigdata/task/output-${app.pm2_env.pm_id}.csv`,
          topic: 'test',
          id: app.pm2_env.pm_id
        }, function(err, res) {
            if (err)
             throw err;
        })
      })*/
    })
  })
}
