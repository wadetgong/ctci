const { expect } = require('chai')
const {
  insertion,
} = require('./problems')

describe('Chapter 5: Bit Manipulation -', () => {
  describe('insertion', () => {
    it('inserts bits M into bits N starting at bit j and ending at bit i', () => {
      let N = 10000000000
      let M = 10011
      let i = 2
      let j = 6
      expect(insertion(N, M, i, j)).to.be.equal(10001001100)
      i = 1
      j = 5
      expect(insertion(N, M, i, j)).to.be.equal(10000100110)
    })

    it('overwrites bit locations in N with the respective M values', () => {
      let N = 11111111111
      let M = 10011
      let i = 2
      let j = 6
      expect(insertion(N, M, i, j)).to.be.equal(11111001111)
    })
  })
})
