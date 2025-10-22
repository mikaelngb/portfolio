
class PortfolioApp {
    constructor() {
        this.data = {
            personalInfo: null,
            skills: null,
            experience: null,
            education: null,
            projects: null,
            config: null,
        };
        this.loading = false;
        this.errors = [];

        this.init();
    }

    async init() {
        try {
            this.loading = true;
            await this.loadAllData();
            this.renderContent();
            this.setupEventListeners();
            this.setupPerformanceOptimizations();
        } catch (error) {
            this.handleError("Failed to initialize portfolio", error);
        } finally {
            this.loading = false;
        }
    }

    async loadAllData() {
        const dataFiles = [
            { key: "personalInfo", file: "data/personal-info.json" },
            { key: "skills", file: "data/skills.json" },
            { key: "experience", file: "data/experience.json" },
            { key: "education", file: "data/education.json" },
            { key: "projects", file: "data/projects.json" },
            { key: "config", file: "data/config.json" },
        ];

        const loadPromises = dataFiles.map(({ key, file }) =>
            this.loadData(file)
                .then((data) => {
                    this.data[key] = data;
                })
                .catch((error) => {
                    this.errors.push({ file, error: error.message });
                })
        );

        await Promise.all(loadPromises);
    }

    async loadData(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}: ${response.statusText}`
                );
            }
            const data = await response.json();
            return this.validateData(data, filePath);
        } catch (error) {
            throw new Error(`Failed to load ${filePath}: ${error.message}`);
        }
    }

    validateData(data, filePath) {
          if (!data || typeof data !== "object") {
            throw new Error("Invalid data format");
        }

          switch (filePath) {
            case "data/personal-info.json":
                this.validatePersonalInfo(data);
                break;
            case "data/skills.json":
                this.validateSkills(data);
                break;
            case "data/experience.json":
                this.validateExperience(data);
                break;
            case "data/projects.json":
                this.validateProjects(data);
                break;
            case "data/config.json":
                this.validateConfig(data);
                break;
        }

        return data;
    }

    validatePersonalInfo(data) {
        const required = ["name", "title", "email"];
        required.forEach((field) => {
            if (!data[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        });
    }

    validateSkills(data) {
        if (!data.categories || !Array.isArray(data.categories)) {
            throw new Error("Skills must have categories array");
        }
    }

    validateExperience(data) {
        if (!data.entries || !Array.isArray(data.entries)) {
            throw new Error("Experience must have entries array");
        }
    }

    validateProjects(data) {
        if (!data.projects || !Array.isArray(data.projects)) {
            throw new Error("Projects must have projects array");
        }
    }

    validateConfig(data) {
        const required = ["site", "navigation", "contact"];
        required.forEach((field) => {
            if (!data[field]) {
                throw new Error(`Missing required config field: ${field}`);
            }
        });
    }

    renderContent() {
        this.renderPersonalInfo();
        this.renderSkills();
        this.renderExperience();
        this.renderProjects();
        this.renderContact();
        this.updatePageTitle();
        this.updateMetaTags();
    }

    renderPersonalInfo() {
        if (!this.data.personalInfo) return;

            const heroTitle = document.querySelector(".hero-name");
        const heroDescription = document.querySelector(".hero-description");

        if (heroTitle) heroTitle.textContent = this.data.personalInfo.name;
        if (heroDescription) {
            heroDescription.textContent =
                this.data.personalInfo.summary ||
                "Java Backend Engineer with experience in microservices optimization and frontend development using Next.js.";
        }
    }

    renderSkills() {
        if (!this.data.skills) return;

        const container = document.getElementById("skills-container");
        if (!container) return;

        const skillsHTML = this.data.skills.categories
            .map(
                (category) => `
      <div class="skills-category">
        <h3 class="skills-category-title">${category.name}</h3>
        <div class="skills-list">
          ${category.skills
              .map(
                  (skill, index) => `
            <div class="skill-item" style="animation-delay: ${index * 100}ms">
              <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.level}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress animated" data-level="${
                    skill.level
                }"></div>
              </div>
            </div>
          `
              )
              .join("")}
        </div>
      </div>
    `
            )
            .join("");

        container.innerHTML = skillsHTML;

          this.animateSkillBars();
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll(".skill-progress.animated");

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const bar = entry.target;
                            const level = bar.dataset.level;
                            setTimeout(() => {
                                bar.style.width = level + "%";
                            }, 200);
                            observer.unobserve(bar);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            skillBars.forEach((bar) => {
                // Set initial width to 0
                bar.style.width = "0%";
                observer.observe(bar);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            skillBars.forEach((bar) => {
                const level = bar.dataset.level;
                bar.style.width = level + "%";
            });
        }
    }

    renderExperience() {
        if (!this.data.experience) {
            return;
        }

        const container = document.getElementById("experience-container");
        if (!container) {
            return;
        }

        const experienceHTML = this.data.experience.entries
            .map(
                (exp, index) => `
      <div class="timeline-item ${index === 0 ? "timeline-item-current" : ""}">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-date">
            ${this.formatDate(exp.startDate)} - ${
                    exp.endDate ? this.formatDate(exp.endDate) : "Present"
                }
          </div>
          <h3 class="timeline-title">${exp.position}</h3>
          <div class="timeline-company">${exp.company}</div>
          <div class="timeline-location">${exp.location}</div>
          <p class="timeline-description">${exp.description}</p>

