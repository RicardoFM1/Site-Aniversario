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

const updateMusicButton = () => {
  if (!musicToggle) return;
  musicToggle.classList.toggle('playing', isMusicPlaying);
  musicToggle.textContent = isMusicPlaying ? '🔊' : '🔇';
};

const startMusic = () => {
  if (!bgMusic || isMusicPlaying) return;

  if (bgMusic.muted) {
    bgMusic.muted = false;
  }

  const playPromise = bgMusic.play();
  if (playPromise && typeof playPromise.then === 'function') {
    playPromise
      .then(() => {
        isMusicPlaying = true;
        updateMusicButton();
      })
      .catch(() => {
        const resumePlayback = () => {
          startMusic();
          document.removeEventListener('click', resumePlayback);
          document.removeEventListener('touchstart', resumePlayback);
          document.removeEventListener('keydown', resumePlayback);
          document.removeEventListener('pointerdown', resumePlayback);
        };

        ['click', 'touchstart', 'keydown', 'pointerdown'].forEach((eventName) => {
          document.addEventListener(eventName, resumePlayback, { once: true });
        });
      });
  } else {
    isMusicPlaying = true;
    updateMusicButton();
  }
};

window.addEventListener('load', () => {
  if (bgMusic) {
    bgMusic.volume = 0.35;
    bgMusic.preload = 'auto';
    startMusic();
  }
});

if (musicToggle && bgMusic) {
  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMusicPlaying) {
      bgMusic.pause();
      isMusicPlaying = false;
      updateMusicButton();
    } else {
      startMusic();
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

