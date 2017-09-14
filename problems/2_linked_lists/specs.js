const { expect } = require('chai')
const { LinkedList, Node } = require('./LinkedList')
const { DoublyLinkedList } = require('./DoublyLinkedList')

describe('Chapter 2: Linked Lists', () => {
  let linkedList;

  beforeEach(() => {
    linkedList = new LinkedList()
  })

  // 2.0 SinglyLinkedList and DoublyLinkedList
  describe('SinglyLinkedList', () => {
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
    let doublyLinkedList;
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
      expect(doublyLinkedList.remove(1).value).to.be.equal(2)
      expect(doublyLinkedList.head.next.value).to.be.equal('third')
      expect(doublyLinkedList.head.next.previous.value).to.be.equal(1)
    })

    it('returns null if remove is called on a position that does not exist', () => {
      doublyLinkedList.addToTail('first')
      doublyLinkedList.addToTail(2)
      doublyLinkedList.addToTail('third')
      expect(doublyLinkedList.remove(3)).to.be.equal(null)
      expect(doublyLinkedList.remove(4)).to.be.equal(null)
    })
  })

  // 2.1
})
