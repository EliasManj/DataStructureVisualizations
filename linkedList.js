
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
        this.linkedNodesCounter = 1;
    }

    insertNode(node)
    {
        if(this.root == null)
        {
            this.root = node;
            this.lastNode = node;
        }
        else
        {
            this.model.addLinkData({from: this.lastNode, to:node});
            this.lastNode = node;
            this.linkedNodesCounter++;
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
    deleteConnection(nodeInfo)
    {
        if(nodeInfo.found)
        {
            if(this.linkDataArray.length > 0)
            {
                if(this.linkDataArray[0].from == nodeInfo.node)
                {
                    this.model.removeNodeData(this.nodeDataArray[0]);
                }
            }
            let value1 = this.linkDataArray.find(x=> x.to == nodeInfo.node);
            //for(let counter = 0; counter < this.linkDataArray.length; counter++)
//{
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
            //}
        }
    }
    findLink(to)
    {
        for(let counter = 0; counter < this.linkDataArray.length; counter++)
        {
            console.log(this.linkDataArray[counter]);
            if(this.linkDataArray[counter].from == to)
            {
                return this.linkDataArray[counter].to;
            }
        }
        return null;
    }
    addLink(from,to)
    {
        this.model.addLinkData({from: from, to:to});
    }
    printLinks()
    {
        for(let counter = 0; counter < this.linkDataArray.length; counter++)
        {
            console.log("Index: " + counter + " From: " + this.linkDataArray[counter].from + " To: " + this.linkDataArray[counter].to);
        }
    }
}