var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backGround,backgroundImg;
var eagleImg, eagle;
var birdsImg, birds;
var resetImg, reset;
var gameOverImg, gameOver;

var distance = 0;

function preload() {
  backgroundImg = loadImage("images/background.jpg");
  eagleImg = loadImage("images/eagle.png");
  birdsImg = loadImage("images/birds.png");
  resetImg = loadImage("images/reset.png");
  gameOverImg = loadImage("images/gameOver.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  
  backGround = createSprite(windowWidth,windowHeight/2);
  backGround.addImage(backgroundImg);
  backGround.scale = 5;

  eagle = createSprite(50,height-70,20,50);
  eagle.addImage(eagleImg);
  eagle.scale = 0.5;
  
  gameOver = createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.7;
  gameOver.visible = false;
  
  restart = createSprite(width/2,height/1.7);
  restart.addImage(resetImg);
  restart.scale = 0.5;
  restart.visible = false;
  
  birdsGroup = new Group();
  distance = 0;
}

function draw() {
  background("white");
  eagle.y = mouseY
  
  if (gameState === PLAY){
    distance = distance + Math.round(getFrameRate()/60);
    backGround.velocityX = -(6 + 3*distance/100);
    eagle.velocityY = eagle.velocityY + 0.8
    
    if (backGround.x < 0){
      backGround.x = width/2;
    }
    spawnBirds();
    console.log(backGround.x);
    
    if(birdsGroup.isTouching(eagle)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    backGround.velocityX = 0;
    eagle.velocityY = 0;
    birdsGroup.setVelocityXEach(0);
    
    birdsGroup.setLifetimeEach(-1);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
  
  textSize(20);
  fill("black");
  text("Distance: "+ distance, 1110,50);
}
function spawnBirds() {
  if(frameCount % 60 === 0) {
    var birds = createSprite(width-10,Math.round(random(50,height-50)));
    birds.addImage(birdsImg);
    birds.velocityX = -(6 + 3*distance/100);
    birds.scale = 0.10;
    birds.lifetime = 300;
    birdsGroup.add(birds);
  }
}
function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  birdsGroup.destroyEach();
  distance = 0;
}