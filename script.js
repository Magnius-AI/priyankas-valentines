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
        // Correct password! Show main content
        // Stop any countdown timer
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        if (unlockCountdownInterval) {
            clearInterval(unlockCountdownInterval);
            unlockCountdownInterval = null;
        }
        
        document.getElementById('password-screen').classList.add('hidden');
        showMainContent();
        celebrateEntry();
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
    
    // After 2.5 seconds, show unlock countdown (or password screen if Valentine's Day)
    setTimeout(() => {
        document.getElementById('valentine-question').classList.add('hidden');
        
        // Check if it's already Valentine's Day
        const now = new Date();
        if (now >= CONFIG.valentinesDay) {
            // It's Valentine's Day! Show password screen
            document.getElementById('password-screen').classList.remove('hidden');
            saveState('password');
        } else {
            // Not yet - show countdown to unlock
            document.getElementById('unlock-countdown').classList.remove('hidden');
            startUnlockCountdown();
            saveState('countdown');
        }
    }, 2500);
}

// Unlock countdown timer
let unlockCountdownInterval = null;

function startUnlockCountdown() {
    updateUnlockCountdown();
    unlockCountdownInterval = setInterval(updateUnlockCountdown, 1000);
}

function updateUnlockCountdown() {
    const now = new Date();
    const diff = CONFIG.valentinesDay - now;
    
    if (diff <= 0) {
        // Valentine's Day has arrived! Show password screen
        if (unlockCountdownInterval) {
            clearInterval(unlockCountdownInterval);
            unlockCountdownInterval = null;
        }
        document.getElementById('unlock-countdown').classList.add('hidden');
        document.getElementById('password-screen').classList.remove('hidden');
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('unlock-days').textContent = String(days).padStart(2, '0');
    document.getElementById('unlock-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('unlock-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('unlock-seconds').textContent = String(seconds).padStart(2, '0');
}

function showMainContent() {
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('music-player').classList.remove('hidden');
    
    // Save state
    saveState('main');
    
    // Initialize everything
    initDaysTogether();
    initQuiz();
    createFloatingHearts();
    
    // Smooth scroll to top
    window.scrollTo(0, 0);
}

let noButtonMoveCount = 0;

function moveNoButton() {
    const noBtn = document.getElementById('no-btn');
    const container = document.querySelector('.valentine-content');
    const containerRect = container.getBoundingClientRect();
    
    noButtonMoveCount++;
    
    // On mobile or after many attempts, shrink the button
    if (noButtonMoveCount > 3) {
        const scale = Math.max(0.3, 1 - (noButtonMoveCount * 0.15));
        noBtn.style.transform = `scale(${scale})`;
    }
    
    // Calculate random position within container bounds
    const maxX = containerRect.width - noBtn.offsetWidth - 40;
    const maxY = containerRect.height - noBtn.offsetHeight - 40;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.15s ease';
}

// Mobile touch support - move button on touch start too
document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    if (noBtn) {
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveNoButton();
        }, { passive: false });
    }
});

