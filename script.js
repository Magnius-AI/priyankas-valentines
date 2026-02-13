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
// Dreamy Floating Hearts System
// ========================================
function createDreamyHearts(container) {
    if (!container) return;
    
    const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '🌸', '✨'];
    const useCSSHeart = () => Math.random() < 0.3; // 30% chance of CSS-drawn heart
    const heartColors = [
        'rgba(255, 105, 180, 0.5)',
        'rgba(255, 20, 147, 0.4)',
        'rgba(255, 133, 162, 0.5)',
        'rgba(240, 147, 251, 0.4)',
        'rgba(245, 87, 108, 0.5)',
        'rgba(254, 207, 239, 0.6)'
    ];

    function spawnHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        const size = Math.random() * 18 + 8; // 8-26px
        const duration = Math.random() * 8 + 10; // 10-18s
        const delay = Math.random() * 2;
        const opacity = Math.random() * 0.5 + 0.2; // 0.2-0.7
        const sway = Math.random() * 60 + 20; // 20-80px sway
        const left = Math.random() * 100;

        heart.style.setProperty('--duration', duration + 's');
        heart.style.setProperty('--delay', delay + 's');
        heart.style.setProperty('--target-opacity', opacity);
        heart.style.setProperty('--sway', sway + 'px');
        heart.style.left = left + '%';

        if (useCSSHeart()) {
            heart.classList.add('css-heart');
            const csSize = size * 0.6;
            heart.style.setProperty('--size', csSize + 'px');
            heart.style.setProperty('--heart-color', heartColors[Math.floor(Math.random() * heartColors.length)]);
        } else {
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.fontSize = size + 'px';
        }

        container.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, (duration + delay) * 1000 + 500);
    }

    // Initial batch
    for (let i = 0; i < 8; i++) {
        setTimeout(spawnHeart, i * 400);
    }

    // Continuous spawning
    const interval = setInterval(() => {
        if (!document.body.contains(container)) {
            clearInterval(interval);
            return;
        }
        spawnHeart();
    }, 2500);

    return interval;
}

// Start hearts on all visible floating-hearts containers
function initAllFloatingHearts() {
    document.querySelectorAll('.floating-hearts').forEach(container => {
        // Only init if parent is visible
        const parent = container.closest('.fullscreen, .section');
        if (parent && !parent.classList.contains('hidden')) {
            if (!container._heartsInit) {
                container._heartsInit = true;
                createDreamyHearts(container);
            }
        }
    });
}

