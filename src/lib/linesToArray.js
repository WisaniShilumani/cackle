const fs = require('fs')

exports.linesToArray = path => {
  const input = fs.createReadStream(path)
  return readLinesFromFile(input)
}

const readLinesFromFile = (input) => {
  const lines = []
  let remaining = ''

  return new Promise((resolve, reject) => {
    input.on('data', data => {
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
  
    input.on('end', () => {
      resolve(lines)
    })

    input.on('error', error => {
      reject(error)
    })
  })
  
}
