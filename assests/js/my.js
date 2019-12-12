var world;
var player;
var c1;
var coinentityarr;
var monster1;
var m1;
var myScore = 0;
var level = 1;
var isendgame = false;
var scoremargin = 0;
var platform1;
// =======entity========

var mainground = {
    name: 'ground',
    // x: .5,
    y: 15,
    height: 3,
    width: 5,
    type: "static",
    image: "assests/img/mudroad.gif",
    imageStretchToFit: true,
    fixedRotation: true,
    friction: .3,
    restitution: 0,
    color: 'green',
    maxVelocityX: 4
};

var block = {
    name: 'platform3',
    height: 1,
    width: 5,
    image: "assests/img/mudroad.gif",
    imageStretchToFit: true,
    type: "static",
    fixedRotation: true,
    friction: .3,
    restitution: 0,
    color: 'red',
    maxVelocityX: 4
};

var block2 = {
    name: 'platform3',
    height: 1,
    width: 5,
    image: "assests/img/mudroad.gif",
    imageStretchToFit: true,
    fixedRotation: true,
    friction: .3,
    restitution: 0,
    color: 'red',
    maxVelocityX: 4
};

var groundtop = {
    name: 'ground',
    y: .0,
    height: .5,
    width: 100,
    type: "static",
    fixedRotation: true,
    friction: .3,
    color: "rgba(255, 255, 255, 0)",
    restitution: 0,
    maxVelocityX: 4
};

coin1 = {
    name: 'coin',
    shape: 'circle',
    radius: .4,
    // color: 'yellow',
    image: "assests/img/coin/c1.png",
    imageStretchToFit: true,
    onStartContact: function(other) {
        console.log("detect U :"+other);
        if (other.name() === 'player') {
            this.destroy();
            myScore+=10;
            $("#txtscore").text(myScore+"");
        }}
};

var coin2 = {
    name: 'coin',
    shape: 'circle',
    radius: .5,
    color: 'orange',
    image: "assests/img/currency_blue_dollar.png",
    imageStretchToFit: true,
    onStartContact: function(other) {
        console.log("detect U :"+other);
        if (other.name() === 'player') {
            $("#audio1")[0].play();
            this.destroy();
            myScore+=20;
            $("#txtscore").text(myScore+"");
        }}
};

var platform = {
    name: 'platform',
    width: 4,
    height: .2,
    fixedRotation: true
};

$("#txtscore").text(myScore+"");


startGame(level);

function startGame(level) {
    console.log("level : "+level);
    var canvas = document.getElementById('bbdemo');
    world = boxbox.createWorld(canvas, {debugDraw:false});
    loadlevel(3);

};


