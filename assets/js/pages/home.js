/* =========================================================
   pages/home.js — Inicio / Landing
   ========================================================= */

window.AseoHome = (function () {

  const colorMap = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'hover:border-emerald-400' },
    sky:     { bg: 'bg-sky-50',     text: 'text-sky-700',     border: 'hover:border-sky-400' },
    amber:   { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'hover:border-amber-400' },
    cyan:    { bg: 'bg-cyan-50',    text: 'text-cyan-700',    border: 'hover:border-cyan-400' },
    lime:    { bg: 'bg-lime-50',    text: 'text-lime-700',    border: 'hover:border-lime-400' },
    rose:    { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'hover:border-rose-400' },
    teal:    { bg: 'bg-teal-50',    text: 'text-teal-700',    border: 'hover:border-teal-400' },
    orange:  { bg: 'bg-orange-50',  text: 'text-orange-700',  border: 'hover:border-orange-400' }
  };

  function renderCategories() {
    const cont = document.getElementById('categories-grid');
    if (!cont) return;
    cont.innerHTML = AseoData.categories.map(c => {
      const cm = colorMap[c.color] || colorMap.emerald;
      return `
        <a href="productos.html?cat=${c.id}" class="group ${cm.bg} border-2 border-transparent ${cm.border} rounded-2xl p-6 transition">
          <div class="text-4xl mb-3">${c.icon}</div>
          <h3 class="font-semibold ${cm.text} mb-1">${c.name}</h3>
          <p class="text-sm text-slate-600 line-clamp-2">${c.description}</p>
          <p class="mt-3 text-sm ${cm.text} font-medium group-hover:underline">Ver productos →</p>
        </a>`;
    }).join('');
  }

  function renderFeatured() {
    const cont = document.getElementById('featured-products');
    if (!cont) return;
    const list = AseoData.getFeaturedProducts().slice(0, 8);
    cont.innerHTML = list.map(p => AseoUI.productCard(p)).join('');
  }

  function init() {
    renderCategories();
    renderFeatured();
  }

  return { init };
})();
