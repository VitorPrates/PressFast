//header
const nav_btns = document.querySelector(".btns_nav")
const main_container_ajustes = document.querySelector(".container_ajustes")
const main_container_game = document.querySelector(".container_game")
const main_container_perfil = document.querySelector(".container_perfil")
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
            main_container_ajustes.style.left = "30%"
            main_container_game.style.left = "100%"
            main_container_perfil.style.left = "200%"
            main_container_sobre.style.left = "-200%"
            break;
        case "Game":
            main_container_ajustes.style.left = "-100%"
            main_container_game.style.left = "30%"
            main_container_perfil.style.left = "100%"
            main_container_sobre.style.left = "-200%"
            break;
        case "Perfil":
            main_container_ajustes.style.left = "-200%"
            main_container_game.style.left = "-100%"
            main_container_perfil.style.left = "30%"
            main_container_sobre.style.left = "-300%"
            break;
        case "Sobre":
            main_container_ajustes.style.left = "100%"
            main_container_game.style.left = "200%"
            main_container_perfil.style.left = "300%"
            main_container_sobre.style.left = "30%"
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
    })
    
})