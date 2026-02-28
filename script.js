// Trocar a cor do planeta ao clicar no botão
const botao = document.getElementById("botao");
const planetas = document.querySelectorAll(".planeta");

// Função para gerar uma cor aleatória
function corAleatoria() {
    const cores = [
        "#ff7f50", "#ff4500", "#7f7fff", "#4b0082", "#00ffff", "#ff1493", "#32cd32", "#ffd700"
    ];
    return cores[Math.floor(Math.random() * cores.length)];
}


botao.addEventListener("click", () => {
    planetas.forEach(planeta => {
        planeta.style.background = 
        `linear-gradient(45deg, ${corAleatoria()}, ${corAleatoria()})`;
    });
});

// =========================
// Criar estrelas aleatórias de fundo
// =========================
for (let i = 0; i < 150; i++) {
    let estrela = document.createElement('div');
    estrela.classList.add('estrela');

    // Posição aleatória
    estrela.style.top = Math.random() * 100 + "vh";
    estrela.style.left = Math.random() * 100 + "vw";

    // Tamanho aleatório
    const tamanho = Math.random() * 3 + 1;
    estrela.style.width = tamanho + "px";
    estrela.style.height = tamanho + "px";

    // Duração de piscar diferente
    estrela.style.animationDuration = (Math.random() * 3 + 2) + "s";

     // Delay aleatório para cada estrela
    estrela.style.animationDelay = Math.random() * 5 + "s";

    // Algumas estrelas mais brilhantes
    if (Math.random() > 0.8) {
        estrela.style.boxShadow = "0 0 8px white";
    }
    document.body.appendChild(estrela);
}

// =========================
// ESTRELA CADENTE
// =========================


// Criar estrela cadente ocasionalmente
function criarEstrelaCadente() {

    const estrela = document.createElement("div");
    estrela.classList.add("estrela-cadente");

    // nasce em qualquer ponto do topo
    const inicioX = Math.random() * window.innerWidth;
    const inicioY = Math.random() * window.innerHeight * 0.3;

    estrela.style.left = inicioX + "px";
    estrela.style.top = inicioY + "px";

    document.body.appendChild(estrela);

    // direção diagonal natural
    const distancia = 800;
    const angulo = (Math.random() * 30 + 20) * (Math.PI / 180);

    const fimX = inicioX + Math.cos(angulo) * distancia;
    const fimY = inicioY + Math.sin(angulo) * distancia;

    const duracao = Math.random() * 1000 + 800;
    const inicioTempo = performance.now();

    function animar(tempo) {
        const progresso = (tempo - inicioTempo) / duracao;

        if (progresso < 1) {
            estrela.style.left = inicioX + (fimX - inicioX) * progresso + "px";
            estrela.style.top = inicioY + (fimY - inicioY) * progresso + "px";
            estrela.style.opacity = 1 - progresso;
            requestAnimationFrame(animar);
        } else {
            estrela.remove();
        }
    }

    requestAnimationFrame(animar);
}

function chuvaDeMeteoros() {
    const quantidade = Math.floor(Math.random() * 10) + 5;

    for (let i = 0; i < quantidade; i++) {
        setTimeout(() => {
            criarEstrelaCadente();
        }, i * 200); // intervalo entre cada meteoro
    }
}

// intervalo variável (fica mais natural)
setInterval(() => {

    // meteoros normais
    if (Math.random() > 0.7) {
        criarEstrelaCadente();
    }

    // chance rara de chuva de meteoros
    if (Math.random() > 0.97) {
        chuvaDeMeteoros();
    }
}, 500);


// =========================
// Mostrar mensagem ao clicar nos planetas
// =========================
function mostrar(tipo) {
    const mensagem = document.getElementById("mensagem");

    if (tipo === "estudos") {
        mensagem.innerText = "Este planeta representa meu esforço diário.";
    }

    if (tipo === "musica") {
        mensagem.innerText = "Aqui vivem os acordes que estou aprendendo.";
    }

    if (tipo === "idiomas") {
        mensagem.innerText = "Neste mundo eu exploro novas línguas.";
    }

}

/* ANIMAÇÃO DE ATAQUE ALIENÍGENA */
function moverNave() {
    const nave = document.getElementById("nave");

    nave.style.transition = "none"; // Remove transição para movimento instantâneo
    nave.style.transform = "translateX(0)"; // Reseta a posição da nave
    nave.style.left = "-100px"; // Começa fora da tela

    setTimeout(() => {
        nave.style.transition = "transform 3s linear"; // Adiciona transição para movimento suave
        nave.style.transform = "translateX(120vw)"; // Move a nave para atravessar a tela
    }, 50); // Pequeno delay para garantir que a posição inicial seja aplicada

    // Quando terminar o movimento -> dispara o laser
    nave.addEventListener("transitionend", function handler() {
        dispararLaser();
        setTimeout(destruirPlaneta, 200); // Destrói o planeta um pouco depois de disparar o laser
        nave.removeEventListener("transitionend", handler); // Remove o listener para evitar múltiplos disparos
    })
}



