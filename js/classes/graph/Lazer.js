Laser = function (positionX, positionY, goalX, goalY) {

    var laser  = new AbstractionGraph();

    laser.positionX = positionX;
    laser.positionY = positionY;

    laser.goalX = goalX;
    laser.goalY = goalY;

    laser.background = "rgba(243, 21, 21, 0.7)";
    laser.height = 4;
    laser.width = 50;
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
        console.log(this.x, this.y);
        if (this.positionX < this.goalX + 100 && this.positionX > this.goalX - 100
            && this.positionY > this.goalY - 100 && this.positionY < this.goalY + 100) {
            this.destruct();
            console.log("destructed");
            return;
        }
        this.moveAsLine(this.trajectory[0], this.trajectory[1]);
    };

    return laser;
};