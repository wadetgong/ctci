const BinarySearchTree = require('./BinarySearchTree')
const { LinkedList } = require('../2_linked_lists/LinkedList')
const { Graph, GraphNode } = require('./Graph')

// 4.1 routeBetweenNodes
const routeBetweenNodes = (nodeA, nodeB) => {
  let visited = new Map()
  let visitQueue = [...nodeA.children]
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
  if (!bst) return true
  let leftDepth = bst.left && bst.left.depth() || 0
  let rightDepth = bst.right && bst.right.depth() || 0
  return Math.abs(leftDepth - rightDepth) < 2 && checkBalanced(bst.left) && checkBalanced(bst.right)
}

// 4.5 validateBST
const validateBST = binaryTree => {
  if (!binaryTree) return true
  let leftVal = binaryTree.left && binaryTree.left.value
  let rightVal = binaryTree.right && binaryTree.right.value
  let nodeVal = binaryTree.value
  let leftChildCheck = leftVal && leftVal < nodeVal || true
  let rightChildCheck = rightVal && rightVal > nodeVal || true
  return leftChildCheck
    && rightChildCheck
    && validateBST(binaryTree.left)
    && validateBST(binaryTree.right)
}

// 4.6 successor
const successor = node => {
  let currentNode = node
  if (node.right) {
    currentNode = node.right
    while (currentNode.left) currentNode = currentNode.left
    return currentNode
  }
  else {
    currentNode = currentNode.parent
    while (currentNode) {
      if (currentNode.value >= node.value) return currentNode
      currentNode = currentNode.parent
    }
    return null
  }
}

// 4.7 buildOrder
const makeBuild = (node, buildArr) => {
  if (!node.children.length) {
    if (!buildArr.includes(node.value)) {
      buildArr.push(node.value)
    }
  } else {
    for (let child of node.children) {
      makeBuild(child, buildArr)
      if (!buildArr.includes(node.value)) {
        buildArr.push(node.value)
      }
    }
  }
  return buildArr
}

const buildOrder = (projects, dependencies) => {
  let nodeHash = {}
  projects.forEach(project => nodeHash[project] = new GraphNode(project))
  dependencies.forEach(([dependee, depender]) => nodeHash[depender].add(nodeHash[dependee]))
  for (let key in nodeHash) {
    if (routeBetweenNodes(nodeHash[key], nodeHash[key])) return null
  }

  let build = []
  for (let child in nodeHash) {
    makeBuild(nodeHash[child], build)
  }
  return build
}

// 4.8 firstCommonAncestor
const contains = (parentNode, childNode) => {
  if (!parentNode) return false
  if (parentNode === childNode) return true
  let leftSearch = parentNode.left && contains(parentNode.left, childNode) || false
  let rightSearch = parentNode.right && contains(parentNode.right, childNode) || false
  return leftSearch || rightSearch
}

const firstCommonAncestor = (node1, node2, rootNode) => {
  let currentNode = rootNode
  let leftContains = contains(currentNode.left, node1) && contains(currentNode.left, node2)
  let rightContains = contains(currentNode.right, node1) && contains(currentNode.right, node2)
  while (leftContains || rightContains) {
    if (leftContains) currentNode = currentNode.left
    else currentNode = currentNode.right
    leftContains = contains(currentNode.left, node1) && contains(currentNode.left, node2)
    rightContains = contains(currentNode.right, node1) && contains(currentNode.right, node2)
  }
  return currentNode
}

// 4.9 bstSequences
const bstSequences = (bst, arrPerms = [], nextChildren = []) => {
  if (!arrPerms.length) {
    arrPerms.push([bst.value])
  } else {
    arrPerms = arrPerms.map(perm => [...perm, bst.value])
  }
  if (bst.left) nextChildren.push(bst.left)
  if (bst.right) nextChildren.push(bst.right)

  if (!nextChildren.length) return arrPerms

  let subTrees = []
  for (let i = 0; i < nextChildren.length; i++) {
    let newChildren = [...nextChildren.slice(0, i), ...nextChildren.slice(i + 1)]
    subTrees = [...subTrees, ...bstSequences(nextChildren[i], arrPerms, newChildren)]
  }
  return subTrees
}

// 4.10 checkSubtree
const compareTree = (bst1, bst2) => {
  let bst1Val = bst1 && bst1.value
  let bst2Val = bst2 && bst2.value
  if (bst1Val !== bst2Val) return false
  if (!bst1 && !bst2) return true

  return compareTree(bst1.left, bst2.left) && compareTree(bst1.right, bst2.right)
}

const checkSubtree = (bst1, bst2) => {
  if (!bst1) return false
  if (compareTree(bst1, bst2)) return true
  return checkSubtree(bst1.left, bst2) || checkSubtree(bst1.right, bst2)
}


// 4.11 randomNode
const randomNode = bst => {
  let queue = [bst]
  let currentNode
  let nodeArr = []
  while (queue.length) {
    currentNode = queue.shift()
    nodeArr.push(currentNode)
    if (currentNode.left) queue.push(currentNode.left)
    if (currentNode.right) queue.push(currentNode.right)
  }
  return nodeArr[Math.floor(nodeArr.length * Math.random())]

}

module.exports = {
  routeBetweenNodes,
  minimalTree,
  listOfDepths,
  checkBalanced,
  validateBST,
  successor,
  buildOrder,
  firstCommonAncestor,
  bstSequences,
  checkSubtree,
  randomNode,
}
