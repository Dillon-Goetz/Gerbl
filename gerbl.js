
const guessList = [
    "Manga", "Addax", "Snake", "Hound", "Civet", "Eagle", "Borer", "Akita", "Husky", 
    "Bully", "Robin", "Sheep", "Cobra", "Gampr", "Snail", "Perch", "Gecko", "Camel", 
    "Whale", "Shark", "Worms", "Krait", "Beago", "snake", "Tiger", "Fish)", "Takin", 
    "Frise", "Squid", "Bilby", "Bison", "Mamba", "Pleco", "Racer", "Boiga", "Bongo", 
    "Booby", "Trout", "Micra", "Hyena", "Viper", "Mouse", "Horse", "Corso", "Geese", 
    "Grebe", "Skate", "Coati", "Adder", "Raven", "Coral", "Crane", "Junco", "Dhole", 
    "Dingo", "Dorgi", "Doxle", "Laika", "Egret", "Goose", "Eider", "Eland", "Shrew", 
    "Tetra", "Feist", "Finch", "Spitz", "Lemur", "Fossa", "Genet", "Guide", "Irish", 
    "Saint", "Goral", "Heron", "Anole", "Guppy", "Horgi", "Human", "Macaw", "Indri", 
    "Bear)", "Manee", "Kiang", "Leech", "Kishu", "Koala", "Jindo", "Krill", "Scaup", 
    "Liger", "Llama", "Loach", "Loris", "Stork", "Flea)", "Molly", "Moose", "Potoo", 
    "Nyala", "Okapi", "Oribi", "Otter", "Lion)", "Corgi", "Prawn", "Quail", "Quoll", "Panda", 
    "Flies", "Hyrax", "Sable", "Saiga", "Saola", "Roach", "shark", "Skunk", "Sloth", 
    "Cuvac", "viper", "Stoat", "Tapir", "Devil", "Urial", "Veery", "Vireo", "Yabby", 
    "Zebra", "Zokor", "Zorse", 
]
var height = 6; //number of guesses
var width = 5; //length of the word

var row = 0; //current guess (attempt #)
var col = 0; //current letter for that attempt

var gameOver = false;
// var word = "SQUID";
var word = guessList[Math.floor(Math.random() * guessList.length)].toUpperCase();
console.log(word)

window.onload = function(){
    intialize();
}


function intialize() {

    // Create the game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }
    // Create the key board
    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
    ]

    for (let i = 0; i < keyboard.length; i++) {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let j = 0; j < currRow.length; j++) {
            let keyTile = document.createElement("div");

            let key = currRow[j];
            keyTile.innerText = key;
            if (key == "Enter") {
                keyTile.id = "Enter";
            }
            else if (key == "⌫") {
                keyTile.id = "Backspace";
            }
            else if ("A" <= key && key <= "Z") {
                keyTile.id = "Key" + key; // "Key" + "A";
            } 

            keyTile.addEventListener("click", processKey);

            if (key == "Enter") {
                keyTile.classList.add("enter-key-tile");
            } else {
                keyTile.classList.add("key-tile");
            }
            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow);
    }
    

    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        processInput(e);
    })
}

function processKey() {
    const e = { "code" : this.id };
    processInput(e);
}

function processInput(e) {
    if (gameOver) return; 

    // alert(e.code);
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (col < width) {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "") {
                currTile.innerText = e.code[3];
                col += 1;
            }
        }
    }
    else if (e.code == "Backspace") {
        if (0 < col && col <= width) {
            col -=1;
        }
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = "";
    }

    else if (e.code == "Enter") {
        update();
        row += 1; // Start new row
        col = 0; // start at 0 for new row
    }

    if (!gameOver && row == height) {
        gameOver = true;
        document.getElementById("answer").innerText = word;
    }
}

function update() {
    let guess = "";
    document.getElementById("answer").innerText = "";

    //string up the guess word
    for (let c=0;c<width; c++){
        let currTile = document.getElementById(row.toString() + "-" + c.toString())
        let letter = currTile.innerText;
        guess += letter;
    }

    guess = guess.toUpperCase();
    if (!guessList.map(word => word.toUpperCase()).includes(guess)){
        document.getElementById("answer").innerText = "Not in animal List";
        document.getElementById("board").classList.add("shake"); // Add shake class

        // Remove the shake class after the animation
        setTimeout(() => {
            document.getElementById("board").classList.remove("shake");
        }, 500); // Adjust the time (in milliseconds) as needed

        return; 
    }

    //start processing game
    let correct = 0;
    let letterCount = {};

    for(let i = 0; i<word.length; i++){
        const letter = word[i]
        if (letterCount[letter]){
            letterCount[letter] += 1;
        }
        else{
            letterCount[letter] = 1;
        }
    }

    //first iteration, check all the correct ones
    for (let c = 0; c < width;c++){
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //is it in correct position? 
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
            letterCount[letter] -= 1;
        }
        //is it in the word? 
        else if (word.includes(letter) && letterCount[letter] > 0){
            currTile.classList.add("present")
            letterCount[letter] -=1
        }
        //not in the word
        else{
            currTile.classList.add("absent")
        }
        
        if (correct == width){
            gameOver = true;
            document.getElementById("answer").innerText = "Good job!";
        }
    }

    if (!gameOver && row == height - 1) { // Check if it's the last row AND game is not over
        gameOver = true;
        document.getElementById("answer").innerText = "The animal was " + word;
    }
    //go again, and mark which ones are present but in wrong position
    for (let c = 0; c < width;c++){
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        if(!currTile.classList.contains("correct")){
            //is it in the word? 
            if (word.includes(letter)){
                currTile.classList.add("present")
            }
            //not in the word
            else{
                currTile.classList.add("absent")
            }
        }    

        
    }
}


// function update() {
//     let correct = 0;
//     let letterCount = {};
//     for(let i = 0; i<word.length;i++){
//         if (letterCount[letter]){
//             letterCount[letter] += 1;
//         }else{
//             letterCount[letter] = 1
//         } 
//     }

//     //first iteration, check all the correct ones

//     let promises = []; 
  
//     for (let c = 0; c < width; c++) {
//       let currTile = document.getElementById(row.toString() + '-' + c.toString());
//       let letter = currTile.innerText;
  
//       // Create a promise for each square's update
//       promises.push(new Promise(resolve => {
//         setTimeout(() => {
//           if (word[c] == letter) {
//             currTile.classList.add("correct");
//             correct += 1;
//           } else if (word.includes(letter)) {
//             currTile.classList.add("present");
//           } else {
//             currTile.classList.add("absent");
//           }
//           resolve(); // Resolve the promise after the update
//         }, c * 150); // Delay each square's update slightly
//       }));
//     }
  
//     Promise.all(promises).then(() => {
//       if (correct == width) {
//         gameOver = true;
//       }
//     });
//   }
