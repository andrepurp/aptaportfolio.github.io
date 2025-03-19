// IntersectionObserver for triggering animations when elements come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // If it's a metric number, animate it
            if (entry.target.classList.contains('metric-number')) {
                const finalValue = parseInt(entry.target.getAttribute('data-value'));
                animateValue(entry.target, 0, finalValue, 2000);
            }
            // Add fade-in animation for other elements
            else {
                entry.target.classList.add('animate');
            }
            // Unobserve after animation is triggered
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all metric numbers
metricNumbers.forEach(metric => {
    observer.observe(metric);
});

// Observe other animated elements
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// ========== Form validation ==========
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nameInput = document.querySelector('#name');
        const emailInput = document.querySelector('#email');
        const messageInput = document.querySelector('#message');
        const honeypotInput = document.querySelector('#website'); // Honeypot field for spam prevention
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Simple validation
        let isValid = true;
        
        // Check for honeypot (anti-spam)
        if (honeypotInput && honeypotInput.value) {
            console.log('Bot detected');
            return false; // Silently reject the form
        }
        
        // Validate name
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required');
            isValid = false;
        }
        
        // Validate email with regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Valid email is required');
            isValid = false;
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Message is required');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Message sent successfully!';
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });
    
    function showError(input, message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        input.parentNode.appendChild(errorMessage);
        input.classList.add('error');
        
        // Remove error state when input changes
        input.addEventListener('input', function() {
            errorMessage.remove();
            input.classList.remove('error');
        }, { once: true });
    }
}

// ========== Cybersecurity specific features ==========

// 1. Interactive threat map
const threatMap = document.querySelector('#threat-map');
if (threatMap) {
    initThreatMap();
}

function initThreatMap() {
    // This would typically use a library like leaflet.js or a custom WebGL implementation
    // For demonstration, we'll create a simple animated threat map
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = threatMap.offsetWidth;
    canvas.height = threatMap.offsetHeight;
    threatMap.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Sample attack points (would be loaded from real data in a real application)
    const attackPoints = [
        { x: 0.1, y: 0.2, intensity: 0.8 },
        { x: 0.3, y: 0.7, intensity: 0.5 },
        { x: 0.6, y: 0.4, intensity: 0.9 },
        { x: 0.8, y: 0.3, intensity: 0.7 },
        { x: 0.5, y: 0.8, intensity: 0.6 }
    ];
    
    // Draw map background
    function drawMap() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw world map outline (simplified)
        ctx.strokeStyle = '#2a2a2a';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Here you would draw actual map paths
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 3, 0, Math.PI * 2);
        ctx.stroke();
        
        // Draw attack points
        attackPoints.forEach(point => {
            const x = point.x * canvas.width;
            const y = point.y * canvas.height;
            const radius = 5 + point.intensity * 15;
            
            // Draw glow
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, 'rgba(255, 0, 0, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Animate the attack intensity
            point.intensity = 0.3 + Math.sin(Date.now() / 1000 + point.x * 10) * 0.2;
        });
        
        requestAnimationFrame(drawMap);
    }
    
    // Start the animation
    drawMap();
    
    // Resize handler
    window.addEventListener('resize', function() {
        canvas.width = threatMap.offsetWidth;
        canvas.height = threatMap.offsetHeight;
    });
}

// 2. SIEM Dashboard Demo
const siemDashboard = document.querySelector('#siem-dashboard');
if (siemDashboard) {
    initSIEMDashboard();
}

