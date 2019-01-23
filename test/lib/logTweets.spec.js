const { feeds } = require('./mocks/feeds')
let { logTweets } = require('../../src/lib/logTweets')

describe('tweet logger', () => {
  it('should log user feeds successfully', async () => {
    const spyLog = jest.spyOn( console, 'log' )
    mockLogTweets = jest.fn(logTweets)
    mockLogTweets(feeds)
    expect(mockLogTweets).toHaveBeenLastCalledWith(feeds)
    expect(mockLogTweets).toHaveBeenCalledTimes(1)
    const keys = Object.keys(feeds)

    // if the feed has tweets, we will include it in the final log sum counter
    const logCount = keys.map(key => feeds[key].length > 0 ? 1 : 0)
    const totalTweets = logCount.reduce((sum, current) => sum + current)
    const length = keys.length + totalTweets
    expect(spyLog).toHaveBeenCalledTimes(length)
  }) 
})
