// Shared look for the blog (index + articles). Colours and fonts are copied from the
// main site's CSS (site/index.html): cream page, deep teal accent, Fraunces serif headlines,
// Inter body text, rounded pill buttons. Brand is written "FortuneTech" exactly as in the main site logo.

export const CHECK_URL = "https://check.ftech.co.in";

export const FONT_LINKS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">`;

export const CSS = `:root{--bg:#FAF7F2;--surface:#FFFFFF;--sand:#F3ECE1;--ink:#15242C;--muted:#5E6E76;--line:#E7E0D5;--teal:#0F766E;--teal-dark:#0B5A54;--teal-soft:#E2F0EC;--coral:#E76F51;}
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--ink);line-height:1.65;-webkit-font-smoothing:antialiased;}
h1,h2,h3{font-family:'Fraunces',Georgia,serif;font-weight:600;letter-spacing:-0.01em;line-height:1.15;}
a{color:var(--teal);}
.wrap{max-width:1120px;margin:0 auto;padding:0 1.25rem;}
nav{position:sticky;top:0;z-index:50;background:rgba(250,247,242,0.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--line);}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:70px;gap:1rem;}
.logo{font-family:'Fraunces',serif;font-size:1.4rem;font-weight:700;color:var(--ink);text-decoration:none;}
.logo span{color:var(--teal);}
.links{display:flex;align-items:center;margin-left:auto;}
.links a{color:var(--muted);text-decoration:none;margin-left:1.3rem;font-size:0.92rem;font-weight:500;}
.links a:hover{color:var(--ink);}
.btn{display:inline-block;padding:13px 22px;border-radius:999px;font-weight:600;text-decoration:none;font-size:0.95rem;transition:transform .15s,background .15s;}
.btn:hover{transform:translateY(-1px);}
.btn.primary{background:var(--teal);color:#fff;}
.btn.primary:hover{background:var(--teal-dark);}
.btn.ghost{border:1.5px solid var(--ink);color:var(--ink);}
.btn.check{background:var(--teal-soft);color:var(--teal-dark);border:1.5px solid var(--teal);}
.btn.check:hover{background:#d3e9e3;}
.links .btn{margin-left:0.8rem;padding:9px 18px;font-size:0.88rem;}
.links a.btn.primary{color:#fff;}
.links a.btn.check{color:var(--teal-dark);}
.langsw{display:flex;gap:2px;margin-left:1.1rem;font-size:0.8rem;font-weight:600;flex:none;}
.langsw a,.langsw strong{padding:4px 8px;border-radius:8px;text-decoration:none;line-height:1.4;}
.langsw a{color:var(--muted);}
.langsw a:hover{color:var(--ink);background:var(--sand);}
.langsw strong{color:var(--teal);background:var(--teal-soft);}
/* blog index hero */
.hero{padding:4.5rem 1.25rem 3.8rem;text-align:center;background:radial-gradient(900px 420px at 85% 0%,var(--teal-soft),transparent 70%),radial-gradient(700px 360px at 0% 100%,#FBE5DC,transparent 70%);}
.hero h1{font-size:clamp(2.1rem,5vw,3.4rem);max-width:860px;margin:0 auto;}
.hero h1 em{font-style:italic;color:var(--teal);}
.hero p{font-size:1.12rem;color:var(--muted);max-width:640px;margin:1.2rem auto 0;}
.grid{max-width:1120px;margin:3rem auto;padding:0 1.25rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.3rem;}
.card{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:1.7rem;display:flex;flex-direction:column;transition:box-shadow .2s,transform .2s;}
.card:hover{box-shadow:0 14px 34px -18px rgba(21,36,44,.25);transform:translateY(-2px);}
.card-meta{display:flex;gap:1rem;align-items:center;margin-bottom:1rem;flex-wrap:wrap;}
.badge{background:var(--teal-soft);color:var(--teal);font-size:0.72rem;font-weight:700;padding:4px 12px;border-radius:999px;letter-spacing:0.04em;}
.date{color:var(--muted);font-size:0.82rem;}
.card h2{font-size:1.25rem;margin-bottom:0.7rem;line-height:1.3;}
.card h2 a{color:var(--ink);text-decoration:none;}
.card h2 a:hover{color:var(--teal);}
.card p{color:var(--muted);font-size:0.93rem;line-height:1.6;margin-bottom:1rem;flex:1;}
.card-footer{display:flex;justify-content:space-between;align-items:center;font-size:0.85rem;padding-top:1rem;border-top:1px dashed var(--line);}
.card-footer span{color:var(--muted);}
.card-footer a{color:var(--teal);text-decoration:none;font-weight:600;}
/* article pages */
.hero-inner{max-width:800px;margin:0 auto;text-align:left;padding:0 1.25rem;}
.hero:has(.hero-inner){text-align:left;padding:3.8rem 0 3rem;}
.category-badge{display:inline-block;background:var(--teal-soft);color:var(--teal);font-size:0.75rem;font-weight:700;padding:5px 14px;border-radius:999px;margin-bottom:1.1rem;letter-spacing:0.04em;border:1px solid var(--line);}
.hero-inner h1{font-size:clamp(1.9rem,4.2vw,2.6rem);line-height:1.2;margin-bottom:1rem;}
.meta{color:var(--muted);font-size:0.9rem;display:flex;gap:1.5rem;}
.content-wrap{max-width:800px;margin:3rem auto;padding:0 1.25rem;}
.content-wrap h2{font-size:1.55rem;margin:2.2rem 0 1rem;}
.content-wrap h3{font-size:1.2rem;margin:1.6rem 0 0.7rem;}
.content-wrap p{color:#2A3B43;margin-bottom:1.2rem;}
.content-wrap ul,.content-wrap ol{padding-left:1.5rem;margin-bottom:1.2rem;}
.content-wrap li{color:#2A3B43;margin-bottom:0.5rem;}
.content-wrap strong{color:var(--ink);}
.cta-box{background:var(--surface);border:1px solid var(--line);border-radius:20px;padding:2.2rem;margin:3rem 0;text-align:center;}
.cta-box h3{font-size:1.4rem;margin:0 0 0.8rem;}
.cta-box p{color:var(--muted);margin-bottom:1.5rem;}
.cta-btn{display:inline-block;background:var(--teal);color:#fff;padding:13px 26px;border-radius:999px;text-decoration:none;font-weight:600;transition:background .15s,transform .15s;}
.cta-btn:hover{background:var(--teal-dark);transform:translateY(-1px);}
footer{border-top:1px solid var(--line);padding:2.2rem 0;color:var(--muted);font-size:0.88rem;margin-top:4rem;}
.foot{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;}
footer a{color:var(--muted);text-decoration:none;margin-left:1.2rem;}
footer a:hover{color:var(--ink);}
@media (max-width:900px){
  .nav-inner{flex-wrap:wrap;height:auto;padding-top:10px;padding-bottom:8px;row-gap:6px;}
  .langsw{margin-left:auto;}
  .links{order:3;flex-basis:100%;margin-left:0;flex-wrap:wrap;padding-bottom:4px;gap:0.35rem 0.25rem;}
  .links a:not(.btn){margin-left:0;padding:6px 10px;}
  .links .btn{margin-left:0;flex:none;}
  .grid{grid-template-columns:1fr;}
  footer a{margin:0 1rem 0 0;}
}`;

export const NAV = `<nav><div class="wrap nav-inner">
  <a class="logo" href="/">Fortune<span>Tech</span></a>
  <div class="links">
    <a href="/ai-visibility/">AI Visibility</a>
    <a href="/#services">Services</a>
    <a href="/#how">How it works</a>
    <a href="/blog/">Insights</a>
    <a class="btn check" href="${CHECK_URL}">Free AI Visibility Check</a>
    <a class="btn primary" href="/#contact">Get in touch</a>
  </div>
  <div class="langsw" role="group" aria-label="Language"><strong lang="en" aria-current="page" title="English">EN</strong><a href="/es/" hreflang="es" lang="es" title="Español">ES</a><a href="/pt/" hreflang="pt" lang="pt" title="Português">PT</a></div>
</div></nav>`;

export const FOOTER = `<footer><div class="wrap foot">
  <div>© 2026 FortuneTech · ftech.co.in · Hyderabad, India</div>
  <div><a href="/ai-visibility/">AI Visibility</a><a href="/#services">Services</a><a href="/blog/">Insights</a><a href="/#contact">Contact</a></div>
</div></footer>`;
