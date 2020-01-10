

function init()
{
    var $ = go.GraphObject.make;
    myDiagram = $(go.Diagram, "myDiagramDiv");
    var nodeDataArray = [];
    var linkDataArray = [];
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
   
    nodeList = new NodeList(myDiagram);

    

    linkedList = new LinkedList(myDiagram); 

    for(let counter = 0; counter < 15; counter++)
    nodeList.addLinearNodeRandomColor(true);
    linkedList.linkList();

    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));
    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));
    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));
    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));
    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));
   

    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));
    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));

    
    linkedList.deleteConnection(nodeList.searchNode("4"));
    linkedList.deleteConnection(nodeList.searchNode("11"));
    linkedList.deleteConnection(nodeList.searchNode("9"));
    linkedList.deleteConnection(nodeList.searchNode("10"));
    linkedList.deleteConnection(nodeList.searchNode("10"));
    linkedList.deleteConnection(nodeList.searchNode("21"));
    linkedList.deleteConnection(nodeList.searchNode("2"));

    nodeList.deleteNode("2");
    linkedList.printLinks();
   // nodeList.addNode("2", "rgb(50,100,50)");
    //nodeList.search("10");
    myDiagram.nodeTemplate = 
    $(go.Node, "Auto",
        $(go.Shape, "RoundedRectangle", {fill: "white"},
            new go.Binding("fill", "color")
        ),

        $(go.TextBlock, "text", {margin: 10},
            new go.Binding("text", "key")
        )
    );

  myDiagram.linkTemplate = 
    $(go.Link,
        $(go.Shape,{strokeWidth:3},
            new go.Binding("stroke", "color")
        ),
        $(go.Shape,{toArrow: "Standard", stroke: null},
            new go.Binding("fill", "color")
        )
    );
}