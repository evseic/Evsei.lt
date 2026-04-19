const fs = require('fs');
const path = require('path');

const citiesLT = [
  { name: 'Kaune', slug: 'kaune' },
  { name: 'Klaipėdoje', slug: 'klaipedoje' },
  { name: 'Šiauliuose', slug: 'siauliuose' },
  { name: 'Panevėžyje', slug: 'panevezyje' },
  { name: 'Alytuje', slug: 'alytuje' }
];

const citiesEN = [
  { name: 'Kaunas', slug: 'kaunas' },
  { name: 'Klaipeda', slug: 'klaipeda' },
  { name: 'Siauliai', slug: 'siauliai' },
  { name: 'Panevezys', slug: 'panevezys' },
  { name: 'Alytus', slug: 'alytus' }
];

const servicesLT = [
  { name: 'Svetainių kūrimas', slug: 'svetainiu-kurimas', desc: 'Profesionalus svetainių kūrimas, pritaikytas jūsų verslo augimui' },
  { name: 'SEO optimizavimas', slug: 'seo-optimizavimas', desc: 'Aukščiausios kokybės SEO paslaugos, kad jūsų verslas būtų matomas' },
  { name: 'DI automatizacija', slug: 'di-automatizacija', desc: 'Dirbtinio intelekto sprendimai ir verslo procesų automatizacija' },
  { name: 'Prekės ženklo kūrimas', slug: 'prekes-zenklo-kurimas', desc: 'Išskirtinis prekės ženklo kūrimas ir identiteto strategija' }
];

const servicesEN = [
  { name: 'Website Design', slug: 'website-design', desc: 'Professional website design tailored for your business growth' },
  { name: 'SEO Optimization', slug: 'seo-optimization', desc: 'Top-tier SEO services to ensure your business stands out' },
  { name: 'AI Automation', slug: 'ai-automation', desc: 'Artificial Intelligence solutions and business process automation' },
  { name: 'Branding', slug: 'branding', desc: 'Exclusive branding and identity strategy tailored for you' }
];

const getTemplate = (lang, title, h1, text, relativePath) => `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="description" content="${h1} | Evsei Digital Agency"/>
<title>${title} | Evsei — Digital Architecture</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%2300251b'/><text x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='18' fill='%2300ff66'>E</text></svg>"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<link rel="stylesheet" href="${relativePath}style.css">
<style>
  .seo-hero { padding: 12rem 2rem 6rem; text-align: center; background: url('${relativePath}assets/images/mesh-bg.webp') center/cover; position:relative; overflow:hidden; }
  .seo-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at center, transparent 0%, var(--bg) 100%); z-index:1; }
  .seo-hero-content { position:relative; z-index:2; max-width: 800px; margin: 0 auto; }
  .seo-h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-family: 'Manrope', sans-serif; font-weight: 800; margin-bottom: 1.5rem; line-height:1.1; color: var(--primary); }
  .seo-desc { font-size: clamp(1rem, 2vw, 1.25rem); color: var(--text-muted); margin-bottom: 2.5rem; line-height:1.6; }
</style>
</head>
<body style="background:var(--bg); color:var(--text); font-family:'Inter', sans-serif;">

<header style="position:fixed; top:0; width:100%; z-index:100; background:rgba(0,10,7,0.8); backdrop-filter:blur(10px); border-bottom:1px solid rgba(255,255,255,0.05);">
  <nav style="display:flex; justify-content:space-between; align-items:center; padding:1.25rem 2rem; max-width:1440px; margin:0 auto;">
    <a href="${relativePath}index.html" style="color:var(--primary); font-family:'Manrope',sans-serif; font-weight:800; font-size:1.5rem; text-decoration:none;">Evsei</a>
    <a href="${relativePath}index.html#contact" class="btn-primary" style="padding:0.6rem 1.2rem; font-size:0.9rem;">${lang === 'lt' ? 'Gauti konsultaciją' : 'Book a Consultation'}</a>
  </nav>
</header>

<main>
  <section class="seo-hero">
    <div class="seo-hero-content">
      <h1 class="seo-h1">${h1}</h1>
      <p class="seo-desc">${text}</p>
      <a href="${relativePath}index.html#contact" class="btn-primary">${lang === 'lt' ? 'Pradėti projektą' : 'Start a Project'}</a>
    </div>
  </section>
  <section style="padding:4rem 2rem; max-width:800px; margin:0 auto; text-align:center;">
    <p style="color:var(--text-muted); font-size:1.1rem; line-height:1.8;">
      ${lang === 'lt' ? 
      `Siekiame pristatyti aukščiausio lygio skaitmeninius sprendimus. Mūsų komanda garantuoja nepriekaištingą kokybę ir greitaveiką, kad jūsų verslas augtų internetinėje erdvėje. Atsipirkimas, dizaino meistriškumas ir techninis pranašumas yra mūsų vizitinė kortelė.` : 
      `We aim to deliver top-tier digital architecture. Our team guarantees flawless quality and speed to help your business scale locally and globally. Return on investment, design mastery, and technical superiority are our hallmarks.`}
    </p>
    <a href="${relativePath}index.html" style="display:inline-block; margin-top:2rem; color:var(--primary); text-decoration:none; font-weight:600;">&larr; ${lang === 'lt' ? 'Grįžti į pagrindinį' : 'Return to Home'}</a>
  </section>
</main>

<footer style="padding:4rem 2rem; border-top:1px solid rgba(255,255,255,0.05); text-align:center;">
  <div style="max-width:1440px; margin:0 auto;">
    <p style="color:var(--text-muted); font-size:0.9rem;">© 2026 Evsei. ${lang === 'lt' ? 'Visos teisės saugomos.' : 'All rights reserved.'}</p>
  </div>
</footer>

</body>
</html>`;

const outDir = path.join(__dirname, '../locations');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
if (!fs.existsSync(path.join(outDir, 'lt'))) {
  fs.mkdirSync(path.join(outDir, 'lt'), { recursive: true });
}
if (!fs.existsSync(path.join(outDir, 'en'))) {
  fs.mkdirSync(path.join(outDir, 'en'), { recursive: true });
}

let count = 0;
// Generate LT pages
servicesLT.forEach(service => {
  citiesLT.forEach(city => {
    const title = \`\${service.name} \${city.name}\`;
    const fileName = \`\${service.slug}-\${city.slug}.html\`;
    const html = getTemplate('lt', title, title, \`\${service.desc} \${city.name}\`, '../../');
    fs.writeFileSync(path.join(outDir, 'lt', fileName), html);
    count++;
  });
});

// Generate EN pages
servicesEN.forEach(service => {
  citiesEN.forEach(city => {
    const title = \`\${service.name} in \${city.name}\`;
    const fileName = \`\${service.slug}-\${city.slug}.html\`;
    const html = getTemplate('en', title, title, \`\${service.desc} in \${city.name}\`, '../../');
    fs.writeFileSync(path.join(outDir, 'en', fileName), html);
    count++;
  });
});

console.log(\`Successfully generated \${count} SEO landing pages.\`);
