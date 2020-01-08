
class AnimationHelper{

    constructor(diagram){
        this.diagram = diagram;
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