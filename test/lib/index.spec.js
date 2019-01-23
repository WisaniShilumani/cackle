const { processTweets } = require('../../src/lib')

describe('tweet processer', () => {
  it('should process tweets successfully', async () => {
    const spyError = jest.spyOn( console, 'error' )
    try {
      await processTweets()
      expect(spyError).not.toHaveBeenCalled()
    } catch (err) {
      expect(true).toBe(false)
    }
  }) 
})
