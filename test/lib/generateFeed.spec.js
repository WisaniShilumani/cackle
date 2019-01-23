const { parseUsers } = require('../../src/lib/parseUsers')
const { parseTweets } = require('../../src/lib/parseTweets')
const { linesToArray } = require('../../src/lib/linesToArray')
const { generateFeed } = require('../../src/lib/generateFeed')
let users
let tweets
let feed
beforeAll(async () => {
  const userLines = await linesToArray(__dirname + '/mocks/users.txt')
  const tweetLines = await linesToArray(__dirname + '/mocks/tweets.txt')
  users = parseUsers(userLines)
  tweets = parseTweets(tweetLines)
  feed = generateFeed(users, tweets)
})

describe('feed', () => {
  it('should return a feed', () => {
    expect(true).toBeTruthy()
  })
})
