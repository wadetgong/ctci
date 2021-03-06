const { LinkedList } = require('../2_linked_lists/LinkedList')
const Stack = require('./Stack')

// 3.1 ThreeInOne
class ThreeInOne {
  constructor() {
    this.array = []
    this.length1 = 0
    this.length2 = 0
    this.length3 = 0
    this.headLoc1 = 0
    this.headLoc2 = 1
    this.headLoc3 = 2
  }

  push1(value) {
    this.array[this.headLoc1 + 3 * this.length1] = value
    this.length1++
  }
  push2(value) {
    this.array[this.headLoc2 + 3 * this.length2] = value
    this.length2++
  }
  push3(value) {
    this.array[this.headLoc3 + 3 * this.length3] = value
    this.length3++
  }

  pop1() {
    if (!this.length1) return null
    let value = this.array[this.headLoc1]
    this.headLoc1 += 3
    this.length1--
    return value
  }
  pop2() {
    if (!this.length2) return null
    let value = this.array[this.headLoc2]
    this.headLoc2 += 3
    this.length2--
    return value
  }
  pop3() {
    if (!this.length3) return null
    let value = this.array[this.headLoc3]
    this.headLoc3 += 3
    this.length3--
    return value
  }
}

// 3.2 StackMin
class StackMin {
  constructor() {
    this.mainList = new LinkedList()
    this.minList = new LinkedList()
  }

  push(value) {
    this.mainList.addToHead(value)
    if (this.minList.length()) {
      let currentMin = this.minList.head.value
      if (currentMin < value) this.minList.addToHead(currentMin)
      else this.minList.addToHead(value)
    } else {
      this.minList.addToHead(value)
    }
  }

  peek() {
    return this.mainList.searchNodeAt(0).value
  }

  pop() {
    let returnNode = this.mainList.remove(0)
    let returnVal = returnNode && returnNode.value
    this.minList.remove(0)
    return returnVal
  }

  min() {
    return this.minList.head && this.minList.head.value
  }
}

// 3.3 stackOfPlates
class SetOfStacks {
  constructor(stackHeight) {
    this._stackHeight = stackHeight
    this._stackContainer = new Stack()
    this._currentHeight = 0
  }

  push(value) {
    let currentStack = this._stackContainer.peek()
    if (currentStack) {
      if (this._currentHeight >= this._stackHeight) {
        this._insertNewStackAndValue(value)
        this._currentHeight = 1
      } else {
        currentStack.push(value)
        this._currentHeight++
      }
    } else {
      this._insertNewStackAndValue(value)
      this._currentHeight = 1
    }
  }

  pop() {
    let currentStack = this._stackContainer.peek()
    if (currentStack) {
      if (currentStack.peek()) {
        this._currentHeight--
        return currentStack.pop()
      } else {
        this._stackContainer.pop()
        this._currentHeight = this._stackHeight
        return this.pop()
      }
    }
    return null
  }

  peek() {
    let currentStack = this._stackContainer.peek()
    if (currentStack) return currentStack.peek()
    return null
  }

  isEmpty() {
    return this.peek() === null
  }

  _insertNewStackAndValue(value) {
    this._stackContainer.push(new Stack())
    let currentStack = this._stackContainer.peek()
    currentStack.push(value)
  }

  // index of 0 represents the topmost substack; does not remove an empty substack if popAt clears the last element in the substack
  popAt(index) {
    let tempStack = new Stack()
    for (let i = 0; i < index; i++) {
      if (this._stackContainer.peek()) {
        tempStack.push(this._stackContainer.pop())
      } else {
        // Reset this._stackContainer
        while (tempStack.peek()) {
          this._stackContainer.push(tempStack.pop())
        }
        return null
      }
    }

    let returnVal = null
    let currentStack = this._stackContainer.peek()
    if (currentStack && currentStack.peek()) {
      returnVal = currentStack.pop()
    }
    while (tempStack.peek()) {
      this._stackContainer.push(tempStack.pop())
    }
    return returnVal
  }
}

// 3.4 queueViaStacks
class MyQueue {
  constructor() {
    this.inOrderStack = new Stack()
    this.reverseOrderStack = new Stack()
  }

  add(value) {
    if (this.inOrderStack.peek()) {
      this._shiftItems(this.inOrderStack, this.reverseOrderStack)
    }
    this.reverseOrderStack.push(value)
  }

  remove() {
    if (this.reverseOrderStack.peek()) {
      this._shiftItems(this.reverseOrderStack, this.inOrderStack)
    }
    if (this.inOrderStack.peek()) return this.inOrderStack.pop()
    return null
  }

  isEmpty() {
    return this.inOrderStack.peek() === null && this.reverseOrderStack.peek() === null
  }

  peek() {
    if (this.reverseOrderStack.peek()) {
      this._shiftItems(this.reverseOrderStack, this.inOrderStack)
    }
    return this.inOrderStack.peek()
  }

  _shiftItems(stackFrom, stackTo) {
    while (stackFrom.peek()) {
      stackTo.push(stackFrom.pop())
    }
  }
}

// 3.5 sortStack
const resetStack = (mainStack, tempStack, compare) => {
  let currentVal = tempStack.pop()
  let sorted = true
  while (tempStack.peek()) {
    if (compare(currentVal, tempStack.peek())) sorted = false
    mainStack.push(currentVal)
    currentVal = tempStack.pop()
  }
  if (currentVal) {
    mainStack.push(currentVal)
  }
  return sorted
}

const sortStack = (stack, compare = (a, b) => a < b) => {
  let tempStack = new Stack()
  let sorted = false
  let valInHand

  while (!sorted) {
    valInHand = stack.pop()
    while (stack.peek()) {
      if (compare(valInHand, stack.peek())) {
        tempStack.push(valInHand)
        valInHand = stack.pop()
      } else {
        tempStack.push(stack.pop())
      }
    }
    if (valInHand) tempStack.push(valInHand)
    sorted = resetStack(stack, tempStack, compare)
  }
  return stack
}

// 3.6 AnimalShelter
class Animal {
  constructor(type, name) {
    this.type = type
    this.name = name
  }
}

class AnimalShelter {
  constructor(validAnimals) {
    this.validAnimals = validAnimals
    this.list = new LinkedList()
  }

  enqueue(animal) {
    if (!this.validAnimals[animal.type] || !(animal instanceof Animal)) {
      throw new TypeError('Invalid animal type :(')
    }
    this.list.addToTail(animal)
  }

  dequeueAny() {
    let removeNode = this.list.remove(0)
    return removeNode && removeNode.value
  }

  dequeueDog() {
    return this.dequeueNext('dog')
  }

  dequeueCat() {
    return this.dequeueNext('cat')
  }

  dequeueNext(animalType) {
    let i = 0
    let currentAnimalNode = this.list.head
    while (currentAnimalNode) {
      if (currentAnimalNode.value.type === animalType) {
        return this.list.remove(i).value
      } else {
        i++
        currentAnimalNode = currentAnimalNode.next
      }
    }
    return null
  }
}

module.exports = {
  ThreeInOne,
  StackMin,
  SetOfStacks,
  MyQueue,
  sortStack,
  AnimalShelter,
  Animal,
}
