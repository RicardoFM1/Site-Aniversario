const btnConfetti = document.querySelector('.confetti');

if (btnConfetti) {
  btnConfetti.addEventListener('click', (event) => {
    confetti({ position: { x: event.clientX, y: event.clientY } });
  });
}

var textWrapper = document.querySelector('.textoMaria');
if (textWrapper) {
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime.timeline({loop: true})
  .add({
    targets: '.textoMaria .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70*i
  }).add({
    targets: '.textoMaria',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
}


const divTexto = document.querySelector('.divTexto')


const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;


window.addEventListener('load', () => {
  if (bgMusic) {
    bgMusic.play().catch(err => console.log('Autoplay blocked:', err));
    if (musicToggle) {
      musicToggle.classList.add('playing');
      musicToggle.textContent = '🔊';
      isMusicPlaying = true;
    }
  }
});

if (musicToggle && bgMusic) {
  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMusicPlaying) {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
      musicToggle.textContent = '🔇';
      isMusicPlaying = false;
    } else {
      bgMusic.play();
      musicToggle.classList.add('playing');
      musicToggle.textContent = '🔊';
      isMusicPlaying = true;
    }
  });
}


function flipCard(e) {
  if (e) {
    e.stopPropagation();
  }
  const cardElement = document.getElementById('cardFlip');
  if (cardElement) {
    cardElement.classList.toggle('flipped');
  }
}

