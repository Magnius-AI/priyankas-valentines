/* ========================================
   Valentine's Day Website for Priyanka
   Made with 💕 by Kishor
   ======================================== */

// ========================================
// Configuration
// ========================================
const CONFIG = {
    // Valentine's Day in Nepal Time (UTC+5:45)
    // Feb 14, 2026 00:00:00 Nepal Time = Feb 13, 2026 18:15:00 UTC
    valentinesDay: new Date('2026-02-14T00:00:00+05:45'),
    
    // The password
    password: 'Only4PriyankaTiwari!',
    
    // Date they got together: Dec 7, 2025, 4:11 AM EST
    togetherSince: new Date('2025-12-07T04:11:00-05:00'),
    
    // Wrong password responses (rotate through these)
    wrongPasswordMessages: [
        "Nope! Timi mero Princess hoinau ki? 🤔",
        "Wrong! Only my Sanu knows this 💕",
        "Try again, mutu! 😘",
        "Haha nice try! But you're not my kanchi 😏",
        "Galat! Are you sure you're Priyanka? 🤨",
        "Nai nai nai! Think harder, Princess 💭",
        "So close! (Just kidding, not even close 😂)",
        "Hint: It's about YOU, sanu! 💕"
    ],
    wrongPasswordIndex: 0
};

// ========================================
// Countdown Timer
// ========================================
function updateCountdown() {
    const now = new Date();
    const diff = CONFIG.valentinesDay - now;
    
    if (diff <= 0) {
        // Valentine's Day has arrived! Show password screen
        document.getElementById('countdown-screen').classList.add('hidden');
        document.getElementById('password-screen').classList.remove('hidden');
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

// ========================================
// Password Protection
// ========================================
function checkPassword() {
    const input = document.getElementById('password-input');
    const error = document.getElementById('password-error');

    if (input.value === CONFIG.password) {
<<<<<<< HEAD
        // Correct password!
        // Stop the countdown timer to prevent it from showing password screen again
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }

        document.getElementById('password-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        document.getElementById('music-player').classList.remove('hidden');

        // Initialize everything
        initDaysTogether();
        initQuiz();
        createFloatingHearts();

        // Smooth scroll to top
        window.scrollTo(0, 0);

        // Play celebration effect
        celebrateEntry();
=======
        // Correct password! Show valentine question
        document.getElementById('password-screen').classList.add('hidden');
        document.getElementById('valentine-question').classList.remove('hidden');
>>>>>>> 464ab04fad4c4f134a962f19b5adea3d83365b04
    } else {
        // Wrong password
        error.textContent = CONFIG.wrongPasswordMessages[CONFIG.wrongPasswordIndex];
        CONFIG.wrongPasswordIndex = (CONFIG.wrongPasswordIndex + 1) % CONFIG.wrongPasswordMessages.length;
        
        // Shake animation
        input.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
        
        input.value = '';
    }
}

// Allow Enter key to submit password
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
});

// ========================================
// Valentine Question (Yes/No)
// ========================================
let noClickCount = 0;

function sayYes() {
    const responseDiv = document.getElementById('valentine-response');
    const responseText = document.getElementById('response-text');
    
    responseDiv.classList.remove('hidden');
    responseText.innerHTML = "I knew you'd say yes! 💕💕💕<br>Mero sanu, I love you so much!";
    
    // Hide buttons
    document.querySelector('.valentine-buttons').style.display = 'none';
    
    // Celebration effect
    celebrateEntry();
    
    // After 2 seconds, show main content
    setTimeout(() => {
        document.getElementById('valentine-question').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        document.getElementById('music-player').classList.remove('hidden');
        
        // Initialize everything
        initDaysTogether();
        initQuiz();
        createFloatingHearts();
        
        // Smooth scroll to top
        window.scrollTo(0, 0);
    }, 2500);
}

function moveNoButton() {
    const noBtn = document.getElementById('no-btn');
    const container = document.querySelector('.valentine-content');
    const containerRect = container.getBoundingClientRect();
    
    // Calculate random position within container bounds
    const maxX = containerRect.width - noBtn.offsetWidth - 40;
    const maxY = containerRect.height - noBtn.offsetHeight - 40;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.1s ease';
}

function clickedNo() {
    noClickCount++;
    
    const responseDiv = document.getElementById('valentine-response');
    const responseText = document.getElementById('response-text');
    
    responseDiv.classList.remove('hidden');
    responseText.innerHTML = "You're nisturi, you know that 😢";
    
    // After 1 second, show the "stuck with me" message
    setTimeout(() => {
        responseText.innerHTML = "Too bad you're stuck with me for life 😊💕";
        
        // After another 1.5 seconds, proceed anyway
        setTimeout(() => {
            document.getElementById('valentine-question').classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
            document.getElementById('music-player').classList.remove('hidden');
            
            // Initialize everything
            initDaysTogether();
            initQuiz();
            createFloatingHearts();
            
            // Smooth scroll to top
            window.scrollTo(0, 0);
            
            celebrateEntry();
        }, 1500);
    }, 1000);
}

