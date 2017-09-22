class GraphNode {
  constructor(value) {
    this.value = value
    this.children = []
  }
  add(graphNode) {
    this.children.push(graphNode)
  }
}