          ${
              exp.responsibilities && exp.responsibilities.length > 0
                  ? `
            <div class="timeline-responsibilities">
              <strong>Key Responsibilities:</strong>
              <ul>
                ${exp.responsibilities
                    .map((resp) => `<li>${resp}</li>`)
                    .join("")}
              </ul>
            </div>
          `
                  : ""
          }

          ${
              exp.achievements && exp.achievements.length > 0
                  ? `
            <div class="timeline-achievements">
              <strong>Key Achievements:</strong>
              <ul>
                ${exp.achievements
                    .map((achievement) => `<li>${achievement}</li>`)
                    .join("")}
              </ul>
            </div>
          `
                  : ""
          }

          ${
              exp.technologies && exp.technologies.length > 0
                  ? `
            <div class="timeline-technologies">
              ${exp.technologies
                  .map(
                      (tech) => `
                <span class="technology-tag">${tech}</span>
              `
                  )
                  .join("")}
            </div>
          `
                  : ""
          }
        </div>
      </div>
    `
            )
            .join("");

        container.innerHTML = experienceHTML;
    }

    renderProjects() {
        if (!this.data.projects) return;

        const container = document.getElementById("projects-container");
        if (!container) return;

        const projectsHTML = this.data.projects.projects
            .map(
                (project) => `
      <div class="project-card ${
          project.featured ? "project-card-featured" : ""
      }">
        ${project.featured ? '<div class="featured-badge">Featured</div>' : ""}

        <div class="project-card-header">
          <div class="project-image">
            ${
                project.imageUrl
                    ? `<img src="${project.imageUrl}" alt="${project.title}" loading="lazy">`
                    : `<div class="project-placeholder">🚀 Project Preview</div>`
            }
          </div>
        </div>

        <h3 class="project-title">${project.title}</h3>

        <p class="project-description">${project.briefDescription}</p>

        ${
            project.detailedDescription
                ? `
          <p class="project-description">${project.detailedDescription}</p>
        `
                : ""
        }

        ${
            project.technologies && project.technologies.length > 0
                ? `
          <div class="project-technologies">
            ${project.technologies
                .map((tech) => `<span class="project-tech-tag">${tech}</span>`)
                .join("")}
          </div>
        `
                : ""
        }

        <div class="project-links">
          ${
              project.liveUrl
                  ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer"
               class="project-link" aria-label="View live demo of ${project.title}">
              <svg class="project-link-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Live Demo
            </a>`
                  : ""
          }

          ${
              project.githubUrl
                  ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer"
               class="project-link secondary" aria-label="View source code for ${project.title}">
              <svg class="project-link-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Source Code
            </a>`
                  : ""
          }
        </div>
      </div>
    `
            )
            .join("");

        container.innerHTML = projectsHTML;
    }

    renderContact() {
        if (!this.data.config) return;

        const contactDetails = document.getElementById("contact-details");
        const socialLinks = document.getElementById("social-links");

        if (!contactDetails || !socialLinks) return;

        const config = this.data.config.contact;

        // Render contact details
        const contactDetailsHTML = `
      <div class="contact-item">
        <strong>Email:</strong>
        <a href="mailto:${config.email}" class="contact-link">${
            config.email
        }</a>
      </div>
      ${
          config.showPhone
              ? `
        <div class="contact-item">
          <strong>Whatsapp:</strong>
          <a href="tel:${config.phone.replace(
              /[\s\(\)]/g,
              ""
          )}" class="contact-link">${config.phone}</a>
        </div>
      `
              : ""
      }
      <div class="contact-item">
        <strong>Location:</strong> Jakarta, Indonesia
      </div>
          `;

        contactDetails.innerHTML = contactDetailsHTML;

        // Render social links
        const socialLinksHTML = config.socialLinks
            .map((social) => {
                const iconSvg = this.getSocialIcon(social.platform);
                return `
        <a href="${social.url}"
           class="social-link-large"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="${social.platform} profile">
          ${iconSvg}
          ${social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
        </a>
      `;
            })
            .join("");

        socialLinks.innerHTML = socialLinksHTML;
    }

    getSocialIcon(platform) {
        const icons = {
            github: `<svg class="social-icon-large" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>`,
            linkedin: `<svg class="social-icon-large" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>`,
            website: `<svg class="social-icon-large" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>`,
        };

        return icons[platform.toLowerCase()] || icons.website;
    }

    updatePageTitle() {
        if (this.data.config && this.data.config.site) {
            document.title = this.data.config.site.title;
        } else if (this.data.personalInfo) {
            document.title = `${this.data.personalInfo.name} - ${this.data.personalInfo.title}`;
        }
    }

    updateMetaTags() {
        if (!this.data.config) return;

        const { site } = this.data.config;

        // Update description
        const descriptionMeta = document.querySelector(
            'meta[name="description"]'
        );
        if (descriptionMeta && site.description) {
            descriptionMeta.content = site.description;
        }

        // Update keywords
        const keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (keywordsMeta && site.seo && site.seo.keywords) {
            keywordsMeta.content = site.seo.keywords.join(", ");
        }

        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.content = site.title;

        const ogDescription = document.querySelector(
            'meta[property="og:description"]'
        );
        if (ogDescription && site.description) {
            ogDescription.content = site.description;
        }

        // Update Twitter Card tags
        const twitterTitle = document.querySelector(
            'meta[name="twitter:title"]'
        );
        if (twitterTitle) twitterTitle.content = site.title;

        const twitterDescription = document.querySelector(
            'meta[name="twitter:description"]'
        );
        if (twitterDescription && site.description) {
            twitterDescription.content = site.description;
        }
    }

    setupEventListeners() {
              this.setupIntersectionObservers();

            this.setupImageErrorHandling();
    }

    setupIntersectionObservers() {
        const options = {
            root: null,
            rootMargin: "0px 0px -10% 0px",
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-in");
                }
            });
        }, options);

            document
            .querySelectorAll(".timeline-item, .project-card, .skills-category")
            .forEach((el) => {
                observer.observe(el);
            });
    }

    setupImageErrorHandling() {
        document.addEventListener(
            "error",
            (e) => {
                if (e.target.tagName === "IMG") {
                    e.target.style.display = "none";
                    const placeholder = e.target.nextElementSibling;
                    if (
                        placeholder &&
                        placeholder.classList.contains("project-placeholder")
                    ) {
                        placeholder.style.display = "block";
                    }
                }
            },
            true
        );
    }

    setupPerformanceOptimizations() {
            this.setupLazyLoading();

              this.optimizeFontLoading();

              this.setupServiceWorker();

                this.monitorMobilePerformance();

                this.validateContent();
    }

    async validateContent() {
        try {
              if (!window.PortfolioValidator) {
                await this.loadScript("js/validator.js");
            }

            const validator = new PortfolioValidator();
            const results = await validator.validateAllFiles();

                const totalFiles = Object.keys(results).length;
            const validFiles = Object.values(results).filter(
                (r) => r.valid
            ).length;

            if (validFiles < totalFiles) {
                this.showNotification(
                    "Some content validation errors detected",
                    "warning"
                );
            }
        } catch (error) {
            // Validation failed silently
        }
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    setupLazyLoading() {
        if ("IntersectionObserver" in window) {
            const imageObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const img = entry.target;

                                                  if (img.dataset.src) {
                                                if (
                                    window.innerWidth <= 768 &&
                                    img.dataset.mobileSrc
                                ) {
                                    img.src = img.dataset.mobileSrc;
                                } else {
                                    img.src = img.dataset.src;
                                }

                                                      if (img.dataset.srcset) {
                                    img.srcset = img.dataset.srcset;
                                }

                                                      if (img.dataset.sizes) {
                                    img.sizes = img.dataset.sizes;
                                }

                                                        img.style.opacity = "0";
                                img.style.transition =
                                    "opacity 0.3s ease-in-out";

                                img.addEventListener("load", () => {
                                    img.style.opacity = "1";
                                });

                                img.classList.remove("lazy");
                                imageObserver.unobserve(img);
                            }
                        }
                    });
                },
                {
                    rootMargin: "50px 0px", // Start loading 50px before entering viewport
                    threshold: 0.1,
                }
            );

            // Observe all images with data-src
            document.querySelectorAll("img[data-src]").forEach((img) => {
                // Set mobile-optimized attributes
                if (window.innerWidth <= 768) {
                    img.loading = "lazy";
                    img.decoding = "async";
                    img.sizes =
                        img.dataset.sizes || "(max-width: 768px) 100vw, 50vw";
                } else {
                    img.loading = "lazy";
                    img.decoding = "async";
                    img.sizes =
                        img.dataset.sizes || "(max-width: 1024px) 50vw, 33vw";
                }

                imageObserver.observe(img);
            });

              const projectCards = document.querySelectorAll(".project-card");
            projectCards.forEach((card) => {
                imageObserver.observe(card);
            });
        }
    }

    optimizeFontLoading() {
            const style = document.createElement("style");
        style.textContent = `
      @font-face {
        font-family: 'JetBrains Mono';
        font-display: swap;
      }
      @font-face {
        font-family: 'Inter';
        font-display: swap;
      }
    `;
        document.head.appendChild(style);
    }

    setupServiceWorker() {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker
                    .register("/sw.js")
                    .catch((registrationError) => {
                        // SW registration failed silently
                    });
            });
        }
    }

      monitorMobilePerformance() {
                if ("connection" in navigator) {
            const connection = navigator.connection;

                    if (
                connection.effectiveType === "slow-2g" ||
                connection.effectiveType === "2g"
            ) {
                this.enableDataSaverMode();
            }
        }
    }

    enableDataSaverMode() {
              document.querySelectorAll("img[data-mobile-src]").forEach((img) => {
            img.dataset.src = img.dataset.mobileSrc;
        });

              if (
            "matchMedia" in window &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            document.body.style.setProperty("--transition-fast", "0s");
            document.body.style.setProperty("--transition-normal", "0s");
            document.body.style.setProperty("--transition-slow", "0s");
        }
    }

    showNotification(message, type = "success") {
        const notification = document.createElement("div");
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${
          type === "success"
              ? "var(--accent-primary)"
              : "var(--accent-secondary)"
      };
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      z-index: var(--z-tooltip);
      transform: translateX(100%);
      transition: transform var(--transition-normal);
    `;

        document.body.appendChild(notification);

                setTimeout(() => {
            notification.style.transform = "translateX(0)";
        }, 100);

              setTimeout(() => {
            notification.style.transform = "translateX(100%)";
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    handleError(message, error) {
        this.showNotification(
            "An error occurred while loading content. Please refresh the page.",
            "error"
        );
    }

    formatDate(dateString) {
        if (!dateString || dateString === "present") return "Present";

        try {
                      if (dateString.length === 7 && dateString.includes("-")) {
                const [year, month] = dateString.split("-");
                const monthNames = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ];
                return `${monthNames[parseInt(month) - 1]} ${year}`;
            }

                        if (/^\d{4}$/.test(dateString)) {
                return dateString;
            }

                    const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return dateString;
            }

            const monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];
            return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        } catch (error) {
            return dateString;
        }
    }

        getData(key) {
        return this.data[key];
    }

      isLoading() {
        return this.loading;
    }

        getErrors() {
        return this.errors;
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        window.portfolioApp = new PortfolioApp();
    });
} else {
    window.portfolioApp = new PortfolioApp();
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = PortfolioApp;
}
