var s;
var trail = [];
var taillength = 5;
var playerx = 10;
var playery = 10;
var applex;
var appley;
var xval = 0, yval = 0;
var size =20;
var tc = 20;
var con;
var b = false;

function init() {

	applex = Math.floor(Math.random()*tc);
	appley = Math.floor(Math.random()*tc);
	s = document.getElementById("sk");
	con = s.getContext("2d");
	document.addEventListener("keydown", superDooper);
	document.addEventListener("mousedown", mouse);
	document.addEventListener("touchstart",touch);
	setInterval(game,1000/15);
}

function touch(evt) {
	if(evt.clientX <(s.width / 3)&& (evt.clientY < (s.height - s.height/3)) && evt.clientY > (s.height - 2*(s.height/3))) {
		xval = -1;
	   	yval = 0;
	}
	if(evt.clientX > 2*(s.width / 3)&& (evt.clientY < (s.height - s.height/3)) && evt.clientY > (s.height - 2*(s.height/3))) {
		xval = 1;
	   	yval = 0;
	}
	if(evt.clientY > 2*(s.width / 3)&& (evt.clientX < (s.height - s.height/3)) && evt.clientX > (s.height - 2*(s.height/3))) {
		xval = 0;
	   	yval = 1;
	}
	if(evt.clientY <(s.width / 3)&& (evt.clientX < (s.height - s.height/3)) && evt.clientX > (s.height - 2*(s.height/3))) {
		xval = 0;
	   	yval = -1;
	}
}

function mouse(evt) {
	if(evt.clientX <(s.width / 3)&& (evt.clientY < (s.height - s.height/3)) && evt.clientY > (s.height - 2*(s.height/3))) {
		xval = -1;
	   	yval = 0;
	}
	if(evt.clientX > 2*(s.width / 3)&& (evt.clientY < (s.height - s.height/3)) && evt.clientY > (s.height - 2*(s.height/3))) {
		xval = 1;
	   	yval = 0;
	}
	if(evt.clientY > 2*(s.width / 3)&& (evt.clientX < (s.height - s.height/3)) && evt.clientX > (s.height - 2*(s.height/3))) {
		xval = 0;
	   	yval = 1;
	}
	if(evt.clientY <(s.width / 3)&& (evt.clientX < (s.height - s.height/3)) && evt.clientX > (s.height - 2*(s.height/3))) {
		xval = 0;
	   	yval = -1;
	}
}

function superDooper(evt) {
	switch(evt.keyCode) {
		case 37:
		//	console.log("left");
			if(xval == 1) {
				return;
			}
			xval= (-1);
			yval=0;
			break;
		case 38:
		//	console.log("up");
			if(yval == 1) {
				return;
			}
			xval=0;
			yval=(-1);
			break;
		case 39:
		//	console.log("right");
			if(xval == -1) {
				return;
			}
			yval=0;
			xval=1;
			break;
		case 40:
		//	console.log("down");
			if(yval == -1) {
				return;
			}
			xval=0;
			yval=1;
			break;
	}
}
function drawScore() {
	var gradient=con.createLinearGradient(0,0,s.width,0);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");
	con.font="30px Arial";
	con.fillStyle = gradient;
	con.fillText("Points: " + (taillength-5), 20, 35);
}

function game() {
	playerx+=xval;
    playery+=yval;

//	console.log(playerx);
//	console.log(playery);

    if(playerx < 0) {
        playerx= tc - 1;
    }
    if(playerx > tc - 1) {
        playerx= 0;
    }
    if(playery < 0) {
        playery= tc - 1;
    }
    if(playery > tc - 1) {
        playery= 0;
    }
    con.fillStyle="white";
    con.fillRect(0,0,s.width,s.height);

	drawScore();

    for(var i=0;i<trail.length;i++) {
		if(b) {
			con.fillStyle="yellow";
			b = false;
		} else {
			b = true;
			con.fillStyle="lime";
		}
		if(i==trail.length-1){
			con.fillStyle="maroon";
		}

		con.fillRect(trail[i].x*size,trail[i].y*size,size,size);
        if(trail[i].x ==playerx && trail[i].y==playery) {
            taillength = 5;
			xval = 0;
			yval = 0;
			playerx = 10;
			playery = 10;
        }

    }
    trail.push({x:playerx,y:playery});
    while(trail.length>taillength) {
    	trail.shift();
    }
	if(playerx == applex && playery == appley) {
		taillength ++;
		spawnApple();
		for(var i = 0; trail.length; i++) {
			if(trail[i].x == applex && trail[i].y == appley) {
				spawnApple();
			}
		}
    }
	con.beginPath();
	con.arc
    con.arc((applex*size)+size/2, (appley*size)+size/2, (size/2), 0, 2 * Math.PI, false);
    con.fillStyle = "red";
    con.fill();
   	con.lineWidth = 2;
    con.strokeStyle = "green";
    con.stroke();
  	//con.fillStyle="red";
    //con.fillRect(applex*size,appley*size,size-2,size-2);
}

function spawnApple() {
	applex=Math.floor(Math.random()*tc);
    appley=Math.floor(Math.random()*tc);
}
