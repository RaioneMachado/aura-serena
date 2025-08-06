document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuMobile = document.querySelector('.menu-mobile');
    const navbar = document.querySelector('.navbar');
    
    menuMobile.addEventListener('click', function() {
        navbar.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuMobile.querySelector('i').classList.remove('fa-times');
                menuMobile.querySelector('i').classList.add('fa-bars');
            }
        });
    });
    
    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('show');
        });
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert(`Obrigado, ${name}! Seu agendamento foi recebido. Entrarei em contato em breve pelo WhatsApp (${phone}) para confirmar os detalhes.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Testimonial Slider Auto Scroll
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        let scrollAmount = 0;
        const scrollWidth = testimonialSlider.scrollWidth;
        const clientWidth = testimonialSlider.clientWidth;
        const maxScroll = scrollWidth - clientWidth;
        
        function autoScroll() {
            if (scrollAmount < maxScroll) {
                scrollAmount += 350;
            } else {
                scrollAmount = 0;
            }
            testimonialSlider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
        
        // Auto scroll every 5 seconds
        setInterval(autoScroll, 5000);
    }
    
    // Animation on Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.benefit-card, .step, .testimonial-card, .faq-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.benefit-card, .step, .testimonial-card, .faq-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load in case elements are already in view
    animateOnScroll();
    
    // Add glowing effect to CTA buttons on hover
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 15px rgba(47, 104, 87, 0.6)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 20px rgba(47, 104, 87, 0.2)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Dados do Quiz
    const quizData = [
        {
            question: "Como você descreveria seu nível de energia recentemente?",
            options: [
                { text: "Muito cansada, sem disposição", chakra: "root" },
                { text: "Equilibrado, nem muito nem pouco", chakra: "neutral" },
                { text: "Ansiosa, energia acelerada", chakra: "solar" }
            ]
        },
        {
            question: "Como está sua capacidade de se expressar e comunicar?",
            options: [
                { text: "Dificuldade em me expressar", chakra: "throat" },
                { text: "Normal, sem problemas", chakra: "neutral" },
                { text: "Falo demais sem filtro", chakra: "throat" }
            ]
        },
        {
            question: "Como você tem lidado com suas emoções?",
            options: [
                { text: "Emoções reprimidas", chakra: "sacral" },
                { text: "Equilibrado", chakra: "neutral" },
                { text: "Emoções intensas e descontroladas", chakra: "heart" }
            ]
        },
        {
            question: "Como está sua conexão com sua intuição?",
            options: [
                { text: "Pouco conectado", chakra: "third-eye" },
                { text: "Normal", chakra: "neutral" },
                { text: "Muito intuitivo", chakra: "neutral" }
            ]
        },
        {
            question: "Como está sua relação com o dinheiro e segurança material?",
            options: [
                { text: "Dificuldades financeiras", chakra: "root" },
                { text: "Estável", chakra: "neutral" },
                { text: "Apego excessivo a bens materiais", chakra: "root" }
            ]
        },
        {
            question: "Como está sua capacidade de dar e receber amor?",
            options: [
                { text: "Dificuldade em me abrir", chakra: "heart" },
                { text: "Equilibrado", chakra: "neutral" },
                { text: "Me doo demais", chakra: "heart" }
            ]
        },
        {
            question: "Como está sua conexão espiritual?",
            options: [
                { text: "Pouca conexão", chakra: "crown" },
                { text: "Normal", chakra: "neutral" },
                { text: "Muito conectado", chakra: "neutral" }
            ]
        }
    ];

    // Resultados por Chakra (sem imagens)
    const chakraResults = {
        root: {
            title: "Seu Chakra Raiz Precisa de Atenção",
            text: "Seu chakra raiz (Muladhara) parece estar desequilibrado, o que pode afetar sua sensação de segurança e estabilidade na vida.",
            recommendations: [
                "Sessões de Reiki focadas no chakra raiz",
                "Prática de grounding (enraizamento)",
                "Uso de cores vermelhas e aromas de patchouli ou cedro",
                "Alimentação com raízes e proteínas"
            ]
        },
        sacral: {
            title: "Seu Chakra Sacral Requer Cuidados",
            text: "Seu chakra sacral (Svadhisthana) apresenta sinais de desequilíbrio, afetando sua criatividade e fluxo emocional.",
            recommendations: [
                "Reiki com foco no chakra sacral",
                "Atividades criativas e expressivas",
                "Uso da cor laranja e aromas de ylang-ylang",
                "Hidratação e consumo de gorduras saudáveis"
            ]
        },
        solar: {
            title: "Seu Chakra do Plexo Solar Está Desequilibrado",
            text: "Seu chakra do plexo solar (Manipura) precisa de harmonização para restaurar seu poder pessoal e autoestima.",
            recommendations: [
                "Reiki no plexo solar",
                "Exercícios de empoderamento pessoal",
                "Uso da cor amarela e aromas de limão ou bergamota",
                "Alimentos amarelos e chás digestivos"
            ]
        },
        heart: {
            title: "Seu Chakra Cardíaco Precisa de Equilíbrio",
            text: "Seu chakra cardíaco (Anahata) apresenta bloqueios que podem estar afetando sua capacidade de dar e receber amor.",
            recommendations: [
                "Sessões de Reiki no chakra cardíaco",
                "Práticas de autoperdão e compaixão",
                "Uso da cor verde e rosa, aromas de rosa",
                "Alimentos verdes e chás para o coração"
            ]
        },
        throat: {
            title: "Seu Chakra da Garganta Necessita de Cuidado",
            text: "Seu chakra da garganta (Vishuddha) está desequilibrado, afetando sua comunicação e expressão verdadeira.",
            recommendations: [
                "Reiki no chakra da garganta",
                "Prática de canto ou afirmações positivas",
                "Uso da cor azul-claro e aromas de eucalipto",
                "Hidratação e chás calmantes"
            ]
        },
        "third-eye": {
            title: "Seu Chakra do Terceiro Olho Está Desalinhado",
            text: "Seu chakra do terceiro olho (Ajna) precisa de harmonização para melhorar sua intuição e visão clara.",
            recommendations: [
                "Reiki no terceiro olho",
                "Práticas de meditação e visualização",
                "Uso da cor índigo e aromas de lavanda",
                "Alimentos roxos e ricos em antioxidantes"
            ]
        },
        crown: {
            title: "Seu Chakra Coronário Requer Atenção",
            text: "Seu chakra coronário (Sahasrara) está desequilibrado, afetando sua conexão espiritual e propósito.",
            recommendations: [
                "Reiki no chakra coronário",
                "Práticas de silêncio e conexão divina",
                "Uso da cor violeta e aromas de incenso",
                "Jejum intermitente e alimentos leves"
            ]
        },
        neutral: {
            title: "Seus Chakras Estão Bem Equilibrados",
            text: "Parabéns! Seus chakras parecem estar em bom equilíbrio. Continue com suas práticas energéticas.",
            recommendations: [
                "Manutenção com Reiki mensal",
                "Práticas regulares de meditação",
                "Equilíbrio entre todas as cores do arco-íris",
                "Alimentação balanceada e variada"
            ]
        }
    };

    // Elementos DOM
    const quizContent = document.querySelector('.quiz-content');
    const quizResult = document.querySelector('.quiz-result');
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultText = document.getElementById('result-text');
    const resultRecommendations = document.getElementById('result-recommendations');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text .current-question');
    const restartBtn = document.querySelector('.restart-quiz');
    
    // Variáveis do Quiz
    let currentQuestion = 0;
    const answers = [];
    const chakraPoints = {
        root: 0,
        sacral: 0,
        solar: 0,
        heart: 0,
        throat: 0,
        "third-eye": 0,
        crown: 0,
        neutral: 0
    };

    // Inicializar Quiz
    function initQuiz() {
        showQuestion();
    }

    // Mostrar pergunta atual
    function showQuestion() {
        const question = quizData[currentQuestion];
        
        // Atualizar progresso
        progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
        progressText.textContent = currentQuestion + 1;
        
        // Criar HTML da pergunta
        let questionHTML = `
            <div class="quiz-question active">
                <h3>${question.question}</h3>
                <div class="quiz-options">
        `;
        
        // Adicionar opções
        question.options.forEach((option, index) => {
            questionHTML += `
                <button class="quiz-option" data-chakra="${option.chakra}">
                    ${option.text}
                </button>
            `;
        });
        
        questionHTML += `
                </div>
            </div>
        `;
        
        quizContent.innerHTML = questionHTML;
        
        // Adicionar event listeners às opções
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', selectAnswer);
        });
    }

    // Selecionar resposta
    function selectAnswer(e) {
        const selectedChakra = e.target.getAttribute('data-chakra');
        answers.push(selectedChakra);
        chakraPoints[selectedChakra]++;
        
        // Próxima pergunta ou mostrar resultado
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResult();
        }
    }

    // Mostrar resultado
    function showResult() {
        // Determinar chakra principal
        let mainChakra = 'neutral';
        let maxPoints = 0;
        
        for (const chakra in chakraPoints) {
            if (chakraPoints[chakra] > maxPoints && chakra !== 'neutral') {
                maxPoints = chakraPoints[chakra];
                mainChakra = chakra;
            }
        }
        
        // Se nenhum chakra se destacou, mantém como 'neutral'
        if (maxPoints <= 1) {
            mainChakra = 'neutral';
        }
        
        // Atualizar DOM com resultado
        const result = chakraResults[mainChakra];
        resultTitle.textContent = result.title;
        resultText.textContent = result.text;
        
        // Adicionar classe CSS para o ícone do chakra
        resultIcon.className = 'chakra-icon';
        resultIcon.classList.add(mainChakra);
        
        // Atualizar recomendações
        resultRecommendations.innerHTML = '';
        result.recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            resultRecommendations.appendChild(li);
        });
        
        // Mostrar resultado e esconder perguntas
        quizContent.style.display = 'none';
        quizResult.classList.remove('hidden');
        quizResult.classList.add('show');
    }

    // Reiniciar quiz
    restartBtn.addEventListener('click', function() {
        // Resetar variáveis
        currentQuestion = 0;
        answers.length = 0;
        for (const chakra in chakraPoints) {
            chakraPoints[chakra] = 0;
        }
        
        // Resetar DOM
        quizContent.style.display = 'block';
        quizResult.classList.remove('show');
        quizResult.classList.add('hidden');
        
        // Recarregar primeira pergunta
        showQuestion();
    });

    // Iniciar quiz quando a página carregar
    initQuiz();
});

document.addEventListener('DOMContentLoaded', function() {
    // Efeito de carregamento dos posts
    const posts = document.querySelectorAll('.post-card');
    
    posts.forEach((post, index) => {
        // Delay para animação em cascata
        post.style.opacity = '0';
        post.style.transform = 'translateY(20px)';
        post.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
        }, 200 * index);
    });
    
    // Efeito hover no botão de newsletter
    const newsletterBtn = document.querySelector('.diario-aura .btn');
    
    if(newsletterBtn) {
        newsletterBtn.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #9E83BC, #7B6193)';
        });
        
        newsletterBtn.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #7B6193, #9E83BC)';
        });
    }
});