class BinaryTree {
  constructor(value, left, right) {
    this.value = value
    this.left = left || null
    this.right = right || null
  }

  depth() {
    if (!this.left && !this.right) return 1
    let leftDepth = (this.left && this.left.depth()) || 0
    let rightDepth = (this.right && this.right.depth()) || 0
    return 1 + Math.max(leftDepth, rightDepth)
  }
}

module.exports = BinaryTree