function initSIEMDashboard() {
    // Create sample security events
    const securityEvents = [
        { timestamp: '2023-10-05 14:32:45', level: 'high', source: '192.168.1.105', event: 'Multiple failed login attempts', status: 'unresolved' },
        { timestamp: '2023-10-05 14:30:12', level: 'medium', source: '192.168.1.223', event: 'Unusual network traffic pattern', status: 'investigating' },
        { timestamp: '2023-10-05 14:28:57', level: 'low', source: '192.168.1.78', event: 'System update completed', status: 'resolved' },
        { timestamp: '2023-10-05 14:25:33', level: 'high', source: '192.168.1.15', event: 'Potential data exfiltration', status: 'mitigated' },
        { timestamp: '2023-10-05 14:22:19', level: 'medium', source: '192.168.1.42', event: 'Suspicious process execution', status: 'investigating' }
    ];
    
    // Create event list
    const eventsContainer = document.createElement('div');
    eventsContainer.className = 'events-container';
    
    securityEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = `security-event ${event.level}-alert`;
        
        eventElement.innerHTML = `
            <div class="event-timestamp">${event.timestamp}</div>
            <div class="event-level">${event.level.toUpperCase()}</div>
            <div class="event-source">${event.source}</div>
            <div class="event-description">${event.event}</div>
            <div class="event-status">${event.status}</div>
            <div class="event-actions">
                <button class="investigate-btn">Investigate</button>
                <button class="resolve-btn">Resolve</button>
            </div>
        `;
        
        eventsContainer.appendChild(eventElement);
    });
    
    siemDashboard.appendChild(eventsContainer);
    
    // Add event handlers
    document.querySelectorAll('.investigate-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const eventElement = this.closest('.security-event');
            eventElement.classList.add('investigating');
            const statusElement = eventElement.querySelector('.event-status');
            statusElement.textContent = 'investigating';
        });
    });
    
    document.querySelectorAll('.resolve-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const eventElement = this.closest('.security-event');
            eventElement.classList.remove('investigating');
            eventElement.classList.add('resolved');
            const statusElement = eventElement.querySelector('.event-status');
            statusElement.textContent = 'resolved';
        });
    });
    
    // Add a function to simulate new alerts
    function addNewAlert() {
        const alertTypes = [
            { level: 'low', event: 'Configuration change detected' },
            { level: 'medium', event: 'Unusual authentication pattern' },
            { level: 'high', event: 'Potential malware detected' },
            { level: 'medium', event: 'Firewall rule violation' },
            { level: 'high', event: 'Brute force attack attempt' }
        ];
        
        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const newIP = `192.168.${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 254) + 1}`;
        
        const now = new Date();
        const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        
        const newEvent = {
            timestamp: timestamp,
            level: randomAlert.level,
            source: newIP,
            event: randomAlert.event,
            status: 'unresolved'
        };
        
        // Create and add the new event element
        const eventElement = document.createElement('div');
        eventElement.className = `security-event ${newEvent.level}-alert new-alert`;
        
        eventElement.innerHTML = `
            <div class="event-timestamp">${newEvent.timestamp}</div>
            <div class="event-level">${newEvent.level.toUpperCase()}</div>
            <div class="event-source">${newEvent.source}</div>
            <div class="event-description">${newEvent.event}</div>
            <div class="event-status">${newEvent.status}</div>
            <div class="event-actions">
                <button class="investigate-btn">Investigate</button>
                <button class="resolve-btn">Resolve</button>
            </div>
        `;
        
        // Add the new event to the top of the list
        eventsContainer.insertBefore(eventElement, eventsContainer.firstChild);
        
        // Add event handlers to the new buttons
        eventElement.querySelector('.investigate-btn').addEventListener('click', function() {
            eventElement.classList.add('investigating');
            eventElement.querySelector('.event-status').textContent = 'investigating';
        });
        
        eventElement.querySelector('.resolve-btn').addEventListener('click', function() {
            eventElement.classList.remove('investigating');
            eventElement.classList.add('resolved');
            eventElement.querySelector('.event-status').textContent = 'resolved';
        });
        
        // Remove the 'new-alert' class after animation
        setTimeout(() => {
            eventElement.classList.remove('new-alert');
        }, 2000);
        
        // Remove old events if there are too many
        if (eventsContainer.children.length > 10) {
            eventsContainer.removeChild(eventsContainer.lastChild);
        }
    }
    
    // Add new alerts periodically
    setInterval(addNewAlert, 15000);
}

// 3. Interactive Security Posture Assessment
const securityAssessment = document.querySelector('#security-assessment');
if (securityAssessment) {
    initSecurityAssessment();
}

