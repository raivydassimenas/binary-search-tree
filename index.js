function Node(value, leftNode = null, rightNode = null) {
  return {
    value,
    leftNode,
    rightNode,
  };
}

function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) {
    return null;
  }
  const mid = parseInt((start + end) / 2);

  const rootNode = Node(arr[mid]);
  rootNode.leftNode = buildTree(arr, start, mid - 1);
  rootNode.rightNode = buildTree(arr, mid + 1, end);

  return rootNode;
}

function BST(arr) {

  let uniqueArr;
  
  if (Array.isArray(arr)) {
    uniqueArr = [...new Set(arr.sort((a, b) => a - b))];
  }

  return {
    root: buildTree(uniqueArr, 0, uniqueArr.length - 1),

    insert: function (value, root = this.root) {
      const insertRec = function (value, node) {
        if (value == node.value) {
          return;
        }
        if (value < node.value) {
          if (!node.leftNode) {
            const currNode = Node(value);
            node.leftNode = currNode;
          } else {
            insertRec(value, node.leftNode);
          }
          return;
        }
        if (value > node.value) {
          if (!node.rightNode) {
            const currNode = Node(value);
            node.rightNode = currNode;
          } else {
            insertRec(value, node.rightNode);
          }
          return;
        }
      };
      insertRec(value, root);
    },

    deleteNode: function (value, root = this.root) {
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

    find: function (value, root = this.root) {
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

    levelOrder: function (callback = null, root = this.root) {
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

      if (callback != null) {
        const arr = visited.map((elem) => callback(elem));
        return arr;
      }
      return visited;
    },

    inorder: function (callback = null, root = this.root) {
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
        return visited.map((elem) => callback(elem));
      }

      return visited;
    },

    preorder: function (callback = null, root = this.root) {
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
        return visited.map((elem) => callback(elem));
      }

      return visited;
    },

    postorder: function (callback = null, root = this.root) {
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
        return visited.map((elem) => callback(elem));
      }

      return visited;
    },

    height: function (node) {
      if (!node || (!node.leftNode && !node.rightNode)) {
        return 0;
      }
      return (
        1 + Math.max(this.height(node.leftNode), this.height(node.rightNode))
      );
    },

    depth: function (node, root = this.root) {
      const depthRec = (root, node) => {
        if (root === null) {
          return -1;
        }

        let dist = -1;

        if (
          root == node ||
          (dist = depthRec(root.leftNode, node)) >= 0 ||
          (dist = depthRec(root.rightNode, node)) >= 0
        ) {
          return dist + 1;
        }

        return dist;
      };

      return depthRec(root, node);
    },

    isBalanced: function (root = this.root) {
      if (root == null) {
        return true;
      }

      if (
        Math.abs(this.height(root.leftNode) - this.height(root.rightNode)) <=
          1 &&
        this.isBalanced(root.leftNode) == true &&
        this.isBalanced(root.rightNode) == true
      ) {
        return true;
      }

      return false;
    },

    rebalance: function () {
      const arrToRebalance = this.inorder();
      arrToRebalance.sort();

      this.root = buildTree(arrToRebalance, 0, arrToRebalance.length - 1);
    },
  };
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null && node.right !== undefined) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null && node.left !== undefined) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let arr = [];

for (let i = 0; i < 32; i++) {
  arr.push(parseInt(Math.random() * 100));
}

let bst = BST(arr);
prettyPrint(bst.root);

console.log("Is balanced? " + bst.isBalanced());

console.log("Elements level order:");
prettyPrint(bst.root);

console.log("Elements preorder:");
console.log(bst.preorder());

console.log("Elements postorder:");
console.log(bst.postorder());

console.log("Elements inorder:");
console.log(bst.inorder());

for (let i = 100; i < 110; i++) {
  bst.insert(i);
}

console.log("Is balanced? " + bst.isBalanced());

bst.rebalance();

console.log("Is balanced? " + bst.isBalanced());

console.log("Elements level order:");
console.log(bst.levelOrder());

console.log("Elements preorder:");
console.log(bst.preorder());

console.log("Elements postorder:");
console.log(bst.postorder());

console.log("Elements inorder:");
console.log(bst.inorder());
