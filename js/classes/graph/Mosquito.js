Mosquito = function () {

    var mosquito = new AbstractionGraph();

    mosquito.background = " url(img/mosquito.gif)";

    mosquito.setRadius = function (radius) {
        if (typeof radius !== 'undefined') {
            this.width = radius;
            this.height = radius;
        }
    };

    mosquito.create = function () {
        var styles = "width: " + this.width + "px;";
        styles += "height: " + this.height+ "px;";
        styles += "background: " + this.background + ";";
        styles += "top: " + (this.positionY - this.width / 2) + "px;";
        styles += "left: " + (this.positionX - this.height / 2) + "px;";
        styles += "position: absolute;";
        styles += this.styles;
        document.write("<div id='" + mosquito.id + "' style='" + styles + "'></div>");
    };

    mosquito.revertProperty = function (prop) {
        if (this.hasOwnProperty(prop)) {
            if (this[prop] < 0) {
                this[prop] = Math.abs(this[prop]);
            } else {
                this[prop] = Math.abs(this[prop]) * (-1);
            }
        }
    };

    mosquito.chaos = function () {
        if (getProbability(3)) {
            document.getElementsByTagName('body')[0].style.background = randColor();
            if (getProbability(1)) {
                this.revertProperty('orientationX');
            } else {
                this.revertProperty('orientationY');
            }
        }
        //if (getProbability(10)) {
        //    this.destruct();
        //}
    };

    mosquito.checkPosition = function () {
        this.chaos();
        if (this.positionX >= InterfaceCanvas.rightBorder || this.positionX <= InterfaceCanvas.leftBorder) {
            this.revertProperty('orientationX');
        }
        if (this.positionY >= InterfaceCanvas.bottomBorder || this.positionY <= InterfaceCanvas.topBorder) {
            this.revertProperty('orientationY');
        }
    };

    return mosquito;
};