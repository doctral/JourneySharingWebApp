var num=6;
var colors=[];
var selectedColor;
var colorDisplay=document.querySelector("#colorDisplay");
var squares=document.querySelectorAll(".square");
var message=document.querySelector("#message");
var h1=document.querySelector("h1");
var newColor=document.querySelector("#newColor");
var hard=document.getElementById("hard");
var easy=document.getElementById("easy");

init();

function init(){
    setupButton();
	reset(num);
}

function setupButton(){
    hard.addEventListener("click", function(){
       num=6;
       hard.classList.add("selected");
       easy.classList.remove("selected");
       reset(num);
    })

    easy.addEventListener("click", function(){
       num=3;
       easy.classList.add("selected");
       hard.classList.remove("selected");
       reset(num);
    })

    newColor.addEventListener("click", function(){
       reset(num);
    })
}

function reset(num){
   colors=assignColors(num);
   selectedColor=pickColor();
   colorDisplay.textContent=selectedColor;
   h1.style.backgroundColor="steelblue";
   message.textContent=null;
   newColor.textContent="NEW COLORS";
   for(var i=0; i<squares.length; i++){
      if(colors[i]){
          squares[i].style.display="block";
          squares[i].style.backgroundColor=colors[i];
          squares[i].addEventListener("click", function(){
          	 var colorClicked=this.style.backgroundColor;
          	 if(colorClicked===selectedColor){
          	 	message.textContent="Right";
          	 	changeColor(selectedColor);
          	 	newColor.textContent="PLAY AGAIN?";
          	 }
          	 else{
          	 	message.textContent="Wrong!";
          	 	this.style.backgroundColor="#232323";
          	 }
          })
      }
      else{
      	squares[i].style.display="none";
      }
   }
}

function changeColor(color){
    for(var i=0; i<num; i++){
        squares[i].style.backgroundColor=color;
    }
    h1.style.backgroundColor=color;
}

function pickColor(){
	return colors[Math.floor(Math.random()* colors.length)];
}

function assignColors(num){
   var cc=[];
   for(var i=0; i<num; i++){
      cc[i]=generateRandomColor();
   }
   return cc;
}

function generateRandomColor(){
	var c1=Math.floor(Math.random()*256);
	var c2=Math.floor(Math.random()*256);
	var c3=Math.floor(Math.random()*256);
	return "rgb("+c1+", "+c2+", "+c3+")";
}