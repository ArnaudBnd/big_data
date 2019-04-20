const csvSplitStream = require('csv-split-stream')
const fs = require('fs')
const path = './task'
const csv = './csv/StockEtablissement_utf8.csv'

// tcheck if task folder exist
const createTask = () => {
  return new Promise((resolve) => {
    if (! fs.existsSync(path)) {
      fs.mkdirSync(path)
      resolve('NOT EXIST')
    } else {
      resolve('EXIST')
    }
  })
}

// split CSV in 112 subfolder
const splitCSV = (csv) => {
  csvSplitStream.split(
    fs.createReadStream(csv),
    {
      lineLimit: 250000
    },
    (index) => fs.createWriteStream(`./task/file-${index}.csv`)
  ).then((response) => {
    console.log(response.totalChunks, ' fils => split done.')
  })
}

// EXECUTION
createTask().then((response) => {
  if (response === 'NOT EXIST') {
    splitCSV(csv)
  } else {
    console.log('split already been')
  }
})