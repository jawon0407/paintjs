const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const clear = document.querySelector("#jsClear");
const save = document.querySelector("#jsSave");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

//canvas.width,height를 주는 이유 => 우리가 보이는건 css로부터 값을 받아서 보여지는것 하지만 js에서 가져올때는 css를 인식을 못해서 따로 width,height를 부여해줘야 인식함.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

//false => 실행X 초기 변수값은 false로 지정
let painting = false;
let filling = false;

function stopPainting(event){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    //!painting = (painting === false) 
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size; 
}

function handleModeChange(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleClear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleCanvasClick(){
    //해당 변수가 존재하는지 확인하고 함수를 실행시키는 작업
    if(filling){
    ctx.fillStyle = ctx.strokeStyle;
    //fillRect => fillrectangle x,y,width,height값 지정
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
}

function handleSaveClick(){
    //canvas img URL 변수 설정
    const image = canvas.toDataURL();
    //링크 태그를 만들기
    const link = document.createElement("a");
    //링크 태그를 해당 img URL변수로 이동할 수 있게 설정
    link.href = image;
    //타고간 url을 다운로드 시킴 다운로드는 해당 img의 파일 이름으로 설정
    link.download = "MyDrawing🎨"
    console.log(link);
    link.click();

}

//각 array의 값에 해당하는 element 즉, 색상들에 대해서 각각 함수를 지정하고 실행시키는 작업

Array.from(colors).forEach(color => color.addEventListener("click",changeColor))

//해당 변수가 존재하는지 확인하고 함수를 실행시키는 작업
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeChange);
}

if(clear){
    clear.addEventListener("click", handleClear);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}