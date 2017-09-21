const { LinkedList } = require('../2_linked_lists/LinkedList')

class Queue {
  constructor() {
    this.list = new LinkedList()
  }

  add(value) {
    this.list.addToTail(value)
  }

  remove() {
    let removeVal = this.list.remove(0)
    return removeVal && removeVal.value
  }

  peek() {
    let peekVal = this.list.head
    return peekVal && peekVal.value
  }

  isEmpty() {
    return this.list.length() === 0
  }
}

module.exports = Queue
