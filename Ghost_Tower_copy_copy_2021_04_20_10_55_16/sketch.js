var tower;
var ghostRunner;
var door;
var climber;


function preload(){
    towerIMG = loadImage("tower.png");
    ghostIMG = loadImage("ghost-standing.png");
    doorIMG = loadImage("door.png");
    climberIMG = loadImage("climber.png");
    jump_ghost = loadImage("ghost-jumping.png");

}
function setup(){
    createCanvas(600,600);
    tower = createSprite(300,300,100,100);
    tower.addImage(towerIMG);

    ghostRunner = createSprite(300,360,30,10);
    ghostRunner.addAnimation("Standing",ghostIMG);
    ghostRunner.addAnimation("Jumping",jump_ghost);
    ghostRunner.scale = 0.3;

    invisibleBlockG = new Group();
    climberG = new Group();
    doorG = new Group();
}
function draw(){
    background("white");
    createEdgeSprites();

    tower.velocityY = 5;
    if(tower.y > 500 ){
        tower.y = width/2
    }

    if(keyWentDown("space")){
        ghostRunner.velocityY = -6;
        ghostRunner.changeAnimation("Jumping",jump_ghost);
    }       
    ghostRunner.velocityY = ghostRunner.velocityY + 0.7 ;
    ghostRunner.velocityX = 0;

    spawnClimbers();

    if((ghostRunner.y > 650) || ghostRunner.isTouching(invisibleBlockG)){
        text("GAME OVER",300,300);
        tower.destroy();
        climberG.destroyEach();
        doorG.destroyEach();
    }                     
    if(keyDown("left")){
        ghostRunner.velocityX = -6;
    }   
    if(keyDown("right")){
        ghostRunner.velocityX = 6;
    }
    ghostRunner.collide(climberG);

    
    
    if(frameCount % 1000 === 0){
        door.velocityY = door.velocityY + 1;
        climber.velocityY = climber.velocityY + 1;
        InvisibleBlock.velocityY = InvisibleBlock.velocityY + 1;
    }
      
    drawSprites();
} 
function spawnClimbers(){                 
    
    if(frameCount % 200 === 0){
        door = createSprite(Math.round(random(100,500)), -160,10,10);
        climber = createSprite(door.x,-90,40,30);
        InvisibleBlock = createSprite(door.x,-75,climber.width,10);

    if(ghostRunner.isTouching(climberG)){
        ghostRunner.velocityY = climber.velocityY;
        ghostRunner.y = climber.y;
        }

        door.addImage(doorIMG);
        climber.addImage(climberIMG);

        InvisibleBlock.visible = false;
        invisibleBlockG.add(InvisibleBlock);

        climberG.add(climber);
        doorG.add(door);
        door.velocityY = climber.velocityY = InvisibleBlock.velocityY = 2;
        
        console.log(ghostRunner.depth);
        console.log(door.depth);
        ghostRunner.depth = door.depth + 1;

    }
    
    
}