// ========================================
// Days Together Counter
// ========================================
function initDaysTogether() {
    const counter = document.getElementById('days-together');
    if (!counter) return;
    
    function update() {
        const now = new Date();
        const diff = now - CONFIG.togetherSince;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        counter.textContent = `${days} days & ${hours} hours of loving you 💕`;
    }
    
    update();
    setInterval(update, 60000); // Update every minute
}

// ========================================
// Quiz System
// ========================================
const quizQuestions = [
    {
        question: "What dating app did we meet on? 💕",
        options: ["Tinder", "Bumble", "Dil Mil", "Hinge"],
        correct: 2,
        response: {
            correct: "Yes! Dil Mil brought us together! 💕",
            wrong: "Nope! It was Dil Mil. Where I found my soulmate 🥰"
        }
    },
    {
        question: "What time did we officially become boyfriend/girlfriend? ⏰",
        options: ["11:11 PM", "4:11 AM", "2:30 AM", "Midnight"],
        correct: 1,
        response: {
            correct: "4:11 AM! You remembered! 💝",
            wrong: "It was 4:11 AM. The most magical time 🌙"
        }
    },
    {
        question: "What's your nickname that I use the most? 🥰",
        options: ["Baby", "Sanu", "Honey", "Jaan"],
        correct: 1,
        response: {
            correct: "My Sanu! Forever and always 💕",
            wrong: "It's Sanu! Mero pyaro Sanu 🥰"
        }
    },
    {
        question: "Where in Nepal are you from? 🇳🇵",
        options: ["Kathmandu", "Pokhara", "Chitwan", "Butwal"],
        correct: 2,
        response: {
            correct: "Chitwan! I love that about you 🐘",
            wrong: "Chitwan, sanu! The beautiful Chitwan 🌿"
        }
    },
    {
        question: "What was my smooth pickup line on Dil Mil? 😏",
        options: [
            "Are you a magician?",
            "Let me give you a reason to delete this app",
            "Do you believe in love at first swipe?",
            "Hey beautiful"
        ],
        correct: 1,
        response: {
            correct: "And it WORKED! 😏💕",
            wrong: "It was 'Let me give you a reason to delete this app'. And you did! 😏"
        }
    },
    {
        question: "What did you think I was when we first talked? 😂",
        options: ["A catfish", "A fake account", "A scammer", "A bot"],
        correct: 1,
        response: {
            correct: "Haha yes! You were so suspicious 😂",
            wrong: "You literally said 'Looks like an fake account' 😂💀"
        }
    },
    {
        question: "What's your favorite color? 🎨",
        options: ["Blue", "Purple", "Pink", "Red"],
        correct: 2,
        response: {
            correct: "Pink! Just like this whole website 💕",
            wrong: "It's PINK, sanu! How could you forget? 💗"
        }
    },
    {
        question: "What dessert combo do you love? 🍫",
        options: ["Cake & ice cream", "Brownie & ice cream", "Cookies & milk", "Tiramisu"],
        correct: 1,
        response: {
            correct: "Brownie + ice cream = your happiness 🍫🍨",
            wrong: "Brownie and ice cream! I'll get you some soon 🥰"
        }
    },
    {
        question: "What's our inside joke question about your face? 😂",
        options: [
            "Timro aakha kasto cha?",
            "Timro naak kasto cha?",
            "Timro mukh kasto cha?",
            "Timro kaan kasto cha?"
        ],
        correct: 1,
        response: {
            correct: "TIMRO NAAK KASTO CHA 😂😂😂",
            wrong: "It's 'Timro naak kasto cha?' Our classic 😂"
        }
    },
    {
        question: "What did I promise to give you one day? 💍",
        options: ["A car", "A house", "A wedding ring", "All of the above"],
        correct: 3,
        response: {
            correct: "All of it, sanu. Everything for my Princess 👑💍",
            wrong: "ALL OF THE ABOVE, baby! You deserve the world 🌍💕"
        }
    }
];

let currentQuestion = 0;
let score = 0;

function initQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const container = document.getElementById('quiz-container');
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const progressEl = document.getElementById('quiz-progress');
    const resultEl = document.getElementById('quiz-result');
    
    if (currentQuestion >= quizQuestions.length) {
        showQuizResult();
        return;
    }
    
    resultEl.classList.add('hidden');
    
    const q = quizQuestions[currentQuestion];
    questionEl.textContent = q.question;
    
    optionsEl.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        optionsEl.appendChild(btn);
    });
    
    progressEl.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
}

function selectAnswer(index) {
    const q = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    // Disable all options
    options.forEach(opt => opt.style.pointerEvents = 'none');
    
    // Mark correct/incorrect
    options[index].classList.add(index === q.correct ? 'correct' : 'incorrect');
    if (index !== q.correct) {
        options[q.correct].classList.add('correct');
    }
    
    // Update score
    if (index === q.correct) {
        score++;
    }
    
    // Show response
    const responseText = index === q.correct ? q.response.correct : q.response.wrong;
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 2000);
}