$(document).keydown(function(e) {
    if(isendgame == false) {
        switch (e.which) {
            case 32:
                player.applyImpulse(100);
                player.image("assests/img/boy6.png");
                break;

            case 37: // left
                player.setForce('movement', 100, 270);
                player.image("assests/img/boy4.png");
                setTimeout(function () {
                    player.setForce('movement', 0, 270);
                    player.image("assests/img/boy3.png");
                    player.friction(.1);
                }, 50);
                break;

            case 38: // up
                alert("38");
                break;

            case 39: // right
                player.setForce('movement', 100, 90);
                player.image("assests/img/boy2.png");
                setTimeout(function () {
                    player.setForce('movement', 0, 90);
                    player.friction(.1);
                    player.image("assests/img/boy.png");
                }, 50);

                return false;

            case 40: // down
                break;

            default:
                return; // exit this handler for other keys
        }
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});


var coin1;

window.setInterval(function () {
    if (ind >= coinarr.length) {
        ind = 0;
    }
    for(var i = 0; i < coinentityarr.length; i++){
        coinentityarr[i].image(coinarr[ind]);
    }
    ind++;
},100);

var time = 60;

var inter = window.setInterval(function () {
    time--;
    $("#txttime").text(time+"");
    if(time == 0){
        clearInterval(inter);
        if(myScore < scoremargin){
            $("#gameoverbox").css("display","block");
            $("#gameoverscorepoint").text(myScore+"");
            isendgame = true;
        }else{
            $("#gamenextbox").css("display","block");
            $("#gamenextscorepoint").text(myScore+"");
            isendgame = true;
        }
    }else if(myScore == scoremargin){
        clearInterval(inter);
        $("#gamenextbox").css("display","block");
        $("#gamenextscorepoint").text(myScore+"");
        isendgame = true;
    }
},1000);

var coinarr = ["assests/img/coin/c1.png","assests/img/coin/c2.png","assests/img/coin/c3.png","assests/img/coin/c4.png","assests/img/coin/c5.png","assests/img/coin/c6.png"];
var ind = 0;


function loadlevel(level) {
   switch (level) {
       case 1:
           scoremargin = 80;
           world.createEntity(mainground, {x: 2,y: 17});
           world.createEntity(mainground, {x: 7,y: 17});
           world.createEntity(mainground, {x: 12,y: 17});
           world.createEntity(mainground, {x: 17,y: 17});
           world.createEntity(mainground, {x: 22,y: 17});
           world.createEntity(mainground, {x: 27,y: 17});


           world.createEntity(block, {x: 24, y: 12});
           world.createEntity(block, {x: 17, y: 8});
           world.createEntity(block, {x: 10, y: 12});


           world.createEntity(groundtop);


           player = world.createEntity({
               name: 'player',
               x: 3,
               y: 10,
               height: 2.5,
               width: 1.5,
               fixedRotation: true,
               image: "assests/img/boy.png",
               imageStretchToFit: true,
               friction: .5,
               density: 4,
               restitution: 0,
               color: 'blue',
               maxVelocityX: 4
           });


           coinentityarr = [world.createEntity(coin1, {x: 7, y: 15}),

               world.createEntity(coin1, {x: 6, y: 12}),

               world.createEntity(coin1, {x: 10, y: 10}),

               world.createEntity(coin1, {x: 17, y: 3}),

               world.createEntity(coin1, {x: 24, y: 10}),

               world.createEntity(coin1, {x: 26, y: 12}),

               world.createEntity(coin1, {x: 27, y: 10}),

               world.createEntity(coin1, {x: 10, y: 10})];

           break;

        case 2:
            scoremargin = 130;
            world.createEntity(mainground, {x: 2,y: 17});
            world.createEntity(mainground, {x: 7,y: 17});
            world.createEntity(mainground, {x: 12,y: 17});
            world.createEntity(mainground, {x: 17,y: 17});
            world.createEntity(mainground, {x: 22,y: 17});
            world.createEntity(mainground, {x: 27,y: 17});


            world.createEntity(block, {x: 24, y: 12});
            world.createEntity(block, {x: 17, y: 8});
            world.createEntity(block, {x: 10, y: 12});
            world.createEntity(block, {x: 10, y: 4});
            world.createEntity(block, {x: 24, y: 4});


            world.createEntity(groundtop);


            player = world.createEntity({
                name: 'player',
                x: 3,
                y: 10,
                height: 2.5,
                width: 1.5,
                fixedRotation: true,
                image: "assests/img/boy.png",
                imageStretchToFit: true,
                friction: .5,
                density: 4,
                restitution: 0,
                color: 'blue',
                maxVelocityX: 4
            });


            coinentityarr = [world.createEntity(coin1, {x: 7, y: 15}),

                world.createEntity(coin1, {x: 6, y: 12}),

                world.createEntity(coin1, {x: 12, y: 10}),

                world.createEntity(coin1, {x: 17, y: 3}),

                world.createEntity(coin1, {x: 18, y: 3}),

                world.createEntity(coin1, {x: 26, y: 10}),

                world.createEntity(coin1, {x: 24, y: 12}),

                world.createEntity(coin1, {x: 27, y: 10}),

                world.createEntity(coin1, {x: 10, y: 10}),

                world.createEntity(coin1, {x: 10, y: 2}),

                world.createEntity(coin1, {x: 12, y: 2}),

                world.createEntity(coin1, {x: 24, y: 2}),

                world.createEntity(coin1, {x: 26, y: 2})

            ];
           break;

       case 3:
           scoremargin = 110;
           world.createEntity(mainground, {x: 2,y: 17});
           world.createEntity(mainground, {x: 7,y: 17});
           world.createEntity(mainground, {x: 12,y: 17});
           world.createEntity(mainground, {x: 17,y: 17});
           world.createEntity(mainground, {x: 22,y: 17});
           world.createEntity(mainground, {x: 27,y: 17});



           world.createEntity(block, {x: 24, y: 5});
           world.createEntity(block, {x: 10, y: 12});

           platform1 = world.createEntity(platform, {x:18.8, y: 4});

           world.createEntity(groundtop);


           player = world.createEntity({
               name: 'player',
               x: 3,
               y: 10,
               height: 2.5,
               width: 1.5,
               fixedRotation: true,
               image: "assests/img/boy.png",
               imageStretchToFit: true,
               friction: .5,
               density: 4,
               restitution: 0,
               color: 'blue',
               maxVelocityX: 4
           });


           coinentityarr = [world.createEntity(coin1, {x: 7, y: 15}),

               world.createEntity(coin1, {x: 6, y: 12}),

               world.createEntity(coin1, {x: 14, y: 10}),

               world.createEntity(coin1, {x: 26, y: 10}),

               world.createEntity(coin1, {x: 22, y: 12}),

               world.createEntity(coin1, {x: 27, y: 10}),

               world.createEntity(coin1, {x: 10, y: 10}),

               world.createEntity(coin1, {x: 10, y: 2}),

               world.createEntity(coin1, {x: 12, y: 2}),

               world.createEntity(coin1, {x: 24, y: 2}),

               world.createEntity(coin1, {x: 26, y: 2})

           ];
           break;

       default:
           return;

   }

    var platformMovingUp = true;

        window.setInterval(function() {
            platformMovingUp = !platformMovingUp;
            if (platformMovingUp) {
                platform1.setVelocity('moving platform', 8, 0);
            }
            else {
                platform1.setVelocity('moving platform', 8, 180);
            }
        }, 1500);




   $("#btnnext").click(
       function () {
            level++;
            $("#gamenextbox").css("display", "none");
            $("#gameoverbox").css("display", "none");
           isendgame = false;
           myScore = 0;
            startGame(level);
       }
   );

    $(".btntryagain").click(
        function () {
            $("#gamenextbox").css("display", "none");
            $("#gameoverbox").css("display", "none");
            isendgame = false;
            myScore = 0;
            startGame(level);
        }
    );
}