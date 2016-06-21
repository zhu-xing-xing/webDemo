//创建一个类
var starObj=function(){
	this.x;
	this.y;

	this.picNo;
	this.timer;
}

//给类定义一些方法

starObj.prototype.init = function(){
	this.x=Math.random()*600 +100; //Math.random()返回[0,1)  
	this.y=Math.random()*300 +150; //不同星星，不同的坐标位置

	this.picNo=Math.floor(Math.random()*7); //math.floor与之接近最小的整数
	this.timer= 0;

	this.xSpd=Math.random()*3-1.5; //随机得到[0,1)，然后乘3得到[0,3)，
	this.ySpd=Math.random()*3-1.5;  //减去1.5，得到[-1.5,1.5)
}

//
starObj.prototype.update = function(){
	this.x+=this.xSpd*deltaTime*0.003;
	this.y+=this.ySpd*deltaTime*0.003;

	//重生判断
	//this.x超出范围，init
	if(this.x<100-7 || this.x>700-7){
		this.init();
		return;
	}

	//this.y超出范围，init	
	if(this.y<150+7 || this.y>450-7){
		this.init();
		return;
	}

	this.timer+=deltaTime; //timer的累加是为了延长绘制两个星星的时间间隔
	if(this.timer>50)  //即上一个星星绘制完，过50s再绘制下一个星星
	{
		this.picNo+=1;
		this.picNo%=7;
		this.timer=0;
	}
}


//绘制星星
starObj.prototype.draw = function(){
	//save()
	ctx.save();

	//globalAlpha全局透明度
	ctx.globalAlpha=life;

	//drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
	ctx.drawImage(starPic,this.picNo*7,0,7,7,this.x,this.y,7,7);

	//restore()
	ctx.restore();
}

function drawStars()
{
	for(var i=0;i<num;i++)
	{
		stars[i].update();
		stars[i].draw();
	}
}

function aliveUpdate(){	
	if(switchy){   //show star
			life+=0.03*deltaTime*0.05;
			if(life>1)
			{
				life=1;
			}
	}
	else  //hide star
	{
		life-=0.03*deltaTime*0.05;
		if(life<0){
			life=0;
		}
	}
}