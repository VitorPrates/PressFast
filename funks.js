//player things
const form_nickname = document.getElementById("form_nickname")
const nickname_registrado = document.getElementById("nickname_registrado")
let primeira_troca = true

//Game coisas
const user_input = document.getElementById("input_user");
const game_letter = document.getElementById("game_letter");
const pontos = document.getElementById("pontos");
const timer_display = document.getElementById("timer");
const btn_salvar_recorde = document.getElementById("btn_salvar_recorde")
const btn_reiniciar_game = document.getElementById("btn_reiniciar_game")
const tempo_medio_resultado = document.getElementById("tempo_medio_resultado")
const recordes_por_nick = document.querySelector(".recordes_por_nick")
let dificultade = "Dificil"
//ranking
const rank_tempo = document.getElementById("rangking_result_tempo_display")
const rank_ponto = document.getElementById("rangking_result_pontos_display")


const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TOTAL_TENTATIVAS = 15;

let acertos = 0;
let tempoRestante = 3;
let intervalo;
let jogoIniciado = false;

let tempoAcumulado = 0;
let tempoInicioRodada; 


//Game funks
function sortearProximaLetra() {
    if (acertos >= TOTAL_TENTATIVAS) {
        finalizarJogo();
        return;
    }
    game_letter.innerText = ""
    for(let i = 0; i < 4; i++)
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
    dificultade = document.getElementById("dificuldade_display").innerHTML
    switch (dificultade) {
        case "Fácil":
            tempoRestante = 7;
            break;
        case "Médio":
            tempoRestante = 5;
            break;
        case "Difícil":
            tempoRestante = 3;
            break;
    
        default:
            break;
    }
  
    timer_display.innerText = tempoRestante;

    intervalo = setInterval(() => {
        tempoRestante--;
        timer_display.innerText = tempoRestante;

        if (tempoRestante <= 0) {
            clearInterval(intervalo);
            alert("O tempo acabou! Tente ser mais rápido na próxima.");
            user_input.disabled = true;
            btn_reiniciar_game.style.transform = "rotateX(0deg)"
            btn_reiniciar_game.focus()
            
            // location.reload(); 
        }
    }, 1000);
}

function finalizarJogo() {
    clearInterval(intervalo);
    user_input.disabled = true;
    const tempoMedio = (tempoAcumulado / TOTAL_TENTATIVAS).toFixed(2);
    game_letter.innerText = "FIM!";
    btn_reiniciar_game.style.transform = "rotateX(0deg)"
    tempo_medio_resultado.innerHTML = `Tempo médio de reação: ${tempoMedio}s`
    tempo_medio_resultado.style.transform = "rotateX(0deg)"
    timer_display.innerText = "-";
    btn_reiniciar_game.focus()
}

// Inicializa a primeira letra, mas sem soltar o cronômetro
sortearProximaLetra();

user_input.addEventListener("input", () => {
   iniciar_jogo()
});
function iniciar_jogo()
{
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
}

//end game funks

//player funks

//botão reiniciar
btn_reiniciar_game.addEventListener("click",(e)=>{
    e.preventDefault()
    reiniciar_game()
})
function reiniciar_game() {
    user_input.value = ""
    if(game_letter.innerText = "FIM!")
    {
        jogoIniciado = false
        acertos = 0
        pontos.innerText = acertos;
        tempoAcumulado = 0
        sortearProximaLetra()
        btn_reiniciar_game.style.transform = "rotateX(-90deg)"
        tempo_medio_resultado.style.transform = "rotateX(-90deg)"
        user_input.disabled = false
        user_input.focus()
    }
}
//botão salvar recorte
btn_salvar_recorde.addEventListener("click", (e) =>{
    e.preventDefault()
    if(game_letter.innerText != "FIM!" || pontos < TOTAL_TENTATIVAS)
    {
        btn_salvar_recorde.style.backgroundColor = "red"
        setTimeout(() => {
            btn_salvar_recorde.style.backgroundColor = "white"
        }, 200);
        // clearInterval(block_recorde)
    }
    else
    {
        salvar_recorde()
    }
})

nickname_registrado.addEventListener("click", () => {
    recordes_por_nick.innerHTML = "<p>...</p>"
    primeira_troca = false
    nickname_registrado.style.left = "100%"
    btn_salvar_recorde.style.transform = "rotatex(90deg)"
    setTimeout(() => {
        nickname_registrado.style.display = "none"
        nickname_registrado.style.left = "-100%"
    }, 300);
})
form_nickname.addEventListener("submit", (e) =>{
    e.preventDefault()
    const form_entrada = new FormData(form_nickname);
    const dados = Object.fromEntries(form_entrada.entries());
    if(dados.nickname)
    {
        nickname_registrado.style.display = "flex"
        btn_salvar_recorde.style.transform = "rotatex(0deg)"
        setTimeout(() => {
            nickname_registrado.innerHTML = primeira_troca? `${dados.nickname} <img src="imgs/click.gif" alt="">` : `${dados.nickname}`
            nickname_registrado.style.left = "0%"
        }, 100);
        user_input.focus()
        buscarrecordes(dados.nickname)

    }
})
//end Player funks

