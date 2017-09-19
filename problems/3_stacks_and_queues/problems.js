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

module.exports = {
  ThreeInOne,
  StackMin,
}
