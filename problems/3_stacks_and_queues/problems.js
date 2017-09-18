const { LinkedList } = require('../2_linked_lists/LinkedList')

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
    this.list = new LinkedList()
    this.minVal = null
  }

  push(value) {
    this.list.addToHead(value)
    if (value < this.minVal || this.minVal === null) this.minVal = value
  }

  peek() {
    return this.list.searchNodeAt(0).value
  }

  pop() {
    let returnNode = this.list.remove(0)
    let returnVal = returnNode && returnNode.value
    if (returnVal === this.minVal) this.resetMin()
    return returnVal
  }

  min() {
    return this.minVal
  }

  resetMin() {
    let currentNode = this.list.head
    this.minVal = this.list.head && this.list.head.value
    while (currentNode) {
      if (currentNode.value < this.minVal) this.minVal = currentNode.value
      currentNode = currentNode.next
    }
  }
}

module.exports = {
  ThreeInOne,
  StackMin,
}
