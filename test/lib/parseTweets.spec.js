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

  it('should throw an error if a corrupted file is given', async () => {
    const badTweetLines = await linesToArray(__dirname + '/mocks/tweets-corrupted.txt')
    try {
      const badTweets = parseTweets(badTweetLines)
      expect(true).toBe(false)
    } catch (e) {
      expect(e).toContain('Tweets file contains a badly formatted line at')
    }
  })

  it('should throw an error if a tweet is too long', async () => {
    const badTweetLines = await linesToArray(__dirname + '/mocks/tweets-too-long.txt')
    try {
      const badTweets = parseTweets(badTweetLines)
      expect(true).toBe(false)
    } catch (e) {
      expect(e).toContain('exceeds the 140 character limit')
    }
  })
})

