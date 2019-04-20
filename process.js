const fs = require('fs')
const path = './task'
const pm2 = require('pm2')
let indexFil = 0

/*
 * Start process
 *
 */
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

    setTimeout(() => {
      apps.map(app => {
        pm2.sendDataToProcessId({
          type : 'startProcessInsert',
          id: app.pm2_env.pm_id,
          data : {
            fileIndex: indexFil
          },
          topic: 'DEFAULT_TOPIC'
        }, () => {
          console.log('instance', ' done')
        })
        indexFil++
      })
    }, 2000)
  })
})

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
      }, () => {
        console.log('instance', ' done')
      })
    } else {
      console.log('process fail')
    }
  })
})
