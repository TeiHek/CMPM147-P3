# Endless Oasis
A project using provided starter code and [p5.js](https://p5js.org/) to create a randomly generated scene that depicts oases. Tiles are randomly generated and change based on the tiles around them. <br/>

## Autotiling
- Water and grass tiles adjacent to sand tiles are drawn with sand inside
- Grass tiles next to water grow a flower

## Interactivity
Clicking on a given tile adds a plant based on what tile is present. If a world seed change results in a different tile at a given spot, the plant changes.
- Clicking on a sand tile adds a cactus.
- Clicking on a grass tile adds a flower separate from the one seen if the tile was next to water.
- Clicking on a water tile adds a lily pad.

## Artist statement
I knew close to the beginning of the project that I wanted to create something that involved the desert, and since at least three types of tiles were needed, I figured I'd create some oases. By tweaking the values, I was able to adjust the frequency of tiles that appeared. <br/>
The starter code created a scene using 16x16 tiles, so I was hoping to create what would essentially be pixel art. However, with the amount of tiles being drawn, it was slowing down the project as it had to draw a lot of tiles with lots of details. As a result, I had to not only reduce the amount of tiles being drawn by increasing the tile size to 64x64, but I also had to reduce the amount of detail I was adding to each tile. <br/>
Though I am satisfied with the level of work that I added to this project, I do not think I met my original goals.

### p3-endless-scene-starter
Credit: Adam Smith/Isaac Karth 
Edited by: Asiiah Song
