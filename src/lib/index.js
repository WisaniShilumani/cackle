const path = require('path')
const { linesToArray } = require('./linesToArray')
const { parseUsers } = require('./parseUsers')
const { parseTweets } = require('./parseTweets')
const { generateFeed } = require('./generateFeed')
const { logTweets } = require('./logTweets')

exports.processTweets = async () => {
  const pathToTweets = path.resolve(__dirname, '../data/tweet.txt')
  const pathToUsers = path.resolve(__dirname, '../data/user.txt')
  
  try {
    const tweetLines = await linesToArray(pathToTweets)
    const userLines = await linesToArray(pathToUsers)
    const users = parseUsers(userLines)
    const tweets = parseTweets(tweetLines)
    const userFeeds = generateFeed(users, tweets)
    logTweets(userFeeds)
  } catch (err) {
    console.error(err)
  }  
}
