/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var floresta, florestaImg, invisibleGround;

var borboleta, borboletaImg, borboletaGroup;

var menino, meninoImg;

var score=0;

var gameOver, restart;

function preload(){
  meninoImg = loadImage("menino.png");
  florestaImg = loadImage("floresta.jpg");
  gameOverImg = loadImage("fimdejogo.png");
  restartImg = loadImage("restart.png");
  jumpSound = loadSound("jump.wav");
  borboletaImg= loadImage("borboleta.jpg");
  
}

function setup() {
  createCanvas(800, 400);

  //floresta = createSprite(800,400,400,400);
  //floresta.addImage(florestaImg);
 // floresta.scale=0.3
  //jungle.x = width /2;

  menino = createSprite(50,200,20,50);
  menino.addImage(meninoImg);
  menino.scale = 0.15;
  menino.setCollider("circle",0,0,300)
    
  invisibleGround = createSprite(400,350,1600,10);
  invisibleGround.visible = false;

  gameOver = createSprite(400,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(550,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  
  borboletaGroup = new Group();
  
  
  score = 0;

}

function draw() {
  background(florestaImg);
  
  
   
  if (gameState===PLAY){

  
    if(keyDown("space")&& menino.y>270) {
      jumpSound.play();
      menino.velocityY = -16;
    }
  
    //menino.velocityY = menino.velocityY + 0.8
    borble();
    //spawnObstacles();

    menino.collide(invisibleGround);
    
   
    // if(borboleta.collided(menino)){
    //   score = score + 1;
    //   borboleta.destroyEach();
    // }
  }
  else if (gameState === END) {
    gameOver.x = 200;
    restart.x = 300
    gameOver.visible = true;
    restart.visible = true;
    menino.velocityY = 0;
    
    borboleta.setVelocityXEach(0);


    borboleta.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
        reset();
    }
  }

  /*else if (gameState === WIN) {
    
    menino.velocityY = 0;
    borboletaGroup.setVelocityXEach(0);
    borboletaGroup.setLifetimeEach(-1);
  */}
  
  
  // drawSprites();

  // textSize(20);
  // stroke(3);
  // fill("black")
  // text("Score: "+ score,50);
  
  if(score >= 5){
    menino.visible = false;
    textSize(30);
    stroke(3);
    fill("black");
    text("Parabéns!! Você venceu o jogo!! ", 70,200);
    gameState = WIN;
  }


function borble() {
 

    var borboletas = createSprite(500,330,40,10);
    borboletas.addImage(borboletaImg);
    //shrub.velocityX = -(6 + 3*score/100)
    borboletas.scale = 0.6;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: borboletas.addImage(borboletaImg);
              break;
      case 2: borboletas.addImage(borboletaImg);
              break;
      case 3: borboletas.addImage(borboletaImg);
              break;
      default: break;
    }
      if(rand === 1){
        borboletas.positionY = 200;
        borboletas.positionX = 200;
      } if(rand === 2){
        borboletas.positionY = 300;
        borboletas.positionX = 150;
      }if(rand === 3){
        borboletas.positionY = 400;
        borboletas.positionX = 320;
      }
       
    // borboleta.scale = 0.05;
    borboletas.lifetime = 600;
    
    //borboleta.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
    borboletaGroup.add(borboletas);
    
  }
  



function reset(){
  gameState = PLAY;
  gameOver.visible = true;
  restart.visible = true;
  menino.visible = true;
  borboletaGroup.destroyEach();
  score = 0;
}

