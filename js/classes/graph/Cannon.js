Cannon = function () {

    var cannon = new AbstractionGraph();

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
        var that = this;
        var i = that.lasers.length;
        that.lasers[i] = new Laser(this.positionX, this.positionY, goalX, goalY);
        that.lasers[i].create();
        that.lasers[i].interval = setInterval(function(){that.lasers[i].strike()}, that.lasers[i].speed);
    };

    cannon.searchGoal = function (goals) {
        var that = this;
        if (goals instanceof Array) {
            for (var i in goals) {
                if (goals.hasOwnProperty(i)) {
                    var x = goals[i].positionX,
                        y = goals[i].positionY;
                    setTimeout(function(){that.strike(x,y)}, 10000 * Math.random());
                    //this.strike(x, y);
                }
            }
        } else {
            console.log("i don`t know who is this fucking sheet");
        }
    };

    return cannon;
};