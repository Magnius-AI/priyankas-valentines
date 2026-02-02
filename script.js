// ===== CONFIGURATION =====
const CONFIG = {
  // February 14, 2026 at midnight Nepal time (UTC+5:45)
  unlockDate: new Date('2026-02-14T00:00:00+05:45'),
  // Relationship started December 7, 2025 at 4:11 AM EST
  relationshipStart: new Date('2025-12-07T04:11:00-05:00'),
  // Password
  password: 'Only4PriyankaTiwari!'
};

// ===== DOM ELEMENTS =====
const countdownScreen = document.getElementById('countdown-screen');
const passwordScreen = document.getElementById('password-screen');
const mainContent = document.getElementById('main-content');
const bypassBtn = document.getElementById('bypass-btn');

// ===== COUNTDOWN TIMER =====
function updateCountdown() {
  const now = new Date();
  const diff = CONFIG.unlockDate - now;
  
  if (diff <= 0) {
    // Time's up! Show password screen
    countdownScreen.classList.add('hidden');
    passwordScreen.classList.remove('hidden');
    return;
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// ===== RELATIONSHIP COUNTER =====
function updateRelationshipCounter() {
  const now = new Date();
  const diff = now - CONFIG.relationshipStart;
  
  if (diff < 0) return;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  const daysEl = document.getElementById('rel-days');
  const hoursEl = document.getElementById('rel-hours');
  const minutesEl = document.getElementById('rel-minutes');
  const secondsEl = document.getElementById('rel-seconds');
  
  if (daysEl) daysEl.textContent = days;
  if (hoursEl) hoursEl.textContent = hours;
  if (minutesEl) minutesEl.textContent = minutes;
  if (secondsEl) secondsEl.textContent = seconds;
}

// ===== PASSWORD HANDLING =====
const passwordForm = document.getElementById('password-form');
const passwordInput = document.getElementById('password-input');
const passwordError = document.getElementById('password-error');

if (passwordForm) {
  passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (passwordInput.value === CONFIG.password) {
      passwordScreen.classList.add('hidden');
      mainContent.classList.remove('hidden');
      // Save to localStorage so she doesn't have to enter again
      localStorage.setItem('pri_authenticated', 'true');
    } else {
      passwordError.classList.remove('hidden');
      passwordInput.value = '';
      passwordInput.focus();
      
      // Hide error after 3 seconds
      setTimeout(() => {
        passwordError.classList.add('hidden');
      }, 3000);
    }
  });
}

// ===== DEV BYPASS =====
if (bypassBtn) {
  bypassBtn.addEventListener('click', () => {
    countdownScreen.classList.add('hidden');
    passwordScreen.classList.remove('hidden');
  });
}

// ===== LOVE LETTER REVEAL =====
const letterParts = document.querySelectorAll('.letter-part');
const revealAllBtn = document.getElementById('reveal-all-btn');
let currentLetterPart = 0;

letterParts.forEach((part, index) => {
  part.addEventListener('click', () => {
    if (index === currentLetterPart) {
      part.setAttribute('data-revealed', 'true');
      currentLetterPart++;
    }
  });
});

if (revealAllBtn) {
  revealAllBtn.addEventListener('click', () => {
    letterParts.forEach(part => {
      part.setAttribute('data-revealed', 'true');
    });
    currentLetterPart = letterParts.length;
    revealAllBtn.classList.add('hidden');
  });
}

// ===== QUIZ =====
const quizQuestions = document.querySelectorAll('.quiz-question');
const quizResult = document.getElementById('quiz-result');
const restartQuizBtn = document.getElementById('restart-quiz');
let currentQuestion = 0;
let score = 0;

document.querySelectorAll('.quiz-option').forEach(option => {
  option.addEventListener('click', function() {
    const isCorrect = this.getAttribute('data-correct') === 'true';
    const allOptions = this.parentElement.querySelectorAll('.quiz-option');
    
    // Disable all options
    allOptions.forEach(opt => {
      opt.disabled = true;
      if (opt.getAttribute('data-correct') === 'true') {
        opt.classList.add('correct');
      }
    });
    
    if (isCorrect) {
      score++;
      this.classList.add('correct');
    } else {
      this.classList.add('wrong');
    }
    
    // Move to next question after delay
    setTimeout(() => {
      currentQuestion++;
      
      if (currentQuestion < quizQuestions.length) {
        quizQuestions[currentQuestion - 1].classList.add('hidden');
        quizQuestions[currentQuestion].classList.remove('hidden');
      } else {
        // Show results
        showQuizResults();
      }
    }, 1500);
  });
});

function showQuizResults() {
  quizQuestions.forEach(q => q.classList.add('hidden'));
  quizResult.classList.remove('hidden');
  
  const resultTitle = quizResult.querySelector('h3');
  const resultText = quizResult.querySelector('p');
  
  if (score === quizQuestions.length) {
    resultTitle.textContent = 'Perfect! 💯💕';
    resultText.textContent = 'You know me so well, Sanu! Ma timilai dherai maya garchu!';
  } else if (score >= quizQuestions.length * 0.6) {
    resultTitle.textContent = 'Great job! 🥰';
    resultText.textContent = `You got ${score} out of ${quizQuestions.length}! Pretty good, mutu!`;
  } else {
    resultTitle.textContent = 'Hmm... 🤔';
    resultText.textContent = `You got ${score} out of ${quizQuestions.length}. We need to talk more! 😂`;
  }
}

if (restartQuizBtn) {
  restartQuizBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    
    quizQuestions.forEach((q, index) => {
      if (index === 0) {
        q.classList.remove('hidden');
      } else {
        q.classList.add('hidden');
      }
      
      // Reset options
      q.querySelectorAll('.quiz-option').forEach(opt => {
        opt.disabled = false;
        opt.classList.remove('correct', 'wrong');
      });
    });
    
    quizResult.classList.add('hidden');
  });
}

// ===== FLOATING HEARTS ANIMATION =====
function createFloatingHeart() {
  const heartsBgs = document.querySelectorAll('.hearts-bg');
  
  heartsBgs.forEach(bg => {
    const heart = document.createElement('div');
    heart.innerHTML = ['💕', '💖', '💗', '💓', '💞', '🥰', '😘'][Math.floor(Math.random() * 7)];
    heart.style.cssText = `
      position: absolute;
      font-size: ${Math.random() * 20 + 15}px;
      left: ${Math.random() * 100}%;
      bottom: -50px;
      opacity: ${Math.random() * 0.5 + 0.3};
      animation: floatUp ${Math.random() * 5 + 5}s linear forwards;
      pointer-events: none;
    `;
    
    bg.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
      heart.remove();
    }, 10000);
  });
}

// Add float animation
const style = document.createElement('style');
style.textContent = `
  @keyframes floatUp {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.7;
    }
    90% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===== INITIALIZATION =====
function init() {
  // Check if already authenticated
  if (localStorage.getItem('pri_authenticated') === 'true') {
    countdownScreen.classList.add('hidden');
    passwordScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
  } else {
    // Check if we should show countdown or password screen
    const now = new Date();
    if (now >= CONFIG.unlockDate) {
      countdownScreen.classList.add('hidden');
      passwordScreen.classList.remove('hidden');
    }
  }
  
  // Start timers
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
  updateRelationshipCounter();
  setInterval(updateRelationshipCounter, 1000);
  
  // Start floating hearts
  setInterval(createFloatingHeart, 2000);
  
  // Create initial hearts
  for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingHeart, i * 500);
  }
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
