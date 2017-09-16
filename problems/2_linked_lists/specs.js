const { expect } = require('chai')
const { LinkedList, Node } = require('./LinkedList')
const { DoublyLinkedList } = require('./DoublyLinkedList')
const {
  removeDups,
  kthToLast,
  deleteMiddleNode,
  partition,
  sumListsReverse,
  sumListsInOrder,
  palindrome,
  intersection,
  loopDetection,
} = require('./problems')

describe('Chapter 2: Linked Lists', () => {

  // 2.0 SinglyLinkedList and DoublyLinkedList
  describe('SinglyLinkedList', () => {
    let linkedList
    beforeEach(() => {
      linkedList = new LinkedList()
    })

    it('correctly calculates length', () => {
      const node3 = new Node('third')
      const node2 = new Node('secont', node3)
      const node1 = new Node('first', node2)
      linkedList.head = node1
      expect(linkedList.length()).to.be.equal(3)
    })

    it('correctly adds to head', () => {
      linkedList.addToHead('second')
      linkedList.addToHead('first')
      expect(linkedList.length()).to.be.equal(2)
      expect(linkedList.head.value).to.be.equal('first')
    })

    it('correctly adds to tail', () => {
      linkedList.addToTail('first')
      linkedList.addToTail('second')
      expect(linkedList.length()).to.be.equal(2)
      expect(linkedList.head.value).to.be.equal('first')
    })

    it('correctly finds a node at a given position when calling searchNodeAt', () => {
      linkedList.addToTail('first')
      linkedList.addToTail('second')
      linkedList.addToTail('third')
      expect(linkedList.searchNodeAt(0).value).to.be.equal('first')
      expect(linkedList.searchNodeAt(1).value).to.be.equal('second')
      expect(linkedList.searchNodeAt(2).value).to.be.equal('third')
    })

    it('returns null if the position does not exist when calling searchNodeAt', () => {
      linkedList.addToTail('first')
      linkedList.addToTail('second')
      expect(linkedList.searchNodeAt(2)).to.be.equal(null)
      expect(linkedList.searchNodeAt(3)).to.be.equal(null)
    })

    it('returns true if search is called with a matching node', () => {
      linkedList.addToTail('first')
      linkedList.addToTail(2)
      linkedList.addToTail('third')
      linkedList.addToTail(4)
      expect(linkedList.search(2)).to.be.equal(true)
      expect(linkedList.search('third')).to.be.equal(true)
    })

    it('returns false if search is called with no matching nodes', () => {
      linkedList.addToTail('first')
      linkedList.addToTail(2)
      linkedList.addToTail('third')
      linkedList.addToTail(4)
      expect(linkedList.search(1)).to.be.equal(false)
      expect(linkedList.search('second')).to.be.equal(false)
    })

    it('removes nodes from LinkedList correctly', () => {
      linkedList.addToTail('first')
      linkedList.addToTail(2)
      linkedList.addToTail('third')
      linkedList.addToTail(4)
      expect(linkedList.remove(0).value).to.be.equal('first')
      expect(linkedList.length()).to.be.equal(3)
      linkedList.addToHead('first')
      expect(linkedList.remove(2).value).to.be.equal('third')
      expect(linkedList.searchNodeAt(2).value).to.be.equal(4)
    })

    it('returns null if remove is called on a position that does not exist', () => {
      linkedList.addToTail('first')
      linkedList.addToTail(2)
      linkedList.addToTail('third')
      expect(linkedList.remove(3)).to.be.equal(null)
      expect(linkedList.remove(4)).to.be.equal(null)
    })
  })

  describe('DoublyLinkedList', () => {
    let doublyLinkedList
    beforeEach(() => {
      doublyLinkedList = new DoublyLinkedList()
    })

    it('correctly adds to head', () => {
      doublyLinkedList.addToHead(2)
      doublyLinkedList.addToHead(1)
      expect(doublyLinkedList.head.value).to.be.equal(1)
      expect(doublyLinkedList.head.next.value).to.be.equal(2)
      expect(doublyLinkedList.head.next.previous.value).to.be.equal(1)
    })

    it('correctly adds to tail', () => {
      doublyLinkedList.addToTail(1)
      doublyLinkedList.addToTail(2)
      expect(doublyLinkedList.tail.value).to.be.equal(2)
      expect(doublyLinkedList.tail.previous.value).to.be.equal(1)
      expect(doublyLinkedList.tail.previous.next.value).to.be.equal(2)
    })

    it('correctly inherits length from LinkedList', () => {
      doublyLinkedList.addToTail(2)
      expect(doublyLinkedList.length()).to.be.equal(1)
      doublyLinkedList.addToTail(3)
      expect(doublyLinkedList.length()).to.be.equal(2)
      doublyLinkedList.addToHead(1)
      expect(doublyLinkedList.length()).to.be.equal(3)
    })

    it('correctly inherits searchNodeAt from LinkedList', () => {
      doublyLinkedList.addToTail(2)
      doublyLinkedList.addToTail(3)
      doublyLinkedList.addToHead(1)
      expect(doublyLinkedList.searchNodeAt(1).value).to.be.equal(2)
      expect(doublyLinkedList.searchNodeAt(2).value).to.be.equal(3)
      expect(doublyLinkedList.searchNodeAt(3)).to.be.equal(null)
      expect(doublyLinkedList.searchNodeAt(4)).to.be.equal(null)
    })

    it('correctly inherits search from LinkedList', () => {
      doublyLinkedList.addToTail(2)
      doublyLinkedList.addToTail(3)
      doublyLinkedList.addToHead(1)
      doublyLinkedList.addToTail('fourth')
      expect(doublyLinkedList.search(2)).to.be.equal(true)
      expect(doublyLinkedList.search('fourth')).to.be.equal(true)
      expect(doublyLinkedList.search(5)).to.be.equal(false)
    })

    it('removes Nodes from DoublyLinkedList correctly', () => {
      doublyLinkedList.addToTail(2)
      doublyLinkedList.addToHead(1)
      doublyLinkedList.addToTail('third')
      expect(doublyLinkedList.remove(0).value).to.be.equal(1)
      doublyLinkedList.addToHead(1)
      expect(doublyLinkedList.remove(1).value).to.be.equal(2)
      expect(doublyLinkedList.head.next.value).to.be.equal('third')
      expect(doublyLinkedList.head.next.previous.value).to.be.equal(1)
      expect(doublyLinkedList.length()).to.be.equal(2)
    })

    it('returns null if remove is called on a position that does not exist', () => {
      doublyLinkedList.addToTail('first')
      doublyLinkedList.addToTail(2)
      doublyLinkedList.addToTail('third')
      expect(doublyLinkedList.remove(3)).to.be.equal(null)
      expect(doublyLinkedList.remove(4)).to.be.equal(null)
    })
  })

  // 2.1 removeDups
  describe('removeDups', () => {
    let linkedList
    beforeEach(() => {
      linkedList = new LinkedList()
    })

    it('removes duplicates from a LinkedList', () => {
      linkedList.addToHead('1')
      linkedList.addToHead('2')
      linkedList.addToTail('3')
      linkedList.addToHead('1')
      linkedList.addToHead('1')
      linkedList.addToTail('3')
      expect(removeDups(linkedList).length()).to.be.equal(3)
      linkedList.addToTail('4')
      linkedList.addToTail('4')
      expect(removeDups(linkedList).length()).to.be.equal(4)
    })

    it('leaves a LinkedList with no duplicates unchanged', () => {
      linkedList.addToHead('1')
      linkedList.addToTail('2')
      linkedList.addToTail('3')
      linkedList.addToTail('4')
      expect(removeDups(linkedList).length()).to.be.equal(4)
    })
  })

  // 2.2 kthToLast
  describe('kthToLast', () => {
    let linkedList
    beforeEach(() => {
      linkedList = new LinkedList()
    })

    it('returns the kth to last Node in a singly LinkedList', () => {
      linkedList.addToTail(1)
      linkedList.addToTail(2)
      linkedList.addToTail(3)
      linkedList.addToTail(4)
      linkedList.addToTail(5)
      expect(kthToLast(linkedList, 0).value).to.be.equal(5)
      expect(kthToLast(linkedList, 1).value).to.be.equal(4)
      expect(kthToLast(linkedList, 2).value).to.be.equal(3)
    })

    it('returns null for an invalid value of k', () => {
      linkedList.addToTail(1)
      linkedList.addToTail(2)
      linkedList.addToTail(3)
      expect(kthToLast(linkedList, 3)).to.be.equal(null)
      expect(kthToLast(linkedList, 4)).to.be.equal(null)
      expect(kthToLast(linkedList, -1)).to.be.equal(null)
      expect(kthToLast(linkedList, 0.5)).to.be.equal(null)
    })
  })

  // 2.3 deleteMiddleNode
  describe('deleteMiddleNode', () => {
    let linkedList
    beforeEach(() => {
      linkedList = new LinkedList()
    })

    it('removes a middle Node in a LinkedList', () => {
      linkedList.addToHead(1)
      linkedList.addToTail(2)
      linkedList.addToTail(3)
      linkedList.addToTail(4)
      deleteMiddleNode(linkedList.head.next.next)
      expect(linkedList.length()).to.be.equal(3)
      expect(linkedList.head.next.next.value).to.be.equal(4)
      deleteMiddleNode(linkedList.head.next)
      expect(linkedList.length()).to.be.equal(2)
      expect(linkedList.head.next.value).to.be.equal(4)
    })

    it('returns null if Node is the tail of the LinkedList', () => {
      linkedList.addToHead(1)
      linkedList.addToTail(2)
      linkedList.addToTail(3)
      linkedList.addToTail(4)
      expect(deleteMiddleNode(linkedList.head.next.next.next)).to.be.equal(null)
      expect(linkedList.length()).to.be.equal(4)
      expect(linkedList.head.next.next.value).to.be.equal(3)
    })
  })

  // 2.4 partition
  describe('partition', () => {
    let linkedList
    beforeEach(() => {
      linkedList = new LinkedList()
    })

    it('rearranges a LinkList around a partition value found in LinkedList', () => {
      linkedList.addToTail(4)
      linkedList.addToTail(3)
      linkedList.addToTail(2)
      linkedList.addToTail(1)
      let updatedLinkedList = partition(linkedList, 2)
      expect(updatedLinkedList.head.value).to.be.deep.equal(1)
      expect(updatedLinkedList.head.next.value).to.be.deep.equal(2)
      expect(updatedLinkedList.head.next.next.value).to.be.deep.equal(4)
      expect(updatedLinkedList.head.next.next.next.value).to.be.deep.equal(3)
    })

    it('rearranges a LinkList around a partition value not found in LinkedList', () => {
      linkedList.addToTail(5)
      linkedList.addToTail(6)
      linkedList.addToTail(4)
      linkedList.addToTail(2)
      linkedList.addToTail(1)
      let updatedLinkedList = partition(linkedList, 3)
      expect(updatedLinkedList.head.value).to.be.deep.equal(1)
      expect(updatedLinkedList.head.next.value).to.be.deep.equal(2)
      expect(updatedLinkedList.head.next.next.value).to.be.deep.equal(5)
      expect(updatedLinkedList.head.next.next.next.value).to.be.deep.equal(6)
      expect(updatedLinkedList.head.next.next.next.next.value).to.be.deep.equal(4)
    })
  })

  // 2.5 sumListsReverse
  describe('sumListsReverse', () => {
    let linkedList1, linkedList2
    beforeEach(() => {
      linkedList1 = new LinkedList()
      linkedList2 = new LinkedList()
    })

    it('adds up 2 LinkedLists correctly', () => {
      linkedList1.addToTail(7)
      linkedList1.addToTail(1)
      linkedList1.addToTail(6)
      linkedList2.addToTail(5)
      linkedList2.addToTail(9)
      linkedList2.addToTail(2)
      let resultLinkedList = sumListsReverse(linkedList1, linkedList2)
      expect(resultLinkedList).to.be.an.instanceOf(LinkedList)
      expect(resultLinkedList.length()).to.be.equal(3)
      expect(resultLinkedList.head.value).to.be.equal(2)
      expect(resultLinkedList.head.next.value).to.be.equal(1)
      expect(resultLinkedList.head.next.next.value).to.be.equal(9)

    })

    it('correctly accounts for any potential carry', () => {
      linkedList1.addToTail(5)
      linkedList1.addToTail(6)
      linkedList1.addToTail(7)
      linkedList2.addToTail(3)
      linkedList2.addToTail(7)
      linkedList2.addToTail(8)
      let resultLinkedList = sumListsReverse(linkedList1, linkedList2)
      expect(resultLinkedList.length()).to.be.equal(4)
      expect(resultLinkedList.head.value).to.be.equal(8)
      expect(resultLinkedList.head.next.value).to.be.equal(3)
      expect(resultLinkedList.head.next.next.value).to.be.equal(6)
      expect(resultLinkedList.head.next.next.next.value).to.be.equal(1)
    })

    it('correctly adds 2 LinkedLists with different lengths', () => {
      linkedList1.addToTail(5)
      linkedList1.addToTail(6)
      linkedList2.addToTail(3)
      linkedList2.addToTail(7)
      linkedList2.addToTail(8)
      linkedList2.addToTail(1)
      let resultLinkedList = sumListsReverse(linkedList1, linkedList2)
      expect(resultLinkedList.length()).to.be.equal(4)
      expect(resultLinkedList.head.value).to.be.equal(8)
      expect(resultLinkedList.head.next.value).to.be.equal(3)
      expect(resultLinkedList.head.next.next.value).to.be.equal(9)
      expect(resultLinkedList.head.next.next.next.value).to.be.equal(1)
    })
  })

  describe('sumListsInOrder', () => {
    let linkedList1, linkedList2
    beforeEach(() => {
      linkedList1 = new LinkedList()
      linkedList2 = new LinkedList()
    })

    it('adds up 2 LinkedLists correctly', () => {
      linkedList1.addToHead(7)
      linkedList1.addToHead(1)
      linkedList1.addToHead(6)
      linkedList2.addToHead(5)
      linkedList2.addToHead(9)
      linkedList2.addToHead(2)
      let resultLinkedList = sumListsInOrder(linkedList1, linkedList2)
      expect(resultLinkedList).to.be.an.instanceOf(LinkedList)
      expect(resultLinkedList.length()).to.be.equal(3)
      expect(resultLinkedList.head.value).to.be.equal(9)
      expect(resultLinkedList.head.next.value).to.be.equal(1)
      expect(resultLinkedList.head.next.next.value).to.be.equal(2)
    })

    it('correctly accounts for any potential carry', () => {
      linkedList1.addToHead(5)
      linkedList1.addToHead(6)
      linkedList1.addToHead(7)
      linkedList2.addToHead(3)
      linkedList2.addToHead(7)
      linkedList2.addToHead(8)
      let resultLinkedList = sumListsInOrder(linkedList1, linkedList2)
      expect(resultLinkedList.length()).to.be.equal(4)
      expect(resultLinkedList.head.value).to.be.equal(1)
      expect(resultLinkedList.head.next.value).to.be.equal(6)
      expect(resultLinkedList.head.next.next.value).to.be.equal(3)
      expect(resultLinkedList.head.next.next.next.value).to.be.equal(8)
    })

    it('correctly adds 2 LinkedLists with different lengths', () => {
      linkedList1.addToHead(5)
      linkedList1.addToHead(6)
      linkedList2.addToHead(3)
      linkedList2.addToHead(7)
      linkedList2.addToHead(8)
      linkedList2.addToHead(1)
      let resultLinkedList = sumListsInOrder(linkedList1, linkedList2)
      expect(resultLinkedList.length()).to.be.equal(4)
      expect(resultLinkedList.head.value).to.be.equal(1)
      expect(resultLinkedList.head.next.value).to.be.equal(9)
      expect(resultLinkedList.head.next.next.value).to.be.equal(3)
      expect(resultLinkedList.head.next.next.next.value).to.be.equal(8)
    })
  })

  // 2.6 palindrome
  describe('palindrome', () => {
    let linkedList
    beforeEach(() => {
      linkedList = new LinkedList()
    })

    it('returns true if a LinkedList represents a palindrome', () => {
      linkedList.addToHead(5)
      linkedList.addToHead(6)
      linkedList.addToHead(3)
      linkedList.addToHead(6)
      linkedList.addToHead(5)
      expect(palindrome(linkedList)).to.be.equal(true)
    })

    it('returns false if a LinkedList does not represent a palindrome', () => {
      linkedList.addToHead(5)
      linkedList.addToHead(6)
      linkedList.addToHead(3)
      linkedList.addToHead(2)
      linkedList.addToHead(6)
      linkedList.addToHead(5)
      expect(palindrome(linkedList)).to.be.equal(false)
    })

    it('returns true for empty LinkedList', () => {
      expect(palindrome(linkedList)).to.be.equal(true)
    })
  })

  // 2.7 intersection
  describe('intersection', () => {
    let linkedList1, linkedList2
    beforeEach(() => {
      linkedList1 = new LinkedList()
      linkedList2 = new LinkedList()
    })

    it('returns the intersecting node for 2 intersecting LinkedLists', () => {
      linkedList1.addToTail(1)
      linkedList1.addToTail(2)
      linkedList1.addToTail(3)
      linkedList2.addToTail(1)
      linkedList2.addToTail(2)
      linkedList2.addToTail(3)
      let intersect = new Node(4)
      linkedList1.head.next.next.next = intersect
      linkedList2.head.next.next.next = intersect
      linkedList1.addToTail(5)
      linkedList1.addToTail(6)
      expect(linkedList1.length()).to.be.equal(6)
      expect(linkedList2.length()).to.be.equal(6)
      expect(intersection(linkedList1, linkedList2)).to.be.equal(true)
    })

    it('returns false for 2 LinkedLists that don\'t intersect', () => {
      linkedList1.addToTail(1)
      linkedList1.addToTail(2)
      linkedList1.addToTail(3)
      linkedList2.addToTail(1)
      linkedList2.addToTail(2)
      linkedList2.addToTail(3)
      expect(intersection(linkedList1, linkedList2)).to.be.equal(false)

    })
  })

  // 2.7 loopDetection
  describe('loopDetection', () => {
    let linkedList
    beforeEach(() => {
      linkedList = new LinkedList()
    })

    it('returns the node at the start of the circular LinkedList loop', () => {
      linkedList.addToTail(1)
      linkedList.addToTail(2)
      linkedList.addToTail(3)
      let loopNode = new Node(4)
      linkedList.head.next.next.next = loopNode
      linkedList.addToTail(5)
      linkedList.addToTail(6)
      linkedList.addToTail(4)
      linkedList.addToTail(8)
      linkedList.head.next.next.next.next.next.next.next.next = loopNode
      expect(loopDetection(linkedList)).to.be.equal(loopNode)
    })

    it('returns null if the LinkedList is not circular', () => {
      linkedList.addToTail(1)
      linkedList.addToTail(2)
      linkedList.addToTail(3)
      linkedList.addToTail(4)
      linkedList.addToTail(5)
      linkedList.addToTail(6)
      expect(loopDetection(linkedList)).to.be.equal(null)
    })
    it('returns null if the LinkedList is not circular', () => {
      linkedList.addToTail(1)
      expect(loopDetection(linkedList)).to.be.equal(null)
    })
  })
})
