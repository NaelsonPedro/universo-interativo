// =========================
// Criar estrelas
// =========================
for (let i = 0; i < 200; i++) {
    let estrela = document.createElement('div');
    estrela.classList.add('estrela');

    estrela.dataset.depth = Math.random();

    const cores = ['#c79cff', '#7ec8ff', '#ffb347', '#ff6961', '#836fff'];

    if (Math.random() > 0.5) {
        const cor = cores[Math.floor(Math.random() * cores.length)];
        estrela.style.background = cor;
        estrela.style.boxShadow = `0 0 8px ${cor}`;
    }

    estrela.style.top = Math.random() * 100 + "vh";
    estrela.style.left = Math.random() * 100 + "vw";

    const tamanho = Math.random() * 3 + 1;
    estrela.style.width = tamanho + "px";
    estrela.style.height = tamanho + "px";

    estrela.style.animationDuration = (Math.random() * 3 + 2) + "s";
    estrela.style.animationDelay = Math.random() * 5 + "s";

    if (Math.random() > 0.8) {
        estrela.style.boxShadow += ", 0 0 8px white";
    }

    document.body.appendChild(estrela);
}


// Parallax estrelas profundidade
// =========================
const estrelas = document.querySelectorAll(".estrela");

document.addEventListener("mousemove", (e) => {
    estrelas.forEach(estrela => {
        const depth = parseFloat(estrela.dataset.depth);

        const moveX = (e.clientX - window.innerWidth / 2) * depth * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * depth * 0.01;

        estrela.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + depth})`;
    });
});

function viajarEspaco() {
    estrelas.forEach(estrela => {
        let y = parseFloat(estrela.style.top);

        const speed = Math.pow(estrela.dataset.depth, 2) * 5 + 0.2;

        y += speed;

        if (y > window.innerHeight) {
            y = -10; // reaparece no topo
            estrela.style.left = Math.random() * 100 + "vw";
        }

        estrela.style.top = y + "px";
    });

    requestAnimationFrame(viajarEspaco);
}

// =========================
// ÁUDIO (AGORA CORRETO)
// =========================
const musica = document.getElementById("musica");
const somPlaneta = document.getElementById("somPlaneta");
const botao = document.getElementById("botao");

// volume inicial
musica.volume = 0.3;
somPlaneta.volume = 0.6;

// Botão ligar/desligar música
let tocando = false;

// botão inicia música
botao.addEventListener("click", () => {
    if (!tocando) {
        musica.play();
        botao.innerText = "Pausar música";

        iniciarExperiencia(); // 🔥 AQUI ESTÁ A MÁGICA
        zoomCinematografico();
        viajarEspaco();

    } else {
        musica.pause();
        botao.innerText = "Explorar galáxia";
    }

    tocando = !tocando;
});


// =========================
// Clique nos planetas
// =========================
function mostrar(tipo) {
    const mensagem = document.getElementById("mensagem");

    somPlaneta.currentTime = 0;
    somPlaneta.play();

    if (tipo === "estudos") {
        mensagem.innerText = "Este planeta representa meu esforço diário.";
    } else if (tipo === "musica") {
        mensagem.innerText = "Aqui vivem os acordes que estou aprendendo.";
    } else if (tipo === "idiomas") {
        mensagem.innerText = "Neste mundo eu exploro novas línguas.";
    }
}


// EXPERIÊNCIA CINEMATOGRÁFICA
function iniciarExperiencia() {

    // leve zoom
    document.body.style.transition = "transform 4s ease";
    document.body.style.animation = "zoomInfinito 20s linear infinite";

    // estrela cadente
    setTimeout(() => {
        estrelaCadente();
    }, 800);
}


function zoomCinematografico() {
    let escala = 1;

    setInterval(() => {
        escala += 0.001 + Math.sin(Date.now() * 0.001) * 0.0005;

        document.body.style.transform = `scale(${escala})`;

        // reset invisível (truque)
        if (escala >= 1.3) {
            escala = 1;
        }

    }, 30);
}

// =========================
// ESTRELA CADENTE
// =========================
function estrelaCadente() {
    const estrela = document.createElement("div");
    estrela.classList.add("estrela-cadente");

    estrela.style.top = Math.random() * window.innerHeight + "px";
    estrela.style.left = Math.random() * window.innerWidth + "px";

    document.body.appendChild(estrela);

    estrela.animate([
        { transform: "translate(0,0)", opacity: 1 },
        { transform: "translate(200px,200px)", opacity: 0 }
    ], {
        duration: 1000,
        easing: "ease-out"
    });

    setTimeout(() => estrela.remove(), 1000);
}



// Nave Espacial
const nave = document.getElementById("nave");

function spawnNave() {
    const altura = Math.random() * (window.innerHeight * 0.6);
    const duracao = Math.random() * 3 + 3; // entre 3s e 6s
    const inclinacao = Math.random() * 20 - 10; // -10° a +10°

    nave.style.transition = "none";
    nave.style.top = altura + "px";
    nave.style.transform = `translateX(-200px) rotate(${inclinacao}deg)`;

    setTimeout(() => {
        nave.style.transition = `transform ${duracao}s linear`;
        nave.style.transform = `translateX(${window.innerWidth + 200}px) rotate(${inclinacao}deg)`;
    }, 50);
}

// spawn aleatório
setInterval(() => {
    spawnNave();
}, Math.random() * 8000 + 5000); // entre 5s e 13s


document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    nave.style.boxShadow = `${X}px ${y}px 20px cyan`;
});

// Rastro da nave
function rastroNave() {
    const particula = document.createElement("div");

    particula.style.position = "fixed";
    particula.style.width = "4px";
    particula.style.height = "4px";
    particula.style.background = "cyan";
    particula.style.borderRadius = "50%";
    particula.style.left = nave.getBoundingClientRect().left + "px";
    particula.style.top = nave.getBoundingClientRect().top + "px";
    particula.style.opacity = "0.7";
    particula.style.pointerEvents = "none";

    document.body.appendChild(particula);

    particula.animate([
        { transform: "scale(1)", opacity: 0.7 },
        { transform: "scale(0)", opacity: 0 }
    ], {
        duration: 600,
        easing: "ease-out"
    });

    setTimeout(() => particula.remove(), 600);
}

setInterval(rastroNave, 80);