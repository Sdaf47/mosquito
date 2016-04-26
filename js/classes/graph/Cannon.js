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