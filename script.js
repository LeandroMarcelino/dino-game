const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let isGameOver = false;
let position = 0;




function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {

    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {

            clearInterval(upInterval);
            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {

            // subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function criarCactus() {
    const cactus = document.createElement('div');
    let cactusPosicao = 1000;
    let randomTime = Math.random() * 6000;
	
	if (isGameOver) return;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        cactusPosicao -= 10;
        cactus.style.left = cactusPosicao + 'px';
        if (cactusPosicao < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosicao > 0 && cactusPosicao < 60 && position < 60) {
            //gamer over
            clearInterval(leftInterval);
			isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'
        } else {
            cactusPosicao -= 10;
            cactus.style.left = cactusPosicao + 'px';
			
        }
    }, 20)
    setTimeout(criarCactus, randomTime);
}

criarCactus();


//document.addEventListener('keyup', handleKeyUp);
document.addEventListener('keypress', handleKeyUp);