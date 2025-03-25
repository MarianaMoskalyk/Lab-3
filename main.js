// Функція для перемикання завдань
function showTask(taskId) {
    document.querySelectorAll('.task').forEach(task => task.style.display = 'none');
    document.getElementById(taskId).style.display = 'block';
}

// Таблиця множення
function generateMultiplicationTable() {
    let number = document.getElementById('multiplicationInput').value;
    if (isNaN(number) || number.trim() === '') {
        alert('Введіть коректне число');
        return;
    }
    let output = '<table border="1">';
    for (let i = 1; i <= 10; i++) {
        output += `<tr><td>${number} x ${i} = ${number * i}</td></tr>`;
    }
    output += '</table>';
    document.getElementById('multiplicationOutput').innerHTML = output;
}

// Вивід країн
const countries = [
    { name: "Україна", population: "41 млн", capital: "Київ" },
    { name: "США", population: "331 млн", capital: "Вашингтон" },
    { name: "Німеччина", population: "83 млн", capital: "Берлін" }
];

document.getElementById("countryOutput").innerHTML = countries.map(country => 
    `<p><b>${country.name}</b>: столиця - ${country.capital}, населення - ${country.population}</p>`
).join('');

// Форма користувача
function createUser() {
    let lastName = document.getElementById('lastName').value;
    let firstName = document.getElementById('firstName').value;
    let age = document.getElementById('age').value;
    let email = document.getElementById('email').value;

    if (!lastName || !firstName || !age || !email) {
        alert('Всі поля мають бути заповнені!');
        return;
    }

    document.getElementById('userOutput').innerHTML = 
        `<p>Користувач: ${lastName} ${firstName}, ${age} років, e-mail: ${email}</p>`;
}

// Калькулятор
function calculate() {
    let num1 = parseFloat(document.getElementById('num1').value);
    let num2 = parseFloat(document.getElementById('num2').value);
    let operation = document.getElementById('operation').value;
    let result;

    if (isNaN(num1) || (operation !== 'sqrt' && isNaN(num2))) {
        result = 'Помилка: введіть коректні числа';
    } else {
        switch (operation) {
            case 'add': result = num1 + num2; break;
            case 'subtract': result = num1 - num2; break;
            case 'multiply': result = num1 * num2; break;
            case 'divide': result = num2 !== 0 ? num1 / num2 : 'Помилка: ділення на нуль'; break;
            case 'mod': result = num2 !== 0 ? num1 % num2 : 'Помилка: ділення на нуль'; break;
            case 'power': result = Math.pow(num1, num2); break;
            case 'sqrt': result = Math.sqrt(num1); break;
        }
    }
    document.getElementById('result').innerText = `Результат: ${result}`;
}

// Хрестики-нулики
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = "";
    board.forEach((cell, index) => {
        const button = document.createElement('button');
        button.id = `cell${index}`;
        button.innerText = cell;
        button.onclick = () => playMove(index);
        gameBoard.appendChild(button);
    });
}

function playMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        document.getElementById(`cell${index}`).innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонталі
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикалі
        [0, 4, 8], [2, 4, 6]             // діагоналі
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            document.getElementById('gameStatus').innerText = `Переможець: ${board[a]}`;
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        document.getElementById('gameStatus').innerText = "Нічия!";
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.getElementById('gameStatus').innerText = "";
    createGameBoard();
}

document.addEventListener('DOMContentLoaded', () => createGameBoard());
