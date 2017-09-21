const { expect } = require('chai')
const { Stack } = require('./Stack')
const {
  ThreeInOne,
  StackMin,
  SetOfStacks,
  MyQueue,
  sortStack,
} = require('./problems')


describe('Chapter 3: Stacks and Queues', () => {
  // 3.0 Stack
  describe('Stack', () => {
    let stack
    beforeEach(() => {
      stack = new Stack()
    })

    it('implements isEmpty correctly', () => {
      expect(stack.isEmpty()).to.be.equal(true)
      stack.stack.addToHead('first')
      expect(stack.isEmpty()).to.be.equal(false)
    })

    it('adds elements to the stack via push', () => {
      stack.push(1)
      stack.push(2)
      stack.push(3)
      expect(stack.peek()).to.be.equal(3)
    })

    it('pushes and pops elements in a first in last out pattern', () => {
      stack.push(1)
      stack.push(2)
      stack.push(3)
      expect(stack.stack.head.value).to.be.equal(3)
      expect(stack.pop()).to.be.equal(3)
      expect(stack.pop()).to.be.equal(2)
      expect(stack.pop()).to.be.equal(1)
    })

    it('returns the value of the top of the stack (if one exists)', () => {
      stack.push(1)
      expect(stack.peek()).to.be.equal(1)
      stack.push(2)
      stack.push(3)
      expect(stack.peek()).to.be.equal(3)
    })

    it('returns null if pop or peek is called on an empty stack', () => {
      expect(stack.peek()).to.be.equal(null)
      expect(stack.pop()).to.be.equal(null)
    })
  })

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
  // Tests don't evaluate runtime complexity, only behavior
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

    it('returns null if pop is called on an empty stack', () => {
      stackMin.push(1)
      stackMin.push(2)
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

    it('returns null if min is called on an empty stack', () => {
      stackMin.push(3)
      expect(stackMin.pop()).to.be.equal(3)
      expect(stackMin.min()).to.be.equal(null)
    })
  })

  // 3.3 stackOfPlates
  describe('stackOfPlates', () => {
    let plateStack
    beforeEach(() => {
      plateStack = new SetOfStacks(4)
    })

    it('is comprised of a stack of stacks under the hood', () => {
      plateStack.push(1)
      plateStack.push(2)
      plateStack.push(3)
      plateStack.push(4)
      plateStack.push(5)
      expect(plateStack._stackContainer.peek()).to.be.an.instanceOf(Stack)
    })

    it('pushes elements onto new substacks when the current stack is exhausted', () => {
      plateStack.push(1)
      plateStack.push(2)
      plateStack.push(3)
      plateStack.push(4)
      plateStack.push(5)
      expect(plateStack._stackContainer.peek().peek()).to.be.equal(5)
    })

    it('pops elements from their respective substacks correctly', () => {
      plateStack.push(1)
      plateStack.push(2)
      plateStack.push(3)
      plateStack.push(4)
      plateStack.push(5)
      expect(plateStack.pop()).to.be.equal(5)
      expect(plateStack.pop()).to.be.equal(4)
      expect(plateStack.pop()).to.be.equal(3)
      expect(plateStack.pop()).to.be.equal(2)
    })

    it('returns null if pop or peek is called when empty', () => {
      plateStack.push(1)
      plateStack.push(2)
      plateStack.push(3)
      plateStack.push(4)
      plateStack.push(5)
      plateStack.pop()
      plateStack.pop()
      plateStack.pop()
      plateStack.pop()
      plateStack.pop()
      expect(plateStack.pop()).to.be.equal(null)
      expect(plateStack.peek()).to.be.equal(null)
      expect(plateStack._stackContainer.peek()).to.be.equal(null)
    })

    it('removes and returns the topmost element on a specific substack when popAt is called', () => {
      plateStack.push(1)
      plateStack.push(2)
      plateStack.push(3)
      plateStack.push(4)
      plateStack.push(5)
      plateStack.push(6)
      plateStack.push(7)
      plateStack.push(8)
      plateStack.push(9)
      expect(plateStack.popAt(1)).to.be.equal(8)
      expect(plateStack.popAt(1)).to.be.equal(7)
      expect(plateStack.popAt(2)).to.be.equal(4)
      expect(plateStack.popAt(1)).to.be.equal(6)
      expect(plateStack.popAt(1)).to.be.equal(5)
      expect(plateStack.popAt(2)).to.be.equal(3)
      expect(plateStack.popAt(0)).to.be.equal(9)
      expect(plateStack.popAt(1)).to.be.equal(null)
    })
  })

  // 3.4 queueViaStacks
  // Tests don't evaluate implementation, only behavior
  describe('queueViaStacks', () => {
    let myQueue
    beforeEach(() => {
      myQueue = new MyQueue()
    })

    it('adds and removes elements to the MyQueue in first in first out order', () => {
      myQueue.add(1)
      myQueue.add(2)
      myQueue.add(3)
      expect(myQueue.remove()).to.be.equal(1)
      expect(myQueue.remove()).to.be.equal(2)
      expect(myQueue.remove()).to.be.equal(3)
    })

    it('returns null if remove is called on an empty MyQueue', () => {
      expect(myQueue.remove()).to.be.equal(null)
    })

    it('returns true if isEmpty is called on an empty MyQueue', () => {
      expect(myQueue.isEmpty()).to.be.equal(true)
      myQueue.add(1)
      expect(myQueue.isEmpty()).to.be.equal(false)
    })

    it('returns the first element if peek is called on a non-empty MyQueue', () => {
      myQueue.add('first')
      myQueue.add('second')
      myQueue.add('third')
      expect(myQueue.peek()).to.be.equal('first')
      myQueue.remove()
      expect(myQueue.peek()).to.be.equal('second')
    })

    it('returns null if peek is called on an empty MyQueue', () => {
      expect(myQueue.peek()).to.be.equal(null)
    })
  })

  // 3.5 sortStack
  describe('sortStack', () => {
    let stack
    beforeEach(() => {
      stack = new Stack()
    })

    it('sorts a stack with smallest value on top', () => {
      stack.push(1)
      stack.push(2)
      stack.push(5)
      stack.push(3)
      stack.push(4)
      let sortedStack = sortStack(stack)
      expect(sortedStack.peek()).to.be.equal(1)
      sortedStack.pop()
      expect(sortedStack.peek()).to.be.equal(2)
      sortedStack.pop()
      expect(sortedStack.peek()).to.be.equal(3)
      sortedStack.pop()
      expect(sortedStack.peek()).to.be.equal(4)
      sortedStack.pop()
      expect(sortedStack.peek()).to.be.equal(5)
      expect(sortedStack.peek()).to.be.equal(null)
    })
  })


})
