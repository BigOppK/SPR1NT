let name = "";
let energy = 50;
let speed = 50;
let day = 1;
let gameActive = false;

const gameOutput = document.getElementById("gameOutput");
const startBtn = document.getElementById("startBtn");

function startGame() {
    name = prompt("What's your name, athlete?");
    if (!name) return;

    gameActive = true;
    energy = 50;
    speed = 50;
    day = 1;
    startBtn.style.display = "none";
    nextDay();
}

function nextDay() {
    if (!gameActive) return;

    if (day > 5) {
        endGame();
        return;
    }

    gameOutput.innerHTML = `
        📅 <strong>Day ${day} of training</strong><br>
        Energy: ${energy} | Speed: ${speed}<br><br>
        What do you want to do today?<br><br>
        <button onclick="makeChoice(1)">🏃 Train</button>
        <button onclick="makeChoice(2)">🛌 Rest</button>
        <button onclick="makeChoice(3)">🍕 Eat Junk Food</button>
    `;
}

function makeChoice(choice) {
    if (choice === 1) {
        gameOutput.innerHTML += "<br>You trained hard! 💪";
        speed += getRandomInt(5, 10);
        energy -= getRandomInt(10, 15);
    } else if (choice === 2) {
        gameOutput.innerHTML += "<br>You rested and recharged. 🛌";
        energy += getRandomInt(10, 20);
    } else if (choice === 3) {
        gameOutput.innerHTML += "<br>You chilled with junk food. 🍕";
        energy += 5;
        speed -= 5;
    }

    energy = Math.max(0, Math.min(100, energy));
    speed = Math.max(0, Math.min(100, speed));
    day++;

    setTimeout(() => {
        nextDay();
    }, 1000);
}

function endGame() {
    gameOutput.innerHTML = `
        🏁 <strong>RACE DAY!</strong><br><br>
        ${name}, you've got ${energy} energy and ${speed} speed.<br><br>
    `;

    const winChance = speed + Math.floor(energy / 2);
    const result = getRandomInt(0, 120);

    if (result < winChance) {
        gameOutput.innerHTML += "🏆 YOU WON THE RACE! You're a legend on the track!";
    } else {
        gameOutput.innerHTML += "🥈 You gave it your all, but didn't win this time. Keep training!";
    }

    gameOutput.innerHTML += "<br><br>Game Over. Thanks for playing!";
    gameActive = false;
    startBtn.style.display = "block";
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
