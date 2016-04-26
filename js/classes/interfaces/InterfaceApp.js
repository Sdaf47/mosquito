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