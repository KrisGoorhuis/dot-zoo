class Animal {
   constructor(canvasWidth, canvasHeight) {
      this.radius = 10; 
      this.color = "blue";
      this.vectorX = 0;
      this.vectorY = 0;
      this.movementFrequency = 2000;
      this.movementSpeed = 7; 
      this.x = Math.floor(Math.random() * ((canvasWidth - this.radius) + this.radius));
      this.y = Math.floor(Math.random() * ((canvasHeight - this.radius) + this.radius));
   }
}





