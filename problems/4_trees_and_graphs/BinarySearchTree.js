class BinarySearchTree {
  constructor(value, left, right) {
    this.value = value
    this.left = left || null
    this.right = right || null
  }

  insert(value) {
    if (value < this.value) {
      if (this.left) return this.left.insert(value)
      else this.left = new BinarySearchTree(value)
    } else {
      if (this.right) return this.right.insert(value)
      else this.right = new BinarySearchTree(value)
    }
  }

  depth() {
    if (!this.left && !this.right) return 1
    let leftDepth = (this.left && this.left.depth()) || 0
    let rightDepth = (this.right && this.right.depth()) || 0
    return 1 + Math.max(leftDepth, rightDepth)
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
