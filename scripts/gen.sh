#!/bin/bash

# Configuration
OUT_DIR="locations"
mkdir -p "$OUT_DIR/lt" "$OUT_DIR/en"

# LT Data
CITIES_LT=("Kaune|kaune" "Klaipėdoje|klaipedoje" "Šiauliuose|siauliuose" "Panevėžyje|panevezyje" "Alytuje|alytuje")
SERVICES_LT=("Svetainių kūrimas|svetainiu-kurimas|Profesionalus svetainių kūrimas, pritaikytas jūsų verslo augimui" \
             "SEO optimizavimas|seo-optimizavimas|Aukščiausios kokybės SEO paslaugos, kad jūsų verslas būtų matomas" \
             "DI automatizacija|di-automatizacija|Dirbtinio intelekto sprendimai ir verslo procesų automatizacija" \
             "Prekės ženklo kūrimas|prekes-zenklo-kurimas|Išskirtinis prekės ženklo kūrimas ir identiteto strategija")

# EN Data
CITIES_EN=("Kaunas|kaunas" "Klaipeda|klaipeda" "Siauliai|siauliai" "Panevezys|panevezys" "Alytus|alytus")
SERVICES_EN=("Website Design|website-design|Professional website design tailored for your business growth" \
             "SEO Optimization|seo-optimization|Top-tier SEO services to ensure your business stands out" \
             "AI Automation|ai-automation|Artificial Intelligence solutions and business process automation" \
             "Branding|branding|Exclusive branding and identity strategy tailored for you")

generate_html() {
  local lang="$1"
  local c_name="$2"
  local c_slug="$3"
  local s_name="$4"
  local s_slug="$5"
  local s_desc="$6"

  local path_to_root="../../"
  
  if [ "$lang" = "lt" ]; then
    local title="$s_name $c_name"
    local h1="$title"
    local desc="$s_desc $c_name"
    local cta="Gauti konsultaciją"
    local cta_start="Pradėti projektą"
    local ret="Grįžti į pagrindinį"
    local copy="Visos teisės saugomos."
    local main_text="Siekiame pristatyti aukščiausio lygio skaitmeninius sprendimus. Mūsų komanda garantuoja nepriekaištingą kokybę ir greitaveiką, kad jūsų verslas augtų internetinėje erdvėje. Atsipirkimas, dizaino meistriškumas ir techninis pranašumas yra mūsų vizitinė kortelė."
  else
    local title="$s_name in $c_name"
    local h1="$title"
    local desc="$s_desc in $c_name"
    local cta="Book a Consultation"
    local cta_start="Start a Project"
    local ret="Return to Home"
    local copy="All rights reserved."
    local main_text="We aim to deliver top-tier digital architecture. Our team guarantees flawless quality and speed to help your business scale locally and globally. Return on investment, design mastery, and technical superiority are our hallmarks."
  fi

  local file_path="$OUT_DIR/$lang/$s_slug-$c_slug.html"

  cat <<EOF > "$file_path"
<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="description" content="${h1} | Evsei Digital Agency"/>
<title>${title} | Evsei — Digital Architecture</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%2300251b'/><text x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='18' fill='%2300ff66'>E</text></svg>"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<link rel="stylesheet" href="${path_to_root}style.css">
<style>
  .seo-hero { padding: 12rem 2rem 6rem; text-align: center; position:relative; overflow:hidden; }
  .seo-hero-content { position:relative; z-index:2; max-width: 800px; margin: 0 auto; }
  .seo-h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-family: 'Manrope', sans-serif; font-weight: 800; margin-bottom: 1.5rem; line-height:1.1; color: var(--primary); }
  .seo-desc { font-size: clamp(1rem, 2vw, 1.25rem); color: var(--text-muted); margin-bottom: 2.5rem; line-height:1.6; }
</style>
</head>
<body style="background:var(--bg); color:var(--text); font-family:'Inter', sans-serif;">

<header style="position:fixed; top:0; width:100%; z-index:100; background:rgba(0,10,7,0.8); backdrop-filter:blur(10px); border-bottom:1px solid rgba(255,255,255,0.05);">
  <nav style="display:flex; justify-content:space-between; align-items:center; padding:1.25rem 2rem; max-width:1440px; margin:0 auto;">
    <a href="${path_to_root}index.html" style="color:var(--primary); font-family:'Manrope',sans-serif; font-weight:800; font-size:1.5rem; text-decoration:none;">Evsei</a>
    <a href="${path_to_root}index.html#contact" class="btn-primary" style="padding:0.6rem 1.2rem; font-size:0.9rem;">${cta}</a>
  </nav>
</header>

<main>
  <section class="seo-hero">
    <div class="seo-hero-content">
      <h1 class="seo-h1">${h1}</h1>
      <p class="seo-desc">${desc}</p>
      <a href="${path_to_root}index.html#contact" class="btn-primary">${cta_start}</a>
    </div>
  </section>
  <section style="padding:4rem 2rem; max-width:800px; margin:0 auto; text-align:center;">
    <p style="color:var(--text-muted); font-size:1.1rem; line-height:1.8;">
      ${main_text}
    </p>
    <a href="${path_to_root}index.html" style="display:inline-block; margin-top:2rem; color:var(--primary); text-decoration:none; font-weight:600;">&larr; ${ret}</a>
  </section>
</main>

<footer style="padding:4rem 2rem; border-top:1px solid rgba(255,255,255,0.05); text-align:center;">
  <div style="max-width:1440px; margin:0 auto;">
    <p style="color:var(--text-muted); font-size:0.9rem;">© 2026 Evsei. ${copy}</p>
  </div>
</footer>

</body>
</html>
EOF
}

# Generate LT
for c in "${CITIES_LT[@]}"; do
  c_name=$(echo "$c" | cut -d'|' -f1)
  c_slug=$(echo "$c" | cut -d'|' -f2)
  for s in "${SERVICES_LT[@]}"; do
    s_name=$(echo "$s" | cut -d'|' -f1)
    s_slug=$(echo "$s" | cut -d'|' -f2)
    s_desc=$(echo "$s" | cut -d'|' -f3)

    generate_html "lt" "$c_name" "$c_slug" "$s_name" "$s_slug" "$s_desc"
  done
done

# Generate EN
for c in "${CITIES_EN[@]}"; do
  c_name=$(echo "$c" | cut -d'|' -f1)
  c_slug=$(echo "$c" | cut -d'|' -f2)
  for s in "${SERVICES_EN[@]}"; do
    s_name=$(echo "$s" | cut -d'|' -f1)
    s_slug=$(echo "$s" | cut -d'|' -f2)
    s_desc=$(echo "$s" | cut -d'|' -f3)

    generate_html "en" "$c_name" "$c_slug" "$s_name" "$s_slug" "$s_desc"
  done
done

echo "Done generating location pages."
