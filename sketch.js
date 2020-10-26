//Create variables here
var dog;
var dogImg,happyDogImg;
var database;
var foodS,foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.175;

  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  //add styles here
  noStroke();
  textSize(15);
  fill("white");
  text("Food remaining: "+foodStock,175,180);

  textSize(15);
  fill("white");
  text("Note: Press UP_ARROW Key to Feed Jackie treats!!!!",100,30);

  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    food: x
  })
}