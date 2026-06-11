import reiniciar_game from "./funks.js"

//header
const nav_btns = document.querySelector(".btns_nav")
const main_container_ajustes = document.querySelector(".container_ajustes")
const main_container_game = document.querySelector(".container_game")
const main_container_ranking = document.querySelector(".container_ranking")
const main_container_sobre = document.querySelector(".container_sobre")
const btn_ajuste_dificuldade = document.querySelectorAll(".btn_ajuste_dificuldade")
const dificuldade_display = document.getElementById("dificuldade_display")

nav_btns.addEventListener("click", (e) => {
    // console.log(e.target.innerHTML);    
    Array.from(nav_btns.children).forEach((child) => {
        child.classList.remove("btn_nav_selected")
    });
    e.target.classList.add("btn_nav_selected")
    mudar_tela(e.target.innerHTML)
})
function mudar_tela(tela)
{
    switch (tela) {
        case "Ajustes":
            main_container_ajustes.style.transform = "translateX(0vw)"
            main_container_game.style.transform = "translateX(100vw)"
            main_container_ranking.style.transform = "translateX(200vw)"
            main_container_sobre.style.transform = "translateX(-100vw)"
            break;
        case "Game":
            main_container_ajustes.style.transform = "translateX(-100vw)"
            main_container_game.style.transform = "translateX(0vw)"
            main_container_ranking.style.transform = "translateX(100vw)"
            main_container_sobre.style.transform = "translateX(-200vw)"
            break;
        case "Ranking":
            main_container_ajustes.style.transform = "translateX(-200vw)"
            main_container_game.style.transform = "translateX(-100vw)"
            main_container_ranking.style.transform = "translateX(0vw)"
            main_container_sobre.style.transform = "translateX(-300vw)"
            break;
        case "Sobre":
            main_container_ajustes.style.transform = "translateX(100vw)"
            main_container_game.style.transform = "translateX(200vw)"
            main_container_ranking.style.transform = "translateX(300vw)"
            main_container_sobre.style.transform = "translateX(0vw)"
            break;
    }
}

btn_ajuste_dificuldade.forEach((btn,index) => {
    btn.addEventListener("click", () =>{
        if(index == 0)
        {
            dificuldade_display.innerHTML = "Fácil"
        }
        if(index == 1)
        {
            dificuldade_display.innerHTML = "Médio"
        }
        if(index == 2)
        {
            dificuldade_display.innerHTML = "Difícil"
        }
        mudar_tela("Game")
        Array.from(nav_btns.children).forEach((child) => {
        child.classList.remove("btn_nav_selected")
        });
        Array.from(nav_btns.children)[2].classList.add("btn_nav_selected")
        setTimeout(() => {
            reiniciar_game()
        }, 300);
    })
})

