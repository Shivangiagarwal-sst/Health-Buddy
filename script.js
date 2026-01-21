let gameTimer = null;
let isBreathing = false;
let waterCount = 0;
document.addEventListener('DOMContentLoaded', () => {
    const savedWater = localStorage.getItem('waterCount');
    if (savedWater !== null) {
        waterCount = parseInt(savedWater, 10);
        updateWaterUI();
    }
document.querySelector('.menu-grid').addEventListener('click', e => {
        const card = e.target.closest('.menu-card');
        if (!card) return;
        if (card.id === 'btn-breath') openPage('breathing');
        if (card.id === 'btn-dance') openPage('dance');
        if (card.id === 'btn-yoga') openPage('yoga');
        if (card.id === 'btn-water') openPage('water');
});
document.getElementById('section-yoga').addEventListener('click', e => {
     const pose = e.target.closest('.yoga-pose');
       if (!pose) return;
        startYoga(
            pose.dataset.name,
            pose.dataset.how
        );
});
document.getElementById('goHomeBtn')
        .addEventListener('click', goHome);
document.getElementById('stopBtn')
        .addEventListener('click', stopEverything);
document.getElementById('breath-toggle')
        .addEventListener('click', toggleBreathing);
document.getElementById('dance-chill')
        .addEventListener('click', () => startDance());
document.getElementById('waterCircle')
        .addEventListener('click', addWater);

document.getElementById('resetWaterBtn')
        .addEventListener('click', resetWater);
});
function openPage(id) {
   stopEverything();
document
        .querySelectorAll('.section')
        .forEach(s => s.classList.remove('active'));
document
        .getElementById(`section-${id}`)
        .classList.add('active');
document.getElementById('nav-area').style.display = 'block';
}
function goHome() {
    stopEverything();
    document
        .querySelectorAll('.section')
        .forEach(s => s.classList.remove('active'));
    document
        .getElementById('section-home')
        .classList.add('active');

    document.getElementById('nav-area').style.display = 'none';
}
function toggleBreathing() {
    const btn = document.getElementById('breath-toggle');
    const box = document.getElementById('breath-box');
    const status = document.getElementById('breath-status');
    if (isBreathing) {
        stopEverything();
        return;
    }
    isBreathing = true;
    btn.innerText = 'Stop Session';
    const cycle = () => {
        if (!isBreathing) return;
        status.innerText = 'INHALE...';
        box.classList.add('inhale-act');
        setTimeout(() => {
        if (!isBreathing) return;
            status.innerText = 'EXHALE...';
            box.classList.remove('inhale-act');
        }, 4000);
    };
    cycle();
    gameTimer = setInterval(cycle, 8000);
}
function startDance() {
    const audio = document.getElementById('bg-audio');
    const txt = document.getElementById('dance-text');
    audio.src =
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    audio.currentTime = 0;
    audio.play().catch(()=>{
        alert('Audio playback failed. Please interact with the page first.');
    });
    const words = [
        'VIBE!',
        'POWER!',
        'DANCE!',
        'MOVE!'
    ];
    gameTimer = setInterval(() => {
        txt.innerText =
            words[Math.floor(Math.random() * words.length)];
        }, 800);
    }
function startYoga(name, how) {
    stopEverything();
    document.getElementById('exercise-mode').style.display = 'flex';
    document.getElementById('ex-title').innerText = name;
    document.getElementById('ex-how-to').innerHTML =
        `<b>GUIDE:</b><br>${how}`;
    let time = 30;
    document.getElementById('ex-timer').innerText = time;
    gameTimer = setInterval(() => {
      time--;
    document.getElementById('ex-timer').innerText = time;
     if (time <= 0) stopEverything();
    }, 1000);
}
function addWater() {
    if (waterCount >= 8) return;
    waterCount++;
    localStorage.setItem('waterCount', waterCount);
    updateWaterUI();
    if (waterCount === 8) launchCelebration();
}
function resetWater() {
    waterCount = 0;
    localStorage.setItem('waterCount', waterCount);
    updateWaterUI();
}
function updateWaterUI() {
    const segments =
        document.querySelectorAll('.water-segment');
    segments.forEach(s =>
        s.classList.remove('filled')
    );
    for (let i = 0; i < waterCount; i++) {
        segments[i].classList.add('filled');
    }
    document.getElementById('water-count').innerText =
        `${waterCount} / 8 Glasses`;
}
function launchCelebration() {
    const c = document.getElementById('balloon-container');
    c.innerHTML = '';
    const colors = [
        '#00f5d4',
        '#ffcf33',
        '#f15bb5',
        '#fee440',
        '#00b4d8'
    ];
    for (let i = 0; i < 60; i++) {
        const b = document.createElement('div');
        b.className = 'balloon';
        b.style.left = Math.random() * 100 + 'vw';
        b.style.background =
            colors[Math.floor(Math.random() * colors.length)];
        b.style.animationDuration =
            (Math.random() * 3 + 4) + 's';
        b.style.animationDelay =
            (Math.random() * 2) + 's';

        c.appendChild(b);
    }
    setTimeout(() => {
        c.innerHTML = '';
    }, 10000);
}
function stopEverything() {
    clearInterval(gameTimer);
    gameTimer = null;
    isBreathing = false;
    const audio = document.getElementById('bg-audio');
    audio.pause();
    audio.currentTime = 0;
    document.getElementById('exercise-mode').style.display = 'none';
    document.getElementById('dance-text').innerText = '';
    document.getElementById('breath-status').innerText = 'GET READY';
    document.getElementById('breath-box')
        .classList.remove('inhale-act');
    document.getElementById('breath-toggle')
        .innerText = 'Start Session';
}
