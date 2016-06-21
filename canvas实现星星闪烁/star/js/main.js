var can;
var ctx;

var w;
var h;

var girlPic = new Image();
var starPic = new Image();

var num = 60;
var stars = [];

var lastTime; //上一次刷新的实间
var deltaTime; //两帧之间的时间差

var switchy = false;
var life=0; //透明度
//初始化
function init(){  
	can = document.getElementById("canvas");
	ctx = can.getContext("2d");

	w = can.width;
	h = can.height;
  
	document.addEventListener("mousemove",mousemove,false);

	girlPic.src = "src/girl.jpg";
	starPic.src = "src/star.png";

	for(var i=0;i<num;i++)
	{
		var obj = new starObj();
		stars.push(obj);
		stars[i].init();
	}
	
	lastTime = Date.now();//获取当前时间

  gameloop();
}

document.body.onload = init;

//用来刷新canvas画布
function gameloop(){
	window.requestAnimFrame(gameloop);  //循环调用gameloop 智能分析时间！

	var now = Date.now();
	deltaTime=now-lastTime; //得到时间差
	lastTime = now; //当前事间变成了上一帧的时间

	drawBackground();
	drawGirl();
	drawStars();
	aliveUpdate();
}

//绘制背景
function drawBackground(){
	ctx.fillStyle ="#393550";
	ctx.fillRect(0, 0, w, h);
}

//绘制女孩图片
function drawGirl(){
	//drawImage(img, x, y, width, height);
	ctx.drawImage(girlPic,100,150,600,300);
}

//鼠标监听
function mousemove(e){
	if (e.offsetX || e.layerX) 
	{
		var px = (e.offsetX == undefined)? e.layerX:e.offsetX;
		var py = (e.offsetY == undefined)? e.layerY:e.offsetY;	

		//out switchy=false;in switchy=true;
		if(px>100 && px<700 && py>150 && py<450)
		{
			switchy=true;
		}
		else
		{
			switchy=false;
		}
			// console.log(switchy);
	} 
}