function initSecurityAssessment() {
    // Create assessment categories
    const assessmentCategories = [
        { name: 'Network Security', score: 85 },
        { name: 'Endpoint Protection', score: 92 },
        { name: 'Identity & Access', score: 78 },
        { name: 'Data Protection', score: 88 },
        { name: 'Threat Detection', score: 95 }
    ];
    
    // Create radar chart container
    const chartContainer = document.createElement('div');
    chartContainer.className = 'security-chart';
    
    // Create SVG for radar chart
    const svgSize = 300;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', svgSize);
    svg.setAttribute('height', svgSize);
    svg.setAttribute('viewBox', `0 0 ${svgSize} ${svgSize}`);
    
    const centerX = svgSize / 2;
    const centerY = svgSize / 2;
    const radius = svgSize * 0.4;
    
    // Draw background circles
    for (let i = 1; i <= 5; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', centerX);
        circle.setAttribute('cy', centerY);
        circle.setAttribute('r', radius * i / 5);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', '#444');
        circle.setAttribute('stroke-width', '1');
        circle.setAttribute('stroke-dasharray', '3,3');
        svg.appendChild(circle);
    }
    
    // Draw radar chart
    const points = [];
    assessmentCategories.forEach((category, index) => {
        const angle = (index / assessmentCategories.length) * Math.PI * 2 - Math.PI / 2;
        const value = category.score / 100;
        const x = centerX + radius * value * Math.cos(angle);
        const y = centerY + radius * value * Math.sin(angle);
        points.push({ x, y });
        
        // Draw axis
        const axisLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        axisLine.setAttribute('x1', centerX);
        axisLine.setAttribute('y1', centerY);
        axisLine.setAttribute('x2', centerX + radius * Math.cos(angle));
        axisLine.setAttribute('y2', centerY + radius * Math.sin(angle));
        axisLine.setAttribute('stroke', '#444');
        axisLine.setAttribute('stroke-width', '1');
        svg.appendChild(axisLine);
        
        // Add label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        const labelX = centerX + (radius + 20) * Math.cos(angle);
        const labelY = centerY + (radius + 20) * Math.sin(angle);
        label.setAttribute('x', labelX);
        label.setAttribute('y', labelY);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('dominant-baseline', 'middle');
        label.setAttribute('fill', '#fff');
        label.setAttribute('font-size', '12px');
        label.textContent = category.name;
        svg.appendChild(label);
    });
    
    // Create radar polygon
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', points.map(p => `${p.x},${p.y}`).join(' '));
    polygon.setAttribute('fill', 'rgba(0, 255, 0, 0.2)');
    polygon.setAttribute('stroke', 'rgba(0, 255, 0, 0.8)');
    polygon.setAttribute('stroke-width', '2');
    svg.appendChild(polygon);
    
    chartContainer.appendChild(svg);
    securityAssessment.appendChild(chartContainer);
    
    // Add assessment explanation
    const explanationContainer = document.createElement('div');
    explanationContainer.className = 'assessment-explanation';
    
    const overallScore = Math.round(assessmentCategories.reduce((sum, category) => sum + category.score, 0) / assessmentCategories.length);
    
    explanationContainer.innerHTML = `
        <h3>Security Posture Score: ${overallScore}/100</h3>
        <p>This assessment represents your organization's security posture across key domains.</p>
        <ul>
            ${assessmentCategories.map(category => `
                <li>
                    <strong>${category.name}:</strong> ${category.score}% 
                    <div class="progress-bar">
                        <div class="progress" style="width: ${category.score}%"></div>
                    </div>
                </li>
            `).join('')}
        </ul>
        <p>Click on any category to see detailed recommendations.</p>
    `;
    
    securityAssessment.appendChild(explanationContainer);
    
    // Add click handlers for categories
    explanationContainer.querySelectorAll('li').forEach((li, index) => {
        li.addEventListener('click', function() {
            // Create and show recommendations
            const recommendationsContainer = document.createElement('div');
            recommendationsContainer.className = 'recommendations';
            
            const category = assessmentCategories[index];
            const recommendations = getRecommendations(category.name, category.score);
            
            recommendationsContainer.innerHTML = `
                <h4>${category.name} Recommendations</h4>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
                <button class="close-btn">Close</button>
            `;
            
            // Close any existing recommendations
            const existingRecs = document.querySelector('.recommendations');
            if (existingRecs) {
                existingRecs.remove();
            }
            
            securityAssessment.appendChild(recommendationsContainer);
            
            // Add close button handler
            recommendationsContainer.querySelector('.close-btn').addEventListener('click', function() {
                recommendationsContainer.remove();
            });
        });
    });
    
    // Sample recommendations based on category and score
    function getRecommendations(category, score) {
        const recommendations = {
            'Network Security': [
                'Implement network segmentation',
                'Deploy next-generation firewalls',
                'Enable TLS 1.3 across all services',
                'Perform regular network vulnerability scans'
            ],
            'Endpoint Protection': [
                'Deploy EDR solutions',
                'Implement application allowlisting',
                'Enable disk encryption',
                'Enforce regular patching cycles'
            ],
            'Identity & Access': [
                'Implement multi-factor authentication',
                'Adopt zero trust architecture',
                'Perform regular access reviews',
                'Implement privileged access management'
            ],
            'Data Protection': [
                'Classify sensitive data',
                'Implement data loss prevention',
                'Encrypt data at rest and in transit',
                'Develop data retention policies'
            ],
            'Threat Detection': [
                'Deploy SIEM solution',
                'Implement threat hunting program',
                'Conduct regular red team exercises',
                'Establish security operations center'
            ]
        };
        
        // Return fewer recommendations for higher scores
        const numRecommendations = score > 90 ? 1 : score > 80 ? 2 : 3;
        return recommendations[category].slice(0, numRecommendations);
    }
}

// 4. Add a terminal command simulator
const terminal = document.querySelector('#terminal-simulator');
if (terminal) {
    initTerminalSimulator();
}

