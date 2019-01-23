const fs = require('fs')

const convertLinesFromFileToArray = (inputStream) => {
  const lines = []
  let remaining = ''

  return new Promise((resolve, reject) => {
    inputStream.on('data', data => {
      remaining += data
      let index = remaining.indexOf('\n')
  
      while (index > -1) {
        let line = remaining.substring(0, index).replace(/\r/g,'')
        remaining = remaining.substring(index + 1)
        index = remaining.indexOf('\n')

        if (line.length > 0) {
          lines.push(line)
        }
      }
    })
  
    inputStream.on('end', () => {
      resolve(lines)
    })

    inputStream.on('error', error => {
      reject(error)
    })
  })
}

exports.linesToArray = path => {
  const inputStream = fs.createReadStream(path)
  return convertLinesFromFileToArray(inputStream)
}
