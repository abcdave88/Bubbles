$(document).ready(function(){

  var canvas = document.getElementById('bubbles-canvas'),
      c = canvas.getContext("2d"),
      bubbles= [],
      bubbleIndex = 0,
      bubbleNum = Math.floor(Math.random() * 100)
      settings = {
        groundLevel: canvas.height * 4,
        leftWall: canvas.width * 0,
        rightWall: canvas.width * 2,
        ceiling: canvas.height * 0
      };

  canvas.width = "600";
  canvas.height = "600";

  document.body.appendChild(canvas);

  c.fillStyle = 'black';
  c.fillRect(0,0,canvas.width, canvas.height);


  function Bubble(maxPosX, maxPosY){
    this.posX = Math.floor(Math.random() * canvas.width);
    this.posY = Math.floor(Math.random() * canvas.height);
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;
    this.scale = Math.floor(Math.random() *50)
    this.minSpeed = 1;
    this.maxSpeed = 10;
    bubbleIndex ++;
    bubbles[bubbleIndex] = this;
    this.id = bubbleIndex;
    this.color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' +
     (Math.floor(Math.random() * 256)) + ',' + 
     (Math.floor(Math.random() * 256)) + ')';
  }

  Bubble.prototype.draw = function(){

    // document.body.addEventListener('click', this.click.bind(this));

    this.posX += this.vx;
    this.posY += this.vy;

    c.beginPath(); 

    c.arc(this.posX, this.posY, this.scale, 0, Math.PI * 2, false);

    c.strokeStyle = this.color; 
    c.stroke(); 


    if((this.posY + this.scale) > settings.groundLevel){
      this.vy *= -1;
      this.vx *= 1;
      this.posY = settings.groundLevel - this.scale;
    }

    if((this.posY - this.scale) < settings.ceiling){
      this.vy *= -1;
      this.vx *= 1;
      this.posY = settings.ceiling + this.scale;
    }

    if(this.posX - (this.scale) <= settings.leftWall){
      this.vx *= -1;
      this.posX = settings.leftWall + this.scale;
    }

    if(this.posX + (this.scale) >= settings.rightWall){
      this.vx *= -1;
      this.posX = settings.rightWall - this.scale;
    }
  };


  // Bubble.prototype.popBubble = function(){
  //   delete bubbles[this.id];
  // }

  // Bubble.prototype.click = function(event){
  //   this.popBubble();
  // }

  for (var i = 0; i < bubbleNum; i++ ){
    bubbles.push(new Bubble());
  }
  
  setInterval(function(){
    c.fillStyle = 'black';
    c.fillRect(0,0,canvas.width, canvas.height);
    for (var i in bubbles){
      bubbles[i].draw();
    }
  }, 30)

});