const { expect } = require('chai')
const {
  threeInOne
} = require('./problems')


describe('Chapter 3: Stacks and Queues', () => {

  // 3.1 threeInOne
  describe('threeInOne', () => {
    let threeStack
    beforeEach(() => {
      threeStack = new threeInOne()
    })

    it('implements three stacks in one data structure', () => {
      threeStack.push1(1)
      threeStack.push2(2)
      threeStack.push3(3)
      threeStack.push1(2)
      threeStack.push2(3)
      threeStack.push3(4)
      expect(threeStack.pop1()).to.be.equal(1)
      expect(threeStack.pop2()).to.be.equal(2)
      expect(threeStack.pop3()).to.be.equal(3)
      expect(threeStack.pop1()).to.be.equal(2)
    })

    it('returns null for when popping any of the 3 stacks in threeStack', () => {
      threeStack.push1(1)
      threeStack.push2(2)
      threeStack.push3(3)
      threeStack.pop1()
      threeStack.pop2()
      threeStack.pop3()
      expect(threeStack.pop1()).to.be.equal(null)
      expect(threeStack.pop2()).to.be.equal(null)
      expect(threeStack.pop3()).to.be.equal(null)
    })
  })

})
