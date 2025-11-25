// Quiz.js
const questions = [
{ q: 'Qual console foi lançado pela Nintendo em 1985 e popularizou jogos em cartucho no ocidente?', options: ['PlayStation', 'Nintendo Entertainment System (NES)', 'Sega Genesis', 'Atari 2600'], correct: 1 },
{ q: 'Qual personagem é o mascote da Sega e famoso por sua velocidade?', options: ['Mario', 'Sonic', 'Link', 'Pikachu'], correct: 1 },
{ q: 'Em que jogo você assume o papel de Master Chief?', options: ['Halo', 'Gears of War', 'Doom', 'Metroid'], correct: 0 },
{ q: 'Qual console da Sony foi o primeiro a usar discos ópticos?', options: ['PlayStation (PS1)', 'PlayStation 2', 'PSP', 'PlayStation 3'], correct: 0 },
{ q: 'Qual jogo popularizou o battle royale em 2017-2018?', options: ['Fortnite', 'Tetris 99', 'PUBG', 'Apex Legends'], correct: 2 }

];

const qTotal = document.getElementById('qTotal');
const qIndex = document.getElementById('qIndex');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackArea = document.getElementById('feedbackArea');
const scoreEl = document.getElementById('score');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const restartBtn = document.getElementById('restart');

let index = 0;
let score = 0;
let answered = false;

// 🔵 INICIAR QUIZ
function start() {
    qTotal.textContent = questions.length;
    index = 0;
    score = 0;
    updateScore();
    showQuestion();
}

// Atualiza pontuação
function updateScore() {
    scoreEl.textContent = score;
}

// Exibir pergunta
function showQuestion() {
    const q = questions[index];

    qIndex.textContent = index + 1;
    questionEl.textContent = q.q;

    optionsEl.innerHTML = '';
    feedbackArea.innerHTML = '';
    answered = false;

    q.options.forEach((optText, i) => {
        const btn = document.createElement('button');
        btn.className = 'opt';
        btn.type = 'button';
        btn.textContent = optText;
        btn.onclick = () => selectAnswer(i, btn);
        optionsEl.appendChild(btn);
    });

    prevBtn.disabled = index === 0;
    nextBtn.disabled = false;
}

// Selecionar resposta
function selectAnswer(choice, btn) {
    if (answered) return;
    answered = true;

    const correct = questions[index].correct;
    const buttons = Array.from(optionsEl.children);

    buttons.forEach((b, i) => {
        b.disabled = true;
        if (i === correct) b.classList.add('correct');
        if (i === choice && choice !== correct) b.classList.add('wrong');
    });

    if (choice === correct) {
        score++;
        updateScore();
        showFeedback(true);
    } else {
        showFeedback(false, questions[index].options[correct]);
    }
}

// Feedback
function showFeedback(isCorrect, text) {
    feedbackArea.innerHTML = `
        <div class="feedback ${isCorrect ? "ok" : "bad"}">
            ${isCorrect ? "Acertou! ✅" : "Errou — Certa: " + text}
        </div>
    `;
}

// 🔥 Finalizar Quiz
function finishQuiz() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("finalScreen").style.display = "block";

    document.getElementById("finalScore").textContent = score;
    document.getElementById("finalTotal").textContent = questions.length;
}

// Reiniciar Quiz
function restartQuiz() {
    document.getElementById("finalScreen").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    start();
}

// Botões
prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
        showQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (index < questions.length - 1) {
        index++;
        showQuestion();
    } else {
        finishQuiz(); // <-- Tela final
    }
});

restartBtn.addEventListener('click', () => start());

// Início
start();
