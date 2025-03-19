// Main JavaScript for SOC Analyst Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For now, we'll just simulate a successful submission
            
            formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
            formStatus.className = 'success';
            
            // Reset the form
            contactForm.reset();
            
            // Clear the success message after 5 seconds
            setTimeout(function() {
                formStatus.textContent = '';
                formStatus.className = '';
            }, 5000);
        });
    }

    // Project Modal Functionality
    const modal = document.getElementById('projectModal');
    const projectButtons = document.querySelectorAll('.project-btn');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');
    
    if (modal && projectButtons.length > 0) {
        // Project data - CUSTOMIZE with your actual project details
        const projectData = {
            project1: {
                title: "/* CUSTOMIZE: Project 1 Title */",
                fullDescription: `
                    <h2>/* CUSTOMIZE: Project 1 Title */</h2>
                    <div class="project-tags modal-tags">
                        <span>SIEM</span>
                        <span>Incident Response</span>
                        <span>Automation</span>
                    </div>
                    <h3>Challenge</h3>
                    <p>/* CUSTOMIZE: Describe the security challenge in detail */</p>
                    
                    <h3>Solution</h3>
                    <p>/* CUSTOMIZE: Explain your approach and implementation */</p>
                    
                    <h3>Results</h3>
                    <p>/* CUSTOMIZE: Describe the outcomes and benefits */</p>
                    
                    <h3>Tools & Technologies Used</h3>
                    <ul>
                        <li>/* CUSTOMIZE: Tool 1 with description */</li>
                        <li>/* CUSTOMIZE: Tool 2 with description */</li>
                        <li>/* CUSTOMIZE: Tool 3 with description */</li>
                    </ul>
                    
                    <h3>Key Learnings</h3>
                    <p>/* CUSTOMIZE: Share insights gained from this project */</p>
                `
            },
            project2: {
                title: "/* CUSTOMIZE: Project 2 Title */",
                fullDescription: `
                    <h2>/* CUSTOMIZE: Project 2 Title */</h2>
                    <div class="project-tags modal-tags">
                        <span>Threat Hunting</span>
                        <span>Python</span>
                        <span>Data Analysis</span>
                    </div>
                    <h3>Challenge</h3>
                    <p>/* CUSTOMIZE: Describe the security challenge in detail */</p>
                    
                    <h3>Solution</h3>
                    <p>/* CUSTOMIZE: Explain your approach and implementation */</p>
                    
                    <h3>Results</h3>
                    <p>/* CUSTOMIZE: Describe the outcomes and benefits */</p>
                    
                    <h3>Tools & Technologies Used</h3>
                    <ul>
                        <li>/* CUSTOMIZE: Tool 1 with description */</li>
                        <li>/* CUSTOMIZE: Tool 2 with description */</li>
                        <li>/* CUSTOMIZE: Tool 3 with description */</li>
                    </ul>
                    
                    <h3>Key Learnings</h3>
                    <p>/* CUSTOMIZE: Share insights gained from this project */</p>
                `
            },
            project3: {
                title: "/* CUSTOMIZE: Project 3 Title */",
                fullDescription: `
                    <h2>/* CUSTOMIZE: Project 3 Title */</h2>
                    <div class="project-tags modal-tags">
                        <span>Network Security</span>
                        <span>Traffic Analysis</span>
                        <span>Detection Engineering</span>
                    </div>
                    <h3>Challenge</h3>
                    <p>/* CUSTOMIZE: Describe the security challenge in detail */</p>
                    
                    <h3>Solution</h3>
                    <p>/* CUSTOMIZE: Explain your approach and implementation */</p>
                    
                    <h3>Results</h3>
                    <p>/* CUSTOMIZE: Describe the outcomes and benefits */</p>
                    
                    <h3>Tools & Technologies Used</h3>
                    <ul>
                        <li>/* CUSTOMIZE: Tool 1 with description */</li>
                        <li>/* CUSTOMIZE: Tool 2 with description */</li>
                        <li>/* CUSTOMIZE: Tool 3 with description */</li>
                    </ul>
                    
                    <h3>Key Learnings</h3>
                    <p>/* CUSTOMIZE: Share insights gained from this project */</p>
                `
            }
        };
        
        // Open modal when project button is clicked
        projectButtons.forEach(button => {
            button.addEventListener('click', function() {
                const projectId = this.getAttribute('data-id');
                const project = projectData[projectId];
                
                if (project) {
                    modalBody.innerHTML = project.fullDescription;
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                }
            });
        });
        
        // Close modal when X is clicked
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        }
        
        // Close modal when clicking outside of it
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });
    }
});