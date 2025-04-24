document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });

    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('.sticky-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Set Current Year in Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Project Modal Functionality
    const projectButtons = document.querySelectorAll('.project-details-btn');
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalContent = document.getElementById('modal-content');

    // Project data
    const projects = {
        'smart-meter': {
            title: 'Smart Meter System',
            description: 'An advanced metering infrastructure project designed for efficient energy monitoring and management in residential and commercial buildings.',
            features: [
                'Real-time energy consumption tracking',
                'Remote monitoring capabilities',
                'Automated billing system integration',
                'Power quality analysis',
                'Mobile app for user access'
            ],
            technologies: ['IoT Sensors', 'Embedded Systems', 'Wireless Communication', 'Cloud Database', 'Data Analytics'],
            image: 'https://media.istockphoto.com/id/1488294044/photo/businessman-works-on-laptop-showing-business-analytics-dashboard-with-charts-metrics-and-kpi.jpg?b=1&s=612x612&w=0&k=20&c=9mHYdWeiReHhmicdUf5FH2JICVPk3Uiks3MIn1Fkaz8='
        },
        'portfolio': {
            title: 'Professional Portfolio',
            description: 'A responsive web portfolio showcasing my skills, projects, and professional experience as an electrical engineer and designer.',
            features: [
                'Fully responsive design',
                'Interactive project showcase',
                'Skills visualization',
                'Contact form with validation',
                'Smooth animations and transitions'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'UI/UX Principles'],
            image: 'https://images.pexels.com/photos/7868838/pexels-photo-7868838.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        'solar-backup': {
            title: 'Data Center Solar Backup',
            description: 'A hybrid power solution combining solar energy with traditional power sources to ensure uninterrupted operation of critical data center infrastructure.',
            features: [
                'Solar PV array design',
                'Battery storage system',
                'Automatic transfer switching',
                'Energy efficiency optimization',
                'Remote monitoring system'
            ],
            technologies: ['Solar Energy', 'Power Electronics', 'Battery Systems', 'SCADA', 'Energy Management'],
            image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
    };

    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project) {
                modalContent.innerHTML = `
                    <h2>${project.title}</h2>
                    <div class="modal-grid">
                        <div class="modal-image">
                            <img src="${project.image}" alt="${project.title}">
                        </div>
                        <div class="modal-details">
                            <h3>Project Description</h3>
                            <p>${project.description}</p>
                            
                            <h3>Key Features</h3>
                            <ul>
                                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                            
                            <h3>Technologies Used</h3>
                            <div class="tech-tags">
                                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || message === '') {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`);
            this.reset();
        });
    }

    // Animate elements when scrolling
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-category, .project-card, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    document.querySelectorAll('.skill-category, .project-card, .timeline-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});