function initTerminalSimulator() {
    const terminalContent = document.createElement('div');
    terminalContent.className = 'terminal-content';
    
    const terminalPrompt = document.createElement('div');
    terminalPrompt.className = 'terminal-prompt';
    terminalPrompt.innerHTML = `
        <span class="terminal-user">analyst@soc</span>:<span class="terminal-path">~</span>$ <span class="terminal-input"></span><span class="cursor">|</span>
    `;
    
    terminalContent.appendChild(terminalPrompt);
    terminal.appendChild(terminalContent);
    
    // Add command history
    const commandHistory = [
        { command: 'sudo nmap -sS -A 192.168.1.0/24', output: 'Scanning 256 IP addresses...\nHost 192.168.1.1 is up\nPort 22 (SSH): Open\nPort 80 (HTTP): Open\nHost 192.168.1.105 is up\nPort 22 (SSH): Open\nPort 3389 (RDP): Open\nScan complete: 2 hosts up, 254 hosts down' },
        { command: 'tail -f /var/log/syslog | grep ERROR', output: 'Oct 5 14:32:45 server1 app[12345]: ERROR: Authentication failure\nOct 5 14:35:23 server1 app[12345]: ERROR: Database connection timeout\nOct 5 14:38:17 server1 app[12345]: ERROR: Unauthorized access attempt' },
        { command: 'ps aux | grep suspicious', output: 'root      1234  0.0  0.3  12345 5432 ?        Ss   14:30   0:00 /usr/bin/suspicious_process\nanalyst   5678  0.0  0.1   3456  789 pts/0    S+   14:40   0:00 grep suspicious' }
    ];
    
    // Display command history
    commandHistory.forEach(entry => {
        appendCommand(entry.command, entry.output);
    });
    
    // Add interactive input
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'hidden-input';
    terminal.appendChild(inputField);
    
    // Focus input when clicking on terminal
    terminal.addEventListener('click', function() {
        inputField.focus();
    });
    
    // Handle input
    inputField.addEventListener('input', function() {
        const inputSpan = terminalPrompt.querySelector('.terminal-input');
        inputSpan.textContent = this.value;
    });
    
    // Handle key presses
    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = this.value;
            let output = '';
            
            // Process commands
            if (command.trim().toLowerCase() === 'help') {
                output = 'Available commands:\n- help: Display this help message\n- scan: Run a network scan\n- analyze: Analyze system logs\n- monitor: Monitor network traffic\n- clear: Clear the terminal';
            } else if (command.trim().toLowerCase() === 'clear') {
                // Clear the terminal content
                terminalContent.innerHTML = '';
                terminalContent.appendChild(terminalPrompt);
                this.value = '';
                return;
            } else if (command.trim().toLowerCase() === 'scan') {
                output = 'Scanning network...\nHost 192.168.1.1 is up\nPort 22 (SSH): Open\nPort 80 (HTTP): Open\nHost 192.168.1.105 is up\nPort 22 (SSH): Open\nPort 3389 (RDP): Open\nScan complete: 2 hosts up, 254 hosts down';
            } else if (command.trim().toLowerCase() === 'analyze') {
                output = 'Analyzing system logs...\nFound 3 suspicious entries:\nOct 5 14:32:45 server1 app[12345]: ERROR: Authentication failure\nOct 5 14:35:23 server1 app[12345]: ERROR: Database connection timeout\nOct 5 14:38:17 server1 app[12345]: ERROR: Unauthorized access attempt';
            } else if (command.trim().toLowerCase() === 'monitor') {
                output = 'Monitoring network traffic...\nDetected unusual outbound connection to 203.0.113.42:4444\nProtocol: TCP\nBytes transferred: 1.5MB\nConnection duration: 3m 24s';
            } else if (command.trim() !== '') {
                output = `bash: ${command}: command not found`;
            }
            
            // Append command and output to terminal
            appendCommand(command, output);
            
            // Clear input
            this.value = '';
            terminalPrompt.querySelector('.terminal-input').textContent = '';
        }
    });
    
    function appendCommand(command, output) {
        // Create command element
        const commandElement = document.createElement('div');
        commandElement.className = 'terminal-line';
        commandElement.innerHTML = `<span class="terminal-user">analyst@soc</span>:<span class="terminal-path">~</span>$ ${command}`;
        
        // Create output element
        const outputElement = document.createElement('div');
        outputElement.className = 'terminal-output';
        outputElement.textContent = output;
        
        // Add elements to terminal
        terminalContent.insertBefore(outputElement, terminalPrompt);
        terminalContent.insertBefore(commandElement, outputElement);
        
        // Scroll to bottom
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
    
    // Make cursor blink
    setInterval(() => {
        const cursor = terminalPrompt.querySelector('.cursor');
        cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }, 500);
}