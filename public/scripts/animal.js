function Animal(canvasWidth, canvasHeight) {
   
   this.radius = 10; 
   this.color = "#F5004A";
   this.earColor = "#F5004A";
   this.earOffset = 7;
   this.vectorX = 0;
   this.vectorY = 0;
   this.movementFrequency = 2000;
   this.movementSpeed = 7; 
   this.x = Math.floor(Math.random() * ((canvasWidth - this.radius) - this.radius) + this.radius);
   this.y = Math.floor(Math.random() * ((canvasHeight - this.radius) - this.radius) + this.radius);
     
   this.drawBody = function(context) {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();     
      if (this.additionalBodyDraw) {
         this.additionalBodyDraw(context);
      }
   };
   
   this.startAmbulating = function(self, canvas) {
      
      var maxTravelTime = 500; // These values were chosen through testing what felt best. No real logic to it.
      var travelSpeedDivisor = 100;
      var movementUpdateRate = 5;
      var movementFrequencyBase = (Math.random() * 2000) + 500; 
          
      function newVector() {
         return (Math.random() * 10) - 5;
      }

      function moveAlongVector() {
         setTimeout(function() {
            var currentX = self.x; // In the interest of making if statements more intelligible
            var currentY = self.y;
            var radius = self.radius;
            
            var travelIncrementX = ((self.vectorX) / travelSpeedDivisor) * self.movementSpeed;
            var travelIncrementY = ((self.vectorY) / travelSpeedDivisor) * self.movementSpeed;
            
            if (self.travelTimeRemaining > 0) {
               self.travelTimeRemaining --;
               
               if (currentX + travelIncrementX - radius > 0 && currentX + travelIncrementX + radius < canvas.width) {
                   self.x += travelIncrementX;
               }
               if (currentY + travelIncrementY - radius > 0 && currentY + travelIncrementY + radius < canvas.height) {
                  self.y += travelIncrementY;
               }        
               
               moveAlongVector();
            } 
         }, movementUpdateRate);      
      }

      
      // Smoother start:
      setTimeout(function() {
         self.vectorX = newVector();
         self.vectorY = newVector();
         self.travelTimeRemaining = Math.floor(Math.random() * maxTravelTime);
         moveAlongVector();
      }, (Math.random() * 2000));
     
      // New movements every couple seconds
      setInterval(function() {
         self.vectorX = newVector();
         self.vectorY = newVector();
         self.travelTimeRemaining = Math.floor(Math.random() * maxTravelTime);
         moveAlongVector();
      }, self.movementFrequency + movementFrequencyBase);
   };
   
}

function Bear(canvasWidth, canvasHeight) {
   Animal.call(this, canvasWidth, canvasHeight);
   this.drawEars = function(context) {
      context.lineWidth = 3;
      
      // left ear
      context.beginPath();
      context.arc(this.x - this.earOffset, this.y - this.earOffset, this.earRadius, 0.55*Math.PI, 0.05*Math.PI, false);
      context.strokeStyle = this.earColor;
      context.stroke();
      context.closePath();
      
      // right ear
      context.beginPath();
      context.arc(this.x + this.earOffset, this.y - this.earOffset, this.earRadius, 0.90*Math.PI, 0.45*Math.PI, false);
      context.strokeStyle = this.earColor;
      context.stroke();
      context.closePath();
   };
   this.radius = 15;
   this.earOffset = 10;
   this.earRadius = 5;
   
}

function ChocolateBear(canvasWidth, canvasHeight) {
   Bear.call(this, canvasWidth, canvasHeight);
   this.color = "#D2691E";
   this.earColor = "#D2691E";
}

function BlackBear(canvasWidth, canvasHeight) {
   Bear.call(this, canvasWidth, canvasHeight);
   this.color = "#000000";
   this.earColor = "#000000";
}



function Cat(canvasWidth, canvasHeight) {
   Animal.call(this, canvasWidth, canvasHeight);
   this.drawEars = function(context) {
      context.lineWidth = 2;
      
      // left ear
      context.beginPath();
      context.moveTo(this.x - this.earOffset - 2, this.y - this.earOffset + 3);
      context.lineTo((this.x - this.earOffset - 3), (this.y - this.earOffset - 4));
      context.strokeStyle = this.earColor;
      context.stroke();
      context.lineTo((this.x - this.earOffset) + 3, (this.y - this.earOffset - 2));
      context.stroke();   
      context.closePath();
      
      // right ear
      context.beginPath();
      context.moveTo(this.x + this.earOffset + 2, this.y - this.earOffset + 3);
      context.lineTo((this.x + this.earOffset + 3), (this.y - this.earOffset - 4));
      context.strokeStyle = this.earColor;
      context.stroke();
      context.lineTo((this.x + this.earOffset) - 3, (this.y - this.earOffset - 2));
      context.stroke();
      context.closePath();
   };
}

function OrangeCat(canvasWidth, canvasHeight) {
   Cat.call(this, canvasWidth, canvasHeight);
   this.color = "#FFA500";
   this.earColor = "#FFA500";
}

function RussianBlueCat(canvasWidth, canvasHeight) {
   Cat.call(this, canvasWidth, canvasHeight);
   this.color = "#94a9b7";
   this.earColor = "#94a9b7";
}

function CalicoCat(canvasWidth, canvasHeight) {
   Cat.call(this, canvasWidth, canvasHeight);
   this.color = "#ffffff";
   this.earColor = "#ffffff";
   function spotOffset() {
      return (Math.random() * 10) - 5;
   }
   this.blackSpotXOffset = spotOffset();
   this.blackSpotYOffset = spotOffset();
   this.orangeSpotXOffset = spotOffset();
   this.orangeSpotYOffset = spotOffset();
   
   this.additionalBodyDraw = function(context) {
      context.beginPath();
      context.arc(this.x + this.blackSpotXOffset, this.y + this.blackSpotYOffset, 3, 0, 2*Math.PI, false);
      context.fillStyle = "#1e1e1e";
      context.fill();
      context.closePath();
      
      context.beginPath();
      context.arc(this.x + this.orangeSpotXOffset, this.y + this.orangeSpotYOffset, 3, 0, 2*Math.PI, false);
      context.fillStyle = "#FFA500";
      context.fill();
      context.closePath();
   };
}
