function LinkedList() {
  this.head = null
}

function Node(value, next) {
  this.value = value
  this.next = next || null
}

LinkedList.prototype.length = function() {
  let currentNode = this.head
  let length = 0
  while (currentNode) {
    length++
    currentNode = currentNode.next
  }
  return length
}

LinkedList.prototype.addToHead = function(value) {
  let newHead = new Node(value, this.head)
  this.head = newHead
}

LinkedList.prototype.addToTail = function(value) {
  let newTail = new Node(value)
  let currentNode = this.head
  if (this.head) {
    while (currentNode.next) {
      currentNode = currentNode.next
    }
    currentNode.next = newTail
  } else {
    this.head = newTail
  }

}

LinkedList.prototype.searchNodeAt = function(position) {
  let currentNode = this.head
  for (let i = 0; i < position; i++) {
    if (currentNode) currentNode = currentNode.next
    else return null
  }
  return currentNode
}

LinkedList.prototype.search = function(value) {
  let currentNode = this.head
  while (currentNode) {
    if (currentNode.value === value) return true
    currentNode = currentNode.next
  }
  return false
}

LinkedList.prototype.remove = function(position) {
  let currentNode = this.head
  for (let i = 0; i < position - 1; i++) {
    if (currentNode) currentNode = currentNode.next
    else return null
  }
  let removedNode = currentNode && currentNode.next
  if (removedNode) {
    currentNode.next = currentNode.next.next
    return removedNode
  }
  return null
}

module.exports = { LinkedList, Node }
