//header
const nav_btns = document.querySelector(".btns_nav")
const main_container_ajustes = document.querySelector(".container_ajustes")
const main_container_game = document.querySelector(".container_game")
const main_container_perfil = document.querySelector(".container_ajustes")
nav_btns.addEventListener("click", (e) => {
    // console.log(e.target.innerHTML);
    switch (e.target.innerHTML) {
        case "Ajustes":
            main_container_ajustes.style.left = "auto"
            main_container_game.style.left = "100%"
            main_container_perfil.style.left = "100%"
            break;
        case "Game":
            main_container_ajustes.style.left = "-100%"
            main_container_game.style.left = "auto"
            main_container_perfil.style.left = "100%"
            break;
        case "Perfil":
            main_container_ajustes.style.left = "-100%"
            main_container_game.style.left = "-100%"
            main_container_perfil.style.left = "auto"
            break;
    
        default:
            break;
    }
    
})