const { expect } = require('chai')
const {
  ThreeInOne,
  StackMin,
} = require('./problems')


describe('Chapter 3: Stacks and Queues', () => {

  // 3.1 threeInOne
  describe('ThreeInOne', () => {
    let threeStack
    beforeEach(() => {
      threeStack = new ThreeInOne()
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

  // 3.2 stackMin
  describe('StackMin', () => {
    let stackMin
    beforeEach(() => {
      stackMin = new StackMin()
    })

    it('implements push in O(1) time', () => {
      stackMin.push(1)
      stackMin.push(2)
      stackMin.push(3)
      expect(stackMin.peek()).to.be.equal(3)
    })

    it('implements pop in O(1) time', () => {
      stackMin.push(1)
      stackMin.push(2)
      stackMin.push(3)
      expect(stackMin.pop()).to.be.equal(3)
      expect(stackMin.pop()).to.be.equal(2)
      expect(stackMin.pop()).to.be.equal(1)
      expect(stackMin.pop()).to.be.equal(null)

    })

    it('implements min in O(1) time', () => {
      stackMin.push(3)
      stackMin.push(4)
      stackMin.push(2)
      stackMin.push(1)
      stackMin.push(3)
      expect(stackMin.min()).to.be.equal(1)
      stackMin.pop()
      stackMin.pop()
      expect(stackMin.min()).to.be.equal(2)
      stackMin.pop()
      expect(stackMin.min()).to.be.equal(3)



    })
  })

})
