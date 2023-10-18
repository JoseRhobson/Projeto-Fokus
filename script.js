const html = document.querySelector('html')
const focobt = document.querySelector('.app__card-button--foco')
const curtobt = document.querySelector('.app__card-button--curto')
const longobt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPausebt = document.querySelector('#start-pause')
const iniciarOuPausarbt = document.querySelector('#start-pause span')
const imgIcon = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')


const musica = new Audio('sons/luna-rise-part-one.mp3')
const iniciarCont = new Audio('sons/play.wav')
const PausarCont = new Audio('sons/pause.mp3')
const fimCont = new Audio('sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true
musicaFocoInput.addEventListener('change',()=>{
    if(musica.paused){
        musica.play()
    }
    else{
        musica.pause()
    }
})

/*
focobt.addEventListener('click',() => {
    html.setAttribute('data-contexto','foco')
    banner.setAttribute('src','imagens/foco.png')
})

curtobt.addEventListener('click', () => {
    html.setAttribute('data-contexto','descanso-curto')
    banner.setAttribute('src','imagens/descanso-curto.png')
})

longobt.addEventListener('click',() => {
    html.setAttribute('data-contexto','descanso-longo')
    banner.setAttribute('src','imagens/descanso-longo.png')
})
*/
//------------------------- or --------------------------

focobt.addEventListener('click',() => {
    tempoDecorridoEmSegundos = 1500
   alterarContexto('foco')
   focobt.classList.add('active')
})

curtobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
   alterarContexto('descanso-curto')
   curtobt.classList.add('active')
})

longobt.addEventListener('click',() => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')  
    longobt.classList.add('active') 
})

function alterarContexto (contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src',`imagens/${contexto}.png`)
    switch(contexto) {
        case "foco":
        titulo.innerHTML = `Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;
        case "descanso-curto":
            titulo.innerHTML = ` Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            
            break;
        
        case "descanso-longo":
            titulo.innerHTML = ` Hora de voltar à superfície,<br>
            <strong class="app__title-strong"> Faça uma pausa longa.</strong>`
            
            break;
       
        default:
            break;

    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        fimCont.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo ()
}

startPausebt.addEventListener('click',iniciarOuPausar)

function iniciarOuPausar(){
    
    if(intervaloId){
        imgIcon.setAttribute ('src','imagens/play_arrow.png')
        PausarCont.play()
        zerar()
        return
    }
   
    imgIcon.setAttribute ('src','imagens/pause.png')
    iniciarOuPausarbt.textContent = "Pausar"
    iniciarCont.play()
    intervaloId = setInterval(contagemRegressiva,1000)
}
function zerar(){
    iniciarOuPausarbt.textContent = "Começar"
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br',{minute:'2-digit',second:'2-digit'})
    tempoNaTela.innerHTML= `${tempoFormatado}`

} 
mostrarTempo()