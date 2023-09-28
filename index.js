const BST = (arr) => {
  return {
    root: buildTree(arr, 0, arr.length - 1),
    buildTree: (arr, start, end) => {
      if (start > end) {
        return null;
      }
      const mid = Math.floor((start + end) / 2);

      rootNode = Node(arr[mid]);
      rootNode.setLeft(buildTree(arr, start, mid - 1));
      rootNode.setRight(buildTree(arr, mid + 1, end));

      return rootNode;
    },
    insert: (value) => {
      insertRec(value, root);
    },
    insertRec: (value, node) => {
      if (value == node.value) {
        return;
      }
      if (value < node.value) {
        if (!node.leftNode) {
          const currNode = Node(value);
          node.setLeft(currNode);
        } else {
          insertRec(value, node.leftNode);
        }
        return;
      }
      if (value > node.value) {
        if (!node.rightNode) {
          const currNode = Node(value);
          node.setRight(currNode);
        } else {
          insertRec(value, node.rightNode);
        }
        return;
      }
    },
    // deleteNode is taken from GeeksForGeeks.org
    deleteNode: (value, root) => {
      if (!root) {
        return root;
      }
      if (root.value > value) {
        root.leftNode = deleteNode(value, root.leftNode);
        return root;
      } else if (root.value < value) {
        root.rightNode = deleteNode(value, root.rightNode);
        return root;
      }

      if (!root.leftNode) {
        let temp = root.rightNode;
        delete root;
        return temp;
      } else if (!root.rightNode) {
        let temp = root.leftNode;
        delete root;
        return temp;
      } else {
        let succParent = root;

        let succ = root.rightNode;
        while (!succ.leftNode) {
          succParent = succ;
          succ = succ.leftNode;
        }

        if (succParent !== root) {
          succParent.leftNode = succ.rightNode;
        } else {
          succParent.rightNode = succ.rightNode;
        }

        root.value = succ.value;

        delete succ;
        return root;
      }
    },
    find: (value) => {
      const findRec = (value, root) => {
        if (!root) {
          return null;
        } else if (root.value === value) {
          return root;
        } else if (root.value < value) {
          return findRec(value, root.rightNode);
        } else if (root.value > value) {
          return findRec(value, root.leftNode);
        }
      };
      return findRec(value, root);
    },
    levelOrder: (callback = null) => {
      let discovered = [];
      let visited = [];

      if (root) {
        discovered.push(root);

        while (discovered.length !== 0) {
          const currNode = discovered.shift();
          if (currNode.leftNode) {
            discovered.push(currNode.leftNode);
          }
          if (currNode.rightNode) {
            discovered.push(currNode.rightNode);
          }
          visited.push(currNode);
        }
      }

      if (callback) {
        const arr = visited.map(elem => callback(elem));
        return arr;
      }
      return visited;
    },
    inorder: (callback = null) => {
      if (!root) {
        return;
      }

      let visited = [];

      const inorderRec = (node) => {
        if (!node) {
          return;
        }
        inorderRec(node.leftNode);
        visited.push(node);
        inorderRec(node.rightNode);
      };

      inorderRec(root);

      if (callback) {
        return visited.map(elem => callback(elem));
      }

      return visited;
    },
    preorder: (callback = null) => {
      if (!root) {
        return;
      }

      let visited = [];

      const preorderRec = (node) => {
        if (!node) {
          return;
        }
        visited.push(node);
        preorderRec(node.leftNode);
        preorderRec(node.rightNode);
      };

      preorderRec(root);

      if (callback) {
        return visited.map(elem => callback(elem));
      }

      return visited;
    },
    postorder: (callback = null) => {
      if (!root) {
        return;
      }

      let visited = [];

      const postorderRec = (node) => {
        if (!node) {
          return;
        }
        postorderRec(node.leftNode);
        postorderRec(node.rightNode);
        visited.push(node);
      };

      postorderRec(root);

      if (callback) {
        return visited.map(elem => callback(elem));
      }

      return visited;
    },
    height: (node) => {
      if (!node || (!node.leftNode && !node.rightNode)) {
        return 0;
      }
      return 1 + Math.max(height(node.leftNode), height(node.rightNode));
    },
    depth: (node) => {
      const depthRec = (root, node) => {
        if (root === null) {
          return -1;
        }

        let dist = -1;

        if (root == node || (dist = depthRec(root.leftNode, node)) >= 0 || (dist = depthRec(root.rightNode, node)) >= 0) {
          return dist + 1;
        }

        return dist;
      };

      return depthRec(root, node);
    },
    isBalanced: (root) => {
      if (root == null) {
        return true;
      }

      if (Math.abs(root.height(root.leftNode) - root.height(root.rightNode)) <= 1 && isBalanced(root.leftNode) == true && isBalanced(root.rightNode) == true) {
        return true;
      }

      return false;
    },
  };
}


const Node = (value = null) => {
  return {
    value,
    leftNode: null,
    rightNode: null,
    setLeft: (node) => {
      leftNode = node;
    },
    setRight: (node) => {
        rightNode = node;
    }
  }
}
