// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            // Update when scrolling stops
            if (scrollTop <= 0) {
                header.style.transform = 'translateY(0)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else if (scrollTop > 80) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Add animations on scroll
    const animateElements = document.querySelectorAll('.animate');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.pageYOffset;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in view
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('in-view');
            }
        });
    }
    
    // Initial check on page load
    window.addEventListener('load', checkIfInView);
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);
    
    // Contact form handling
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill all fields');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show an alert
            alert(`Thank you ${name} for your message! I'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Add animations to skills bars
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-level');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }
    
    // Initialize skill animations when the skills section is in view
    const skillsSection = document.querySelector('.skills');
    
    function checkSkillsInView() {
        if (!skillsSection) return;
        
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.pageYOffset;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        const sectionTopPosition = skillsSection.offsetTop;
        const sectionBottomPosition = sectionTopPosition + skillsSection.offsetHeight;
        
        if (
            (sectionBottomPosition >= windowTopPosition) &&
            (sectionTopPosition <= windowBottomPosition) &&
            !skillsSection.classList.contains('animated')
        ) {
            animateSkills();
            skillsSection.classList.add('animated');
        }
    }
    
    // Check skills section on scroll
    window.addEventListener('scroll', checkSkillsInView);
    // Initial check on page load
    window.addEventListener('load', checkSkillsInView);
    
    // Typing effect for hero section
    const typingElement = document.querySelector('.hero-content h1');
    
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Scroll Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.animate').forEach((el) => observer.observe(el));

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth',
                });
            }
        });
    });

    // Add animations to sections on scroll
    const sections = document.querySelectorAll('section');

    function animateSections() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.pageYOffset;
        const windowBottomPosition = windowTopPosition + windowHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
                sectionBottom >= windowTopPosition &&
                sectionTop <= windowBottomPosition
            ) {
                section.classList.add('visible');
            }
        });
    }

    // Trigger animations on scroll and page load
    window.addEventListener('scroll', animateSections);
    window.addEventListener('load', animateSections);
});

// Skills interactivity
document.addEventListener('DOMContentLoaded', function () {
    const skillCards = document.querySelectorAll('.skill-card');
    const skillsDetails = document.getElementById('skills-details');
    const skillsList = document.getElementById('skills-list');

    const skillsData = {
        programming: [
            { name: 'Python', icon: 'fab fa-python' },
            { name: 'Java', icon: 'fab fa-java' },
            { name: 'C++', icon: 'fas fa-code' },
            { name: 'C#', icon: 'fas fa-code' },
            { name: 'JavaScript', icon: 'fab fa-js' }
        ],
        'web-development': [
            { name: 'HTML', icon: 'fab fa-html5' },
            { name: 'CSS', icon: 'fab fa-css3-alt' },
            { name: 'JavaScript', icon: 'fab fa-js' },
            { name: 'React', icon: 'fab fa-react' },
            { name: 'Bootstrap', icon: 'fab fa-bootstrap' }
        ],
        database: [
            { name: 'SQL', icon: 'fas fa-database' },
            { name: 'MySQL', icon: 'fas fa-database' },
            { name: 'Firebase', icon: 'fas fa-fire' }
        ],
        'developer-tools': [
            { name: 'VS Code', icon: 'fas fa-code' },
            { name: 'Git', icon: 'fab fa-git' },
            { name: 'Docker', icon: 'fab fa-docker' },
            { name: 'GitHub Actions', icon: 'fab fa-github' }
        ],
        'machine-learning': [
            { name: 'TensorFlow', icon: 'fas fa-brain' },
            { name: 'YOLOv8', icon: 'fas fa-camera' }
        ]
    };

    let activeSkillCard = null;

    skillCards.forEach(card => {
        card.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            // If the same card is clicked twice, close the details
            if (activeSkillCard === this) {
                skillsDetails.style.display = 'none';
                activeSkillCard = null;
                return;
            }

            // Populate the skills list with icons
            const skills = skillsData[category] || [];
            skillsList.innerHTML = '';
            skills.forEach(skill => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="${skill.icon}"></i> ${skill.name}`;
                skillsList.appendChild(li);
            });

            // Show the skills details section
            skillsDetails.style.display = 'block';
            activeSkillCard = this;
        });
    });
});

function showSkills(title, skills) {
    const detailsBox = document.getElementById('skills-details-box');
    const titleElement = document.getElementById('skills-details-title');
    const listElement = document.getElementById('skills-details-list');

    titleElement.textContent = title;
    listElement.innerHTML = skills
        .map(skill => `<li><i class="${skill.icon}"></i> ${skill.name}</li>`)
        .join('');
    detailsBox.style.display = 'block'; // Make the box visible
}

function closeSkillsModal() {
    const modal = document.getElementById('skills-modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('skills-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

