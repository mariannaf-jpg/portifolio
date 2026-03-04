document.addEventListener('DOMContentLoaded', () => {


    const translations = {
    
        navHome: { pt: "Início", en: "Home" },
        navSkills: { pt: "Habilidades", en: "Skills" },
        navProjects: { pt: "Projetos", en: "Projects" },
        navContact: { pt: "Contato", en: "Contact" },

        heroGreeting: { pt: "Olá, eu sou", en: "Hello, I am" },
        heroName: { pt: "Marianna De Oliveira Fortes", en: "Marianna De Oliveira Fortes" }, 
        heroBio: { pt: "Biomédica com especialização em patologia e perícia criminal.", en: "Biomedical scientist specializing in pathology and forensic science." },
        heroButton: { pt: "Ver Projetos", en: "View Projects" },

        
        skillsTitle: { pt: "Minhas Habilidades", en: "My Skills" },

        projectsTitle: { pt: "Meus Projetos de Destaque", en: "Featured Projects" },
        
        project1Title: { pt: "Mapeamento Molecular de Doenças Hematológicas", en: "Molecular Mapping of Hematological Diseases" },
        project1Desc: { pt: "Análise laboratorial avançada para identificação precoce de alterações sanguíneas e diagnóstico preciso.", en: "Advanced laboratory analysis for early identification of blood abnormalities and accurate diagnosis." },
        
        project2Title: { pt: "Análise Forense de Vestígios Biológicos em Cena de Crime", en: "Forensic Analysis of Biological Traces at Crime Scenes" },
        project2Desc: { pt: "Aplicação de técnicas biomédicas para indentificação e preservação de evidências genéticas.", en: "Application of biomedical techniques for the identification and preservation of genetic evidence." },

        project3Title: { pt: "Estudo Histopatológico de Lesões Tumorais", en: "Histopathological Study of Tumor Lesions" },
        project3Desc: { pt: "Investigação microscópia de tecidos para compreensão da progressão celular e definição diagnóstica.", en: "Microscopic investigation of tissues for understanding cellular progression and diagnostic definition." },

        btnDemo: { pt: "Documentação", en: "Documentation" },
        btnCode: { pt: "Pesquisa", en: "Research" },


        contactTitle: { pt: "Vamos Trabalhar Juntos?", en: "Shall We Work Together?" },
        contactSubtitle: { pt: "Entre em contato para colaborações, projetos científicos ou parcerias academicas.", en: "Contact us for collaborations, scientific projects, or academic partnerships." },
        formName: { pt: "Seu Nome", en: "Your Name" },
        formEmail: { pt: "Seu Email", en: "Your Email" },
        formMessage: { pt: "Sua Mensagem", en: "Your Message" },
        formSend: { pt: "Enviar Mensagem", en: "Send Message" },
        
        formSuccess: { pt: "Mensagem enviada com sucesso! Em breve entrarei em contato.", en: "Message sent successfully! I will get back to you shortly." },

        
        footerText: { pt: "© 2025 Marianna De Oliveira Fortes. Feito com paixão e pesquisa.", en: "© 2025 Marianna De Oliveira Fortes. Made with passion and research." }
    };

    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = localStorage.getItem('lang') || 'pt'; 

    function translatePage(lang) {
        for (const key in translations) {
            const element = document.querySelector(`[data-key="${key}"]`);
            if (element) {
                const translation = translations[key][lang];
                
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.tagName === 'BUTTON' && element.type === 'submit') {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        }
        

        langButtons.forEach(btn => {
            btn.classList.remove('active-lang');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active-lang');
            }
        });

        currentLang = lang;
        localStorage.setItem('lang', lang);
    }
    
 
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            translatePage(lang);
        });
    });


    translatePage(currentLang);




    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');

        const isDarkMode = body.classList.contains('dark-mode');
        modeToggle.querySelector('i').className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });


    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        modeToggle.querySelector('i').className = 'fas fa-moon';
    } else {
        body.classList.add('dark-mode');
        modeToggle.querySelector('i').className = 'fas fa-sun';
    }


    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const textArray = JSON.parse(typingElement.getAttribute('data-text'));
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = textArray[textIndex];
            if (!isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(type, 1500); 
                } else {
                    setTimeout(type, 100);
                }
            } else {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % textArray.length; 
                    setTimeout(type, 500); 
                } else {
                    setTimeout(type, 50);
                }
            }
        }
        type();
    }

    const skillsSection = document.getElementById('habilidades');
    const skillBars = document.querySelectorAll('.bar');
    let hasAnimated = false;

    function animateSkills() {
        if (!skillsSection) return;
        
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (sectionTop < screenHeight - 100 && !hasAnimated) {
            skillBars.forEach(bar => {
                const percent = bar.getAttribute('data-percent');
                bar.style.width = percent + '%'; 
            });
            hasAnimated = true; 
            window.removeEventListener('scroll', animateSkills);
        }
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills(); 



    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const headerHeight = document.querySelector('header').offsetHeight;

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });


    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
     
        const successMessage = translations.formSuccess[currentLang];
        
        formMessage.style.color = 'var(--primary-color)';
        formMessage.textContent = successMessage;
        
        contactForm.reset();
    });

});
