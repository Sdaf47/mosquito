AbstractionGraph = function (objectName) {

    var graph = {};

    if (typeof objectName !== 'undefined') {
        graph.objectName = objectName;
    }

    graph.id = 1;

    if (AbstractionGraph.prototype.hasOwnProperty('lastChild')) {
        graph.id = AbstractionGraph.prototype.lastChild.id + 1;
    }

    graph.speed = 10;
    graph.background = " #000000";
    graph.styles = "";
    graph.height = 40;
    graph.width = 50;

    graph.positionX = 10;
    graph.positionY = 10;

    graph.orientationX = 0;
    graph.orientationY = 0;

    graph.setRadiusPlus = function (value) {
        this.width += value;
        this.height += value;
    };

    graph.move = function (orientationX, orientationY) {
        if (this.orientationX == 0) {
            this.orientationX = orientationX;
        }
        if (this.orientationY == 0) {
            this.orientationY = orientationY;
        }
        this.checkPosition();
        this.positionX += this.orientationX;
        this.positionY += this.orientationY;
        this.updatePosition();
    };

    graph.updatePosition = function () {
        var div = document.getElementById(this.id.toString());
        if (div) {
            div.style.top = this.positionY;
            div.style.left = this.positionX;
            //if (style) {
            //    if (div.style.hasOwnProperty(style[0])) {
            //        div.style[style[0]] = style[1];
            //    }
            //}
        }
    };

    graph.destruct = function () {
        if (this.hasOwnProperty('interval')) {
            clearInterval(this.interval);
        }
        document.getElementById(this.id).outerHTML = '';
    };

    graph.moveByFormula = function (coordinates, arguments, formula) {
        if (!this.hasOwnProperty(coordinates[0]) && !this.hasOwnProperty(coordinates[1])) {
            return false;
        }
        var x = coordinates[0], y = coordinates[1], result = formula(this[coordinates[0]], this[coordinates[1]], arguments);
        this[x] = result[0];
        this[y] = result[1];
    };

    graph.moveAsLine = function (pointX, pointY) {
        this.moveByFormula(["positionX", "positionY"], [pointX, pointY], function (x, y, arguments) {
            x += arguments[0];
            y += arguments[1];
            return [x, y];
        });
        this.updatePosition();
    };

    AbstractionGraph.prototype.lastChild = graph;

    return graph;
};