function showQuizResult() {
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const resultEl = document.getElementById('quiz-result');
    const progressEl = document.getElementById('quiz-progress');
    
    questionEl.textContent = '';
    optionsEl.innerHTML = '';
    progressEl.textContent = '';
    
    resultEl.classList.remove('hidden');
    
    let message = '';
    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage === 100) {
        message = `
            <h3>Perfect Score! 💯💕</h3>
            <p>You got ${score}/${quizQuestions.length} correct!</p>
            <p>Of course you did. You ARE my Princess! You know everything about us because you're the most important part of my life. I love you! 💕</p>
        `;
    } else if (percentage >= 70) {
        message = `
            <h3>Amazing! 🥰</h3>
            <p>You got ${score}/${quizQuestions.length} correct!</p>
            <p>You know our story so well, Sanu! Almost perfect, just like you 💕</p>
        `;
    } else if (percentage >= 50) {
        message = `
            <h3>Not bad! 😊</h3>
            <p>You got ${score}/${quizQuestions.length} correct!</p>
            <p>Looks like we need more late night talks to refresh your memory 😏💕</p>
        `;
    } else {
        message = `
            <h3>Umm... Sanu? 🤨</h3>
            <p>You got ${score}/${quizQuestions.length} correct!</p>
            <p>Are you sure you're MY Priyanka? 😂 Just kidding, I love you anyway! But we're definitely reviewing our love story tonight 💕</p>
        `;
    }
    
    resultEl.innerHTML = message;
}

// ========================================
// Floating Hearts Effect
// ========================================
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '🌸', '✨', '💕'];
    const container = document.querySelector('#main-content');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            font-size: ${Math.random() * 20 + 15}px;
            opacity: ${Math.random() * 0.5 + 0.3};
            pointer-events: none;
            z-index: 50;
            animation: floatUp ${Math.random() * 5 + 5}s linear forwards;
        `;
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 10000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 2000);
}

// Add float up animation
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
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        60% { transform: translateX(-10px); }
        80% { transform: translateX(10px); }
    }
    
    @keyframes confetti {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ========================================
// Celebration Effect on Entry
// ========================================
function celebrateEntry() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffc0cb', '#ffb6c1'];
    const emojis = ['💕', '💖', '💗', '💓', '💝', '🎉', '✨', '🌸'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: -20px;
                font-size: ${Math.random() * 20 + 15}px;
                pointer-events: none;
                z-index: 1000;
                animation: confetti ${Math.random() * 3 + 2}s linear forwards;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 50);
    }
}

// ========================================
// Music Player
// ========================================
let musicPlaying = false;

function toggleMusic() {
    const audio = document.getElementById('background-music');
    const btn = document.getElementById('music-toggle');
    
    if (musicPlaying) {
        audio.pause();
        btn.textContent = '🎵';
        btn.classList.remove('playing');
    } else {
        audio.play().catch(e => console.log('Audio play failed:', e));
        btn.textContent = '🔊';
        btn.classList.add('playing');
    }
    
    musicPlaying = !musicPlaying;
}

// ========================================
// Popup Functions
// ========================================
function closePopup() {
    document.getElementById('love-more-popup').classList.add('hidden');
}

// ========================================
// Initialize
// ========================================
let countdownInterval = null;

document.addEventListener('DOMContentLoaded', () => {
    // Start countdown timer
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
    
    // For testing: add ?unlock to URL to skip countdown
    if (window.location.search.includes('unlock')) {
        document.getElementById('countdown-screen').classList.add('hidden');
        document.getElementById('password-screen').classList.remove('hidden');
    }
    
    // For testing: add ?valentine to URL to skip to valentine question
    if (window.location.search.includes('valentine')) {
        document.getElementById('countdown-screen').classList.add('hidden');
        document.getElementById('password-screen').classList.add('hidden');
        document.getElementById('valentine-question').classList.remove('hidden');
    }
    
    // For testing: add ?skip to URL to skip everything
    if (window.location.search.includes('skip')) {
        document.getElementById('countdown-screen').classList.add('hidden');
        document.getElementById('password-screen').classList.add('hidden');
        document.getElementById('valentine-question').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        document.getElementById('music-player').classList.remove('hidden');
        initDaysTogether();
        initQuiz();
        createFloatingHearts();
    }
});

// ========================================
// Smooth Scroll for Navigation
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Easter Egg: Konami Code
// ========================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.getElementById('love-more-popup').classList.remove('hidden');
        konamiCode = [];
    }
});

console.log('%c💕 Made with love for Priyanka 💕', 'font-size: 20px; color: #ff69b4;');
console.log('%cBy your future husband, Kishor 💍', 'font-size: 14px; color: #ff1493;');
