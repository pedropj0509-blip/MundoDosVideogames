// Quiz.js
const questions = [
{ q: 'Qual console foi lançado pela Nintendo em 1985 e popularizou jogos em cartucho no ocidente?', options: ['PlayStation', 'Nintendo Entertainment System (NES)', 'Sega Genesis', 'Atari 2600'], correct: 1 },
{ q: 'Qual personagem é o mascote da Sega e famoso por sua velocidade?', options: ['Mario', 'Sonic', 'Link', 'Pikachu'], correct: 1 },
{ q: 'Em que jogo você assume o papel de Master Chief?', options: ['Halo', 'Gears of War', 'Doom', 'Metroid'], correct: 0 },
{ q: 'Qual console da Sony foi o primeiro a usar discos ópticos (CD) como mídia principal?', options: ['PlayStation (PS1)', 'PlayStation 2', 'PSP', 'PlayStation 3'], correct: 0 },
{ q: 'Qual jogo é conhecido por popularizar o gênero battle royale em 2017-2018?', options: ['Fortnite', 'Tetris 99', 'PUBG', 'Apex Legends'], correct: 2 }
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


let index = 0; let score = 0; let answered = false;


function start(){
qTotal.textContent = questions.length;
index = 0; score = 0; updateScore(); showQuestion();
}
function updateScore(){ scoreEl.textContent = score; }
function showQuestion(){
const q = questions[index];
qIndex.textContent = index + 1;
questionEl.textContent = q.q;
optionsEl.innerHTML = ''; feedbackArea.innerHTML = ''; answered = false;
q.options.forEach((optText, i)=>{
const btn = document.createElement('button');
btn.className = 'opt'; btn.type = 'button'; btn.textContent = optText;
btn.onclick = ()=>selectAnswer(i, btn);
optionsEl.appendChild(btn);
});
prevBtn.disabled = index===0; nextBtn.disabled = index===questions.length-1;
}
function selectAnswer(choice, btn){
if(answered) return; answered = true;
const correct = questions[index].correct;
const buttons = Array.from(optionsEl.children);
buttons.forEach((b,i)=>{ b.classList.add('disabled'); b.disabled=true; if(i===correct) b.style.boxShadow='0 6px 18px rgba(16,185,129,0.12)'; if(i===choice && i!==correct) b.style.opacity=0.85; });
if (choice === correct) {
    score++;
    updateScore();
    showFeedback(true);

    // deixa a opção correta verde
    btn.classList.add('correct');
} else {
    showFeedback(false, questions[index].options[correct]);

    // deixa a opção errada vermelha
    btn.classList.add('wrong');
}

// também destacar qual era a correta
buttons[correct].classList.add('correct')};
function showFeedback(isCorrect, correctText){
feedbackArea.innerHTML=''; const f=document.createElement('div');
f.className='feedback '+(isCorrect?'ok':'bad');
f.textContent=isCorrect?'Acertou! ✅':'Errou — resposta certa: '+correctText;
feedbackArea.appendChild(f);
}
prevBtn.addEventListener('click',()=>{ if(index>0){ index--; showQuestion(); } });
nextBtn.addEventListener('click',()=>{ if(index<questions.length-1){ index++; showQuestion(); } });
restartBtn.addEventListener('click',()=>{ if(confirm('Reiniciar o quiz?')) start(); });
start();