
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//making Sprites
var garden, bee, cloud, obstacle, bg, iG, rock,go,sun

//making sounds
var honeyS, goS

//making scoring systems
var score, HoneyCollected

//making groups
var rocksG, obsG

//making images
var beeImg, cloudImg, bgImg, honey, frogImg, honeyImg, rockImg, gardenImg, goImg, fireImg, netImg,sunImg

function preload(){
  //preloading animations
  beeImg=loadAnimation("bee1.png","bee.png");
  cloudImg=loadAnimation("cloud.png","cloud1.png");
  sunImg=loadAnimation("sun.png","sun1.png");
  
  //preloading images
  honeyImg=loadImage("real_honey.png");
  rockImg=loadImage("rocks.png");
  gardenImg=loadImage("Garden1.png");
  goImg=loadImage("Game_Over.png");
  fireImg=loadImage("fire.png");
  netImg=loadImage("net.png");
  frogImg=loadImage("frog.png");
  
  //preloading sounds
  honeyS=loadSound("Achievment_sound_1.m4a");
  goS=loadSound("Piano_crash_sound.m4a");
  bgS=loadSound("Hes_a_pirate.mp3");
}

function setup() {
  createCanvas(400,400);

      bgS.loop();
  
  
  //creating farm background
  garden=createSprite(200,180, 20, 10);
  garden.addImage(gardenImg);
  garden.scale=9;
  
 
  

  iG=createSprite(200,250, 400, 10);
  
  //creating bee
  bee=createSprite(50, 240, 10,10);
  bee.addAnimation("running", beeImg);
  bee.scale=0.4;
  bee.setCollider("rectangle",0,0,bee.width,bee.height);
  bee.debug = true
  
  //creating bee
  sun=createSprite(350, 40, 10,10);
  sun.addAnimation("crumb", sunImg);
  sun.scale=0.7;
    
  
  //creating groups
  rocksG = createGroup();
  obsG = createGroup();
  honeyG = createGroup();
  cloudsG=createGroup();
  
  //displaying score
       score = 0;
  //displating honey collected
     HoneyCollected = 0;
}
 
function draw() {
  background(400)

  
   if(gameState === PLAY){
     garden.velocityX = -(4 + 3* score/100)
     score = score + Math.round(getFrameRate()/60);
     
    
  
   stroke("black");
    fill("darkgrey");
    textSize(15);
   text("Score: "+ score,10,70);
  
  stroke("yellow");
    fill("black");
    textSize(15);
  text("Honey Collected: "+ HoneyCollected , 10,40);
     
      if (garden.x < 10){
        garden.x = garden.width/2;
    }
     
      if (iG.x < 0){
        iG.x = iG.width/2;
    }
     
     garden.velocityX=-4
      score = score + Math.round(getFrameRate()/60);
     
    //jump when the space key is pressed
    if(keyDown("space")&& bee.y >= 150) {
        bee.velocityY = -10;
    }
     
    //add gravity
    bee.velocityY = bee.velocityY + 0.8
     
    //spawn the Obstacles
    spawnObstacles();
  
    //spawn rocks
    spawnRocks();
     
     spawnHoney();
     

     
    if(obsG.isTouching(bee)){
        //trex.velocityY = -12;
        goS.play();
        gameState = END;        
    }
     
    
     
    if(honeyG.isTouching(bee)){
        //trex.velocityY = -12;
        honeyS.play();
        HoneyCollected=HoneyCollected+1;
        honey.destroy();
    }
     
}else if(gameState === END){
  score=0;
  honeyCollected=0;
  
  background("black")
  
  garden.scale=0.36;
  garden.addImage(goImg);
  garden.x=225;
  garden.y=200;
  garden.velocityX=0;
  
  
  bee.destroy();
  sun.destroy();
  obsG.destroyEach();
  rocksG.destroyEach();
  honeyG.destroyEach();
}
   bee.collide(iG);
   iG.visible=false; 
   
   drawSprites();
}

  function spawnRocks() {
  //code to spawn the rocks
  if (frameCount % 120 === 0) {
    var rock = createSprite(390,285,40,10);
    rock.addImage(rockImg);
    rock.scale = 0.5;
    rock.velocityX = -3;
    
     //assign lifetime to the variable
    rock.lifetime = 200;
    
    //adjust the depth
    rock.depth = bee.depth;
    bee.depth = bee.depth + 1;
    
    //add each cloud to the group
    rocksG.add(rock);
  }}
    function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(390,210,10,40);
   obstacle.y = Math.round(random(200,120));
   obstacle.velocityX = -(5 + score/100);
   obstacle.scale=0.08  ;
     
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(netImg);
        obstacle.scale=0.4
              break;
      case 2: obstacle.addImage(fireImg);
        obstacle.scale=0.08  ;
              break;
      case 3: obstacle.addImage(frogImg)
        obstacle.scale=0.02;
              break;
      default: break;
    }
      //add each cloud to the group
      obsG.add(obstacle);
 }}
      
function spawnHoney() {
  //write code here to spawn the clouds
  if (frameCount % 55 === 0) {
    honey = createSprite(390,90,40,10);
    honey.y = Math.round(random(220,120));
    honey.addImage(honeyImg);
    honey.scale = 0.7;
    honey.velocityX = -(7 + score/100);
    
     //assign lifetime to the variable
    honey.lifetime = 200;
    
    //add each cloud to the group
    honeyG.add(honey);
  }
}
  
  
   