// ========================================
// Scroll-triggered Reveal Animations
// ========================================
function initScrollAnimations() {
    // Tag elements for animation
    document.querySelectorAll('.section-title, .section-subtitle').forEach(el => {
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    document.querySelectorAll('.timeline-item.left .timeline-content').forEach(el => {
        if (!el.classList.contains('reveal-left')) el.classList.add('reveal-left');
    });

    document.querySelectorAll('.timeline-item.right .timeline-content').forEach(el => {
        if (!el.classList.contains('reveal-right')) el.classList.add('reveal-right');
    });

    document.querySelectorAll('.chat-screenshot img, .meet-image img, .closing-image img').forEach(el => {
        if (!el.classList.contains('reveal-scale')) el.classList.add('reveal-scale');
    });

    document.querySelectorAll('.promise-gallery, .future-gallery').forEach(el => {
        if (!el.classList.contains('stagger-children')) el.classList.add('stagger-children');
    });

    // Also reveal other content blocks
    document.querySelectorAll('.meet-text, .promise-text, .future-text, .letter-container, .spotify-section, #quiz-container, .diary-form-container, .boyfriend-container, .closing-text').forEach(el => {
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve — keep it simple, one-shot
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// Parallax on Hero Background
// ========================================
function initParallax() {
    const heroBg = document.querySelector('.hero-background');
    if (!heroBg) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                heroBg.style.transform = `translateY(${scrollY * 0.3}px) translateZ(0)`;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ========================================
// Countdown Timer
// ========================================
function updateCountdown() {
    const now = new Date();
    const diff = CONFIG.valentinesDay - now;
    
    if (diff <= 0) {
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
        error.textContent = CONFIG.wrongPasswordMessages[CONFIG.wrongPasswordIndex];
        CONFIG.wrongPasswordIndex = (CONFIG.wrongPasswordIndex + 1) % CONFIG.wrongPasswordMessages.length;
        
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
    
    document.querySelector('.valentine-buttons').style.display = 'none';
    
    celebrateEntry();
    
    setTimeout(() => {
        document.getElementById('valentine-question').classList.add('hidden');
        
        const now = new Date();
        if (now >= CONFIG.valentinesDay) {
            document.getElementById('password-screen').classList.remove('hidden');
            saveState('password');
        } else {
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
    
    saveState('main');
    
    initDaysTogether();
    initQuiz();
    initAllFloatingHearts();
    initScrollAnimations();
    renderDiaryEntries();
    initParallax();
    
    window.scrollTo(0, 0);
}

// ========================================
// Playful "No" Button Dodge
// ========================================
let noButtonMoveCount = 0;
const dodgeMessages = [
    'Nope!', 'Try again 😏', 'Hehe', 'Can\'t catch me!', '😜', 'Wrong answer!', 
    'Really?', '🏃‍♀️💨', 'Lol no', 'Nice try'
];

function moveNoButton() {
    const noBtn = document.getElementById('no-btn');
    const container = document.querySelector('.valentine-content');
    const containerRect = container.getBoundingClientRect();
    
    noButtonMoveCount++;
    
    // Shrink after several attempts
    if (noButtonMoveCount > 3) {
        const scale = Math.max(0.25, 1 - (noButtonMoveCount * 0.12));
        noBtn.style.fontSize = Math.max(0.7, 1.2 - noButtonMoveCount * 0.08) + 'rem';
        noBtn.style.padding = `${Math.max(6, 15 - noButtonMoveCount * 2)}px ${Math.max(15, 40 - noButtonMoveCount * 4)}px`;
    }

    // Playful text changes
    if (noButtonMoveCount > 2) {
        noBtn.textContent = dodgeMessages[noButtonMoveCount % dodgeMessages.length];
    }

    // Grow the Yes button
    const yesBtn = document.getElementById('yes-btn');
    if (yesBtn && noButtonMoveCount > 1) {
        const yesScale = Math.min(1.4, 1 + noButtonMoveCount * 0.05);
        yesBtn.style.transform = `scale(${yesScale})`;
    }
    
    // Random position within container
    const maxX = containerRect.width - noBtn.offsetWidth - 20;
    const maxY = containerRect.height - noBtn.offsetHeight - 20;
    
    const randomX = Math.max(10, Math.random() * maxX);
    const randomY = Math.max(10, Math.random() * maxY);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
    noBtn.style.zIndex = '10';
}

// Mobile touch support
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
    
    setTimeout(() => {
        responseText.innerHTML = "Too bad you're stuck with me for life 😊💕";
        
        setTimeout(() => {
            document.getElementById('valentine-question').classList.add('hidden');
            
            const now = new Date();
            if (now >= CONFIG.valentinesDay) {
                document.getElementById('password-screen').classList.remove('hidden');
                saveState('password');
            } else {
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
    setInterval(update, 60000);
}

// ========================================
// Quiz System
// ========================================
const quizQuestions = [
    {
        question: "What dating app did we meet on? 💕",
        options: ["Instagram", "Bumble", "Dil Mil", "Hinge"],
        correct: 0,
        specialBehavior: "conditional",
        specialConfig: {
            warningIndex: 2,
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
        options: ["11:11 PM / 9:56 AM NPT", "4:11 AM / 2:56 PM NPT", "2:30 AM / 1:15 PM NPT", "Midnight / 10:45 AM NPT"],
        correct: 1,
        specialBehavior: null,
        response: {
            correct: "4:11 AM / 2:56 PM NPT! You remembered! 💝",
            wrong: "It was 4:11 AM / 2:56 PM Nepal Time. The most magical time 🌙"
        }
    },
    {
        question: "What's your nickname that I use the most? 🥰",
        options: ["Baby", "Sanu", "Mutu", "Sweetheart"],
        correct: -1,
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

    options.forEach(opt => opt.style.pointerEvents = 'none');

    if (q.specialBehavior === 'conditional') {
        if (index === q.specialConfig.warningIndex) {
            options[index].classList.add('incorrect');
            showQuizPopup(q.specialConfig.warningMessage, null, 'warning');
            return;
        } else if (index === q.correct) {
            options[index].classList.add('correct');
            score++;
            resultEl.classList.remove('hidden');
            resultEl.innerHTML = `<p>${q.specialConfig.correctMessage}</p>`;
        } else {
            options[index].classList.add('incorrect');
            options[q.correct].classList.add('correct');
            resultEl.classList.remove('hidden');
            resultEl.innerHTML = `<p>${q.response.wrong}</p>`;
        }
    }
    else if (q.specialBehavior === 'multi-correct') {
        options.forEach(opt => opt.classList.add('correct'));
        score++;
        showQuizPopup(
            q.specialConfig.popupMessage,
            q.specialConfig.additionalText
        );
        return;
    }
    else if (q.specialBehavior === 'retry') {
        if (index === q.correct) {
            options[index].classList.add('correct');
            score++;
            resultEl.classList.remove('hidden');
            resultEl.innerHTML = `<p>${q.response.correct}</p>`;
            setTimeout(() => {
                resultEl.classList.add('hidden');
                currentQuestion++;
                showQuestion();
            }, 2000);
        } else {
            options[index].classList.add('incorrect');
            resultEl.classList.remove('hidden');
            resultEl.innerHTML = `<p class="retry-message">${q.specialConfig.retryMessage}</p>`;
            setTimeout(() => {
                options[index].classList.remove('incorrect');
                options.forEach(opt => opt.style.pointerEvents = 'auto');
                resultEl.classList.add('hidden');
            }, 1500);
        }
        return;
    }
    else {
        options[index].classList.add(index === q.correct ? 'correct' : 'incorrect');
        if (index !== q.correct) {
            options[q.correct].classList.add('correct');
        }
        if (index === q.correct) {
            score++;
        }
        const responseText = index === q.correct ? q.response.correct : q.response.wrong;
        resultEl.classList.remove('hidden');
        resultEl.innerHTML = `<p>${responseText}</p>`;
    }

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
    popup.dataset.type = type;
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
            const options = document.querySelectorAll('.quiz-option');
            options.forEach(opt => {
                opt.classList.remove('incorrect', 'correct');
                opt.style.pointerEvents = 'auto';
            });
        } else {
            currentQuestion++;
            showQuestion();
        }
    }
}

// ========================================
// Celebration Effect on Entry
// ========================================
function celebrateEntry() {
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
// Better Boyfriend Section (Supabase-backed)
// ========================================
async function submitBoyfriendNote() {
    const input = document.getElementById('boyfriend-input');
    const success = document.getElementById('boyfriend-success');
    const text = input.value.trim();
    
    if (!text) return;
    
    try {
        await submitBoyfriendNoteSupabase(text);
        input.value = '';
        success.classList.remove('hidden');
        setTimeout(() => success.classList.add('hidden'), 3000);
    } catch (e) {
        console.log('Could not save note:', e);
        // Fallback to localStorage
        try {
            const notes = JSON.parse(localStorage.getItem('boyfriend_notes') || '[]');
            notes.push({ text, date: new Date().toISOString() });
            localStorage.setItem('boyfriend_notes', JSON.stringify(notes));
            input.value = '';
            success.classList.remove('hidden');
            setTimeout(() => success.classList.add('hidden'), 3000);
        } catch (e2) { console.log('localStorage fallback failed:', e2); }
    }
}

function toggleBoyfriendView() {
    const check = document.getElementById('boyfriend-password-check');
    check.classList.toggle('hidden');
}

function checkBoyfriendPassword() {
    const input = document.getElementById('boyfriend-password');
    const error = document.getElementById('boyfriend-password-error');
    const notes = document.getElementById('boyfriend-notes');
    
    if (input.value === 'kishor123') {
        notes.classList.remove('hidden');
        document.getElementById('boyfriend-password-check').classList.add('hidden');
        loadBoyfriendNotes();
    } else {
        error.textContent = 'Wrong password! This is for Kishor only 😤';
    }
}

async function loadBoyfriendNotes() {
    const list = document.getElementById('notes-list');
    try {
        const notes = await loadBoyfriendNotesSupabase();
        if (notes.length === 0) {
            list.innerHTML = '<p class="empty-notes">No notes yet... waiting for my Princess to write something 🥺</p>';
        } else {
            list.innerHTML = notes.map(n => `
                <div class="note-item">
                    <div class="note-date">${relativeTime(n.created_at)}</div>
                    <div class="note-text">${escapeHtml(n.content)}</div>
                </div>
            `).join('');
        }
    } catch (e) {
        // Fallback to localStorage
        try {
            const notes = JSON.parse(localStorage.getItem('boyfriend_notes') || '[]');
            if (notes.length === 0) {
                list.innerHTML = '<p class="empty-notes">No notes yet... waiting for my Princess to write something 🥺</p>';
            } else {
                list.innerHTML = notes.map(n => `
                    <div class="note-item">
                        <div class="note-date">${new Date(n.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                        <div class="note-text">${escapeHtml(n.text)}</div>
                    </div>
                `).join('');
            }
        } catch (e2) {
            list.innerHTML = '<p class="empty-notes">Could not load notes</p>';
        }
    }
}

// ========================================
// Our Diary Section
// ========================================
let selectedDiaryAuthor = 'priyanka';
let selectedMood = null;

function selectDiaryAuthor(author) {
    selectedDiaryAuthor = author;
    document.querySelectorAll('.diary-author-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.author === author);
    });
}

function selectMood(btn) {
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedMood = btn.dataset.mood;
}

async function submitDiary() {
    const input = document.getElementById('diary-input');
    const success = document.getElementById('diary-success');
    const errorEl = document.getElementById('diary-error');
    const text = input.value.trim();
    
    if (!text) return;
    
    try {
        await submitDiaryEntry(selectedDiaryAuthor, text, selectedMood);
        input.value = '';
        selectedMood = null;
        document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
        success.classList.remove('hidden');
        errorEl.classList.add('hidden');
        setTimeout(() => success.classList.add('hidden'), 3000);
        renderDiaryEntries();
    } catch (e) {
        errorEl.textContent = 'Could not save entry. Please try again 💔';
        errorEl.classList.remove('hidden');
        console.log('Diary submit error:', e);
    }
}

async function renderDiaryEntries() {
    const list = document.getElementById('diary-entries-list');
    try {
        const entries = await loadDiaryEntries();
        if (entries.length === 0) {
            list.innerHTML = '<p class="empty-notes">No diary entries yet... be the first to write something! 💭</p>';
        } else {
            list.innerHTML = entries.map(e => `
                <div class="diary-card">
                    <div class="diary-card-header">
                        <span class="diary-author">${e.author === 'kishor' ? '🤴 Kishor' : '👸 Priyanka'}</span>
                        ${e.mood ? `<span class="diary-mood">${escapeHtml(e.mood)}</span>` : ''}
                    </div>
                    <div class="diary-card-content">${escapeHtml(e.content)}</div>
                    <div class="diary-card-time">${relativeTime(e.created_at)}</div>
                </div>
            `).join('');
        }
    } catch (e) {
        list.innerHTML = '<p class="empty-notes">Could not load diary entries 💔</p>';
    }
}

// HTML escape helper
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
// Injected Keyframe Styles
// ========================================
const style = document.createElement('style');
style.textContent = `
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
    
    const savedState = loadState();
    
    if (window.location.search.includes('reset')) {
        clearState();
        window.location.href = window.location.pathname;
        return;
    }
    
    if (window.location.search.includes('skip')) {
        document.getElementById('main-content').classList.remove('hidden');
        document.getElementById('music-player').classList.remove('hidden');
        initDaysTogether();
        initQuiz();
        initAllFloatingHearts();
        initScrollAnimations();
        initParallax();
        return;
    }
    
    if (savedState) {
        const now = new Date();
        
        switch (savedState.screen) {
            case 'countdown':
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
                initScrollAnimations();
                initParallax();
                break;
            default:
                document.getElementById('valentine-question').classList.remove('hidden');
        }
    } else {
        document.getElementById('valentine-question').classList.remove('hidden');
    }
    
    // Init floating hearts on visible screens
    initAllFloatingHearts();
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
        document.getElementById('love-more-popup').classList.remove('hidden');
        konamiCode = [];
    }
});

console.log('%c💕 Made with love for Priyanka 💕', 'font-size: 20px; color: #ff69b4;');
console.log('%cBy your future husband, Kishor 💍', 'font-size: 14px; color: #ff1493;');
