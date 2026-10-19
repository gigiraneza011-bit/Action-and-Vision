

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");
    const header = document.querySelector(".site-header");

    function openMenu() {
        if (!menuToggle || !navbar) return;

        navbar.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
    }

    function closeMenu() {
        if (!menuToggle || !navbar) return;

        navbar.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    if (menuToggle && navbar) {
        // Set the initial menu state.
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        menuToggle.addEventListener("click", function () {
            const isOpen = navbar.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        const navigationLinks = navbar.querySelectorAll('a[href]');

        navigationLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                closeMenu();
            });
        });
        document.addEventListener("click", function (event) {
            if (
                navbar.classList.contains("active") &&
                header &&
                !header.contains(event.target)
            ) {
                closeMenu();
            }
        });
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
        window.addEventListener("resize", function () {
            if (window.innerWidth > 850) {
                closeMenu();
            }
        });
    }

    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                if (window.location.hash !== targetId) {
                    history.pushState(null, "", targetId);
                }
            }
        });
    });

    const navLinks = document.querySelectorAll(
        '.navbar .nav-link[href^="#"]'
    );

    const pageSections = document.querySelectorAll("main section[id]");

    function setActiveNavigation(sectionId) {
        navLinks.forEach(function (link) {
            const linkTarget = link.getAttribute("href");
            const isActive = linkTarget === "#" + sectionId;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    if ("IntersectionObserver" in window && pageSections.length > 0) {
        const sectionObserver = new IntersectionObserver(
            function (entries) {
                const visibleSections = entries
                    .filter(function (entry) {
                        return entry.isIntersecting;
                    })
                    .sort(function (a, b) {
                        return b.intersectionRatio - a.intersectionRatio;
                    });

                if (visibleSections.length > 0) {
                    setActiveNavigation(visibleSections[0].target.id);
                }
            },
            {
                root: null,
                rootMargin: "-20% 0px -60% 0px",
                threshold: [0, 0.1, 0.25, 0.5]
            }
        );

        pageSections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }
    function updateNavigationFromHash() {
        const sectionId = window.location.hash.substring(1);

        if (sectionId && document.getElementById(sectionId)) {
            setActiveNavigation(sectionId);
        }
    }

    updateNavigationFromHash();

    window.addEventListener("hashchange", updateNavigationFromHash);


    const currentYearElement = document.getElementById("current-year");

    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const contactForm = document.getElementById("contact-form");
    const formNotice = document.getElementById("form-notice");

    if (contactForm) {
        const nameInput = document.getElementById("full-name");
        const emailInput = document.getElementById("email-address");
        const subjectInput = document.getElementById("subject");
        const messageInput = document.getElementById("message");

        function showFormNotice(message, type) {
            if (!formNotice) return;

            formNotice.textContent = message;
            formNotice.classList.remove("success", "error");

            if (type) {
                formNotice.classList.add(type);
            }

            formNotice.setAttribute("role", "status");
        }
        contactForm.addEventListener("input", function () {
            if (formNotice) {
                formNotice.textContent = "";
                formNotice.classList.remove("success", "error");
            }
        });

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();

                showFormNotice(
                    "Please complete all required fields with valid information.",
                    "error"
                );

                return;
            }

            const fullName = nameInput
                ? nameInput.value.trim()
                : "";

            const emailAddress = emailInput
                ? emailInput.value.trim()
                : "";

            const subject = subjectInput
                ? subjectInput.value.trim()
                : "";

            const message = messageInput
                ? messageInput.value.trim()
                : "";
            if (!fullName || !emailAddress || !subject || !message) {
                showFormNotice(
                    "Please fill in all fields before preparing your enquiry.",
                    "error"
                );

                return;
            }

            showFormNotice(
                "Your details are valid, but this form is not connected to an email service yet. Your enquiry has NOT been sent. Please contact the company directly.",
                "error"
            );
        });
    }

    const backToTopLinks = document.querySelectorAll(
        'a[href="#top"], a[href="#home"]'
    );

    backToTopLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            closeMenu();
        });
    });
    closeMenu();

    console.log("ACTION AND VISION LTD website JavaScript loaded successfully.");
});
