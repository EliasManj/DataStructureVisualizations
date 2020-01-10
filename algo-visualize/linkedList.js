
//Felipe Elizalde Comentario
class VisualLinkedList {

    constructor(diagram) {
        this.diagram = diagram;
        this.nodeDataArray = [];
        this.linkDataArray = [];
        this.diagram.model = new go.GraphLinksModel(this.nodeDataArray, this.linkDataArray);
        this.model = this.diagram.model;
        this.root = null;
        this.animation = new AnimationHelper(this.diagram);
    }

    remove(data) {
        if (!isNaN(data)) {
            var x = this.model.findNodeDataForKey(data);
            if (x != null) {
                if (x.key == this.root.key) {
                    this.removeRoot();
                } else {
                    this.removeNode(x);
                }
            }
        }
    }

    removeRoot() {
        var rootLink = this.model.linkDataArray.find(x => x.from == this.root.key);
        var toDelete = this.model.findNodeDataForKey(this.root.key);
        var newRoot = this.model.findNodeDataForKey(rootLink.to);
        this.root = newRoot;
        this.animation.animateDeletion(toDelete.key);
        this.model.removeLinkData(rootLink);
        this.model.removeNodeData(toDelete);
    }

    removeNode(node) {
        //get links
        var previousToCurrentLink = this.linkDataArray.find(x => x.to == node.key);
        var currentToNextLink = this.linkDataArray.find(x => x.from == node.key);
        //delete links
        if (previousToCurrentLink != null) this.model.removeLinkData(previousToCurrentLink);
        if (currentToNextLink != null) this.model.removeLinkData(currentToNextLink);
        if (previousToCurrentLink != null && currentToNextLink != null)
            this.model.addLinkData({ from: previousToCurrentLink.from, to: currentToNextLink.to });
        //delete node
        var toDelete = this.diagram.findNodeForKey(node.key);
        //remove from diagram
        this.animation.animateDeletion(toDelete);
        this.model.removeNodeData(this.model.findNodeDataForKey(node.key));
    }

    removeLinkAndAnimate(node){

    }

    removePartAndAnimate(node){
        this.animation.animateDeletion(node.key);
        this.model.removeNodeData(this.model.findNodeDataForKey(node.key));
    }

    insert(data) {
        if (!isNaN(data)) {
            var exists = this.nodeDataArray.find(x => x.key == data);
            if (!exists) {
                var new_node = { key: data, category: "SimpleNode", fill: go.Brush.randomColor() }
            }
            this.insertNode(new_node);
        }
    }

    insertNode(node) {
        this.model.addNodeData(node);
        this.animation.randomStrokeAndFill(node.key);
        if (this.nodeDataArray.length > 1) {
            var x = this.model.findNodeDataForKey(this.root.key);
            this.model.addLinkData({ from: node.key, to: x.key });
            this.animation.animateLinkCreation(this.diagram.findLinkForKey(node.key));
        }
        this.root = node;
    }

}