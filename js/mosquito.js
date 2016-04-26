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