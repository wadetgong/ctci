const BinaryTree = require('./BinaryTree')

class BinarySearchTree extends BinaryTree {
  insert(value) {
    if (value < this.value) {
      if (this.left) return this.left.insert(value)
      else this.left = new BinarySearchTree(value)
    } else {
      if (this.right) return this.right.insert(value)
      else this.right = new BinarySearchTree(value)
    }
  }

  min() {
    if (this.left) return this.left.min()
    else return this.value
  }

  max() {
    if (this.right) return this.right.max()
    else return this.value
  }
}

module.exports = BinarySearchTree
