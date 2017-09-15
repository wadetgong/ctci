LinkedList = require('./LinkedList')
// 2.1 removeDups
/*
const removeDups = linkedList => {
  const valueHash = {}
  let pos = 0
  let currentNode = linkedList.head

  while (currentNode) {
    if (valueHash[currentNode.value]) {
      linkedList.remove(pos)
      pos--
    }
    valueHash[currentNode.value] = true
    pos++
    //Even if this node is the one that got removed, it still points to the correct next Node. Since no references point to the removed Node, it will get garbage collected.
    currentNode = currentNode.next
  }
  return linkedList
}
*/

//No temporary buffer solution
const removeDups = linkedList => {
  for (let i = 0; i < linkedList.length(); i++) {
    for (let j = i + 1; j < linkedList.length(); j++) {
      let currentNode = linkedList.searchNodeAt(i)
      if (currentNode.value === linkedList.searchNodeAt(j).value) {
        linkedList.remove(j)
        j--
      }
    }
  }
  return linkedList
}

// 2.2 kthToLast
const kthToLast = (linkedList, k) => {
  let length = linkedList.length()
  if (k >= length || k < 0 || !Number.isInteger(k)) return null
  return linkedList.searchNodeAt(length - 1 - k)
}

// 2.3 deleteMiddleNode
const deleteMiddleNode = (middleNode) => {
  //Node must be a middle Node
  if (!middleNode.next) return null //Can't check if middle Node is this.head
  middleNode.value = middleNode.next.value
  middleNode.next = middleNode.next.next
}

// 2.4 partition
const partition = (linkedList, pivot) => {
  let length = linkedList.length()
  let pos = 0
  let changes = 0
  // let currentNode
  while (changes !== length) {
    let currentNode = linkedList.searchNodeAt(pos)
    if (currentNode.value > pivot) {
      linkedList.addToTail(linkedList.remove(pos).value)
    } else if (currentNode.value < pivot) {
      linkedList.addToHead(linkedList.remove(pos).value)
      pos += 1
    } else {
      pos += 1
    }
    changes++
  }
  return linkedList
}

module.exports = {
  removeDups,
  kthToLast,
  deleteMiddleNode,
  partition,
}

