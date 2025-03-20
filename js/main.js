document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Terminal typing effect simulation
    simulateTyping();
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav li a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.parentElement.classList.add('active');
        }
    });
    
    // Security logging simulation
    consoleLog('User session started');
    consoleLog('Scanning environment...');
    consoleLog('Security check complete');
    consoleLog('Welcome to the security operations center');
});

// Simulate typing effect
function simulateTyping() {
    const typingElements = document.querySelectorAll('.typing-effect h1, .typing-effect h2, .typing-effect p');
    typingElements.forEach((element, index) => {
        // Reset the animation for sequential typing
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = `typing 1s steps(${element.textContent.length}, end) ${index * 1}s forwards`;
        }, 100);
    });
}

// Console logging for the security theme
function consoleLog(message, type = 'info') {
    if (window.console) {
        const styles = {
            info: 'color: #64ffda',
            warning: 'color: #ffd740',
            error: 'color: #ff5252',
            success: 'color: #69f0ae'
        };
        
        console.log(`%c[SOC] ${message}`, styles[type] || styles.info);
    }
}

function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skill => {
        const finalWidth = skill.style.width;
        skill.style.width = '0%';
        
        setTimeout(() => {
            skill.style.transition = 'width 1s ease-in-out';
            skill.style.width = finalWidth;
        }, 300);
    });
}

// Add the function call to the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Animate skill bars
    animateSkillBars();
});