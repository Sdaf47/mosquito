InterfaceCanvas = {
    leftBorder : 10,
    rightBorder : 1000,
    topBorder : 10,
    bottomBorder : 400,
    writeBorder : function () {
        style = "top:"+this.topBorder+";";
        style += "left:"+this.leftBorder+";";
        style += "width:"+this.rightBorder+";";
        style += "height:"+this.bottomBorder+";";
        style += "border:1px solid black;";
        style += "position:absolute;";
        document.write("<div style='"+style+"'></div>");
    }
};

party =  {
    id : "audio-1",
    audio : "music/party.mp3",
    playing : false,
    created : false,
    start : function () {
        if (!this.created) {
            document.write("<audio id='" + this.id + "' src='" + this.audio + "'></audio>");
            this.created = true;
        }
        this.playing = true;
        document.getElementById(this.id).play();
    },
    stop : function () {
        this.playing = false;
        document.getElementById(this.id).pause();
    }
};

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

Cannon = function (objectName) {

    var cannon = new AbstractionGraph(objectName);

    cannon.background = "#000";
    cannon.lasers = [];
    cannon.styles = "border-radius: 50%;";

    cannon.create = function () {
        var styles = "width: " + this.width + "px;";
        styles += "height: " + this.height+ "px;";
        styles += "background: " + this.background + ";";
        styles += "top: " + (this.positionY - this.width / 2) + "px;";
        styles += "left: " + (this.positionX - this.height / 2) + "px;";
        styles += "position: absolute;";
        styles += this.styles;
        document.write("<div id='" + this.id + "' style='" + styles + "'></div>");
    };

    cannon.strike = function (goalX, goalY) {
        var i = this.lasers.length;
        this.lasers[i] = new Laser(this.positionX, this.positionY, goalX, goalY);
        this.lasers[i].create();
        this.lasers[i].interval = setInterval(this.objectName + ".lasers["+i+"].strike()", this.lasers[i].speed);
    };

    cannon.searchGoal = function (goals) {
        if (goals instanceof Array) {
            for (var i in goals) {
                if (goals.hasOwnProperty(i)) {
                    var x = goals[i].positionX,
                        y = goals[i].positionY;
                    setTimeout(this.objectName + ".strike(" + x + ", " + y + ")", 10000 * Math.random());
                    //this.strike(x, y);
                }
            }
        } else {
            console.log("i don`t know who is this fucking sheet");
        }
    };

    return cannon;
};

Laser = function (positionX, positionY, goalX, goalY) {

    var laser  = new AbstractionGraph();

    laser.positionX = positionX;
    laser.positionY = positionY;

    laser.goalX = goalX;
    laser.goalY = goalY;

    laser.background = "red";
    laser.height = 2;
    laser.width = 20;
    laser.speed = 1;

    if (!laser.trajectory) {
        //TODO refactoring because it is govno
        var a = laser.goalX - laser.positionX;
        var b = laser.goalY - laser.positionY;
        var c = Math.sqrt((a * a) + (b * b));
        var corner = Math.abs(Math.acos(a/c));
        var corner2 = corner * 180 / Math.PI;
        var a2 = Math.cos(corner)*10;
        var b2 = Math.sin(corner)*10;
        if (b < 0) {
            b2 *= -1;
            corner2 *= -1;
        }
        laser.styles = "-webkit-transform: rotate(" + corner2 + "deg);";
        laser.trajectory = [a2, b2];
    }

    laser.create = function () {
        var styles = "width: " + this.width + "px;";
        styles += "height: " + this.height+ "px;";
        styles += "background: " + this.background + ";";
        styles += "top: " + (this.positionY - this.width / 2) + "px;";
        styles += "left: " + (this.positionX - this.height / 2) + "px;";
        styles += "position: absolute;";
        styles += this.styles;
        document.write("<div id='" + laser.id + "' style='" + styles + "'></div>");
    };

    laser.strike = function() {
        this.moveAsLine(this.trajectory[0], this.trajectory[1]);
    };

    return laser;
};

var mosquitoChildren = [];
var cannons = [];
cannons[0] = new Cannon("cannons["+0+"]");
cannons[1] = new Cannon("cannons["+1+"]");
cannons[2] = new Cannon("cannons["+2+"]");
cannons[3] = new Cannon("cannons["+3+"]");

create_new_mosquito = function (e) {

    cannons[1].positionX = 0;
    cannons[1].positionY = 500;

    cannons[2].positionX = 1000;
    cannons[2].positionY = 0;

    cannons[3].positionX = 1000;
    cannons[3].positionY = 500;

    cannons[0].create();
    cannons[1].create();
    cannons[2].create();
    cannons[3].create();

    var i = mosquitoChildren.length;
    mosquitoChildren[i] = new Mosquito();
    mosquitoChildren[i].positionX = e.clientX;
    mosquitoChildren[i].positionY = e.clientY;
    mosquitoChildren[i].create();
    mosquitoChildren[i].interval = setInterval("mosquitoChildren["+i+"].move("+randOrientation()+","+randOrientation()+")", mosquitoChildren[i].speed);


    cannons[0].searchGoal(mosquitoChildren);
    cannons[1].searchGoal(mosquitoChildren);
    cannons[2].searchGoal(mosquitoChildren);
    cannons[3].searchGoal(mosquitoChildren);

    document.onclick = function (e) {
        //party.start();
        var i = mosquitoChildren.length;
        mosquitoChildren[i] = new Mosquito();
        mosquitoChildren[i].positionX = e.clientX;
        mosquitoChildren[i].positionY = e.clientY;
        mosquitoChildren[i].create();
        mosquitoChildren[i].interval = setInterval("mosquitoChildren["+i+"].move("+randOrientation()+","+randOrientation()+")", mosquitoChildren[i].speed);

        cannons[0].searchGoal(mosquitoChildren);
        cannons[1].searchGoal(mosquitoChildren);
        cannons[2].searchGoal(mosquitoChildren);
        cannons[3].searchGoal(mosquitoChildren);
    }
};

var lazers = [];

document.onclick = create_new_mosquito;

/**
 * functions library
 */

function randOrientation() {
    var rand = Math.random();
    if (rand > 0.5) {
        return -1;
    } else {
        return 1;
    }
}

function getProbability(level) {
    for (var i = level; i > 0; i--) {
        if (randOrientation() == -1) {
            return false;
        }
    }
    return true;
}

function randColor() {
    var r = Math.floor(Math.random() * (256)),
    g = Math.floor(Math.random() * (256)),
    b = Math.floor(Math.random() * (256)),
    color = '#' + r.toString(16) + g.toString(16) + b.toString(16);

    return color;
}

function randPoint() {
    var x = Math.random()*100,
    y = Math.random()*100;
    return [x, y];
}