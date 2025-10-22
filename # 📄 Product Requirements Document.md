# 📄 Product Requirements Document (PRD)

## 1. Elevator Pitch

Build a **modern, dynamic, and professional single-page portfolio** deployed on GitHub Pages, designed to quickly and clearly present the Product Owner's professional assets. The primary goal is to provide a single, accessible, and catchy resource that centralizes their resume, experience, skills, and projects, enabling them to stand out and become a **top-tier candidate** during the job application process. The structure must be simple enough to allow for easy, manual content updates without requiring a full site redesign.

## 2. Who is this app for

| Category           | Description                                                                                                  |
| :----------------- | :----------------------------------------------------------------------------------------------------------- |
| **Primary User**   | **Hiring Managers, Company HR, and Recruiters** seeking qualified candidates.                                |
| **Secondary User** | **Professional Network Contacts** (e.g., colleagues, industry peers) interested in the Product Owner's work. |
| **Product Owner**  | **The individual** who needs a professional, easily updatable platform to showcase their career information. |

## 3. Functional Requirements - What does it do

| ID        | Requirement                   | Description                                                                                                                                                                                                   |
| :-------- | :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **FR.01** | **Display Professional Info** | Must display all key personal and professional information (experience, skills, projects, contact info).                                                                                                      |
| **FR.02** | **Resume Management**         | Must display a preview of the latest resume and offer a direct, functional link to **download the full resume file** (e.g., PDF).                                                                             |
| **FR.03** | **Social & Contact Links**    | Must include easily accessible links to the **GitHub** and **LinkedIn** profiles.                                                                                                                             |
| **FR.04** | **Static Hosting**            | Must be hosted as a **static site on GitHub Pages** for reliability and cost-effectiveness.                                                                                                                   |
| **FR.05** | **Update Mechanism**          | The underlying code structure (e.g., HTML/JS/Markdown) must be clearly segregated to allow the Product Owner to **manually update content** (text, links, files) without breaking the existing design/layout. |
| **FR.06** | **Mobile Responsiveness**     | The page must display correctly and function well on all screen sizes, including **mobile phones** (iOS 26.0.1 on iPhone 11 and Android devices).                                                             |

## 4. User Stories - How will the user interact

| Priority   | As a...        | I want to...                                                    | So that I can...                                                   |
| :--------- | :------------- | :-------------------------------------------------------------- | :----------------------------------------------------------------- |
| **High**   | Recruiter      | See the candidate's professional summary and skills at a glance | Quickly assess if they meet the basic job requirements.            |
| **High**   | Recruiter      | Click on the **"Download Resume"** button                       | Get a clean, formatted PDF copy of the full resume for my records. |
| **Medium** | Hiring Manager | View a list of the candidate's **key projects**                 | Understand the scope and impact of their previous work.            |
| **Medium** | Peer           | Easily find the candidate's **LinkedIn profile**                | Connect and professionally engage with them.                       |
| **High**   | Product Owner  | **Update the Experience section** with a new role               | Keep the portfolio current without needing to hire a developer.    |

## 5. User Interface - How will the app look

| Feature             | Details and Guidelines                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Design Style**    | **Modern, Dynamic, and Professional.** A clean, single-page scrolling layout with clear section breaks and ample white space.                                                                                                                                                                                                                                                                                  |
| **Layout**          | **Single-Page Scrolling:** All information is contained on one page, accessible via an anchored navigation bar (e.g., Home, Experience, Projects, Contact).                                                                                                                                                                                                                                                    |
| **Visual Elements** | Use **high-contrast text** for readability (crucial for quick scanning). Implement clean, professional icons (e.g., for GitHub, LinkedIn, Resume Download). Minimal, subtle animations are acceptable for the "dynamic" feel.                                                                                                                                                                                  |
| **Key Sections**    | 1. **Header/Hero:** Name, Professional Title, Short Elevator Pitch. 2. **About Me/Contact:** Personal info, contact details. 3. **Skills:** Clear, visual representation of skills (e.g., list or simple chart). 4. **Experience:** Chronological list of roles. 5. **Projects:** Highlight 3-5 key projects with brief descriptions. 6. **Call to Action (CTA):** Prominent button for **"Download Resume"**. |
| **Responsiveness**  | **Mandatory.** The layout must fluidly adapt from the large screen of the Xiaomi Gaming Monitor G27i down to a mobile phone (iPhone 11).                                                                                                                                                                                                                                                                       |
