const { linesToArray } = require('./lib/linesToArray')
const { parseUsers } = require('./lib/parseUsers')
const { parseTweets } = require('./lib/parseTweets')
const { generateFeed } = require('./lib/generateFeed')

const processTweets = async () => {
  const pathToTweets = `${__dirname}/data/tweet.txt`
  const pathToUsers = `${__dirname}/data/user.txt`
  
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

const logTweets = userFeeds => {
  const users = Object.keys(userFeeds).sort((a, b) => a.charAt(0) > b.charAt(0))
  users.forEach(user => {
    const tweets = userFeeds[user].join('\n\t')
    console.log(`${user}`)
    if (tweets) {
      console.log(`\n\t${tweets}`)
    }
  })
}

processTweets()
