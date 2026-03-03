<div align="center">
  <img src="public/banner.png" alt="API Cascading Demo" width="800"/>

  <h1>🔗 API Cascading Demo</h1>
  <h3>Empirical Validation of Mirror API Theory</h3>

  <p>
    <strong>Published Research Platform</strong> |
    <strong>415+ Views</strong> |
    <strong>1 Citation</strong>
  </p>

  [![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge)](https://api-cascading-demo.vercel.app/)
  [![SSRN](https://img.shields.io/badge/SSRN-Published-blue?style=for-the-badge)](https://papers.ssrn.com/abstract=6055034)
  [![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
  [![Views](https://img.shields.io/badge/views-415+-orange?style=for-the-badge)](https://papers.ssrn.com/abstract=6055034)
  [![Build](https://img.shields.io/badge/build-passing-success?style=for-the-badge)](https://api-cascading-demo.vercel.app/)

</div>

---

## 🎯 Overview

Interactive research platform demonstrating empirical validation of the **Mirror API Theory** — analyzing how API middleware layers compound latency and create security vulnerabilities in distributed systems.

**Published Research:** [The Cascading Effects of Repackaged APIs](https://papers.ssrn.com/abstract=6055034)

> **⚠️ Note:** This platform demonstrates **391-8051% latency penalties**
> in real-world cascaded APIs. Results are empirically validated.

> **🎓 Research:** Based on published SSRN paper with academic citations

---

## ⚡ Key Findings

- **391-8051% latency penalties** measured in real-world cascaded APIs
- **70% failure rate** in heavily proxied endpoints
- **10-40x jitter amplification** across middleware layers
- Security **"auditability vacuum"** enabling malicious actor masking

---

## 🧪 Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🧪 API Testing Lab | Real-time latency measurement | ✅ Live |
| 📊 Visualizations | Interactive charts & graphs | ✅ Live |
| 📈 Statistical Analysis | Mean, jitter, success rates | ✅ Live |
| 💾 Data Export | CSV, PDF reports | ✅ Live |
| 📱 Responsive Design | Mobile & desktop | ✅ Live |

### 🧪 API Testing Lab
- Real-time latency measurement for direct vs cascaded endpoints
- Statistical analysis: mean, jitter (σ), min/max, success rates
- Interactive visualizations: line charts, bar comparisons, scatter plots
- Export functionality: CSV, PDF reports

### 📊 Interactive Demos
- **Latency Simulator**: Visualize cascading delay accumulation
- **Security Demo**: Understand the auditability vacuum
- **Economic Calculator**: Calculate cost of API repackaging
- **Chain Builder**: Explore different cascade configurations

### 📄 Research Integration
- Full methodology documentation
- Academic paper access
- Citation information
- Google Scholar integration

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/tejasprasad2008-afk/api-cascading-demo.git
cd api-cascading-demo

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

🔗 **Live Demo:** [https://api-cascading-demo.vercel.app/](https://api-cascading-demo.vercel.app/)

---

## 📊 Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)

</div>

- **Framework**: Vite + React 19
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Animations**: Framer Motion
- **UI Components**: Radix UI + Custom components
- **Deployment**: Vercel
- **Type Safety**: TypeScript 5

---

## 📸 Screenshots

<div align="center">
  <img src="public/screenshots/testing-lab.png" alt="Testing Lab" width="800"/>
  <p><em>API Testing Lab — Real-time latency analysis</em></p>
</div>

---

## 🔬 Research Context

This platform provides empirical validation for published research on API cascading effects:

**Paper Title:** The Cascading Effects of Repackaged APIs: Legal, Economic, and Technical Implications

**Abstract:** This study investigates how downstream services repackage upstream API access, creating cascading vulnerabilities across three vectors:
1. Compounding network latency (including stochastic jitter)
2. Mirror Effect of data distortion and policy dilution
3. Erosion of economic sustainability for foundational providers

**Proposed Solution:** Zero-Trust Recursive Signature (UIC) architecture

### Usage — Testing API Endpoints

1. Navigate to `/demos/api-testing-lab`
2. Enter Direct API URL (e.g., `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
3. Enter Cascaded URL (e.g., through AllOrigins proxy)
4. Click **"Run Test"**
5. View real-time results and export data

### Example API Pairs

**CoinGecko (Cryptocurrency Data):**
- Direct: `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
- Cascaded: `https://api.allorigins.win/get?url=https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`

**JSONPlaceholder (Test API):**
- Direct: `https://jsonplaceholder.typicode.com/posts/1`
- Cascaded: `https://api.allorigins.win/get?url=https://jsonplaceholder.typicode.com/posts/1`

---

## 📈 Research Impact

```
📄 Publication: SSRN Electronic Journal
👁️ Views: 415+
📥 Downloads: 20+
📚 Citations: 1
🗓️ Published: February 2026
🌐 Live Demo: api-cascading-demo.vercel.app
```

---

## 🗂️ Project Structure

```
api-cascading-demo/
├── src/
│   ├── app/
│   │   ├── components/      # Reusable UI components
│   │   ├── demos/           # Interactive demo pages
│   │   │   └── api-testing-lab/  # Main testing platform
│   │   ├── lib/             # Utilities and helpers
│   │   ├── pages/           # Route pages
│   │   └── App.tsx          # Root application component
│   ├── styles/              # Global styles
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── vercel.json              # Vercel deployment config
├── README.md
├── LICENSE
└── package.json
```

---

## 📝 Citation

```bibtex
@article{prasad2026cascading,
  title={The Cascading Effects of Repackaged APIs: Legal, Economic, and Technical Implications},
  author={Prasad, Tejas},
  journal={SSRN Electronic Journal},
  year={2026},
  url={https://papers.ssrn.com/abstract=6055034}
}
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

MIT License — See [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Tejas Prasad**
- Independent Researcher
- Age 17, Al Ain, UAE
- Email: tejasprasad2008@gmail.com

### Links

- 📄 **Research Paper**: [SSRN](https://papers.ssrn.com/abstract=6055034)
- 🎓 **Google Scholar**: [Profile](https://scholar.google.com/citations?user=NFpwdbUAAAAJ)
- 💻 **Live Demo**: [Vercel](https://api-cascading-demo.vercel.app/)
- 👤 **GitHub**: [@tejasprasad2008-afk](https://github.com/tejasprasad2008-afk)

---

<div align="center">

### ⭐ Star this repo if you find it useful!

Made with ❤️ by [Tejas Prasad](https://github.com/tejasprasad2008-afk)

[![GitHub](https://img.shields.io/badge/GitHub-tejasprasad2008--afk-181717?style=flat-square&logo=github)](https://github.com/tejasprasad2008-afk)
[![SSRN](https://img.shields.io/badge/SSRN-Author%20Profile-blue?style=flat-square)](https://ssrn.com/author=9883192)
[![Google Scholar](https://img.shields.io/badge/Scholar-Profile-4285F4?style=flat-square&logo=google-scholar)](https://scholar.google.com/citations?user=NFpwdbUAAAAJ)

</div>
