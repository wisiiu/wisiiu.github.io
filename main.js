const gameWindow = document.querySelector('.game-window');
const startBtn = document.querySelector('.start-btn');
const gameText = document.querySelector('h2');
const pLevel = document.querySelector('p');
let levelGame = 1;

function memoryGameProcess() {
    let timeStarting = 3;
    pLevel.textContent = `Poziom ${levelGame}`;
    gameText.style.color = "black";
    gameText.textContent = "Zaczynamy!";
    startBtn.remove();

    const timeStart = setInterval(() => {
        gameText.textContent = `..${timeStarting}..`;
        timeStarting--
        if(timeStarting < 0){
            clearInterval(timeStart);
            gameText.textContent = '';
            gameStart();
        }
    }, 1000)  
}

function gameStart() {
    let chance = 1;
    let gameNumbers = "";
    const gameStart = setInterval(() => {
        let randomNumber = Math.floor(Math.random() * 10);
        gameNumbers += randomNumber;
        gameText.textContent = gameNumbers;
        if(gameNumbers.length >= levelGame){
            clearInterval(gameStart);
            setTimeout(() => {
                gameText.textContent = '';
                const checkMemory = document.createElement('input');
                gameWindow.appendChild(checkMemory);
                checkMemory.className = "memory-check";
                checkMemory.setAttribute('placeholder', 'Powtórz liczbę')
                const checkBtn = document.createElement('button');
                gameWindow.appendChild(checkBtn);
                checkBtn.textContent = "Sprawdź"
                checkBtn.className = "check-btn";

                checkBtn.addEventListener('click', () => {

                    if(checkMemory.value == gameNumbers){
                        gameText.textContent = `Udało się, graj dalej!`;
                        gameText.style.color = "green";
                        checkBtn.remove();
                        checkMemory.remove();
                        gameWindow.appendChild(startBtn);
                        startBtn.textContent = "Graj";
                        levelGame++; 
                    } else {
                        gameText.textContent = `Źle :(`;
                        gameText.style.color = "red";
                        checkBtn.remove();
                        checkMemory.remove();
                        setTimeout(() => {
                            alert(`Pozostało prób: ${chance}`)
                            if(chance === 0) {
                                gameText.textContent = "Koniec gry";
                                gameWindow.appendChild(startBtn);
                                return;
                            }
                            chance--;
                            gameText.style.color = "black";
                            gameText.textContent = ''
                            checkMemory.value = '';
                            gameWindow.appendChild(checkMemory);
                            gameWindow.appendChild(checkBtn);
                        }, 1000)
                    }
                })
            }, 1000)
        } 
    }, 1000)
}


startBtn.addEventListener('click', memoryGameProcess)