let canvas = document.querySelector('#board')
let ctx = canvas.getContext('2d')
let blocksize = 25
let col = 20
let row = 20
canvas.width = col * blocksize
canvas.height = row * blocksize
let snakex = 5 * blocksize
let snakey = 5 * blocksize
let foodx,foody
let vx = 0,vy = 0
let body = []
body.push([snakex,snakey])
let newbodyx,newbodyy
function drawbody() {
    for(let i = body.length - 1; i >= 1; i --) {
        body[i][0] = body[i-1][0]
        body[i][1] = body[i-1][1]
    }
    body[0][0] = snakex
    body[0][1] = snakey
    for(let i=0; i<body.length; i++) {
        ctx.fillStyle = "rgb(86,255,255)"
        ctx.fillRect(body[i][0],body[i][1],blocksize,blocksize)
    }
}
function eat() {
    if(snakex == foodx && snakey == foody){
        body.push([newbodyx,newbodyy])
        ramdomfood()
    }
}
function drawhead() {
    ctx.fillStyle = "rgb(0,0,255)"
    ctx.fillRect(snakex,snakey,blocksize,blocksize)
}
function ramdomfood() {
    foodx = Math.floor(Math.random()*col)*blocksize
    foody = Math.floor(Math.random()*row)*blocksize
}
function drawfood() {
    ctx.fillStyle = "rgb(255,255,86)"
    ctx.fillRect(foodx,foody,blocksize,blocksize)
}
function update() {
    ctx.fillStyle = "rgb(67,67,67)"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    drawfood()
    if(body.length != 0) {
        drawbody()
    }
    drawhead()
}
ramdomfood()
update()
// change direction
window.onkeydown = function(e) {
    if(e.key == 'w' && vy != 1){
        vy = -1
        vx = 0
    }
    if(e.key == 'a' && vx != 1){
        vy = 0
        vx = -1
    }
    if(e.key == 's' && vy != -1){
        vy = 1
        vx = 0
    }
    if(e.key == 'd' && vx != -1){
        vy = 0
        vx = 1
    }
}
setInterval(function() {
    gameover()
    eat()
    snakex += vx * blocksize
    snakey += vy * blocksize
    moveout()
    update()
},200)
function moveout () {
    if(snakex < 0) snakex = canvas.width
    else if(snakex > canvas.width) snakex = 0
    else if(snakey < 0) snakey = canvas.height
    else if(snakey > canvas.height) snakey = 0
}
function gameover() {
    islose = false
    for(let i=1; i<body.length; i++) {
        if(body[i][0] == body[0][0] && body[i][1] == body[0][1]){
            alert('GAME OVER')
            location.reload()
        }
    }
}