//para o back end

async function montar_ranking() {
    rank_tempo.innerHTML = "<p>...</p>"
    rank_ponto.innerHTML = "<p>...</p>"
    try {
        const resposta = await fetch("https://pressfast-api.vercel.app/atualranking")
        if(!resposta.ok)
        {
            throw new Error("Erro ao montar ranking");
        }
        const data = await resposta.json();
        rank_tempo.innerHTML = ""
        data.topTempos.forEach((top, indice) =>{
            let tempo = document.createElement("li")
            tempo.innerHTML = `<h5>${top.username}</h5>
                                <span>${(+top.recordes[0] / 1000).toFixed(2)}</span>`
            rank_tempo.appendChild(tempo)
        })
        rank_ponto.innerHTML = ""
        data.topPontos.forEach((top, indice) =>{
            let ponto = document.createElement("li")
            ponto.innerHTML = `<h5>${top.username}</h5>
                                <span>${top.score}</span>`
            rank_ponto.appendChild(ponto)
        })
    } catch (error) {
        rank_tempo.innerHTML = `<p>Erro ao montar o ranking :(</p>`
        rank_ponto.innerHTML = `<p>Erro ao montar o ranking :(</p>`
    }
}
montar_ranking()



//buscando recordes do player
async function buscarrecordes(nickname) {
    recordes_por_nick.innerHTML = "<p>...</p>"
    try {
        const resposta = await fetch("https://pressfast-api.vercel.app/buscarnome", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nickname: nickname})
        })
        if(!resposta.ok)
        {
            throw new Error("Não encontrado");
        }
        const data = await resposta.json();
        recordes_por_nick.innerHTML = `Pontuação: ${data.Player_pontuacao}`
        let recordes_salvos = document.createElement("ul")
        data.Player_recordes.forEach(recorde =>{
            let recor = document.createElement("li")
            recor.innerHTML = `${(+recorde/1000).toFixed(2)}s`
            recordes_salvos.appendChild(recor)
        })
        recordes_por_nick.appendChild(recordes_salvos)
    } catch (error) {
        recordes_por_nick.innerHTML = "Sem registros"
    }
}


//salvando recorde
async function salvar_recorde() {
    // alert("Salvando")
    const display_salvando = document.querySelector(".msg_dados_salvos")
    display_salvando.innerHTML = "..."
    dificultade = document.getElementById("dificuldade_display").innerHTML
    let recorde = {
        dificultade: dificultade,
        tempo: (tempoAcumulado / TOTAL_TENTATIVAS),
        nickname: nickname_registrado.innerHTML.replace("<img src=\"imgs/click.gif\" alt=\"\">","").trim()
    }
    display_salvando.innerHTML = `
    <h5>${recorde.nickname}</h5>
    <h5>${(recorde.tempo).toFixed(2)}</h5>
    <h5>${recorde.dificultade}</h5>
    <h5>Salvando...</h5>
    `
    display_salvando.style.bottom = "-29px"
    
    try {
        const resposta = await fetch("https://pressfast-api.vercel.app/salvarrecorde", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recorde)
        })
        if (!resposta.ok) {
            throw new Error(`HTTP error! status: ${resposta}`);
        }

        const data = await resposta.json();
        
        display_salvando.innerHTML = `
        //         <h5>${(recorde.nickname)}</h5>
        //         <h5>${(recorde.tempo).toFixed(2)}</h5>
        //         <h5>${recorde.dificultade}</h5>
        //         <h5>Salvo!</h5>`
        setTimeout(() => {
            display_salvando.style.bottom = "0px"
        }, 3500);
        buscarrecordes(nickname_registrado.innerHTML.replace("<img src=\"imgs/click.gif\" alt=\"\">","").trim())
        reiniciar_game()
    } catch (error) {
        display_salvando.innerHTML = `
        <h5>${(recorde.nickname)}</h5>
        <h5>${(recorde.tempo).toFixed(2)}</h5>
        <h5>${recorde.dificultade}</h5>
        <h5>Erro ao salvar :(</h5>`
        // setTimeout(() => {
        //     display_salvando.style.bottom = "0px"
        // }, 3500);
    }
    
}

// async function testar_api(params) {
//     const url = await (await fetch("https://pressfast-api.vercel.app/")).json()
//     console.log(url.mensagem);
// }
// testar_api()

export default reiniciar_game