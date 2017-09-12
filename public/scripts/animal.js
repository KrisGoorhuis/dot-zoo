function Animal(canvasWidth, canvasHeight) {
   
   this.radius = 10; 
   this.color = "#F5004A";
   this.earColor = "#D2691E";
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
   };
   
   this.drawEars = function(context) {
      // left ear
      context.beginPath();
      context.arc(this.x - this.earOffset, this.y - this.earOffset, 3, 0.55*Math.PI, 0.05*Math.PI, false);
      context.strokeColor = this.earColor;
      context.stroke();
      context.closePath();
      
      // right ear
      context.beginPath();
      context.arc(this.x + this.earOffset, this.y - this.earOffset, 3, 0.95*Math.PI, 0.25*Math.PI, false);
      context.strokeStyle = this.earColor;
      context.stroke();
      context.closePath();
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

function Cat(canvasWidth, canvasHeight) {

   Animal.call(this, canvasWidth, canvasHeight);
   this.color = "#F5AA4A";
   this.drawEars = function(context) {
      // left ear
      context.beginPath();
      context.moveTo(this.x - this.earOffset - 2, this.y - this.earOffset + 3);
      context.lineTo((this.x - this.earOffset - 3), (this.y - this.earOffset - 4));
      context.strokeColor = this.earColor;
      context.stroke();
      context.lineTo((this.x - this.earOffset) + 3, (this.y - this.earOffset - 2));
      context.stroke();
      
      
      // right ear
      context.beginPath();
      context.moveTo(this.x + this.earOffset + 2, this.y - this.earOffset + 3);
      context.lineTo((this.x + this.earOffset + 3), (this.y - this.earOffset - 4));
      context.strokeColor = this.earColor;
      context.stroke();
      context.lineTo((this.x + this.earOffset) - 3, (this.y - this.earOffset - 2));
      context.stroke();
   };
}



