const { LinkedList } = require('./LinkedList')
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

// 2.5 sumLists
const sumListsReverse = (linkedList1, linkedList2) => {
  let sumList = new LinkedList()
  let currentNode1 = linkedList1.head
  let currentNode2 = linkedList2.head
  let carry = 0
  let digitSum = 0

  while (currentNode1 || currentNode2) {
    digitSum = ((currentNode1 && currentNode1.value) || 0)
      + ((currentNode2 && currentNode2.value) || 0)
      + carry
    carry = digitSum >= 10 ? 1 : 0
    digitSum = digitSum % 10
    sumList.addToTail(digitSum)
    currentNode1 = currentNode1 && currentNode1.next
    currentNode2 = currentNode2 && currentNode2.next
  }
  if (carry > 0) sumList.addToTail(carry)
  return sumList
}

const getIntFromLL = linkedList => {
  let exp = linkedList.length() - 1
  let currentNode = linkedList.head
  let returnVal = 0
  while (currentNode) {
    returnVal += currentNode.value * 10 ** exp
    exp--
    currentNode = currentNode.next
  }
  return returnVal
}

const sumListsInOrder = (linkedList1, linkedList2) => {
  let number1 = getIntFromLL(linkedList1)
  let number2 = getIntFromLL(linkedList2)
  let targetNum = (number1 + number2).toString()
  let sumList = new LinkedList()
  for (let i = 0; i < targetNum.length; i++) {
    sumList.addToTail(parseInt(targetNum[i], 10))
  }

  return sumList
}

// 2.6 palindrome
const palindrome = linkedList => {
  let compareLL = new LinkedList()
  let currentNode = linkedList.head
  while (currentNode) {
    compareLL.addToHead(currentNode.value)
    currentNode = currentNode.next
  }
  currentNode = linkedList.head
  let compareNode = compareLL.head

  while (currentNode) {
    if (currentNode.value !== compareNode.value) return false
    currentNode = currentNode.next
    compareNode = compareNode.next
  }
  return true
}

// 2.7 intersection
const intersection = (linkedList1, linkedList2) => {
  let currentNode1 = linkedList1.head
  let currentNode2 = linkedList2.head
  while (currentNode1.next) currentNode1 = currentNode1.next
  while (currentNode2.next) currentNode2 = currentNode2.next
  return currentNode1 === currentNode2
}

// 2.8 loopDetection
const findIndex = (circularLinkedList, node) => {
  currentNode = circularLinkedList.head
  let index = 0
  while (currentNode) {
    if (currentNode === node) return index
    index++
    currentNode = currentNode.next
  }
  return -1
}

const loopDetection = circularLinkedList => {
  let currentNode = circularLinkedList.head
  while (currentNode) {
    let indexCurrent = findIndex(circularLinkedList, currentNode)
    let indexNext = findIndex(circularLinkedList, currentNode.next)
    if (indexCurrent > indexNext) return currentNode.next
    currentNode = currentNode.next
  }
  return null
}

module.exports = {
  removeDups,
  kthToLast,
  deleteMiddleNode,
  partition,
  sumListsReverse,
  sumListsInOrder,
  palindrome,
  intersection,
  loopDetection,
}

