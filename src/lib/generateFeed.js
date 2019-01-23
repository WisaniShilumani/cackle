exports.generateFeed = (users, tweets) => {
  const userNames = Object.keys(users)
  const orderedTweets = userNames.reduce((accumulator, userName) => {
    const followees = users[userName]
    let userFeed = tweets[userName] || []

    followees.forEach(followee => {
      userFeed = userFeed.concat(tweets[followee] || [])
    })

    accumulator[userName] = userFeed.sort((a, b) => b.index - a.index).map(tweet => `@${tweet.user}: ${tweet.tweet}`)
    return accumulator
  }, {})

  return orderedTweets
}
