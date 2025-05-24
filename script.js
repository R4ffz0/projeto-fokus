const html = document.querySelector('html');
const focobtn = document.querySelector('.app__card-button--foco');
const curtobtn = document.querySelector('.app__card-button--curto');
const longobtn = document.querySelector('.app__card-button--longo');
const PausePlayImg = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const startpausebtn = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarPausarBT = document.querySelector('#start-pause span');
const reiniciarBtn = document.querySelector('#restart');
// Configuração dos sons
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const somIniciar = new Audio('./sons/play.wav');
const somPausar = new Audio('./sons/pause.mp3');
const somfinal = new Audio('./sons/beep.mp3');
musica.loop = true;

// Evento para controlar a música de fundo
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

let tempoDecorrido = 1500   
let intervalo = null;

focobtn.addEventListener('click',() => {
    zerar();
    tempoDecorrido = 1500;
    alterarContexto('foco');
    focobtn.classList.add('active');
    PausePlayImg.setAttribute('src', './imagens/play_arrow.png');
    iniciarPausarBT.textContent = "Iniciar";
})

curtobtn.addEventListener('click',() => {
    zerar();
    tempoDecorrido = 300;
    alterarContexto('descanso-curto');
    curtobtn.classList.add('active');
    PausePlayImg.setAttribute('src', './imagens/play_arrow.png');
    iniciarPausarBT.textContent = "Iniciar";
})

longobtn.addEventListener('click',() => {
    zerar();
    tempoDecorrido = 900;
    alterarContexto('descanso-longo');
    longobtn.classList.add('active');
    PausePlayImg.setAttribute('src', './imagens/play_arrow.png');
    iniciarPausarBT.textContent = "Iniciar";
})

function alterarContexto(contexto) {
    mostrarTempo();
    buttons.forEach(function(contexto){
       contexto.classList.remove('active') 
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);

        switch(contexto) {
            case 'foco':
                titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
                break;
            case 'descanso-curto':
                titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
                break;
            case 'descanso-longo':
                titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
                break;
        }   
    }

const contagemRegressiva = () => {
    if(tempoDecorrido <= 0){
        somfinal.play();
        zerar();
        const contexto = html.getAttribute('data-contexto');
        if(contexto === 'foco') {
            tempoDecorrido = 1500;
        } else if(contexto === 'descanso-curto') {
            tempoDecorrido = 300;
        } else if(contexto === 'descanso-longo') {
            tempoDecorrido = 900;
        }
        PausePlayImg.setAttribute('src', './imagens/play_arrow.png');
        iniciarPausarBT.innerHTML = "Iniciar";
        return;
    }
    tempoDecorrido -= 1;
    mostrarTempo();
}

startpausebtn.addEventListener('click', iniciarPausar);

function iniciarPausar(){
    if(intervalo){
        somPausar.play();
        zerar();
        iniciarPausarBT.textContent = "Iniciar";
        PausePlayImg.setAttribute('src', './imagens/play_arrow.png');
        return;
    }
    somIniciar.play();
    intervalo = setInterval(contagemRegressiva, 1000);
    iniciarPausarBT.textContent = "Pausar";
    PausePlayImg.setAttribute('src', './imagens/pause.png');
}

function zerar(){
    clearInterval(intervalo);
    intervalo = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-BR', {
        minute: '2-digit',
        second: '2-digit'
    });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();

// Adicionar evento de clique para o botão reiniciar
reiniciarBtn.addEventListener('click', reiniciarTempo);

function reiniciarTempo() {
    zerar();
    const contexto = html.getAttribute('data-contexto');
    if(contexto === 'foco') {
        tempoDecorrido = 1500;
    } else if(contexto === 'descanso-curto') {
        tempoDecorrido = 300;
    } else if(contexto === 'descanso-longo') {
        tempoDecorrido = 900;
    }
    PausePlayImg.setAttribute('src', './imagens/play_arrow.png');
    iniciarPausarBT.innerHTML = "Iniciar";
    mostrarTempo();
}