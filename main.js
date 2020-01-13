
function mainInsert() {
    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));
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

    for (let counter = 0; counter < 15; counter++)
    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));

    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));
    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));
    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));
    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));


    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));
    linkedList.insertNode(nodeList.addLinearNodeRandomColor(true));


    linkedList.deleteConnection(nodeList.searchNode("20"));
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