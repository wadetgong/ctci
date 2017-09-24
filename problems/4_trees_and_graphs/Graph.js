class Graph {
  constructor(...nodesArr) {
    this.nodesArr = nodesArr
  }
}

class GraphNode {
  constructor(value) {
    this.value = value
    this.children = []
  }
  add(...nodes) {
    this.children = [...this.children, ...nodes]
  }
}

module.exports = { Graph, GraphNode }
