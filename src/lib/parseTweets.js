exports.parseTweets = (tweetList) => {
  return tweetList.reduce((accumulator, currentLine, index) => {
    const tweetArray = currentLine.split('> ')
    const user = tweetArray[0]
    const tweet = tweetArray[1]
    accumulator[user] = accumulator[user] || []
    accumulator[user].push({
      index,
      tweet,
      user
    })

    return accumulator
  }, {})
}
