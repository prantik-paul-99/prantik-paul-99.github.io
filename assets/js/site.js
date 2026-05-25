document.addEventListener("DOMContentLoaded", () => {
    const currentPage = document.body.dataset.page;
    const header = document.querySelector(".site-header");
    const navLinks = document.querySelectorAll("[data-nav]");
    const navToggle = document.querySelector(".nav-toggle");

    navLinks.forEach((link) => {
        if (link.dataset.nav === currentPage) {
            link.classList.add("is-active");
        }

        link.addEventListener("click", () => {
            if (window.innerWidth <= 960 && header) {
                header.classList.remove("nav-open");
                navToggle?.setAttribute("aria-expanded", "false");
            }
        });
    });

    if (navToggle && header) {
        navToggle.addEventListener("click", () => {
            const isOpen = header.classList.toggle("nav-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    const revealNodes = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -5% 0px"
            }
        );

        revealNodes.forEach((node) => observer.observe(node));
    } else {
        revealNodes.forEach((node) => node.classList.add("is-visible"));
    }
});