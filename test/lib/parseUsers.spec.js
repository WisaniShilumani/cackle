const { parseUsers } = require('../../src/lib/parseUsers')
const { linesToArray } = require('../../src/lib/linesToArray')
let users

beforeAll(async () => {
  const userLines = await linesToArray(__dirname + '/mocks/users.txt')
  users = parseUsers(userLines)
})

describe('parsed user object', () => {
  it('should return an object with an amount of keys matching the amount of users in the mock', () => {
    const keys = Object.keys(users)
    expect(keys).toHaveLength(7)
  })

  it('should return an object containing users as keys and their followees as respective values', () => {
    const username1 = Object.keys(users)[0]
    expect(Array.isArray(users[username1])).toBeTruthy()
    expect(typeof users[username1][0]).toEqual('string')
  })
})

