const { expect } = require('chai')
const { GraphNode, Graph } = require('./Graph')
const BinarySearchTree = require('./BinarySearchTree')
const BinaryTree = require('./BinaryTree')
const { LinkedList } = require('../2_linked_lists/LinkedList')
const {
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
} = require('./problems')

describe('Chapter 4: Trees and Graphs -', () => {
  // 4.0 BinarySearchTree
  describe('BinarySearchTree', () => {
    let bst
    beforeEach(() => {
      bst = new BinarySearchTree(10)
      bst.insert(8)
      bst.insert(15)
      bst.insert(12)
      bst.insert(9)
      bst.insert(20)
    })

    it('inserts values correctly', () => {
      expect(bst.right.value).to.be.equal(15)
      expect(bst.left.value).to.be.equal(8)
      expect(bst.left.right.value).to.be.equal(9)
      expect(bst.right.left.value).to.be.equal(12)
      expect(bst.right.right.value).to.be.equal(20)
    })

    it('measures depth correctly', () => {
      bst = new BinarySearchTree(10)
      expect(bst.depth()).to.be.equal(1)
      bst.insert(15)
      expect(bst.depth()).to.be.equal(2)
      bst.insert(8)
      expect(bst.depth()).to.be.equal(2)
      bst.insert(20)
      expect(bst.depth()).to.be.equal(3)
      bst.insert(25)
      expect(bst.depth()).to.be.equal(4)
    })

    it('returns the correct minimum value', () => {
      expect(bst.min()).to.be.equal(8)
    })

    it('returns the correct maximum value', () => {
      expect(bst.max()).to.be.equal(20)
    })
  })

  // 4.1 routeBetweenNodes
  describe('routeBetweenNodes', () => {
    let graph, node1, node2, node3, node4, node5, node6, node7, node8
    beforeEach(() => {
      node1 = new GraphNode('1')
      node2 = new GraphNode('2')
      node3 = new GraphNode('3')
      node4 = new GraphNode('4')
      node5 = new GraphNode('5')
      node6 = new GraphNode('6')
      node7 = new GraphNode('7')
      node8 = new GraphNode('8')
      node1.add(node2, node3)
      node2.add(node1, node4)
      node4.add(node5, node6)
      node5.add(node1)
      node7.add(node8)
      graph = new Graph(node1, node2, node3, node4, node5, node6, node7, node8)
    })

    it('returns true if there exists a route between node A and node B', () => {
      expect(routeBetweenNodes(node1, node6)).to.be.equal(true)
      expect(routeBetweenNodes(node5, node4)).to.be.equal(true)
      expect(routeBetweenNodes(node7, node8)).to.be.equal(true)
    })

    it('returns false if there does not exist a route between node A and node B', () => {
      expect(routeBetweenNodes(node3, node6)).to.be.equal(false)
      expect(routeBetweenNodes(node6, node2)).to.be.equal(false)
      expect(routeBetweenNodes(node7, node1)).to.be.equal(false)
    })

    it('is able to check for cyclical routes', () => {
      expect(routeBetweenNodes(node3, node3)).to.be.equal(false)
      expect(routeBetweenNodes(node5, node5)).to.be.equal(true)
    })
  })

  // 4.2 minimalTree
  describe('minimalTree', () => {
    it('returns a BST with the minimal depth', () => {
      let arr = [1, 2, 3, 4, 5]
      let bst = minimalTree(arr)
      expect(bst.depth()).to.be.equal(3)
      arr = [1, 5, 12, 20, 40, 55, 100, 120]
      bst = minimalTree(arr)
      expect(bst.depth()).to.be.equal(4)
      arr = [1]
      bst = minimalTree(arr)
      expect(bst.depth()).to.be.equal(1)
    })
  })

  //4.3 listOfDepths
  describe('listOfDepths', () => {
    let node1, node2, node3, node4, node5, depthList
    beforeEach(() => {
      node1 = new BinaryTree(1)
      node2 = new BinaryTree(2)
      node3 = new BinaryTree(3)
      node4 = new BinaryTree(4)
      node5 = new BinaryTree(5)
      node1.left = node2
      node1.right = node3
      node3.right = node4
      node4.right = node5
      depthList = listOfDepths(node1)
    })

    it('returns a LinkedList of length n, where n is the depth of the binary tree', () => {
      expect(depthList).to.be.an.instanceof(LinkedList)
      expect(depthList.length()).to.be.equal(4)
    })

    it('assigns nodes to their respective LinkedList by depth', () => {
      expect(depthList.head.value.search(node1)).to.be.equal(true)
      expect(depthList.head.value.length()).to.be.equal(1)
      expect(depthList.head.value.search(node2)).to.be.equal(false)
      expect(depthList.head.next.value.search(node2)).to.be.equal(true)
      expect(depthList.head.next.value.search(node3)).to.be.equal(true)
      expect(depthList.head.next.value.length()).to.be.equal(2)
      expect(depthList.head.next.next.value.search(node4)).to.be.equal(true)
      expect(depthList.head.next.next.value.length()).to.be.equal(1)
      expect(depthList.head.next.next.next.value.search(node5)).to.be.equal(true)
      expect(depthList.head.next.next.next.value.length()).to.be.equal(1)
    })
  })

  // 4.4 checkBalanced
  describe('checkBalanced', () => {
    let node1, node2, node3, node4, node5, node6, node7, node8
    beforeEach(() => {
      node1 = new BinaryTree(1)
      node2 = new BinaryTree(2)
      node3 = new BinaryTree(3)
      node4 = new BinaryTree(4)
      node5 = new BinaryTree(5)
      node6 = new BinaryTree(6)
      node7 = new BinaryTree(7)
      node8 = new BinaryTree(8)
    })

    it('returns returns true for a tree that is balanced', () => {
      node1.left = node2
      node1.right = node3
      node2.left = node4
      node2.right = node5
      node3.left = node6
      node3.right = node7
      expect(checkBalanced(node1)).to.be.equal(true)
      node4.left = node8
      expect(checkBalanced(node1)).to.be.equal(true)
    })

    it('returns returns false for a tree that is not balanced', () => {
      node1.left = node2
      node1.right = node3
      node2.left = node4
      node2.right = node5
      expect(checkBalanced(node1)).to.be.equal(true)
      node4.left = node6
      expect(checkBalanced(node1)).to.be.equal(false)
      node3.right = node7
      expect(checkBalanced(node1)).to.be.equal(true)
    })
  })

  // 4.5 validateBST
  describe('validateBST', () => {
    let node1, node2, node3, node4, node5, node6, node7, node8
    beforeEach(() => {
      node1 = new BinaryTree(1)
      node2 = new BinaryTree(2)
      node3 = new BinaryTree(3)
      node4 = new BinaryTree(4)
      node5 = new BinaryTree(5)
      node6 = new BinaryTree(6)
      node7 = new BinaryTree(7)
      node8 = new BinaryTree(8)
    })

    it('returns true if a binary tree is a binary search tree', () => {
      node5.left = node3
      node5.right = node7
      node3.left = node2
      node3.right = node4
      node2.left = node1
      node7.left = node6
      node7.right = node8
      expect(validateBST(node5)).to.be.equal(true)
      expect(validateBST(node3)).to.be.equal(true)
      expect(validateBST(node7)).to.be.equal(true)
    })

    it('returns true if a binary tree is a binary search tree, even if unbalanced', () => {
      node7.left = node4
      node7.right = node8
      node4.left = node3
      node4.right = node5
      node3.left = node2
      node2.left = node1
      node5.right = node6
      expect(validateBST(node7)).to.be.equal(true)
      expect(validateBST(node4)).to.be.equal(true)
      expect(validateBST(node3)).to.be.equal(true)
    })

    it('returns false if a binary tree is not a binary search tree', () => {
      node7.left = node4
      node7.right = node8
      node4.left = node3
      node4.right = node5
      node3.left = node2
      node2.right = node1
      node5.right = node6
      expect(validateBST(node7)).to.be.equal(true)
      expect(validateBST(node4)).to.be.equal(true)
      expect(validateBST(node3)).to.be.equal(true)
    })
  })

  // 4.6 successor
  describe('successor', () => {
    let node1, node2, node3, node4, node5, node6, node7, node8, node9, node10, node11, node12, node13, node14
    beforeEach(() => {
      node1 = new BinarySearchTree(1)
      node2 = new BinarySearchTree(2)
      node3 = new BinarySearchTree(3)
      node4 = new BinarySearchTree(4)
      node5 = new BinarySearchTree(5)
      node6 = new BinarySearchTree(6)
      node7 = new BinarySearchTree(7)
      node8 = new BinarySearchTree(8)
      node9 = new BinarySearchTree(9)
      node10 = new BinarySearchTree(10)
      node11 = new BinarySearchTree(11)
      node12 = new BinarySearchTree(12)
      node13 = new BinarySearchTree(13)
      node14 = new BinarySearchTree(14)
      node8.left = node4
      node8.right = node12
      node4.parent = node8
      node12.parent = node8
      node4.left = node2
      node4.right = node6
      node2.parent = node4
      node6.parent = node4
      node2.left = node1
      node2.right = node3
      node1.parent = node2
      node3.parent = node2
      node6.left = node5
      node6.right = node7
      node5.parent = node6
      node7.parent = node6
      node12.left = node10
      node12.right = node14
      node10.parent = node12
      node14.parent = node12
      node14.left = node13
      node13.parent = node14
      node10.left = node9
      node10.right = node11
      node9.parent = node10
      node11.parent = node10
    })

    it('returns the next in-order node in a binary search tree', () => {
      expect(successor(node1, node8)).to.be.equal(node2)
      expect(successor(node2, node8)).to.be.equal(node3)
      expect(successor(node3, node8)).to.be.equal(node4)
      expect(successor(node4, node8)).to.be.equal(node5)
      expect(successor(node5, node8)).to.be.equal(node6)
      expect(successor(node6, node8)).to.be.equal(node7)
      expect(successor(node7, node8)).to.be.equal(node8)
      expect(successor(node8, node8)).to.be.equal(node9)
      expect(successor(node9, node8)).to.be.equal(node10)
      expect(successor(node10, node8)).to.be.equal(node11)
      expect(successor(node11, node8)).to.be.equal(node12)
      expect(successor(node12, node8)).to.be.equal(node13)
      expect(successor(node13, node8)).to.be.equal(node14)
    })

    it('returns null if there is not a valid next node', () => {
      expect(successor(node14, node8)).to.be.equal(null)
    })
  })

  // 4.7 buildOrder
  describe('buildOrder', () => {
    it('returns a valid build order given a list of projects and dependencies, if one exists', () => {
      let projects = ['a', 'b', 'c', 'd', 'e', 'f']
      let dependencies = [
        ['a', 'd'],
        ['f', 'b'],
        ['b', 'd'],
        ['f', 'a'],
        ['d', 'c'],
      ]
      let build = buildOrder(projects, dependencies)
      expect(build).to.be.an.instanceof(Array)
      expect(build.indexOf('a')).to.be.below(build.indexOf('d'))
      expect(build.indexOf('f')).to.be.below(build.indexOf('b'))
      expect(build.indexOf('b')).to.be.below(build.indexOf('d'))
      expect(build.indexOf('f')).to.be.below(build.indexOf('a'))
      expect(build.indexOf('d')).to.be.below(build.indexOf('c'))
    })

    it('returns null if a given list of projects and dependencies cannot lead to a valid build order', () => {
      let projects = ['a', 'b', 'c', 'd']
      let dependencies = [
        ['a', 'b'],
        ['b', 'c'],
        ['c', 'd'],
        ['d', 'a'],
      ]
      expect(buildOrder(projects, dependencies)).to.be.equal(null)
    })
  })

  // 4.8 firstCommonAncestor
  describe('firstCommonAncestor', () => {
    let node1, node2, node3, node4, node5, node6, node7
    beforeEach(() => {
      node1 = new BinaryTree(1)
      node2 = new BinaryTree(2)
      node3 = new BinaryTree(3)
      node4 = new BinaryTree(4)
      node5 = new BinaryTree(5)
      node6 = new BinaryTree(6)
      node7 = new BinaryTree(7)
      node1.left = node2
      node1.right = node3
      node2.left = node4
      node2.right = node5
      node3.left = node6
      node3.right = node7
    })

    it('returns the first common ancestor of two nodes in a binary tree', () => {
      expect(firstCommonAncestor(node6, node7, node1)).to.be.equal(node3)
      expect(firstCommonAncestor(node2, node7, node1)).to.be.equal(node1)
      expect(firstCommonAncestor(node3, node7, node1)).to.be.equal(node3)
      expect(firstCommonAncestor(node2, node4, node1)).to.be.equal(node2)
      expect(firstCommonAncestor(node5, node4, node1)).to.be.equal(node2)
    })
  })

  // 4.9 bstSequences
  describe('bstSequences', () => {
    let node0, node1, node2, node3, node4
    it('provides an array of arrays of valid insert seqeuences to produce the given binary search tree', () => {
      node0 = new BinarySearchTree(0)
      node1 = new BinarySearchTree(1)
      node2 = new BinarySearchTree(2)
      node3 = new BinarySearchTree(3)
      node4 = new BinarySearchTree(4)
      node5 = new BinarySearchTree(5)
      node2.left = node1
      node2.right = node3
      expect(bstSequences(node2)).to.be.an.instanceof(Array)
      expect(bstSequences(node2).length).to.be.equal(2)
      node3.right = node4
      node1.left = node0
      expect(bstSequences(node2).length).to.be.equal(6)
      node4.right = node5
      expect(bstSequences(node2).length).to.be.equal(10)
    })
  })

  // 4.10 checkSubtree
  describe('checkSubtree', () => {
    let node1, node2, node3, node4, node5, node6, node7, node8, node9, node10, node11, node12, node13, node14, node15
    beforeEach(() => {
      node1 = new BinarySearchTree(1)
      node2 = new BinarySearchTree(2)
      node3 = new BinarySearchTree(3)
      node4 = new BinarySearchTree(4)
      node5 = new BinarySearchTree(5)
      node6 = new BinarySearchTree(6)
      node7 = new BinarySearchTree(7)
      node8 = new BinarySearchTree(8)
      node9 = new BinarySearchTree(9)
      node10 = new BinarySearchTree(10)
      node11 = new BinarySearchTree(11)
      node12 = new BinarySearchTree(12)
      node13 = new BinarySearchTree(13)
      node14 = new BinarySearchTree(14)
      node15 = new BinarySearchTree(15)
      node8.left = node4
      node8.right = node12
      node4.left = node2
      node4.right = node6
      node2.left = node1
      node2.right = node3
      node6.left = node5
      node6.right = node7
      node12.left = node10
      node12.right = node14
      node10.left = node9
      node10.right = node11
      node14.left = node13
      node14.right = node15
    })

    it('returns true if parentBST contains childBST as a subtree', () => {
      expect(checkSubtree(node8, node1)).to.be.equal(true)
      expect(checkSubtree(node8, node2)).to.be.equal(true)
      expect(checkSubtree(node8, node3)).to.be.equal(true)
      expect(checkSubtree(node8, node4)).to.be.equal(true)
      expect(checkSubtree(node8, node5)).to.be.equal(true)
      expect(checkSubtree(node8, node6)).to.be.equal(true)
      expect(checkSubtree(node8, node7)).to.be.equal(true)
      expect(checkSubtree(node8, node9)).to.be.equal(true)
      expect(checkSubtree(node8, node10)).to.be.equal(true)
      expect(checkSubtree(node8, node11)).to.be.equal(true)
      expect(checkSubtree(node8, node12)).to.be.equal(true)
      expect(checkSubtree(node8, node13)).to.be.equal(true)
      expect(checkSubtree(node8, node14)).to.be.equal(true)
    })

    it('returns false if parentBST contains childBST as a subtree', () => {
      let nodeB1 = new BinarySearchTree(2)
      let nodeB2 = new BinarySearchTree(4)
      let nodeB3 = new BinarySearchTree(6)
      let nodeB4 = new BinarySearchTree(8)
      let nodeB5 = new BinarySearchTree(10)
      let nodeB6 = new BinarySearchTree(12)
      let nodeB7 = new BinarySearchTree(14)
      nodeB4.left = nodeB2
      nodeB4.right = nodeB6
      nodeB2.left = nodeB1
      nodeB2.right = nodeB3
      nodeB6.left = nodeB5
      nodeB6.right = nodeB7
      expect(checkSubtree(node8, nodeB1)).to.be.equal(false)
      expect(checkSubtree(node8, nodeB2)).to.be.equal(false)
      expect(checkSubtree(node8, nodeB3)).to.be.equal(false)
      expect(checkSubtree(node8, nodeB4)).to.be.equal(false)
    })

    it('returns checks subtrees by node values as opposed to node references', () => {
      let nodeB1 = new BinarySearchTree(9)
      let nodeB2 = new BinarySearchTree(10)
      let nodeB3 = new BinarySearchTree(11)
      let nodeB4 = new BinarySearchTree(4)
      let nodeB5 = new BinarySearchTree(6)
      let nodeB6 = new BinarySearchTree(8)
      nodeB2.left = nodeB1
      nodeB2.right = nodeB3
      expect(checkSubtree(node8, nodeB1)).to.be.equal(true)
      nodeB5.left = nodeB4
      nodeB5.right = nodeB6
      expect(checkSubtree(node8, nodeB5)).to.be.equal(false)
    })
  })
})
