const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
        this.validDirections = {'u': [0, -1], 'd': [0, 1], 'l': [-1, 0], 'r': [1, 0]}; // used for validate direction inputs and to calculate new coordinates; index0 is for horizontal, index1 is for vertical movement 
        this.firstPrint = true; // used in print()
        this.startX = 0;
        this.startY = 0;
    }

    setField(newX, newY) {
        for (let row = 0; row < this._field.length; row++) {
            for (let col = 0; col < this._field[row].length; col++) {
                if (col === newX && row === newY) {
                    this._field[row][col] = pathCharacter;
                }
            }
        }
        return this._field;
    }

    /* 
    generate a random playfield
    rows: number of rows on the playfield
    cols: number of cols on the playfield
    holeRatio: the ratio of the total area to be covered by holes
    (expected % as fractions, e.g. 0.1 means 10%)
    maxHolesPerRow: the upper limit for the number of holes within one row on the board
    We will randomly generate the number of holes in a row between 0 and maxHolesPerRow
    */
    static generateField(cols, rows, holeRatio, maxHolesPerRow) {

        console.log('Find your hat! - Codecademy Challenge Project');
        console.log('Press Ctrl+C to quit.')
        
        // helper function to randomly select if a tile is a hole or not
        function getRandomHole() {
            const isHole = Math.round(Math.random()*1);
            return isHole;
        }

        if (holeRatio >= 1) {
            console.log("Invalid hole ratio.");
            return false;
        }

        if (maxHolesPerRow > cols) {
            console.log("Invalid maximum number of holes within a row.");
            return false;
        }

        const playField = [];
        const sumTiles = rows * cols;
        let holes = Math.floor(sumTiles * holeRatio); // max. number of holes based on the ratio parameter
        let usedHoles = 0; // used to keep the number of holes already added to the board
        for (let row = 0; row < rows; row++) {
            let holesPerRow = 0;
            let randomHolesPerRow = Math.round(Math.random()*maxHolesPerRow);
            playField[row] = [];
            for (let col = 0; col < cols; col++) {
                // if the field is a hole, and we can still place holes
                // in the row, and also have not reached the total 
                // number of holes, we'll place the hole on the field
                if (getRandomHole() && usedHoles < holes && holesPerRow < randomHolesPerRow) {
                    playField[row][col] = hole;
                    usedHoles++;
                    holesPerRow++;
                }
                else {
                    playField[row][col] = fieldCharacter;
                }
                
            }
        }
        // generate a random row and col position for the hat
        const hatRow = Math.floor(Math.random()*rows);
        const hatCol = Math.floor(Math.random()*cols);
        playField[hatRow][hatCol] = hat;

        // generate a random row and col position for the starting point
        // and check to ensure that hat and starting positions 
        // are not at the same coordinates
        let playerRow = 0;
        let playerCol = 0;
        do {
            playerRow = Math.floor(Math.random()*rows);
            playerCol = Math.floor(Math.random()*cols);
            playField[playerRow][playerCol] = pathCharacter;
        }
        while (playerRow === hatRow && playerCol === hatCol);
        
        return {
            startX: playerCol,
            startY: playerRow,
            playField: playField
        };
    }

    // print the game board
    print() {
        if (this._field === false) {
            console.log("Invalid parameter.")
            return;
        }
        // if firstPrint is true, then we'll only return true
        // but not print the board
        // used for checking if the board can be properly
        // drawn for the first time
        if (this.firstPrint === true) {
            this.firstPrint = false;
            return true;
        }
        for (let row = 0; row < this._field.length; row++) {
            for (let col = 0; col < this._field[row].length; col++) {
                process.stdout.write(this._field[row][col]);
            }
            process.stdout.write("\n");
        }
        return true; 
    };

    getInput() {
        const dir = prompt("Move direction? ").toLowerCase();
        if (this.validateInput(dir)) {
            return this.validDirections[dir];
        }
        else {
            console.log("Invalid input.");
        }
    }

    validateInput(dir) {
        return dir in this.validDirections;
    }

    move(posArr, dir) {
        const newX = posArr[0] + dir[0];
        const newY = posArr[1] + dir[1];
        if ((newX < 0 || newX > fieldX - 1) || (newY < 0 || newY > fieldY - 1)) {
            console.log("Sorry, you're out of bounds. Game over.");
            gameOver = true;
        }
        else if (this._field[newY][newX] === hole) {
            console.log("Sorry, you've fallen into a hole. Game over.");
            gameOver = true;
        }
        else if (this._field[newY][newX] === hat) {
            console.log("Congratulations, you got your hat! You won!");
            gameOver = true;
        }
        else {
            this.setField(newX, newY);
        }
        return {
            newX: newX,
            newY: newY
        }
    }

}

const fieldX = 20;
const fieldY = 10;
const holeRatio = 0.5
const holesPerRow = 15

const { startX, startY, playField } = Field.generateField(fieldX, fieldY, holeRatio, holesPerRow);

const myField = new Field(playField);

let gameOver = false;
let xPos = startX;
let yPos = startY;

// myField.print() will be false if generateField has
// incorrect holeRatio or maxHolesPerRow parameters
// It will return true without printing the board for the first time
// if there are no errors when generating the playfield
if (myField.print())
    {
        while (gameOver !== true) {
            console.log([xPos, yPos]);
            myField.print();
            let userInput = myField.getInput();
            let { newX, newY } = myField.move([xPos, yPos], userInput);
            xPos = newX;
            yPos = newY;
    }

}