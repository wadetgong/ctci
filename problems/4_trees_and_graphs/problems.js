const BinarySearchTree = require('./BinarySearchTree')
const { LinkedList } = require('../2_linked_lists/LinkedList')

// 4.1 routeBetweenNodes
const routeBetweenNodes = (nodeA, nodeB) => {
  let visited = new Map()
  let visitQueue = [nodeA]
  let currentNode

  while (visitQueue.length) {
    currentNode = visitQueue.shift()
    if (currentNode === nodeB) return true
    if (!visited.get(currentNode)) {
      visited.set(currentNode, true)
      currentNode.children.forEach(childNode => {
        if (!visited.get(childNode)) visitQueue.push(childNode)
      })
    }
  }
  return false
}

// 4.2 minimalTree
const splitArr = sortedArr => {
  let middleIndex = Math.floor(sortedArr.length / 2)
  let middleVal = sortedArr[middleIndex]
  let leftVals = sortedArr.slice(0, middleIndex)
  let rightVals = sortedArr.slice(middleIndex + 1)
  return [leftVals, middleVal, rightVals]
}

const minimalTree = sortedArr => {
  if (!sortedArr.length) return null

  let [leftVals, middleVal, rightVals] = splitArr(sortedArr)
  let bst = new BinarySearchTree(middleVal)


  bst.left = minimalTree(leftVals)
  bst.right = minimalTree(rightVals)
  return bst
}

// 4.3 listOfDepths
const buildDepthList = (bst, linkedList, depth) => {
  if (bst) {
    if (!linkedList.searchNodeAt(depth)) {
      linkedList.addToTail(new LinkedList())
    }
    let depthList = linkedList.searchNodeAt(depth).value
    depthList.addToTail(bst)
    if (bst.left) buildDepthList(bst.left, linkedList, depth + 1)
    if (bst.right) buildDepthList(bst.right, linkedList, depth + 1)
  }
  return linkedList
}

const listOfDepths = (bst) => {
  let depthLinkedList = new LinkedList()
  return buildDepthList(bst, depthLinkedList, 0)
}

// 4.4 checkBalanced
const checkBalanced = bst => {

}

module.exports = {
  routeBetweenNodes,
  minimalTree,
  listOfDepths,
  checkBalanced,
}
