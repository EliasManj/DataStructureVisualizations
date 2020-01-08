
class BinarySearchTree {

    constructor(diagram) {
        this.nodeDataArray = [];
        this.diagram = diagram;
        this.diagram.model = new go.TreeModel(this.nodeDataArray);
        this.model = diagram.model;
        this.root = null;
    }

    sample() {
        this.insert(75);
        this.insert(60);
        this.insert(80);
        this.insert(85);
        this.insert(77);
        this.insert(70);
        this.insert(65);
        this.insert(71);
        this.insert(25);
        this.insert(20);
        this.insert(21);
        this.insert(19);
        this.insert(26);
    }

    insert(data) {
        if (!this.nodeDataArray.find(x => x.key == data)) {
            var newNode = { key: data, fill: go.Brush.randomColor() };
            this.insertNode(newNode);
        }
    }

    insertNode(node) {
        var current = this.root;
        if (this.nodeDataArray.length == 0) {
            this.root = node;
            this.model.addNodeData(node);
        } else {
            while (true) {
                if (node.key > current.key) {
                    if (current.rightChild == null) {
                        this.setRightChild(current, node);
                        this.model.addNodeData(node);
                        return;
                    } else {
                        current = this.getRightChild(current);
                    }
                } else {
                    if (current.leftChild == null) {
                        this.setLeftChild(current, node);
                        this.model.addNodeData(node);
                        return;
                    } else {
                        current = this.getLeftChild(current);
                    }
                }
            }
        }
    }

    remove(data) {
        if (this.nodeDataArray.find(x => x.key == data)) {
            this.root.key = this.deleteRec(this.root, data).key;
            return true;
        }
        return false;
    }

    deleteRec(node, key) {
        var leftChild = this.getLeftChild(node);
        var rightChild = this.getRightChild(node);
        if (node == null) return node;
        if (key < node.key) {
            var nullable = this.deleteRec(leftChild, key);
            this.setLeftChild(node, nullable);
        } else if (key > node.key) {
            var nullable = this.deleteRec(rightChild, key);
            this.setRightChild(node, nullable);
        } else {
            if (leftChild == null && rightChild == null) {
                this.model.removeNodeData(node);
                return null;
            }
            if (leftChild == null) {
                this.model.removeNodeData(node);
                return rightChild;
            } else if (node.rightChild == null) {
                this.model.removeNodeData(node);
                return leftChild;
            }
            //get predecesor, delete its link to the parent
            var min = this.maxValue(leftChild);
            var minParent = this.model.findNodeDataForKey(min.parent);
            if (min.leftChild != null) {
                var minLeft = this.model.findNodeDataForKey(min.leftChild);
                if (minParent.key != key) {
                    this.setRightChild(minParent, minLeft);
                }
            } else {
                minParent.rightChild = null;
            }
            if (key == this.root.key) {
                this.model.setParentKeyForNodeData(min, null);
            } else {
                this.model.setParentKeyForNodeData(min, node.parent);
            }

            //link left and right child to the predecesor
            if (leftChild.key != min.key) {
                this.setLeftChild(min, leftChild);
            }
            this.setRightChild(min, rightChild);
            this.model.removeNodeData(this.model.findNodeDataForKey(node.key));
            return min;
        }
        return node;
    }

    getRightChild(node) {
        return this.nodeDataArray.find(x => x.key == node.rightChild && x.parent == node.key);
    }
    getLeftChild(node) {
        return this.nodeDataArray.find(x => x.key == node.leftChild && x.parent == node.key);
    }

    maxValue(node) {
        var min = node.key;
        while (node.rightChild != null) {
            min = node.rightChild;
            node = this.getRightChild(node);
        }
        return node;
    }

    setLeftChild(node, child) {
        if (child != null) {
            this.model.setParentKeyForNodeData(child, node.key);
            node.leftChild = child.key;
        } else {
            node.leftChild = null;
        }
    }

    setRightChild(node, child) {
        if (child != null) {
            this.model.setParentKeyForNodeData(child, node.key);
            node.rightChild = child.key;
        } else {
            node.rightChild = null;
        }
    }

    changeColor(data) {
        this.diagram.commit(function (diag) {
            var it = diag.nodes;
            while (it.next()) {
                var item = it.value;
                if (item.key == data) {
                    item.elt(0).fill = go.Brush.randomColor();
                    console.log(item.key);
                }
            }
        });
    }

    find(iter, data) {
        while (iter.next()) {
            var item = it.value;
            console.log(item);
        }
    }
}