# 📄 User Interface Description Document (UIDD) - Revised

**Project:** Professional Single-Page Portfolio

**Design Style:** Terminal Modern (Dark Mode, High-Contrast, Developer-Inspired)

---

## 🎨 Visual Design Elements & Color Scheme

| Element             | Description                                                                                                   |
| :------------------ | :------------------------------------------------------------------------------------------------------------ |
| **Primary Palette** | **Background:** Deep Charcoal / Off-Black (`#1A1A1D`). **Text:** High-contrast White/Light Grey (`#F5F5F5`).  |
| **Accent Color**    | **Electric Blue** (`#00AEEF`) - Used for CTAs, progress bars, section dividers, and hover effects/glows.      |
| **Visual Texture**  | Subtle, repeating **background grid pattern** or faint **matrix code lines** only in the Header/Hero section. |
| **Icons**           | Clean, single-weight line icons (e.g., from a lightweight icon library) for consistency.                      |

---

## 🛠️ Layout Structure

The layout is a **full-width, single-page scrolling format** where content is presented in distinct, full-screen modules or "cards."

| Section                   | Content & Function                                                                                                                  |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| **Header/Hero**           | Name, Professional Title, Short Elevator Pitch. Includes persistent **GitHub** and **LinkedIn** icons at the top corner.            |
| **Sticky Navigation Bar** | A thin bar that **fixes to the top** upon scroll, containing anchored links: `Home`, `Experience`, `Projects`, `Skills`, `Contact`. |
| **About Me/Contact**      | Personal info, contact details, and the primary **"Download Resume" CTA button**.                                                   |
| **Skills**                | Visual representation of skills, grouped by category (e.g., Languages, DevOps, Tools).                                              |
| **Experience**            | Chronological list of roles using a clean **vertical timeline component**.                                                          |
| **Projects**              | 3-5 key projects, each displayed in an interactive **card** element.                                                                |
| **Footer**                | Copyright, site build info, and an "Up to Top" button.                                                                              |

---

## ✨ Core Components & Interaction Patterns

### Core Components

-   **Download Resume CTA:** A large, high-contrast button using the **Electric Blue** accent color for maximum visibility.
-   **Social/Contact Icons:** Placed in the Header/Hero (persistent) and About Me/Contact section.
-   **Skills Visualization:** Presented as **progress bars or skill meters** within categories, utilizing the Electric Blue accent color.
-   **Project Cards:** Rectangular card elements framed by the accent color glow; displays title, tech stack (in small tags), and description.

### Interaction Patterns

-   **On-Scroll Navigation:** Smooth, vertical scrolling with the **sticky navigation bar** allowing quick jumps to anchored sections.
-   **Hover Effects:** Hovering over a **Project Card** causes it to lift slightly (**subtle 3D lift**) and the accent-color border to glow brighter.
-   **Mobile Menu:** The sticky navigation bar collapses into a **Hamburger Menu** icon (☰) on small screens, which reveals a full-screen menu when tapped.
-   **External Links:** All external links (Social, Project URLs, Resume Download) must open in a **new browser tab/window**.

---

## 🅰️ Typography

-   **Font Family** | **JetBrains Mono** will be used across the entire site (Headings and Body text). This monospaced font reinforces the "Terminal Modern" theme and provides high readability for technical content. |
-   **Hierarchy:** Clear hierarchy is mandatory. Large, bold headings (H1, H2) for section titles using **White/Light Grey**.
-   **Readability:** Generous line height and spacing to improve reading comfort on the dark theme.

---

## 📱 Mobile, Web App, Desktop Considerations

| Device           | Consideration                                                                                                                                                |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Desktop**      | **Full-Width Display.** Sections maximize space. Card elements are wide and well-spaced, optimized for high-resolution displays like the Xiaomi G27i.        |
| **Mobile Phone** | **Vertical Stacking.** All content switches to a single, stacked column. Text size and padding are optimized for easy reading on devices like the iPhone 11. |
| **Performance**  | **High Priority.** Lightweight design (optimized images, minimal complex animations) to ensure fast loading times on static GitHub Pages hosting.            |

---

## ♿ Accessibility

-   **Color Contrast:** All text must meet **WCAG AAA standards** for contrast ratio against the dark background.
-   **Keyboard Navigation:** All interactive elements must be fully operable using only the keyboard (`Tab` and `Enter` keys).
-   **ARIA Labels:** Use ARIA labels on all icons and interactive elements (e.g., Download Resume, social media) for screen reader context.
-   **Semantic HTML:** Use proper HTML tags (`<header>`, `<main>`, `<section>`, `<footer>`) to ensure clear document structure.
