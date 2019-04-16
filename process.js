const fs = require('fs')
const path = './task'
const pm2 = require('pm2')

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
* @return
*/
const startProcess = (fileTab) => {
  pm2.connect(function(err) {
    if (err) {
      console.error(err)
      process.exit(2)
    }

    pm2.start({
      script: 'index.js',
      instances : 4,
      instance_var: 'INSTANCE_ID',
      env: {
          "NODE_ENV": "development"
      }
    }, function(err, apps) {
      if (err) throw err
    })
  })
}

pm2.launchBus((err, bus) => {
  bus.on('process:msg', (packet) => {
    //console.log('process end =>', packet.data)
    console.log('packet.process.pm_id =>', packet.process.pm_id)
    /*packet.data.success.should.eql(true)
    packet.process.pm_id.should.eql(proc1.pm2_env.pm_id)
    done()*/
  })
})

// EXECUTION
getNameTaskValue().then((res) => {
  startProcess(res)
})
