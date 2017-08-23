

$(document).ready(function() {
   var canvasWidth = 408;
   var canvasHeight = 408;
   var framerate = 1000/60; // frames per second
   
   $("canvas").attr('width', canvasWidth);
   $("canvas").attr('height', canvasHeight);  
   var canvas = $('#myCanvas')[0];
   var context = canvas.getContext("2d");
   
   var animalArray = [];
   var animalCount = 10;
   



   function generateAnimals() { 
      for (var i = 0; i < animalCount; i++) {        
         animalArray.push(new Animal(canvasWidth, canvasHeight));
      }
   }
  
   function drawAnimals() {
      for (var i = 0; i < animalArray.length; i++) {
         context.beginPath();
         context.arc(animalArray[i].x, animalArray[i].y, animalArray[i].radius, 0, Math.PI*2, false);
         context.fillStyle = "#F5004A";
         context.fill();
         context.closePath();         
      }
   }
   
   
   function startAnimalAmbulating(i) {  
          
      function newVector() {
         return Math.floor(((Math.random() * 100) - 50) + 1);
      }

      function moveAlongVector() {
         setTimeout(function() {
            var currentX = animalArray[i].x; // In the interest of making if statements more intelligile
            var currentY = animalArray[i].y;
            var radius = animalArray[i].radius;
            
            var travelIncrementX = ((animalArray[i].vectorX) / 1000) * animalArray[i].movementSpeed;
            var travelIncrementY = ((animalArray[i].vectorY) / 1000) * animalArray[i].movementSpeed;
            
            
            if (animalArray[i].travelTimeRemaining > 0) {
               animalArray[i].travelTimeRemaining --;
               
               if (currentX + travelIncrementX - radius > 0 && currentX + travelIncrementX + radius < canvas.width) {
                   animalArray[i].x += travelIncrementX;
               }
               if (currentY + travelIncrementY - radius > 0 && currentY + travelIncrementY + radius < canvas.height) {
                  animalArray[i].y += travelIncrementY;
               }        
               
               moveAlongVector();
            } 
         }, 1);      
      }

      
      // Smoother start:
      setTimeout(function() {
         animalArray[i].vectorX = newVector();
         animalArray[i].vectorY = newVector();
         animalArray[i].travelTimeRemaining = Math.floor(Math.random() * 400)+100;
         moveAlongVector();
      }, (Math.random() * 2000));
     
      // New movements every couple seconds
      setInterval(function() {
         animalArray[i].vectorX = newVector();
         animalArray[i].vectorY = newVector();
         animalArray[i].travelTimeRemaining = Math.floor(Math.random() * 400)+100;
         moveAlongVector();
      }, animalArray[i].movementFrequency + (Math.random() * 2000) + 500 );
   }
   
      
   
   function drawCycle() {
      context.clearRect(0, 0, canvas.width, canvas.height);  
      drawAnimals();
   }
   
   
   generateAnimals();
   for (var i = 0; i < animalArray.length; i++) {
      startAnimalAmbulating(i);
   }
   
   var drawCycleInterval = setInterval(function() {
      
      drawCycle();
   }, framerate);
   
});