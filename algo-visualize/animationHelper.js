
class AnimationHelper{

    constructor(diagram){
        this.diagram = diagram;
    }

    animateNodeInsertion(node){
        if (!(node instanceof go.Node)) return; // only animate Nodes
        node.elt(0).stroke = go.Brush.randomColor();
        node.elt(0).fill = go.Brush.randomColor();
    }

    randomStrokeAndFill(key){
        this.diagram.commit(function (diag) {
            var it = diag.nodes;
            while (it.next()) {
                var item = it.value;
                if (item.key == key) {
                    item.elt(0).stroke = go.Brush.randomColor();
                    item.elt(0).fill = go.Brush.randomColor();
                }
            }
        });
    }

    animateLinkCreation(link) {
        console.log(link);
        var animation = new go.Animation();
        animation.duration = 1000;
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