function dispararLaser() {
    const nave = document.getElementById("nave");
    const planeta = document.querySelector(".planeta-anel:not(.explosao)"); // Alvo: planeta com anel que ainda não foi destruído

    if (!nave || !planeta) return;

    const naveRect = nave.getBoundingClientRect();
    const planetaRect = planeta.getBoundingClientRect();

    const origemX = naveRect.left + naveRect.width;
    const origemY = naveRect.top + naveRect.height / 2;

    const destinoX = planetaRect.left + planetaRect.width / 2;
    const destinoY = planetaRect.top + planetaRect.height / 2;

    const deltaX = destinoX - origemX;
    const deltaY = destinoY - origemY;

    const distancia = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angulo = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    const laser = document.createElement("div");
    laser.classList.add('laser');

    laser.style.left = origemX + "px";
    laser.style.top = origemY + "px";
    laser.style.width = distancia + "px";
    laser.style.transform = `rotate(${angulo}deg)`;

    document.body.appendChild(laser);

    setTimeout(() => {
        laser.remove();
    }, 300); // Remove o laser após atingir o planeta
}


function destruirPlaneta() {
    const planeta = document.querySelector(".planeta-anel");
    if (planeta) {
        planeta.classList.add("explosao"); // Adiciona a classe de explosão para animar a destruição
    }
}

function ataqueAlien() {
    moverNave(); 
}

setTimeout(ataqueAlien, 5000); // Inicia o ataque alienígena após 5 segundos

function criarAsteroide() {

    const asteroide = document.createElement("div");
    asteroide.classList.add("asteroide");

    // nasce fora da tela em posição aleatória lateral
    const lado = Math.random() > 0.5 ? -100 : window.innerWidth + 100;
    const inicioX = lado;
    const inicioY = Math.random() * window.innerHeight * 0.6;

    asteroide.style.left = inicioX + "px";
    asteroide.style.top = inicioY + "px";

    document.body.appendChild(asteroide);

    const planeta = document.querySelector(".orbita3 .planeta:not(.explosao)"); // Alvo: planeta da órbita 3 que ainda não foi destruído
    if (!planeta) return;

    const planetaRect = planeta.getBoundingClientRect();

    const destinoX = planetaRect.left + planetaRect.width / 2;
    const destinoY = planetaRect.top + planetaRect.height / 2;

    const deltaX = destinoX - inicioX;
    const deltaY = destinoY - inicioY;

    const angulo = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    asteroide.style.transform = `rotate(${angulo}deg)`;

    let inicioTempo = performance.now();
    const duracao = 2500; // Duração do movimento em ms

    function animar(tempo) {

        const progresso = (tempo - inicioTempo) / duracao;

        if (progresso < 1) {

            // aceleração suave usando uma função de easing (quadrática)
            const ease = progresso * progresso;

            asteroide.style.left = inicioX + deltaX * ease + "px";
            asteroide.style.top = inicioY + deltaY * ease + "px";

            requestAnimationFrame(animar);
        } else {
            impactoAsteroide(planeta);
            asteroide.remove();
        }
    }

    requestAnimationFrame(animar);
}

function impactoAsteroide(planeta) {

    planeta.classList.add("impacto"); // Animação de tremor para simular impacto

    setTimeout(() => {
        planeta.classList.remove("impacto"); // Remove a classe de tremor após a animação)
        planeta.classList.add("explosao"); // Adiciona a classe de explosão para animar a destruição
    }, 300); // Destrói o planeta após o tremor
}

setTimeout(criarAsteroide, 10000); // Inicia a criação do asteroide após 10 segundos

function sugarPlaneta(planeta, buraco) {

    const rect = planeta.getBoundingClientRect();
    const buracoRect = buraco.getBoundingClientRect();

    // Clona o planeta
    const clone = planeta.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.left = rect.left + "px";
    clone.style.top = rect.top + "px";
    clone.style.margin = "0";
    clone.style.transform = "none";

    document.body.appendChild(clone);

    // Esconde o original
    planeta.style.visibility = "hidden";

    const destinoX = buracoRect.left + buracoRect.width / 2;
    const destinoY = buracoRect.top + buracoRect.height / 2;

    const origemX = rect.left + rect.width / 2;
    const origemY = rect.top + rect.height / 2;

    const dx = destinoX - origemX;
    const dy = destinoY - origemY;

    let progresso = 0;

    function animar() {
        progresso += 0.02;

        const ease = progresso * progresso; // aceleração natural

        clone.style.transform = `
            translate(${dx * ease}px, ${dy * ease}px)
            scale(${1 - ease})
            rotate(${ease * 720}deg)
        `;

        if (progresso < 1) {
            requestAnimationFrame(animar);
        } else {
            clone.remove();
        }
    }

    requestAnimationFrame(animar);
}

setTimeout(() => {
    const planeta = document.querySelector(".orbita1 .planeta");
    const buraco = document.querySelector(".buraco-negro");

    if (planeta && buraco) {
        buraco.style.display = "block"; // Mostra o buraco negro
        sugarPlaneta(planeta, buraco);
    }
}, 15000); // Inicia a animação de sucção após 15 segundos