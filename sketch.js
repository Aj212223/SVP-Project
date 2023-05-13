const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var bgImg,background_Img;
var racer,racerImg;

var heart1,heart2,heart3;
var heart1Img,heart2Img,heart2Img;

var honeyComb;
var screw;
var track;
var tyre;

var leftBoundary,rightBoundary;

var life = 3;

var score = 0;

var gameState = "Moving";

var screwGroup;
var honeyCombGroup;
var tyreGroup;


function preload()
{
	racerImg = loadImage("assets/Runner-1.png");

	tyreImg = loadImage("assets/tyre.png");
	screwImg = loadImage("assets/Screw.png");
	honeyCombImg = loadImage("assets/bomb.png");

	heart1Img = loadImage("assets/heart_1.png");
    heart2Img = loadImage("assets/heart_2.png");
    heart3Img = loadImage("assets/heart_3.png");

    background_Img = loadImage("assets/track.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	bgImg = createSprite(displayWidth/2-60,displayHeight/2-90,300,800);
	bgImg.addImage(background_Img)
	bgImg.scale = 1;
	
   leftBoundary=createSprite(945,500,100,800);
   leftBoundary.visible = false;

   rightBoundary=createSprite(470,500,100,500);
   rightBoundary.visible = false;

   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
   heart1.addImage("heart1",heart1Img)
   heart1.scale = 0.4

   heart2 = createSprite(displayWidth-100,40,20,20)
   heart2.visible = false
   heart2.addImage("heart2",heart2Img)
   heart2.scale = 0.4

   heart3 = createSprite(displayWidth-150,40,20,20)
   heart3.addImage("heart3",heart3Img)
   heart3.scale = 0.4

   racer = createSprite(displayWidth-890, displayHeight-180, 50, 50);
   racer.addImage(racerImg)
   racer.scale =0.5;
   racer.debug = true
   racer.setCollider("rectangle",0,0,105,170)
     
   engine = Engine.create();
   world = engine.world;

   Engine.run(engine);
   screwGroup = new Group();
   honeyCombGroup = new Group();
   tyreGroup = new Group();
}


function draw() {
	background(0);

	racer.collide(leftBoundary);
	racer.collide(rightBoundary);

	
    
	if(gameState = "Moving"){ 

	bgImg.velocityY = 4;

	if(keyDown("RIGHT_ARROW")||touches.length>0){
		racer.x = racer.x+10
	  }
	  if(keyDown("LEFT_ARROW")||touches.length>0){
	   racer.x = racer.x-10
	  }

	if(bgImg.y > 400 ){
		bgImg.y = height/30;
	  }

	  if(screwGroup.isTouching(racer)){

		for(var i=0;i<screwGroup.length;i++){     
			 
		 if(screwGroup[i].isTouching(racer)){
			  screwGroup[i].destroy();
			  life --- 1;
		  } 
		
		}
	   }

	   if(honeyCombGroup.isTouching(racer)){

		for(var i=0;i<honeyCombGroup.length;i++){     
			 
		 if(honeyCombGroup[i].isTouching(racer)){
			honeyCombGroup[i].destroy();
		    life --- 1;  
	    	} 
		
		}
	   }

	   if(tyreGroup.isTouching(racer)){

		for(var i=0;i<tyreGroup.length;i++){     
			 
		 if(tyreGroup[i].isTouching(racer)){
			  tyreGroup[i].destroy();
			  life ---1;
		  } 
		
		}
	   }

	   if(life===3){
		heart3.visible = true
		heart1.visible = false
		heart2.visible = false
	  }
	  if(life===2){
		heart2.visible = true
		heart1.visible = false
		heart3.visible = false
	  }
	  if(life===1){
		heart1.visible = true
		heart3.visible = false
		heart2.visible = false
	  }
	
	  //go to gameState "lost" when 0 lives are remaining
	  if(life===0){
		heart1.visible = false
		heart3.visible = false
		heart2.visible = false
		gameState = "lost"
	  }

	  

	   
	   

    obstacle1();
	obstacle2();
	obstacle3();
	
	}

  drawSprites();
 
}

if(gameState == "lost"){
  
	textSize(100)
	fill("red")
  
	text("Sorry you lost...",300,200);
	honeyCombGroup.destroyEach();
	screwGroup.destroyEach();
	tyreGroup.destroyEach();
	racer.destroy();
	bgImg.velocityY = 0;
  
  }
  
  else if(gameState == "won"){
   
	textSize(100)
	fill("yellow")
	text("You Won ",400,400)
	honeyCombGroup.destroyEach();
	screwGroup.destroyEach();
	tyreGroup.destroyEach();
	racer.destroy();
  
  }  
  
function obstacle1(){
  if(frameCount%250===0){
    screw = createSprite(random(550,870),random(1,1),40,40)
    screw.velocityY = 4
    screw.addImage(screwImg)
    screw.scale = 0.02
    screw.debug= true
	life --- 1
    screw.setCollider("rectangle",0,0,400,400)
   
    screw.lifetime = 400
   screwGroup.add(screw)
  }

}

function obstacle2(){
	if(frameCount%150===0){
	  honeyComb = createSprite(random(550,870),random(1,1),40,40)
      honeyComb.velocityY = 4;
	  honeyComb.addImage(honeyCombImg)
	  honeyComb.scale = 0.1
	  honeyComb.debug= true
	  life --- 3
	  honeyComb.setCollider("rectangle",0,0,400,400)
	 
	  honeyComb.lifetime = 400
	 honeyCombGroup.add(honeyComb)
	}
  
  }

  function obstacle3(){
	if(frameCount%150===0){
	  tyre = createSprite(random(550,870),random(1,1),40,40)
	  tyre.velocityY = 4;
	  tyre.addImage(tyreImg)
	  tyre.scale = 0.07
	  tyre.debug= true
	  life --- 2
	  tyre.setCollider("rectangle",0,0,400,400)
	 
	  tyre.lifetime = 400
	 tyreGroup.add(tyre)
	}
  
  }



