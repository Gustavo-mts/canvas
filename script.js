let currentColor = 'black';

let screen = document.querySelector('#tela');
let context = screen.getContext('2d');
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

// adicionamos evento de click em todas as cores
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);


function colorClickEvent(e) {
    //color recebe o atributo de data-color(a cor)
    let color = e.target.getAttribute('data-color');
    // currentColor recebe a cor. Quando você clica na cor, ela se torna a atual
    currentColor = color;

    // removemos o active da cor anterior
    document.querySelector('.color.active').classList.remove('active');
    // adicionamos active na cor clicada
    e.target.classList.add('active');
}

function mouseDownEvent() {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

// quando movimentamos o mouse
function mouseMoveEvent(e) {
    // se canDraw for true
    if(canDraw) {
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent() {
    // quando deixamos de apertar
    canDraw = false;
}

function draw(x,y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    context.beginPath();
    context.lineWidth = 5;
    context.lineJoin = 'round';
    context.moveTo(mouseX, mouseY);
    context.lineTo(pointX, pointY);
    context.closePath();
    context.strokeStyle = currentColor;
    context.stroke();

    mouseX = pointX;
    mouseY = pointY;

}

function clearScreen() {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}
