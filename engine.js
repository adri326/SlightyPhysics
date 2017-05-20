(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
  })();

var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
width = 500,
height = 500,
player = {
    x: 10,
    y: height-10,
    width: 10,
    height: 10,
    speed: 2.5,
    jumpForce: 1.9,
    velX: 0,
    velY: 0,
    jumping: 0,
    grounded: false,
    color: "orange",
    walljump: true,
    walljumpForce: 1.5
},
keys = [],
boxes = [],
execute=[],
groundFriction = 0.6,
airFriction = 0.975,
walljumpForceX = 0.7,
walljumpForceY = 1,
gravity = 0.3,
jumpControl = 10.0,
jumpForce = 20,
grid = {
  sizeX: 10,
  sizeY: 10
};

canvas.width = width;
canvas.height = height;

function getGridMaxX() {
  return canvas.width / grid.sizeX - 1;
}
function getGridMaxY() {
  return canvas.height / grid.sizeY - 1;
}

function addBox(sx, sy, xl, yl, color = BASECOLOR) {
    boxes.push({
        x: sx,
        y: sy,
        width: xl,
        height: yl,
        color: color
    });
    return boxes.length-1;
}
function addGridBox(x, y, color = BASECOLOR) {
  addBox(x * grid.sizeX, y * grid.sizeY, grid.sizeX, grid.sizeY, color);
}
function addGridBoxLine(x, y, dir, n, color = BASECOLOR) {
  for (i = 0; i < n; i++) {
    if (dir == DIR.Xminus) {
      addGridBox(x - i, y, color);
    } else if (dir == DIR.Xplus) {
      addGridBox(x + i, y, color);
    } else if (dir == DIR.Yminus) {
      addGridBox(x, y - i, color);
    } else if (dir == DIR.Yplus) {
      addGridBox(x, y + i, color);
    }
  }
}
function addExe(sx, sy, xl, yl, Code, color = BASECOLOR) {
    execute.push({
        x: sx,
        y: sy,
        width: xl,
        height: yl,
        code: Code,
        color: color,
    });
  return execute.length-1;
}
function clearBox() {
  boxes = [];
  execute = [];
  addBox(0, 0, 10, height);
  addBox(0, 0, width, 10);
  addBox(0, height-10, width, 50);
  addBox(width - 10, 0, 50, height);
  player.x = 10;
  player.y = height-10;
}

clearBox();

function level1() {
  clearBox();
  addGridBoxLine(30, getGridMaxY() - 1, DIR.Yminus, 5, "#8ec1f4");
  addGridBoxLine(25, getGridMaxY() - 1, DIR.Yminus, 3, "#2552d9");
  addGridBoxLine(20, getGridMaxY() - 1, DIR.Yminus, 1, "#0f228c");
}

function randBot() {
    clear()
    player.x = width/2;
    var min = 37;
    var max=39;
    var k;
    setInterval(function () {
        keys[k] = false;
        k = Math.floor(Math.random()*(max-min+1)+min);
        console.log(k);
        keys[k] = true;
    }, 600);
  }

  function update() {
    // check keys
    if (keys[38] || keys[32]) { // up arrow or space
      if (player.jumping < 1 && (player.grounded || player.jumping != 0)) {
        player.jumping += 1 / jumpControl;
        player.grounded = false;
        //player.velY = -player.speed * player.jumpForce / jumpControl;
        player.velY = -jumpForce * player.jumpForce / jumpControl;
      }
    } else {
      player.jumping = 0;
    }
    if (keys[39]) {             // right arrow
      if (player.velX < player.speed) {
        player.velX++;
      }
    }
    if (keys[37]) {             // left arrow
      if (player.velX > -player.speed) {
        player.velX--;
      }
    }

    if (player.grounded) {
      player.velX *= groundFriction;
    }
    player.velX *= airFriction;
    player.velY += gravity;
    player.velY *= airFriction;
    player.grounded = false;

    ctx.clearRect(0, 0, width, height);

    for (var i = 0; i < boxes.length; i++) {
        ctx.beginPath(); // TODO: remove
        ctx.fillStyle = "black";
        drawBox(boxes[i]);

        var dir = colCheck(player, boxes[i]);

        if (dir === "r") {
            player.velX = 0;
            if (keys[38] && player.walljump == true) {
                player.velY = -player.speed * player.walljumpForce * walljumpForceY;
                player.velX = player.velX - player.speed * player.walljumpForce * walljumpForceX;
           }
        } else if (dir === "l" ) {
            player.velX = 0;
            if (keys[38] && player.walljump == true) {
                player.velY = -player.speed * player.walljumpForce * walljumpForceY;
                player.velX = player.velX + player.speed * player.walljumpForce * walljumpForceX;
            }
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = 0;
        } else if (dir === "t") {
         player.velY *= -1;
        }
    }

    for (var i = 0; i <  execute.length; i++) {
      ctx.beginPath();
      drawExe(execute[i]);

      var dir = colCheck(player,  execute[i]);

      if (dir === "r" || dir === "l" || dir === "b" || dir === "t") {
          var code = execute[i].code;
          execute.splice(i,1);
          code();
      }
    }

    if(player.grounded) {
        player.velY = 0;
    }

    player.x += player.velX;
    player.y += player.velY;

    drawPlayer(player);

    requestAnimationFrame(update);
}

function drawBox(p1) {
    ctx.fillStyle = p1.color;
    ctx.rect(p1.x, p1.y, p1.width, p1.height);
    ctx.fill();
    ctx.closePath();
}
function drawExe(p1) {
    ctx.fillStyle = p1.color;
    ctx.rect(p1.x, p1.y, p1.width, p1.height);
    ctx.fill();
    ctx.closePath();
}


function drawPlayer(p1) {
    ctx.fill();
    ctx.fillStyle = p1.color;
    ctx.fillRect(p1.x, p1.y, p1.width, p1.height);
}

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
         } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

window.addEventListener("load", function () {
    update();
});

level1();
