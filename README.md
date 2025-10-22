# Mikael's Professional Portfolio

A modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript, featuring a Terminal Modern design aesthetic optimized for recruiters and hiring managers.

## 🚀 Features

- **Terminal Modern Design**: Dark theme with Electric Blue accents and JetBrains Mono typography
- **Mobile Responsive**: Optimized for all devices (375px to 1920px+)
- **WCAG 2.1 AA Compliant**: Fully accessible with keyboard navigation
- **Lightning Fast**: 3-second load time target on mobile networks
- **SEO Optimized**: Structured data and meta tags for search engines
- **Easy Content Management**: JSON-based content updates
- **Performance Monitored**: Core Web Vitals tracking

## 📁 Project Structure

```
portfolio/
├── index.html                 # Main HTML file
├── css/
│   ├── main.css              # Core styles and variables
│   ├── responsive.css        # Mobile-first responsive styles
│   └── accessibility.css     # WCAG 2.1 AA compliance
├── js/
│   ├── main.js               # Core application logic
│   └── navigation.js         # Navigation and interactions
├── data/
│   ├── config.json           # Site configuration and contact info
│   ├── personal-info.json    # Personal information
│   ├── skills.json           # Skills and technologies
│   ├── experience.json       # Work experience
│   ├── projects.json         # Project portfolio
│   └── languages.json        # Language skills
├── assets/
│   ├── files/                # Resume and documents
│   └── images/               # Project images
├── docs/
│   └── maintenance-guide.md   # This file
└── .github/
    └── workflows/           # GitHub Actions
```

## 🛠️ Content Management

### Updating Personal Information

Edit `data/personal-info.json`:

```json
{
  "name": "Mikael",
  "title": "Java Backend Engineer",
  "summary": "Your professional summary",
  "email": "your-email@example.com",
  "location": "City, Country",
  "socialLinks": [
    {
      "platform": "github",
      "url": "https://github.com/yourusername",
      "username": "yourusername"
    }
  ]
}
```

### Adding New Experience

Edit `data/experience.json` and add a new entry:

```json
{
  "entries": [
    // ... existing entries ...
    {
      "id": "new-company",
      "company": "Company Name",
      "position": "Your Position",
      "location": "City, Country",
      "startDate": "2024-01",
      "endDate": "present",
      "current": true,
      "description": "Brief description of your role",
      "responsibilities": [
        "Key responsibility 1",
        "Key responsibility 2"
      ],
      "achievements": [
        "Notable achievement 1",
        "Notable achievement 2"
      ],
      "technologies": [
        "Technology 1",
        "Technology 2"
      ]
    }
  ]
}
```

### Adding New Projects

Edit `data/projects.json`:

```json
{
  "projects": [
    // ... existing projects ...
    {
      "id": "project-id",
      "title": "Project Title",
      "briefDescription": "Brief one-line description",
      "detailedDescription": "Detailed description of the project",
      "technologies": ["Tech1", "Tech2", "Tech3"],
      "liveUrl": "https://demo.example.com",
      "githubUrl": "https://github.com/user/repo",
      "imageUrl": "/assets/projects/project-screenshot.png",
      "featured": true,
      "completionDate": "2024-01"
    }
  ]
}
```

### Updating Skills

Edit `data/skills.json`:

```json
{
  "categories": [
    {
      "name": "Programming Languages",
      "skills": [
        { "name": "Java", "level": 95 },
        { "name": "JavaScript", "level": 85 }
      ]
    },
    {
      "name": "Frameworks",
      "skills": [
        { "name": "Spring Boot", "level": 90 },
        { "name": "Next.js", "level": 80 }
      ]
    }
  ]
}
```

### Updating Contact Information

Edit `data/config.json`:

```json
{
  "contact": {
    "email": "your-email@example.com",
    "phone": "+1234567890",
    "showPhone": true,
    "socialLinks": [
      {
        "platform": "github",
        "url": "https://github.com/yourusername",
        "username": "yourusername"
      },
      {
        "platform": "linkedin",
        "url": "https://linkedin.com/in/your-profile",
        "username": "your-profile"
      }
    ]
  }
}
```

## 🎨 Customization

### Changing Theme Colors

Edit the CSS custom properties in `css/main.css`:

```css
:root {
  --primary: #00AEEF;        /* Change this for different accent color */
  --accent-secondary: #58a6ff;
  --background: #0d1117;
  --surface: #161b22;
  --border: #30363d;
  --text-primary: #c9d1d9;
  --text-secondary: #8b949e;
}
```

### Modifying Typography

The project uses JetBrains Mono for a developer aesthetic. To change fonts:

1. Update font imports in `index.html`
2. Update `--font-mono` and `--font-sans` variables in `css/main.css`

## 📱 Responsive Breakpoints

- **375px+**: Extra small devices
- **480px+**: Small devices
- **768px+**: Tablet devices
- **1024px+**: Desktop devices
- **1280px+**: Large screens
- **1536px+**: Extra large screens
- **1920px+**: Ultra-wide screens

## 🔧 Development

### Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. No build process required - it's a static site!

### File Watching (Optional)

For development, you can use a simple file watcher:

```bash
# Install live-server globally
npm install -g live-server

# Run local server
live-server
```

## 📊 Performance Monitoring

The portfolio includes built-in performance monitoring that tracks:

- **Core Web Vitals** (LCP, FID, CLS)
- **Page load metrics**
- **User interactions**
- **Download and link clicks**
- **Resource loading times**

View performance data in browser console or inspect `localStorage`.

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliant**
- **Keyboard Navigation**: Full keyboard support with Tab, Arrow keys, and Escape
- **Screen Reader Support**: ARIA labels, landmarks, and announcements
- **High Contrast Mode**: Automatic adaptation for high contrast preferences
- **Reduced Motion**: Respects user's motion preferences
- **Focus Indicators**: Clear visual focus indicators

## 🌐 SEO Optimization

- **Structured Data**: JSON-LD schema markup for search engines
- **Meta Tags**: Comprehensive meta tag implementation
- **Canonical URLs**: Prevents duplicate content issues
- **Open Graph**: Social media sharing optimization
- **Semantic HTML**: Proper HTML5 semantic structure

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Android Chrome)

## 🚀 Deployment

### GitHub Pages

1. Push to `main` branch
2. Enable GitHub Pages in repository settings
3. Select source as `main` branch
4. Site will be automatically deployed

### Manual Deployment

Simply upload the entire directory to any static hosting service.

## 🔍 Analytics

Basic analytics are stored locally in `localStorage`. To integrate with external analytics:

1. Add your analytics tracking code to `index.html`
2. Update the tracking calls in `js/main.js`

## 🐛 Troubleshooting

### Common Issues

**Content not updating**: Ensure JSON files are valid and properly formatted
**Images not loading**: Check file paths and ensure images are in the correct directory
**Resume download not working**: Verify the resume file exists at `/assets/files/resume.pdf`
**Mobile layout issues**: Test on actual mobile devices - browser emulation may not be accurate

### Debug Mode

Enable debug mode by adding `?debug=true` to the URL to see detailed performance metrics.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support regarding this portfolio template, please open an issue in the repository.

---

**Last Updated**: 2024
**Version**: 1.0.0