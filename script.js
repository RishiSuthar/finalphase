let highscore = parseInt(localStorage.getItem('highscore')) || 0;
let darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';


soundEnabled = true;


function playSound(soundFile) {
    if (soundEnabled) {
        const audio = new Audio(soundFile);
        audio.play();
        console.log("play");
    }
    else {
        console.log("didnt play")
    }
}



function showSettings() {
    const gameContainer = document.getElementById('game-container');
    const settingsContainer = document.getElementById('settings-container');
    const guessingcont = document.getElementById('newcont');

    gameContainer.style.display = 'none';
    guessingcont.style.display = 'none';
    settingsContainer.style.display = 'block';

}

function closesettings() {
    const gameContainer = document.getElementById('game-container');
    const settingsContainer = document.getElementById('settings-container');
    const guessingcont = document.getElementById('newcont');

    settingsContainer.style.display = 'none';
    gameContainer.style.display = 'block';
    guessingcont.style.display = 'block';
}



function soundon() {
    soundEnabled = true;
    console.log(soundEnabled);
    document.getElementById("soundOffButton").disabled = false;
    document.getElementById("soundOnButton").disabled = true;

}

function soundoff() {
    soundEnabled = false;
    console.log(soundEnabled);
    document.getElementById("soundOnButton").disabled = false;
    document.getElementById("soundOffButton").disabled = true;
}

function startup() {
    const result2Element = document.getElementById("result2");
    result2Element.textContent = `Your HIGH SCORE: ${highscore}`;
    console.log("hello world")
}



// Function to toggle dark mode
function toggleDarkMode() {
    const darkModeIcon = document.querySelector(".darkmodphoto");
    const lightModeIcon = document.querySelector(".lightmodephoto");

    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        darkModeIcon.style.display = "block";
        lightModeIcon.style.display = "none";
        darkModeEnabled = false;
    } else {
        document.body.classList.add("dark-mode");
        darkModeIcon.style.display = "none";
        lightModeIcon.style.display = "block";
        darkModeEnabled = true;
    }

    // Save dark mode setting to localStorage
    localStorage.setItem('darkModeEnabled', darkModeEnabled);
}



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


let shuffledNumbers = [];
let shuffledColors = [];
let assignedColors = {};
let score = 0;
let timer = 5000;



function startgame() {

    computerguesses = [];
    userguesses = [];

    shuffledNumbers = [1, 2, 3, 4];
    shuffleArray(shuffledNumbers);
    shuffledColors = ['blue', 'red', 'green', 'orange'];
    shuffleArray(shuffledColors);


    const startgameButton = document.getElementById('startgame');
    startgameButton.disabled = true;

    const checkguessButton = document.getElementById('checkGuess');
    checkguessButton.disabled = true;


    const shapes = document.querySelectorAll('.shape p');

    for (let i = 0; i < shuffledColors.length; i++) {
        shapes[i].textContent = shuffledNumbers[i]; 
        const shapeId = `shape${i + 1}`;
        const shape = document.getElementById(shapeId);
        shape.style.backgroundColor = shuffledColors[i]; 
        assignedColors[shapeId] = { color: shuffledColors[i], number: shuffledNumbers[i] };
    }

    console.log(assignedColors)

    setTimeout(() => {
        for (let i = 0; i < shapes.length; i++) {
            shapes[i].textContent = '';
            const shapeId = `shape${i + 1}`;
            const shape = document.getElementById(shapeId);
            shape.style.backgroundColor = 'black';
        }
        const radioButtons = document.querySelectorAll('input[type="radio"]');

        for (const radioButton of radioButtons) {
            radioButton.removeAttribute('disabled');
        }
        checkguessButton.disabled = false;

    }, timer);
}

function getNumberForColor(color) {
    for (const shapeId in assignedColors) {
        if (assignedColors[shapeId].color === color) {
            return assignedColors[shapeId].number;
        }
    }
    return null; 
}


function checkGuessNumbers() {


    computerguesses.push(getNumberForColor('blue'), getNumberForColor('red'), getNumberForColor('green'), getNumberForColor('orange'));

    const resultElement = document.getElementById("result");
    const result2Element = document.getElementById("result2");
    let correctGuess = true;


    for(let i = 0; i <= 3; i++) {
        var userGuess = getSelectedRadioValue('shape-' + (i + 1) + '-color');
        userguesses.push(userGuess)
    }

    
    for (let i = 0; i < 4; i++) {
        if (userguesses[i] !== computerguesses[i]) {
            correctGuess = false;
            break;
        }
    }



    const checkGuessButton = document.getElementById('checkGuess');
    checkGuessButton.disabled = true; // Disable the "checkGuess" button

    const radioButtons = document.querySelectorAll('input[type="radio"]');
    for (const radioButton of radioButtons) {
        radioButton.setAttribute('disabled', true);
    }


    if (correctGuess) {
        score++;
        if (score > highscore) {
            highscore = score;
            localStorage.setItem('highscore', highscore);
        }
        timer -= 500;
        resultElement.textContent = "Correct guess!";
        resultElement.style.color = "green";
        result2Element.textContent = `Your score: ${score} - HIGH SCORE: ${highscore}`;
        playSound('ding.mp3');
        startgame();
    } else {
        timer = 5000;
        score = 0;
        resultElement.textContent = "Incorrect guess. Try again!";
        resultElement.style.color = "red";
        result2Element.textContent = `Your score: ${score} - HIGH SCORE: ${highscore}`;
        playSound('buzzer.mp3');
        startgame();
    }
}

function getSelectedRadioValue(name) {
    const radioButtons = document.querySelectorAll(`input[name="${name}"]`);
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            return parseInt(radioButton.value);
        }
    }
    return null;
}

function getAssignedNumber(color) {
    for (const shapeId in assignedColors) {
        if (assignedColors[shapeId].color === color) {
            return assignedColors[shapeId].number;
        }
    }
    return null;
}

document.addEventListener("DOMContentLoaded", function() {
    const darkModeIcon = document.querySelector(".darkmodphoto");
    const lightModeIcon = document.querySelector(".lightmodephoto");

    if (darkModeEnabled) {
        document.body.classList.add("dark-mode");
        darkModeIcon.style.display = "none";
        lightModeIcon.style.display = "block";
    } else {
        document.body.classList.remove("dark-mode");
        darkModeIcon.style.display = "block";
        lightModeIcon.style.display = "none";
    }
});


