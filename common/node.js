
class NodeList {
    constructor(myDiagram, animation) {
        this.animation = animation;
        this.numeric = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        this.counter = 0;
        this.myDiagram = myDiagram;
        this.model = myDiagram.model;
        this.nodeDataArray = this.myDiagram.model.nodeDataArray;
        this.keyList = [];
    }
    addNode(keyName, userColor) {
        this.myDiagram.model.addNodeData({ key: keyName, color: userColor });
        this.keyList.push(this.counter);
    }
    addLinearNode(userColor) {
        this.myDiagram.model.addNodeData({ key: counter, color: userColor });
        this.keyList.push(this.counter);
        this.counter++;
    }
    addNodeRandomColor(keyName, randomFlag) {
        let definedColor = "rgb(50,100,50)";

        if (randomFlag == true) {
            let red = Math.floor(Math.random() * 256);
            let green = Math.floor(Math.random() * 256);
            let blue = Math.floor(Math.random() * 256);
            definedColor = "rgb(" + red + ',' + green + ',' + blue + ')';
        }
        this.myDiagram.model.addNodeData({ key: keyName, color: definedColor });
        this.animation.animateNodePosition(this.myDiagram.findNodeForKey(keyName));
        this.keyList.push(keyName);
        this.animation.animateNodeColor(this.myDiagram.findNodeForKey(keyName), { fill: definedColor, stroke: 'black' });
        this.counter++;
        return keyName;
    }

    addLinearNodeRandomColor(randomFlag) {
        let definedColor = "rgb(50,100,50)";
        let key = this.randomValueNotInArray(1,100);
        if (randomFlag == true) {
            let red = Math.floor(Math.random() * 256);
            let green = Math.floor(Math.random() * 256);
            let blue = Math.floor(Math.random() * 256);
            definedColor = "rgb(" + red + ',' + green + ',' + blue + ')';
        }
        this.myDiagram.model.addNodeData({ key: key, color: definedColor });
        this.animation.animateNodePosition(this.myDiagram.findNodeForKey(key));
        this.keyList.push(key.toString());
        this.animation.animateNodeColor(this.myDiagram.findNodeForKey(key), { fill: definedColor, stroke: 'black' });
        this.counter++;
        return key;
    }

    randomValueNotInArray(min, max) {
        var e;
        do {
            e = Math.floor(Math.random() * (max - min + 1) + min)
        } while (this.nodeDataArray.find(x => x.key == e) != null)
        return e;
    }

    printKeyList() {
        this.keyList.forEach((item) => {
            console.log(item);
        });
    }
    getKeyListLength() {
        return this.keyList.length;
    }

    searchNode(nodeKey) {
        for (let counter = 0; counter < this.nodeDataArray.length; counter++) {
            if (nodeKey == this.nodeDataArray[counter].key) {
                return { found: true, node: nodeKey };
            }
        }
        return { found: false, node: nodeKey };
    }
    deleteNode(nodeKey) {
        for (let counter = 0; counter < this.nodeDataArray.length; counter++) {
            if (nodeKey == this.nodeDataArray[counter].key) {
                this.model.removeNodeData(this.nodeDataArray[counter]);
            }
        }
    }
}