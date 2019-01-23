const { parseTweets } = require('../../src/lib/parseTweets')
const { linesToArray } = require('../../src/lib/linesToArray')
let tweets

beforeAll(async () => {
  const tweetLines = await linesToArray(__dirname + '/mocks/tweets.txt')
  tweets = parseTweets(tweetLines)
})

describe('parsed tweet object', () => {
  it('should be an object containing users and an array of their tweets', async () => {
    const key1 = Object.keys(tweets)[0]
    expect(typeof tweets).toEqual('object')
    expect(typeof Array.isArray(tweets[key1])).toBeTruthy()
  })
  
  it('should have values as items containing the required properties', async () => {
    const key1 = Object.keys(tweets)[0]
    expect(tweets[key1][0]).toHaveProperty('index')
    expect(tweets[key1][0]).toHaveProperty('tweet')
    expect(tweets[key1][0]).toHaveProperty('user')
  })
})

