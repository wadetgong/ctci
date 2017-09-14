const { LinkedList, Node } = require('./LinkedList')

class DoublyLinkedList extends LinkedList {
  constructor() {
    super()
    this.tail = null
  }

  addToHead(value) {
    if (this.head) {
      const newHead = new DoublyLinkedNode(value, this.head)
      this.head.previous = newHead
      this.head = newHead
    } else {
      this.head = this.tail = new DoublyLinkedNode(value)
    }
  }

  addToTail(value) {
    if (this.tail) {
      const newTail = new DoublyLinkedNode(value, null, this.tail)
      this.tail.next = newTail
      this.tail = newTail
    } else {
      this.tail = this.head = new DoublyLinkedNode(value)
    }
  }

  remove(position) {
    let currentNode = this.head
    for (let i = 0; i < position - 1; i++) {
      if (currentNode) currentNode = currentNode.next
      else return null
    }
    let removedNode = currentNode && currentNode.next
    if (removedNode) {
      let nextNode = currentNode.next.next
      currentNode.next = nextNode
      if (nextNode) nextNode.previous = currentNode
      return removedNode
    }
    return null
  }
}

class DoublyLinkedNode extends Node {
  constructor(value, next, previous) {
    super(value, next)
    this.previous = previous || null
  }

}

module.exports = { DoublyLinkedList, DoublyLinkedNode}
