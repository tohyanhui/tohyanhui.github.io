document.addEventListener("DOMContentLoaded", function () {
    // Initialize EmailJS
    emailjs.init("NtEBNuKBba7qpzrr9");

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Theme toggle functionality
    const themeToggle = document.getElementById("themeToggle");
    const html = document.documentElement;
    const icon = themeToggle.querySelector("i");

    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Apply theme based on saved preference or system preference
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        html.classList.add("dark");
        icon.classList.replace("fa-moon", "fa-sun");
        document.querySelector("meta[name='theme-color']").setAttribute("content", "#000000");
    }

    // Toggle theme when button is clicked
    themeToggle.addEventListener("click", function () {
        html.classList.toggle("dark");
        const isDark = html.classList.contains("dark");

        // Update icon and theme color
        if (isDark) {
            icon.classList.replace("fa-moon", "fa-sun");
            document.querySelector("meta[name='theme-color']").setAttribute("content", "#000000");
            localStorage.setItem("theme", "dark");
        } else {
            icon.classList.replace("fa-sun", "fa-moon");
            document.querySelector("meta[name='theme-color']").setAttribute("content", "#0070f3");
            localStorage.setItem("theme", "light");
        }
    });

    // Mobile navigation toggle
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeMenu = document.getElementById("closeMenu");

    if (menuToggle && mobileMenu && closeMenu) {
        menuToggle.addEventListener("click", function () {
            mobileMenu.classList.remove("translate-x-full");
            document.body.classList.add("overflow-hidden");
        });

        closeMenu.addEventListener("click", function () {
            mobileMenu.classList.add("translate-x-full");
            document.body.classList.remove("overflow-hidden");
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", function () {
                mobileMenu.classList.add("translate-x-full");
                document.body.classList.remove("overflow-hidden");
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector("header").offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    })

    // Form submission handling
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Show loading text in button
            const button = contactForm.querySelector("button[type='submit']");
            const originalText = button.textContent;
            button.textContent = "Sending...";

            // Send the form data to EmailJS
            emailjs.sendForm('service_ezcphyg', 'template_g1359jd', this)
                .then(function (response) {
                    console.log('SUCCESS!', response);
                    // Show success message
                    button.textContent = "Message Sent!";

                    // Reset form
                    contactForm.reset();

                    // Restore button text after a delay
                    setTimeout(() => {
                        button.textContent = originalText;
                    }, 3000);
                }, function (error) {
                    console.log('FAILED...', error);
                    // Show error message
                    button.textContent = "Send Failed, Try Again";

                    // Restore button text after a delay
                    setTimeout(() => {
                        button.textContent = originalText;
                    }, 3000);
                });
        })
    }

    // Add scroll events for header shadow and reveal animations
    const header = document.querySelector("header");
    const sections = document.querySelectorAll("section");

    function checkScroll() {
        // Header shadow
        if (window.scrollY > 0) {
            header.classList.add("shadow-md");
        } else {
            header.classList.remove("shadow-md");
        }

        // Reveal animations for sections
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.85) {
                section.classList.add("opacity-100", "translate-y-0");
                section.classList.remove("opacity-0", "translate-y-4");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    // Run on page load
    checkScroll();

    // Add intersection observer for animations
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("opacity-100", "translate-y-0");
                entry.target.classList.remove("opacity-0", "translate-y-4");
                // Stop observing once the animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Terminal animation
    const terminalContainer = document.getElementById("terminal-container");
    const terminalContent = document.querySelector(".terminal-content");
    const commandSpan = document.querySelector(".command-text");

    if (terminalContainer && terminalContent && commandSpan) {
        const commandText = "git clone https://github.com/tohyanhui/repository.git";

        let i = 0;
        const typeCommand = () => {
            if (i < commandText.length) {
                commandSpan.textContent += commandText.charAt(i);
                i++;
                setTimeout(typeCommand, 50);
            } else {
                // Show cursor blink effect after typing
                const cursor = document.createElement("span");
                cursor.className = "inline-block w-2 h-5 bg-gray-900 dark:bg-white ml-1 animate-blink align-middle";
                terminalContent.appendChild(cursor);
            }
        };

        // Start typing command after a short delay
        setTimeout(typeCommand, 1000);
    } else {
        // Fallback for original terminal structure
        const terminal = document.querySelector(".terminal-body");
        if (terminal) {
            const commandText = terminal.querySelector(".command").textContent;
            terminal.querySelector(".command").textContent = "";

            let i = 0;
            const typeCommand = () => {
                if (i < commandText.length) {
                    terminal.querySelector(".command").textContent += commandText.charAt(i);
                    i++;
                    setTimeout(typeCommand, 50);
                } else {
                    // Show cursor blink effect after typing
                    terminal.querySelector(".command").insertAdjacentHTML('afterend', '<span class="animate-blink">_</span>');
                }
            };

            // Start typing command after a short delay
            setTimeout(typeCommand, 1000);
        }
    }

});