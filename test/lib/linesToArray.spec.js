const { linesToArray } = require('../../src/lib/linesToArray')
let lines

beforeAll(async() => {
  lines = await linesToArray(__dirname + '/mocks/lines.txt')
})

describe('ascii line parser', () => {
  it('should convert lines into an array with the length of non-empty lines', () => {
    expect(Array.isArray(lines)).toBeTruthy()
    expect(lines).toHaveLength(5)
  })

  it('convert into an array of lines', () => {
    const arrayLines = [
      'line1',
      'line2',
      'line3',
      'line4',
      'line5'
    ]
  
    expect(lines).toEqual(arrayLines)
  })
})

