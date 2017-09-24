const { expect } = require('chai')
const { GraphNode, Graph } = require('./Graph')
const BinarySearchTree = require('./BinarySearchTree')
const {
  routeBetweenNodes,
  minimalTree,
  listOfDepths,
} = require('./problems')

describe('Chapter 4: Trees and Graphs - ', () => {
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

  })
})
