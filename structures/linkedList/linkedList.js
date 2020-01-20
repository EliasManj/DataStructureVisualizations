
class LinkedList
{
    constructor(myDiagram, linked_list_animation)
    {
        this.animation = linked_list_animation;
        this.myDiagram = myDiagram;
        this.model = myDiagram.model;
        this.linkDataArray = myDiagram.model.linkDataArray;
        this.nodeDataArray = myDiagram.model.nodeDataArray;
        this.root = null;
        this.lastNode = null;
        this.linkedNodesCounter = 0;
        this.links = 0
    }
    insertNodeAtHead(node){
        if(this.root == null)
        {
            this.root = node;
            this.lastNode = node;
            this.linkedNodesCounter++;
            this.animation.animateNodeStroke(this.myDiagram.findNodeForKey(node), {stroke : "red"})
        } else {
            var link = {to : this.root, from: node, key: node};
            this.model.addLinkData(link);
            this.animation.animateLinkCreation(this.myDiagram.findLinkForData(link));
            this.animation.animateNodeStroke(this.myDiagram.findNodeForKey(this.root), {stroke : "black"})
            this.root = node;
            this.animation.animateNodeStroke(this.myDiagram.findNodeForKey(node), {stroke : "red"})
            this.linkedNodesCounter++;
            this.links++;
        }
    }
    insertNode(node)
    {
        if(this.root == null)
        {
            this.root = node;
            this.lastNode = node;
            this.linkedNodesCounter++;
        }
        else
        {
            var link = {from: this.lastNode, to:node, key: this.lastNode};
            this.model.addLinkData(link);
            this.animation.animateLinkCreation(this.myDiagram.findLinkForData(link));
            this.lastNode = node;
            this.linkedNodesCounter++;
            this.links++;
        }
    } 
    linkList()
    {
        if(this.nodeDataArray.length > 0)
        {
            this.root = this.nodeDataArray[0];
        }
        for(let counter = this.linkedNodesCounter; counter < this.nodeDataArray.length; counter++)
        {
            let nextNode = this.model.findNodeDataForKey(this.nodeDataArray[counter].key);
            this.lastNode = this.model.findNodeDataForKey(this.nodeDataArray[counter-1].key);
            this.model.addLinkData({from: this.lastNode.key, to:nextNode.key});
            this.lastNode = nextNode.key;
            this.linkedNodesCounter++;
        }
    }  
    emptyLinkList()
    {
        //console.log(this.linkDataArray.length);
        let linkDataArrayLength = this.linkDataArray.length;
        for(let counter = 0; counter < linkDataArrayLength; counter++)
        {
            //console.log(this.linkDataArray[0]);
            this.model.removeLinkData(this.linkDataArray[0]);
        }
        if(this.nodeDataArray.length > 0)  this.linkedNodesCounter = 1;
    } 
    
    deleteConnection(nodeInfo)
    {
        if(nodeInfo.found)
        {
            if(this.linkDataArray.length == 0)
            {
                if(this.linkDataArray[0].from == nodeInfo.node)
                {
                    this.model.removeNodeData(this.nodeDataArray[0]);
                    return;
                }
            }
            else if(this.links > 0 && this.linkDataArray[this.links-1].to == nodeInfo.node)
            {
                let link = this.linkDataArray.find(x=> x.to == nodeInfo.node);
                this.model.removeLinkData(link);
                this.model.removeNodeData(this.model.findNodeDataForKey(nodeInfo.node));
            }
            else
            {
                let value1 = this.linkDataArray.find(x=> x.to == nodeInfo.node);
                if(value1.to == nodeInfo.node)
                { 
                    let value = this.findLink(nodeInfo.node);
                    if(value != null)
                    {
                        value1.to = value;
                        let link = this.linkDataArray.find(x =>x.from == nodeInfo.node);
                        this.model.removeLinkData(link);
                    }
                        this.model.removeNodeData(this.model.findNodeDataForKey(nodeInfo.node));
                    return;
                }
            }
        }
    }
    findLink(to)
    {
        let link = this.linkDataArray.find(x => x.from == to);
        if(link == null) return null;
        return link.to;
    }
    addLink(from,to)
    {
        this.model.addLinkData({from: from, to:to});
    }
    printLinks()
    {
        for(let counter = 0; counter < this.linkDataArray.length; counter++)
        {
            //console.log("Index: " + counter + " From: " + this.linkDataArray[counter].from + " To: " + this.linkDataArray[counter].to);
        }
    }
    bubbleSort()
    {
        if(this.nodeDataArray.length > 1)
        {
            console.log(this.nodeDataArray.length);
            for(let loops = 0; loops < this.nodeDataArray.length; loops++)
            for(let counter = 0; counter < this.nodeDataArray.length-1; counter++)
            {
                if(Number(this.nodeDataArray[counter].key) > Number(this.nodeDataArray[counter+1].key))
                {
                    let temp = this.nodeDataArray[counter+1];
                    this.nodeDataArray[counter+1] = this.nodeDataArray[counter];
                    this.nodeDataArray[counter] = temp; 
                    
                    //Animate swapping here
                }
            }
            console.log(this.nodeDataArray.length);
        }
    }
}