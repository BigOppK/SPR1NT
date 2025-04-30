let name;
let energy = 50;
let speed = 50;
let day = 1;
let gameActive = false;

const gameOutput = document.getElementById('gameOutput');

function startGame() {
    name = prompt("What's your name, athlete?");
    if (!name) return;

    gameActive = true;
    energy = 50;
    speed = 50;
    day = 1;
    gameOutput.innerHTML = `Welcome to training camp, ${name}!<br>Energy: ${energy} | Speed: ${speed}<br>Day 1 of training.<br><br>What will you do today?`;
    document.querySelector('#controls').style.display = 'none';
    updateGame();
}

function nextDay() {
    if (!gameActive) return;

    if (day <= 5) {
        gameOutput.innerHTML += `<br><br>📅 Day ${day} of training:<br>Energy: ${energy} | Speed: ${speed}`;
        gameOutput.innerHTML += `<br>What will you do today?`;
        gameOutput.innerHTML += `
            <button onclick="train()">Train (gain speed, lose energy)</button>
            <button onclick="rest()">Rest (gain energy)</button>
            <button onclick="junkFood()">Eat junk food (fun, but not helpful)</button>
        `;
    } else {
        raceDay();
    }
}

function train() {
    if (energy > 0) {
        speed += randomInt(5, 10);
        energy -= randomInt(10, 15);
        updateStats();
    } else {
        gameOutput.innerHTML += `<br>You don't have enough energy to train today. Rest or eat junk food!`;
    }
}

function rest() {
    energy += randomInt(10, 20);
    updateStats();
}

function junkFood() {
    energy += 5;
    speed -= 5;
    updateStats();
}

function updateStats() {
    energy = Math.max(0, Math.min(100, energy));
    speed = Math.max(0, Math.min(100, speed));
    gameOutput.innerHTML += `<br><br>Energy: ${energy} | Speed: ${speed}`;
    day++;
    nextDay();
}

function raceDay() {
    gameOutput.innerHTML += `<br><br>🏁 It's RACE DAY!<br>${name}, you've got ${energy} energy and ${speed} speed.`;

    let winChance = speed + (energy / 2);
    let result = randomInt(0, 120);

    if (result < winChance) {
        gameOutput.innerHTML += `<br>🏆 YOU WON THE RACE! You're a legend on the track!`;
    } else {
        gameOutput.innerHTML += `<br>You gave it your all, but didn't win this time. 🥈 Keep training!`;
    }

    gameOutput.innerHTML += `<br><br>Game Over. Thanks for playing!`;
    document.querySelector('#controls').style.display = 'block';
    gameActive = false;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}