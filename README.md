# Find your hat

## A Codecademy Challenge Project

This is my solution for Codecademy's Find your hat Node.js challenge project.

### Usage

`node main.js`

### Description

Your goal is to find your hat (represented by the ^ character) while avoiding falling into one of the holes (represented by the O character) or going out of bounds. Your starting position is randomly generated and is represented by the * character.

You can setup the game field to your preference by modifying the following parameters in `main.js`:
* fieldX: width of the playfield (default value is 10)
* fieldY: height of the playfield (default value is 20)
* holeRatio: the maximum percent of the tiles that should be populated by holes (default: 0.15, means 15%) 
* holesPerRow: the maximum number of holes within a single row (default: 5)

### Controls

Use the following characters to move on the board (case insensitive):
* U for moving up
* D for moving down
* L for moving left
* R for moving right

### Know limitations

The board is generated randomly. There's no check yet to ensure if a board layout can actually be solved (I'm planning to add this later).