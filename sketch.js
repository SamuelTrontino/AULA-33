const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var corda,corda2,corda3,ligacao,ligacao2,ligacao3
var fruta,frutaimg
var fundo,coelhoimg,coelho
var botao,botao2,botao3
var piscando,comendo,triste
var botaomute
var balao
var fundoM,comendoM,tristeM,cordaM,balaoM

var telaL,telaA
var mobile = /iPhone|iPad|iPod|Android/i.test(navegator.userAgent)


function preload(){
  frutaimg = loadImage("coelho/fruta.png")
  coelhoimg = loadImage("coelho/rabbit.png")
  fundo = loadImage("coelho/background.png")
  piscando = loadAnimation("coelho/blink_1.png","coelho/blink_2.png","coelho/blink_3.png")
  comendo = loadAnimation("coelho/eat_0.png","coelho/eat_1.png","coelho/eat_1.png","coelho/eat_2.png","coelho/eat_3.png","coelho/eat_4.png")
  triste = loadAnimation("coelho/sad_1.png","coelho/sad_2.png","coelho/sad_3.png")

  fundoM = loadSound("coelho/fundo.mp3")
  comendoM = loadSound("coelho/comendo_sound.mp3")
  tristeM = loadSound("coelho/triste.wav")
  cordaM = loadSound("coelho/cortar.mp3")
  balaoM = loadSound("coelho/air.wav")

  piscando.playing = true
  comendo.playing = true
  triste.playing = true
  triste.looping = false
  comendo.looping = false
  
}

function setup() {
  if(mobile){
    telaL = displayWidth
    telaA = displayHeight
    createCanvas(telaL+80,telaA)
  }else{
    telaL = windowWidth
    telaA = windowHeight
    createCanvas(telaL,telaA)

  }
  frameRate(80);
  fundoM.play()
  fundoM.setVolume(0.2)
  piscando.frameDelay = 20
  comendo.frameDelay = 20
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200, 680, 600, 20);
  corda = new Rope(5, { x: width/2, y: 30 })
  corda2 = new Rope(5, { x: width/2+210, y: 100 })
  corda3 = new Rope(5, { x: width/2-200, y: 100 })
  
  fruta = Bodies.circle(width/2,150,20)
  Composite.add(corda.body,fruta)
  ligacao = new Ligacao(corda,fruta)
  ligacao2 = new Ligacao(corda2,fruta)
  ligacao3 = new Ligacao(corda3,fruta)
  coelho = createSprite(width/2-100,height-100)
  coelho.addAnimation("piscando",piscando)
  coelho.addAnimation("comendo",comendo)
  coelho.addAnimation("triste",triste)
  coelho.scale = 0.2 
  botao = createImg ("coelho/botao.png")
  botao.position(width/2-30,20)
  botao.size(50,50)
  botao.mouseClicked(cortar)

  botao2 = createImg ("coelho/botao.png")
  botao2.position(width/2+200,100)
  botao2.size(50,50)
  botao2.mouseClicked(cortar2)

  botao3 = createImg ("coelho/botao.png")
  botao3.position(width/2-200,100)
  botao3.size(50,50)
  botao3.mouseClicked(cortar3)



  botaomute = createImg ("coelho/mute.png")
  botaomute.position(50,20)
  botaomute.size(50,50)
  botaomute.mouseClicked(parar)

  /*balao = createImg ("coelho/balloon.png")
  balao.position(40,200)
  balao.size(100,70)
  balao.mouseClicked(soprar)*/
  
  
  
}

function draw() {
  Engine.update(engine);

  background(51);
  image (fundo,0,0,telaL,telaA)
  ground.show();
  corda.show();
  corda2.show()
  corda3.show()
  
  push()
  imageMode(CENTER)
  if(fruta!==null){
    image(frutaimg,fruta.position.x,fruta.position.y,90,90)

  }
  pop()


  if(colisao(fruta,coelho)==true){
    coelho.changeAnimation("comendo")
    fundoM.stop()
    comendoM.play()
  }
  if(fruta!==null&&fruta.position.y>=650){
    coelho.changeAnimation("triste")
    fruta = null
    fundoM.stop()
    tristeM.play()

  }


drawSprites()
}

function cortar(){
corda.break()
ligacao.soltar()
ligacao=null
cordaM.play()
}

function cortar2(){
  corda2.break()
  ligacao2.soltar()
  ligacao2=null
  cordaM.play()
  }

  function cortar3(){
    corda3.break()
    ligacao3.soltar()
    ligacao3=null
    cordaM.play()
    }

function colisao(body,sprite){
  if(body!==null){
    var distancia = dist(
      body.position.x,body.position.y,
      sprite.position.x,sprite.position.y
    )
      if(distancia<=80){
        World.remove(world,fruta)
        fruta = null
        return true
        
      }else{
        return false

      }
  }
}
function soprar(){
  Body.applyForce(fruta,{x:0,y:0},{x:0.02,y:0})
  balaoM.play()

}
function parar(){
  if(fundoM.isPlaying()){
   fundoM.stop() 


  }
  else{
    fundoM.play()
    fundoM.setVolume(0.2)
  }
}
