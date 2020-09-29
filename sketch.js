function preload(){
  // put preload code here
}

function setup() {
  // put setup code here
  createCanvas(windowWidth,windowHeight)
  background("black");
  noStroke();
  angleMode(DEGREES);
}


function draw() {
  // parameters of the gears
  teethNumber = 28;
  teethLength = 20;
  teethWidth = 20;
  gearRadius = 150;
  xShift = gearRadius + teethLength/2;
  animationSpeed = 3;
  stopTime=600;
  // Animation engine
  tanh = stopTime*(exp(frameCount/stopTime)-exp(-frameCount/stopTime)) / (exp(frameCount/stopTime)+exp(-frameCount/stopTime));

  // Draw colored stripes
  background("black");
  for (let z = -1; z < 2; z+=2){
    for (let j = -1; j < 2; j+=2) {
      push();
      translate(width/2+ j*xShift, height/2+ z*xShift);
      rotate(j *z * tanh * (frameCount<3*stopTime)- (j+1)/4*360/teethNumber - (z+1)/4*360/teethNumber);
        for (let i = 0; i < teethNumber; i++) {
          push();
          rotate(i * 360/teethNumber);
          strokeWeight(5.0);
          strokeJoin(ROUND);
          if (i % 2 == 0) {
            fill(179,66,51);
          }
          else {
            fill(210,143,51);
          }
          beginShape();
          vertex(-teethWidth/8, 0);
          vertex(0, max(0, min(animationSpeed* frameCount-2*gearRadius, 800)));
          vertex(+teethWidth/8, 0);
          endShape();
          pop();
        }
    pop();
    }
  }

  // Draw gears
  for (let z = -1; z < 2; z+=2){
    for (let j = -1; j < 2; j+=2) {
      push();
      translate(width/2+ j*xShift, height/2+ z*xShift);
      rotate(j *z * tanh * (frameCount<2*stopTime) - (j+1)/4*360/teethNumber - (z+1)/4*360/teethNumber);
      //Draw single gear
      fill('white');
      circle(0,0, min(animationSpeed*frameCount, gearRadius*2));
      // Draw gear teeth
      if (gearRadius*2<animationSpeed*frameCount) {
        for (let i = 0; i < teethNumber; i++) {
          push();
          rotate(i * 360/teethNumber);
          strokeWeight(5.0);
          strokeJoin(ROUND);
          beginShape();
          vertex(-teethWidth/2, 0);
          vertex(-teethWidth/2, max(-animationSpeed* frameCount/2, -gearRadius-teethLength/3));
          vertex(-teethWidth/4, max(-animationSpeed* frameCount/2, -gearRadius-teethLength) );
          vertex(+teethWidth/4, max(-animationSpeed* frameCount/2, -gearRadius-teethLength) );
          vertex(+teethWidth/2, max(-animationSpeed* frameCount/2, -gearRadius-teethLength/3) );
          vertex(+teethWidth/2, 0);
          endShape();
          pop();
        }
      }
    fill('black');
    circle(0,0,min(animationSpeed*frameCount-40, gearRadius*2-40));
    pop();
    }
  }

}
