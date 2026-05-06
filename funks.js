const user_input = document.getElementById("input_user");
const game_letter = document.getElementById("game_letter");
const pontos = document.getElementById("pontos");
const timer_display = document.getElementById("timer");

const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TOTAL_TENTATIVAS = 15;

let acertos = 0;
let tempoRestante = 3;
let intervalo;
let jogoIniciado = false; // Controle para o início do jogo

let tempoAcumulado = 0;
let tempoInicioRodada; 

function sortearProximaLetra() {
    if (acertos >= TOTAL_TENTATIVAS) {
        finalizarJogo();
        return;
    }
    game_letter.innerText = ""
    for(i = 0; i < 4; i++)
    {
        const indice = Math.floor(Math.random() * letras.length);
        game_letter.innerText += letras[indice];
    }
    
    // Se o jogo já estiver rodando, reinicia o cronômetro e marca o tempo
    if (jogoIniciado) {
        tempoInicioRodada = Date.now(); 
        iniciarCronometro();
    }
}

function iniciarCronometro() {
    clearInterval(intervalo);
    tempoRestante = 3;
    timer_display.innerText = tempoRestante;

    intervalo = setInterval(() => {
        tempoRestante--;
        timer_display.innerText = tempoRestante;

        if (tempoRestante <= 0) {
            clearInterval(intervalo);
            alert("O tempo acabou! Tente ser mais rápido na próxima.");
            location.reload(); 
        }
    }, 1000);
}

function finalizarJogo() {
    clearInterval(intervalo);
    user_input.disabled = true;
    const tempoMedio = (tempoAcumulado / TOTAL_TENTATIVAS).toFixed(2);
    game_letter.innerText = "FIM!";
    alert(`Parabéns! Tempo médio de reação: ${tempoMedio}s`);
}

// Inicializa a primeira letra, mas sem soltar o cronômetro
sortearProximaLetra();

user_input.addEventListener("input", () => {
    // SEGUNDA MUDANÇA: Se é a primeira vez digitando, inicia tudo
    if (!jogoIniciado) {
        jogoIniciado = true;
        tempoInicioRodada = Date.now();
        iniciarCronometro();
    }

    const valorDigitado = user_input.value.toUpperCase();
    const letraAtual = game_letter.innerText;

    if (valorDigitado === letraAtual) {
        const tempoGastoNessaRodada = (Date.now() - tempoInicioRodada) / 1000;
        tempoAcumulado += tempoGastoNessaRodada;

        acertos++;
        pontos.innerText = acertos;
        user_input.value = "";
        sortearProximaLetra();
    }
});