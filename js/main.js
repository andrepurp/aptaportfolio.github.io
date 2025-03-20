document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Terminal typing effect simulation
    simulateTyping();
    
    // Terminal command handling
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && document.activeElement.tagName === 'INPUT' && 
            document.activeElement.classList.contains('terminal-input')) {
            processCommand(document.activeElement.value);
            document.activeElement.value = '';
        }
    });
    
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

// Process terminal commands
function processCommand(command) {
    command = command.toLowerCase().trim();
    
    const commandResponse = document.createElement('div');
    commandResponse.classList.add('command-response');
    
    switch(command) {
        case 'help':
            commandResponse.innerHTML = `
                <p>> Available commands:</p>
                <p>  - about: Learn more about me</p>
                <p>  - skills: View my technical skills</p>
                <p>  - projects: View my security projects</p>
                <p>  - contact: How to reach me</p>
                <p>  - clear: Clear the terminal</p>
            `;
            break;
        case 'about':
            window.location.href = 'about.html';
            return;
        case 'skills':
            commandResponse.innerHTML = `
                <p>> Technical skills:</p>
                <p>  - SIEM: Splunk, ELK Stack, QRadar</p>
                <p>  - Security Tools: Wireshark, Snort, Yara, Suricata</p>
                <p>  - Threat Intelligence: MISP, OpenCTI, TAXII/STIX</p>
                <p>  - Scripting: Python, PowerShell, Bash</p>
            `;
            break;
        case 'projects':
            window.location.href = 'projects.html';
            return;
        case 'contact':
            window.location.href = 'contact.html';
            return;
        case 'clear':
            document.querySelector('.terminal-output').innerHTML = '';
            return;
        default:
            commandResponse.innerHTML = `<p>> Command not found: ${command}. Type 'help' for available commands.</p>`;
    }
    
    document.querySelector('.terminal-output').appendChild(commandResponse);
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

// Simulate security alerts
function simulateSecurityAlert() {
    const alertTypes = [
        {message: 'Potential brute force attempt detected', type: 'warning'},
        {message: 'Suspicious IP connection blocked', type: 'error'},
        {message: 'Integrity check passed', type: 'success'},
        {message: 'New threat intelligence received', type: 'info'}
    ];
    
    const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    consoleLog(randomAlert.message, randomAlert.type);
    
    // Create visual alert with fixed positioning
    const alertElement = document.createElement('div');
    alertElement.classList.add('security-alert', randomAlert.type);
    alertElement.textContent = randomAlert.message;
    
    // Apply styles for overlay positioning
    alertElement.style.position = 'fixed';
    alertElement.style.top = '20px';
    alertElement.style.right = '20px';
    alertElement.style.zIndex = '1000'; // Ensure it appears on top of other elements
    alertElement.style.padding = '12px 20px';
    alertElement.style.borderRadius = '4px';
    alertElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    
    document.body.appendChild(alertElement);
    
    // Remove after animation
    setTimeout(() => {
        alertElement.classList.add('fade-out');
        setTimeout(() => {
            alertElement.remove();
        }, 1000);
    }, 3000);
}

// Run security simulation occasionally
setInterval(() => {
    if (Math.random() > 0.7) {
        simulateSecurityAlert();
    }
}, 30000);