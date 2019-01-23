exports.parseTweets = (tweetList) => {
  return tweetList.reduce((accumulator, currentLine, index) => {
    const tweetArray = currentLine.split('> ')

    if (tweetArray.length !== 2) {
      throw `Tweets file contains a badly formatted line at (line: ${index + 1}) "${currentLine}"`
    }

    const user = tweetArray[0]
    const tweet = tweetArray[1]

    if (tweet.length > 140) {
      throw `The tweet at (line: ${index + 1}) exceeds the 140 character limit. "${tweet.substr(0, 10)}..."`
    }
    accumulator[user] = accumulator[user] || []
    accumulator[user].push({
      index,
      tweet,
      user
    })

    return accumulator
  }, {})
}
