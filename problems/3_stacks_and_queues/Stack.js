const { LinkedList } = require('../2_linked_lists/LinkedList')

class Stack {
  constructor() {
    this.stack = new LinkedList()
  }

  push(value) {
    this.stack.addToHead(value)
  }

  pop() {
    if (this.stack.head) return this.stack.remove(0).value
    return null
  }

  peek() {
    return this.stack.head && this.stack.head.value
  }

  isEmpty() {
    return this.peek() === null
  }
}

module.exports = Stack