function clickedNo() {
    noClickCount++;
    
    const responseDiv = document.getElementById('valentine-response');
    const responseText = document.getElementById('response-text');
    
    responseDiv.classList.remove('hidden');
    responseText.innerHTML = "You're nisturi, you know that 😢";
    
    // After 1 second, show the "stuck with me" message
    setTimeout(() => {
        responseText.innerHTML = "Too bad you're stuck with me for life 😊💕";
        
        // After another 1.5 seconds, proceed to countdown (same as Yes)
        setTimeout(() => {
            document.getElementById('valentine-question').classList.add('hidden');
            
            // Check if it's already Valentine's Day
            const now = new Date();
            if (now >= CONFIG.valentinesDay) {
                // It's Valentine's Day! Show password screen
                document.getElementById('password-screen').classList.remove('hidden');
                saveState('password');
            } else {
                // Not yet - show countdown to unlock
                document.getElementById('unlock-countdown').classList.remove('hidden');
                startUnlockCountdown();
                saveState('countdown');
            }
            
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
        options: ["Instagram", "Bumble", "Dil Mil", "Hinge"],
        correct: 0, // Instagram is correct
        specialBehavior: "conditional",
        specialConfig: {
            warningIndex: 2, // Dil Mil - shows warning, allows retry
            warningMessage: "We won't tell anyone that it was Dil Mil",
            correctMessage: "see I listen to you 😏💕"
        },
        response: {
            correct: "see I listen to you 😏💕",
            wrong: "Try another answer, princess! 💕"
        }
    },
    {
        question: "What time did we officially become boyfriend/girlfriend? ⏰",
        options: ["11:11 PM", "4:11 AM", "2:30 AM", "Midnight"],
        correct: 1,
        specialBehavior: null,
        response: {
            correct: "4:11 AM! You remembered! 💝",
            wrong: "It was 4:11 AM. The most magical time 🌙"
        }
    },
    {
        question: "What's your nickname that I use the most? 🥰",
        options: ["Baby", "Sanu", "Mutu", "Sweetheart"],
        correct: -1, // No single correct answer
        specialBehavior: "multi-correct",
        specialConfig: {
            popupMessage: "I love calling you all these things",
            additionalText: "but in bed I call you other things 😈"
        },
        response: {
            correct: "All of them! Every single one! 💕",
            wrong: ""
        }
    },
    {
        question: "What is Kishor's favorite sport? 🏈",
        options: ["Basketball", "Football", "Soccer", "Baseball"],
        correct: 1,
        specialBehavior: null,
        response: {
            correct: "Football! You know your man! 🏈💕",
            wrong: "It's Football! I love watching games with you in mind 🥰"
        }
    },
    {
        question: "If you had any superpower for a day, which superpower would you choose? 😂",
        options: ["Teleportation", "Flying", "Strength", "Unlimited Money"],
        correct: 0,
        specialBehavior: "retry",
        specialConfig: {
            retryMessage: "Choose again princess, think hard about this one",
            allowRetry: true
        },
        response: {
            correct: "Yes! Teleportation so you can visit me instantly! 💕",
            wrong: "Choose again princess, think hard about this one"
        }
    },
    {
        question: "What is Kishor's favorite Anime? 🎌",
        options: ["One Piece", "Death Note", "Naruto", "Dragonball Z"],
        correct: 0,
        specialBehavior: null,
        response: {
            correct: "One Piece! Going Merry! Luffy would be proud! 🏴‍☠️💕",
            wrong: "It's One Piece, Sanu! The best anime ever! 🏴‍☠️"
        }
    },
    {
        question: "What did you think I was when we first talked? 😂",
        options: ["A catfish", "A fake account", "A scammer", "A bot"],
        correct: 1,
        specialBehavior: null,
        response: {
            correct: "Haha yes! You were so suspicious 😂",
            wrong: "You literally said 'Looks like an fake account' 😂💀"
        }
    },
    {
        question: "What's your favorite color? 🎨",
        options: ["Blue", "Purple", "Pink", "Red"],
        correct: 2,
        specialBehavior: null,
        response: {
            correct: "Pink! Just like this whole website 💕",
            wrong: "It's PINK, sanu! How could you forget? 💗"
        }
    },
    {
        question: "What dessert combo do you love? 🍫",
        options: ["Cake & ice cream", "Brownie & ice cream", "Cookies & milk", "Tiramisu"],
        correct: 1,
        specialBehavior: null,
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
        specialBehavior: null,
        response: {
            correct: "TIMRO NAAK KASTO CHA 😂😂😂",
            wrong: "It's 'Timro naak kasto cha?' Our classic 😂"
        }
    },
    {
        question: "What did I promise to give you one day? 💍",
        options: ["A car", "A house", "A wedding ring", "All of the above"],
        correct: 3,
        specialBehavior: null,
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
    const resultEl = document.getElementById('quiz-result');

    // Disable all options
    options.forEach(opt => opt.style.pointerEvents = 'none');

    // Handle special behaviors
    if (q.specialBehavior === 'conditional') {
        // Question 1: Conditional logic for dating app
        if (index === q.specialConfig.warningIndex) {
            // Dil Mil - show yellow warning, allow retry (don't count as correct)
            options[index].classList.add('incorrect');
            showQuizPopup(q.specialConfig.warningMessage, null, 'warning');
            return; // Warning popup will reset options for retry
        } else if (index === q.correct) {
            // Instagram - correct answer
            options[index].classList.add('correct');
            score++;
            resultEl.classList.remove('hidden');
            resultEl.innerHTML = `<p>${q.specialConfig.correctMessage}</p>`;
        } else {
            // Wrong answer
            options[index].classList.add('incorrect');
            options[q.correct].classList.add('correct');
            resultEl.classList.remove('hidden');
            resultEl.innerHTML = `<p>${q.response.wrong}</p>`;
        }
    }
    else if (q.specialBehavior === 'multi-correct') {
        // Question 3: All options turn green
        options.forEach(opt => opt.classList.add('correct'));
        score++; // Always correct
        showQuizPopup(
            q.specialConfig.popupMessage,
            q.specialConfig.additionalText
        );
        return; // Popup will handle advancement
    }
    else if (q.specialBehavior === 'retry') {
        // Question 5: Allow retry on wrong answer
        if (index === q.correct) {
            options[index].classList.add('correct');
            score++;
            resultEl.classList.remove('hidden');
            resultEl.innerHTML = `<p>${q.response.correct}</p>`;
            // Normal advancement
            setTimeout(() => {
                resultEl.classList.add('hidden');
                currentQuestion++;
                showQuestion();
            }, 2000);
        } else {
            // Wrong answer - show retry message, re-enable options
            options[index].classList.add('incorrect');

            // Show retry message temporarily
            resultEl.classList.remove('hidden');
            resultEl.innerHTML = `<p class="retry-message">${q.specialConfig.retryMessage}</p>`;

            setTimeout(() => {
                // Reset this option and re-enable all options
                options[index].classList.remove('incorrect');
                options.forEach(opt => opt.style.pointerEvents = 'auto');
                resultEl.classList.add('hidden');
            }, 1500);
        }
        return; // Don't auto-advance
    }
    else {
        // Standard behavior
        options[index].classList.add(index === q.correct ? 'correct' : 'incorrect');
        if (index !== q.correct) {
            options[q.correct].classList.add('correct');
        }

        if (index === q.correct) {
            score++;
        }

        // Show response message
        const responseText = index === q.correct ? q.response.correct : q.response.wrong;
        resultEl.classList.remove('hidden');
        resultEl.innerHTML = `<p>${responseText}</p>`;
    }

    // Auto-advance for standard and conditional questions
    setTimeout(() => {
        resultEl.classList.add('hidden');
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
// Quiz Popup System
// ========================================
function showQuizPopup(message, additionalText = null, type = 'default') {
    const popup = document.createElement('div');
    popup.className = 'quiz-popup';
    popup.dataset.type = type; // Store type for closeQuizPopup
    popup.innerHTML = `
        <div class="quiz-popup-content ${type === 'warning' ? 'warning' : ''}">
            <p class="quiz-popup-message">${message}</p>
            ${additionalText ? `<p class="quiz-popup-additional">${additionalText}</p>` : ''}
            <button class="quiz-popup-close" onclick="closeQuizPopup()">Continue 💕</button>
        </div>
    `;
    document.body.appendChild(popup);
}

function closeQuizPopup() {
    const popup = document.querySelector('.quiz-popup');
    if (popup) {
        const type = popup.dataset.type;
        popup.remove();

        if (type === 'warning') {
            // Warning popup: reset options and allow retry
            const options = document.querySelectorAll('.quiz-option');
            options.forEach(opt => {
                opt.classList.remove('incorrect', 'correct');
                opt.style.pointerEvents = 'auto';
            });
        } else {
            // Default popup: advance to next question
            currentQuestion++;
            showQuestion();
        }
    }
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
// State Persistence (localStorage)
// ========================================
const STATE_KEY = 'priyanka_valentine_state';

function saveState(screen) {
    try {
        localStorage.setItem(STATE_KEY, JSON.stringify({
            screen: screen,
            timestamp: Date.now()
        }));
    } catch (e) {
        console.log('Could not save state:', e);
    }
}

function loadState() {
    try {
        const saved = localStorage.getItem(STATE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.log('Could not load state:', e);
    }
    return null;
}

function clearState() {
    try {
        localStorage.removeItem(STATE_KEY);
    } catch (e) {
        console.log('Could not clear state:', e);
    }
}

// ========================================
// Initialize
// ========================================
let countdownInterval = null;

document.addEventListener('DOMContentLoaded', () => {
    // Hide all screens first
    document.getElementById('countdown-screen').classList.add('hidden');
    document.getElementById('password-screen').classList.add('hidden');
    document.getElementById('valentine-question').classList.add('hidden');
    document.getElementById('unlock-countdown').classList.add('hidden');
    document.getElementById('main-content').classList.add('hidden');
    
    // Check for saved state
    const savedState = loadState();
    
    // For testing: add ?reset to URL to clear state
    if (window.location.search.includes('reset')) {
        clearState();
        window.location.href = window.location.pathname;
        return;
    }
    
    // For testing: add ?skip to URL to skip everything
    if (window.location.search.includes('skip')) {
        document.getElementById('main-content').classList.remove('hidden');
        document.getElementById('music-player').classList.remove('hidden');
        initDaysTogether();
        initQuiz();
        createFloatingHearts();
        return;
    }
    
    // Restore state or show valentine question
    if (savedState) {
        const now = new Date();
        
        switch (savedState.screen) {
            case 'countdown':
                // Check if Valentine's Day arrived while away
                if (now >= CONFIG.valentinesDay) {
                    document.getElementById('password-screen').classList.remove('hidden');
                    saveState('password');
                } else {
                    document.getElementById('unlock-countdown').classList.remove('hidden');
                    startUnlockCountdown();
                }
                break;
            case 'password':
                document.getElementById('password-screen').classList.remove('hidden');
                break;
            case 'main':
                document.getElementById('main-content').classList.remove('hidden');
                document.getElementById('music-player').classList.remove('hidden');
                initDaysTogether();
                initQuiz();
                break;
            default:
                // Unknown state, show valentine question
                document.getElementById('valentine-question').classList.remove('hidden');
        }
    } else {
        // No saved state - show valentine question
        document.getElementById('valentine-question').classList.remove('hidden');
    }
    
    // Create floating hearts
    createFloatingHearts();
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
