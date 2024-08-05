x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
apple = "";
speak_data = " ";
to_number = "";
draw_apple = "";
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function preload() {
  apple = "apple.png";
  loadImage(apple);
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {
 console.log(event); 
 content = event.results[0][0].transcript;
 document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
 to_number = Number(content);
 if (Number.isInteger(to_number)) {
  draw_apple = "set";
  staTus = "started drawing apple";
 } else {
  staTus = "The speech has not recongized any number";
 }
}

function setup() {
 screen_width = window.innerWidth;
 screen_height = window.innerHeight;
 createCanvas(screen_width, screen_height - 150);
 canvas.position(0, 150);
}

function draw() {
  if(draw_apple == "set") {
    for (i = 1; i <= to_number; i++) {
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random()*400);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    speak();
  }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "Apples drawn are " + to_number;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}