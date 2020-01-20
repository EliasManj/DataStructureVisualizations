
function mainInsert(value) {
    linkedList.insertNode(nodeList.addNodeRandomColor(value, true));
}
function mainInsertRandom(){
    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));
}
function mainInsertRandomHead(){
    linkedList.insertNodeAtHead(nodeList.addLinearNodeRandomColor(true));
}
function insertHead(value){
    linkedList.insertNode(nodeList.addNodeRandomColor(value, true));
}
function mainBubbleSort()
{
    linkedList.emptyLinkList();
    linkedList.bubbleSort();
    linkedList.linkList();
    //linkedList.printLinks();
}

function init() {
    var $ = go.GraphObject.make;
    myDiagram = $(go.Diagram, "myDiagramDiv",
        {
            initialAutoScale: go.Diagram.UniformToFill,
            layout: $(go.CircularLayout,
                {

                })
        });
    myDiagram.nodeTemplate =
        $(go.Node, "Spot",
            $(go.Panel, "Auto",
                $(go.Shape, "Ellipse",
                    {
                        name: "shape",
                        fill: "lightgray",
                        desiredSize: new go.Size(40, 40),
                        stroke: 'black',
                        strokeWidth: 3
                    },
                    new go.Binding("fill", "color"),
                ),
                $(go.TextBlock,
                    new go.Binding("text", "key")
                )
            ),
        );
    var nodeDataArray = [];
    var linkDataArray = [];
    var animationHelper = new AnimationHelper(myDiagram);
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    nodeList = new NodeList(myDiagram, animationHelper);



    linkedList = new LinkedList(myDiagram, animationHelper);

    
    linkedList.insertNode(nodeList.addNodeRandomColor("3", true));
    linkedList.insertNode(nodeList.addNodeRandomColor("2", true));
    linkedList.insertNode(nodeList.addNodeRandomColor("1", true));
    linkedList.insertNode(nodeList.addNodeRandomColor("5", true));
    linkedList.insertNode(nodeList.addNodeRandomColor("7", true));
    linkedList.insertNode(nodeList.addNodeRandomColor("8", true));
    linkedList.insertNode(nodeList.addNodeRandomColor("10", true));
    linkedList.insertNode(nodeList.addNodeRandomColor("0", true));
   //
    linkedList.printLinks();

    myDiagram.linkTemplate =
        $(go.Link,
            $(go.Shape, { strokeWidth: 3 },
                new go.Binding("stroke", "color")
            ),
            $(go.Shape, { toArrow: "Standard", stroke: null },
                new go.Binding("fill", "color")
            )
        );
}