exports.logTweets = userFeeds => {
  const users = Object.keys(userFeeds).sort((a, b) => a.charAt(0) > b.charAt(0))
  users.forEach(user => {
    const tweets = userFeeds[user].join('\n\t')
    console.log(`${user}`)
    if (tweets) {
      console.log(`\t${tweets}`)
    }
  })
}
