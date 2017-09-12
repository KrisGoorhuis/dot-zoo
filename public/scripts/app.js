

$(document).ready(function() {
   var canvasWidth = 408;
   var canvasHeight = 408;
   var framerate = 1000/60; // frames per second
   
   $("canvas").attr('width', canvasWidth);
   $("canvas").attr('height', canvasHeight);  
   var canvas = $('#myCanvas')[0];
   var context = canvas.getContext("2d");
   
   var animalArray = [];
   var animalCount = 7;

   function returnRandomAnimal() {
      var animalCreators = [
         new ChocolateBear(canvasWidth, canvasHeight),
         new BlackBear(canvasWidth, canvasHeight),
         new OrangeCat(canvasWidth, canvasHeight),
         new RussianBlueCat(canvasWidth, canvasHeight),
         new CalicoCat(canvasWidth, canvasHeight)
      ];
      var randomIndex = Math.floor(Math.random() * animalCreators.length);
      var randomAnimal = animalCreators[randomIndex];    
      return randomAnimal;
      
   }
   returnRandomAnimal();

   function generateAnimals() { 
      for (var i = 0; i < animalCount; i++) {        
         animalArray.push(returnRandomAnimal());
      }
      console.log(animalArray);
   }
  
   function drawAnimals() {
      for (var i = 0; i < animalArray.length; i++) {
         animalArray[i].drawBody(context); 
         animalArray[i].drawEars(context);
      }
   }
      
   
   function drawCycle() {
      // Essentially clearRect(), but with color!
      context.beginPath();
      context.clearRect(0, 0, canvas.width, canvas.height);  
      context.rect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#befc8d";
      context.fill();
      context.closePath();
      drawAnimals();
   }
   
   
   generateAnimals();
   for (var i = 0; i < animalArray.length; i++) {
      animalArray[i].startAmbulating(animalArray[i], canvas);
   }
   
   var drawCycleInterval = setInterval(function() {
      
      drawCycle();
   }, framerate);
   
});