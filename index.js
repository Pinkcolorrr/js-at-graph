class Edge {
  node;
  weight;

  constructor(node, weight) {
    this.node = node;
    this.weight = weight;
  }
}

class Node {
  value;
  edges;
  parents;

  constructor(value, edges = [], parents = []) {
    this.value = value;
    this.edges = edges;
    this.parents = parents;
  }
}

class Graph {
  nodes;

  constructor(input) {
    this.nodes = {};
    this.createGraph(input);
  }

  #addOrGetNode(value) {
    if (!value) {
      return null;
    }

    if (this.nodes[value]) {
      return this.nodes[value];
    }

    const node = new Node(value);
    this.nodes[value] = node;

    return node;
  }

  get(value) {
    return this.nodes[value] ?? null;
  }

  createGraph(dataInput) {
    if (!dataInput?.length) {
      return this.nodes;
    }

    dataInput.forEach((data) => {
      const node = this.#addOrGetNode(data[0]);
      const childNode = this.#addOrGetNode(data[1]);

      if (childNode) {
        node.edges.push(new Edge(childNode, data[2]));
        childNode.parents.push(node);
      }
    });

    return this.nodes;
  }

  DFSWrap() {
    let passed = [];

    for (let key in this.nodes) {
      const node = this.nodes[key];
      if (!passed.find((n) => n === node)) {
        const passedByNode = this.DFS(node);
        passed = passed.concat(passedByNode);
      }
    }

    return passed;
  }

  DFS(node, passed = []) {
    passed.push(node);

    node.edges.forEach((edge) => {
      if (!passed.find((n) => n === edge.node)) {
        this.DFS(edge.node, passed);
      }
    });

    return passed;
  }
}

const input = [
  [1, 2, 0],
  [1, 3, 0],
  [2, 4, 0],
  [3, 5, 0],
  [8, 9, 0],
];

const graph = new Graph(input);

console.log(graph.DFSWrap());
