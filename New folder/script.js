        // Theme Toggle
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');

        // Set initial icon based on current theme
        if (document.body.getAttribute('data-theme') === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.body.setAttribute('data-theme', 'light');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                document.body.setAttribute('data-theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });

        // Mobile Menu - FIXED WITH SEPARATE CLOSE BUTTON
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMenu = document.getElementById('close-menu');

        // Open menu
        hamburger.addEventListener('click', () => {
            console.log('Hamburger clicked - opening menu');
            mobileMenu.classList.add('active');
            closeMenu.style.display = 'flex'; // Show close button
            document.body.style.overflow = 'hidden';
        });

        // Close menu
        closeMenu.addEventListener('click', () => {
            console.log('Close button clicked - closing menu');
            mobileMenu.classList.remove('active');
            closeMenu.style.display = 'none'; // Hide close button
            document.body.style.overflow = 'auto';
        });

        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Menu link clicked - closing menu');
                mobileMenu.classList.remove('active');
                closeMenu.style.display = 'none'; // Hide close button
                document.body.style.overflow = 'auto';

                // Scroll to section
                const targetId = link.getAttribute('href');
                setTimeout(() => {
                    document.querySelector(targetId).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            });
        });

        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                closeMenu.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function () {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 5px 20px var(--card-shadow)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });

        // Fix for button clicks
        document.getElementById('view-work-btn').addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('projects').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });

        document.getElementById('contact-btn').addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });

        // Fix for navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // Three.js 3D Scene
        let scene, camera, renderer, particles;

        function init() {
            // Create scene
            scene = new THREE.Scene();

            // Create camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;

            // Create renderer
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);

            // IMPORTANT: Set pointer-events to none for the canvas
            renderer.domElement.style.pointerEvents = 'none';

            document.getElementById('scene-container').appendChild(renderer.domElement);

            // Create particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 1000;

            const posArray = new Float32Array(particlesCount * 3);

            for (let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 10;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.02,
                color: getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
            });

            particles = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particles);

            // Handle window resize
            window.addEventListener('resize', onWindowResize);

            // Start animation
            animate();
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);

            // Rotate particles
            particles.rotation.x += 0.001;
            particles.rotation.y += 0.001;

            renderer.render(scene, camera);
        }

        // Initialize 3D scene
        init();

        // Fade in elements on scroll
        const fadeElements = document.querySelectorAll('.fade-in');

        const fadeInOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        fadeElements.forEach(el => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeInOnScroll.observe(el);
        });