
class AnimationHelper{

    constructor(diagram){
        this.diagram = diagram;
    }

    animateNode(node, props){
        this.animateNodeColor(node, props);
        this.animateNodePosition(node, props);
    }

    animateNodeColor(node, props){
        if (!(node instanceof go.Node)) return; // only animate Nodes
        var shape = node.findObject("shape");
        var animation = new go.Animation();
        animation.duration = 100;
        animation.add(shape, "fill", go.Brush.randomColor(), props.fill);
        animation.add(shape, "stroke", go.Brush.randomColor(), props.stroke);
        animation.start();
    }

    animateNodePosition(node, props){
        if (!(node instanceof go.Node)) return; // only animate Nodes
        var animation = new go.Animation();
        animation.duration = 1000;
        animation.add(node, "position", this.diagram.initialPosition, node.position);
        animation.start();
    }

    animateLinkCreation(link) {
        var animation = new go.Animation();
        animation.duration = 2000;
        animation.add(link, "scale", 0.001, 1);
        animation.start();
    }

    animateLinkDeletion(link) {
        var animation = new go.Animation();
        animation.duration = 1000;
        animation.add(link, "scale", 1, 0);
        animation.start();
    }

    animateDeletion(part) {
        if (!(part instanceof go.Node)) return; // only animate Nodes
        var animation = new go.Animation();
        var deletePart = part.copy();
        animation.add(deletePart, "scale", deletePart.scale, 0.01);
        animation.add(deletePart, "angle", deletePart.angle, 360);
        animation.addTemporaryPart(deletePart, myDiagram);
        animation.start();
    }

    findNode(key){
        var it = this.diagram.nodes;
        while (it.next()) {
            var item = it.value;
            if (item.key == key) {
                return item;
            }
        }
        return null;
    }
}