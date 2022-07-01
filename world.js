"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 64;
}
function p3_tileHeight() {
  return 64;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  console.log(i, j);
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();
  // Current tile
  let tileType = noise(i, j) * 3;
  // Adjacent tiles
  let leftTile = noise(i - 1, j) * 3;
  let rightTile = noise(i + 1, j) * 3;
  let upTile = noise(i, j - 1) * 3;
  let downTile = noise(i, j + 1) * 3;


  push();
  if (tileType < 1) {
  // Grass Tile
  push();
    drawGrass();
    // Autotile with sand: Add border
    if(leftTile >= 1 && leftTile < 2) {
      push();
        toSand();
      pop();
    }
    if (rightTile >= 1 && rightTile < 2) {
      push();
        angleMode(DEGREES);
        translate(64, 64);
        rotate(180);
        toSand();
      pop();
    }
    if (upTile >= 1 && upTile < 2) {
      push();
        angleMode(DEGREES);
        translate(64, 0);
        rotate(90);
        toSand();
      pop();
    }
    if (downTile >= 1 && downTile < 2) {
      push();
        angleMode(DEGREES);
        translate(0, 64);
        rotate(270);
        toSand();
      pop();
    }

    // Autotile with water: Add flower
    if(leftTile >= 2 || rightTile >= 2 || upTile >= 2 || downTile >= 2) {
      push();
        stroke(255);
        fill(255, 255, 0, 180);
        ellipse(th/2, tw/2, 10);
      pop();
    }
  pop(); 
  } else if (tileType < 2) {
    // Sand Tiles
    push();
      drawSand();
    pop(); 
  } else {
    // Water Tile
    push();
      drawWater();
      // Autotile with sand: Add border
      if(leftTile >= 1 && leftTile < 2) {
        push();
          toSand();
        pop();
      }
      if (rightTile >= 1 && rightTile < 2) {
        push();
          angleMode(DEGREES);
          translate(64, 64);
          rotate(180);
          toSand();
        pop();
      }
      if (upTile >= 1 && upTile < 2) {
        push();
          angleMode(DEGREES);
          translate(64, 0);
          rotate(90);
          toSand();
        pop();
      }
      if (downTile >= 1 && downTile < 2) {
        push();
          angleMode(DEGREES);
          translate(0, 64);
          rotate(270);
          toSand();
        pop();
      }
    pop(); 
  }
  
  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    if (tileType < 1) {
      // Draw another flower on grass tile
      push()
        stroke('#ad9c4d');
        strokeWeight(4);
        line(46, 32, 40, 26);
        line(46, 32, 46, 24);
        line(46, 32, 52, 26);
        fill(255, 255, 0, 180);
        stroke('#ff007f')
        circle(46, 16, 10);
      pop()
    } else if (tileType < 2) {
      // Draw cactus on sand
      push()
        stroke('#5B6F55');
        noFill();
        strokeCap(SQUARE);
        strokeWeight(8);
        line(32, 50, 32, 40);
        strokeCap(ROUND);
        line(32, 45, 32, 16);
        strokeWeight(6);
        line(32, 35, 42, 35);
        line(42, 35, 42, 20);
        strokeWeight(4);
        line(32, 30, 24, 30);
        line(24, 30, 24, 20);
      pop()
    } else {
      // Draw a lily pad on the water
      push();
        stroke('#555807')
        fill('#919c3e')
        strokeWeight(2);
        strokeCap(SQUARE);
        angleMode(DEGREES)
        arc(38, 24, 20, 20, 60, 380, PIE);
      pop();
    }
  }

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("(" + [i, j] + ")", 0, 0);
}

function p3_drawAfter() {
}

function drawGrass() {
  fill('#87861a');
  noStroke();
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);
  
  stroke('#ad9c4d');
  strokeWeight(4);
  line(24, 24, 18, 18);
  line(24, 24, 24,  16);
  line(24, 24, 30, 18);
  line(32, 48, 26, 44);
  line(32, 48, 32, 40);
  line(32, 48, 38, 44);
}

function drawSand() {
  fill('#EDC9AF');
  noStroke();
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);
  // Lines in the sand
  stroke('#e0693e');
  strokeWeight(2);
  strokeCap(SQUARE)
  curve(64, -38, 40, 0, 0, 26, -24, 62);
  curve(102, 0, 64, 26, 40, 64, 4, 90);

  stroke('#f5a055');
  curve(18, 36, 18, 36, 0, 50, -10, 62);
  curve(66, 50, 64, 50, 54, 64, 40, 94);
  curve(62, -12, 54, 0, 40, 30, 40, 30);

  stroke('#db6630')
  curve(38, 36, 38, 36, 32, 64, 4, 78);
  curve(38, -28, 32, 0, 4, 14, 4, 14);

  stroke('#ea9569');
  curve(30, 32, 30, 32, 24, 46, 8, 64);
  curve(30, 32, 24, 46, 8, 64, 8, 64);
}

function drawWater() {
  fill('#04ade2');
  noStroke();
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);
  
  stroke('#2aded4');
  strokeWeight(4);
  strokeCap(ROUND);
  line(10, 8, 20, 8);
  line(40, 8, 43, 8);
  line(12, 16, 15, 16);
  line(20, 16, 40, 16);
  line(45, 24, 48, 24);
  line(20, 24, 35, 24);
  line(50, 40, 55, 40);
  line(27, 32, 47, 32);
  line(15, 40, 25, 40);
  line(27, 48, 45, 48);
  line(38, 56, 50, 56);
}

function toSand() {
  fill('#EDC9AF')
  noStroke()
  beginShape();
  vertex(0, 0);
  vertex(8, 8);
  vertex(4, 16);
  vertex(8, 24);
  vertex(4, 32);
  vertex(8, 40);
  vertex(4, 48);
  vertex(8, 56);
  vertex(0, 64);
  endShape();
}