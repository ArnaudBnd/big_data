const mongoose = require('mongoose')
const fs = require('fs')
const modelMongo = require('./models/bigdata.model')
const maxElement = 1000

// make a connection
mongoose.connect('mongodb://localhost:27017/datas', { useNewUrlParser: true })

// define Schema
const datas = new mongoose.Schema({}, {
 strict: false,
 collection: 'bigData'
})
// compile schema to model
const MyModel = mongoose.model('bigdata', datas)

/*
 * Démarrage des process
 */
process.on('message', ({ data, type }) => {
    switch (type) {
      case 'startProcessInsert':
        startAllForInsert(data.fileIndex)
        break
      default:
        break
      }
})

/*
 * Start process
 * @params fileIndex
 */
const startAllForInsert = (fileIndex) => {
  parseData(`./task/file-${fileIndex}.csv`).then((dataResponse) => {
    if(dataResponse === 0) {
      console.log('failed to parse data from csv')
    } else {
      insertData(dataResponse, 0, maxElement, () => {
        process.send({
          type: 'process:msg',
          data: {
           success: true
          }
       })
      })
    }
  })
}

/*
 * Parse data to insert into base
 * @params url
 * @return promese
 */
const parseData = (url) => {
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(url)
    let data = ''

    readStream.on('data', (chunk) => {
      data += chunk
    }).on('end', async () => {
      // on attends que toute les données soient parse avant de resolve
      const res = await data.toString().split("\n").map(el => el.split(","))
      resolve(res)
    })
  })
}

 /*
  * Bulk data into bdd
  * @params data, debut, fin, callback
  */
const insertData = (data, debut, fin, callback) => {
  const currentData = data.slice(debut, fin)
  console.log('currentData.length', currentData.length)

  if (currentData.length === 0) {
    callback('plus aucune données à insérer')
  } else {
    MyModel.bulkWrite(currentData.map(item => ({
      insertOne: {
        document: modelMongo(item)
      }
    })))
    .then(() => {
      // callback('plus aucune données à insérer')
      return insertData(data, fin, (fin + maxElement), callback)
    })
    .catch(e => console.error(e))
  }
}
