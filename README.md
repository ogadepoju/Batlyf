# 🦇 BatLyf — Interactive Bat-Learning Prototype

A theme-driven interactive prototype for understanding and appreciating bats, designed as the **general public interface** of a human-bat coexistence platform.

Built using **Design Science Research (DSR)** methodology, this prototype translates empirically validated stakeholder themes into interactive educational features derived from:

- **Systematic Literature Review** of 60 publications on human-wildlife coexistence technologies
- **Expert Interviews** with 4 bat ecologists at the University of Cincinnati
- **Co-Design Workshops** with 40 participants (park staff and community members)

---

## ✨ Features

### Cinematic Landing Experience
Full-viewport night sky with animated stars, moon, flying bats with wing-flap SVG animations, firefly particles, and a treeline silhouette — setting the nocturnal tone before users enter the app.

### Theme-Mapped Interactive Modules

| Theme (Source) | Feature | Description |
|---|---|---|
| **Learning Facts** (6/7 workshops) | Guided Knowledge Modules | 8 categorized bat facts with topic filters |
| **Dispelling Myths** (5/7 workshops + interviews) | Myth vs Fact Challenge | 8-question forced-choice game with scoring |
| **Appreciation** (4/7 workshops) | Meet the Bats | Individual bat profiles with personalities |
| **Ecological Education** (5/7 workshops) | Ecosystem Explorer | Interactive node graph of ecological connections |
| **Sticky Information** (2/7 workshops) | Quick Learn Cards | Flip-card micro-learning |
| **Entertainment** (6/7 workshops + interviews) | Bat Media & VR | Live feed, 360° bat cave, echolocation simulator |
| **Accessibility** (7/7 workshops) | Responsive Design | Mobile hamburger menu, WCAG-conscious |
| **Community Interaction** (4/7 workshops) | Community Stories | Read and submit bat encounters |
| **Public Understanding** (interviews) | Safety Guide | Biologist-verified coexistence tips |
| **Gamification** (co-design) | Badge System | 6 earnable badges tracking exploration |

### Navigation
- **Desktop**: Categorized dropdown menus (Home, Learn, Explore, Connect)
- **Mobile**: Hamburger menu with grouped sections

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- npm or yarn

### Setup

```bash
# Create a new Vite + React project
npm create vite@latest batlyf -- --template react
cd batlyf

# Install dependencies
npm install
```

### Add the Prototype

1. Copy the contents of `batlyf-prototype.jsx` into `src/App.jsx`
2. Update `src/main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

3. Delete `src/App.css` and `src/index.css` (all styles are inline)
4. Remove any CSS import lines from `main.jsx`

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## 🌐 Deployment (Netlify via GitHub)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - BatLyf prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/batlyf.git
git push -u origin main
```

### 2. Deploy on Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project** → **GitHub**
3. Select the `batlyf` repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy site**

Every push to `main` triggers an automatic redeploy.

---

## 🏗️ Tech Stack

- **React 18** — Component architecture
- **Vite** — Build tooling
- **Pure CSS-in-JS** — All styles inline (no external dependencies)
- **CSS Animations** — Entrance animations, hover effects, flying bats, sonar pulses
- **SVG** — Custom bat silhouettes with wing-flap animations

No external UI libraries, CSS frameworks, or animation packages required.

---

## 📁 Project Structure

```
batlyf/
├── src/
│   ├── App.jsx          # Full prototype (single-file component)
│   └── main.jsx         # React entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔬 Research Context

This prototype is part of a Design Science Research study evaluating how stakeholder-derived themes can be operationalized into interactive features for a bat-learning system.

### Research Questions
1. How can stakeholder-derived themes be systematically translated into traceable interactive features?
2. How do users comprehend, navigate, and engage with theme-derived features during think-aloud sessions?
3. What design implications emerge for future wildlife-focused educational technology systems?

### System Requirements Addressed

| ID | Requirement | Implementation |
|---|---|---|
| FR1 | Detect and log bat presence | Simulated live feed with sensor data overlay |
| FR2 | Real-time bat activity dashboard | Dashboard with population metrics |
| FR3 | Bite-sized bat facts | Guided Knowledge Modules |
| FR4 | Interactive bat profiles | Meet the Bats section |
| FR5 | AR view of bat flight paths | 360° VR bat cave experience |
| FR6 | Backend CMS for park staff | Content structured for CMS integration |
| NFR1 | Responsive across devices | Mobile hamburger menu + responsive grid |
| NFR2 | WCAG accessibility | High contrast, keyboard navigation |
| USR2 | Educational games | Myth vs Fact challenge + badges |
| USR3 | Myth-debunking prompts | Forced-choice myth/fact with corrections |
| USR5 | Community bat encounters | Story submission feature |

---

## 📄 License

All Rights Reserved © 2025 BatLyf
