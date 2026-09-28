/* =========================================================
   pages/products.js — Catálogo de productos con filtros
   ========================================================= */

window.AseoProducts = (function () {

  let state = {
    q: '',
    cat: '',
    tipo: '',
    min: '',
    max: '',
    sort: 'relevancia'
  };

  function applyFilters() {
    let list = AseoData.products.slice();

    if (state.cat) list = list.filter(p => p.categoryId === state.cat);
    if (state.q) {
      const q = state.q.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.descriptionCorta.toLowerCase().includes(q));
    }
    if (state.tipo === 'mayorista') list = list.filter(p => p.mayorMinimo > 0);
    if (state.min) list = list.filter(p => p.precioDetalle >= Number(state.min));
    if (state.max) list = list.filter(p => p.precioDetalle <= Number(state.max));

    switch (state.sort) {
      case 'precio-asc':  list.sort((a,b) => a.precioDetalle - b.precioDetalle); break;
      case 'precio-desc': list.sort((a,b) => b.precioDetalle - a.precioDetalle); break;
      case 'rating':      list.sort((a,b) => b.rating - a.rating); break;
      case 'nombre':      list.sort((a,b) => a.name.localeCompare(b.name)); break;
    }
    return list;
  }

  function render() {
    const grid = document.getElementById('products-grid');
    const empty = document.getElementById('empty-state');
    const count = document.getElementById('result-count');
    if (!grid) return;
    const list = applyFilters();
    count.textContent = list.length;
    if (list.length === 0) {
      grid.innerHTML = '';
      empty.classList.remove('hidden');
      return;
    }
    empty.classList.add('hidden');
    grid.innerHTML = list.map(p => AseoUI.productCard(p)).join('');
  }

  function buildCategoryFilters() {
    const cont = document.getElementById('category-filters');
    if (!cont) return;
    const cats = AseoData.categories;
    const radios = cats.map(c => `
      <label class="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 rounded cursor-pointer">
        <input type="radio" name="cat" value="${c.id}" class="accent-brand-500" ${state.cat === c.id ? 'checked' : ''}>
        <span class="text-sm">${c.icon} ${c.name}</span>
      </label>`).join('');
    cont.insertAdjacentHTML('beforeend', radios);
  }

  function readState() {
    state.q    = document.getElementById('search-input').value.trim();
    state.min  = document.getElementById('price-min').value;
    state.max  = document.getElementById('price-max').value;
    state.sort = document.getElementById('sort-select').value;
    const catRadio = document.querySelector('input[name="cat"]:checked');
    const tipoRadio = document.querySelector('input[name="tipo"]:checked');
    state.cat  = catRadio ? catRadio.value : '';
    state.tipo = tipoRadio ? tipoRadio.value : '';
  }

  function bind() {
    let typingTimer;
    document.getElementById('search-input').addEventListener('input', () => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => { readState(); render(); }, 200);
    });
    document.getElementById('sort-select').addEventListener('change', () => { readState(); render(); });
    document.querySelectorAll('input[name="cat"], input[name="tipo"]').forEach(r => r.addEventListener('change', () => { readState(); render(); }));
    ['price-min', 'price-max'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => { readState(); render(); }, 300);
      });
    });
    document.getElementById('reset-filters').addEventListener('click', () => {
      document.getElementById('search-input').value = '';
      document.getElementById('price-min').value = '';
      document.getElementById('price-max').value = '';
      document.getElementById('sort-select').value = 'relevancia';
      document.querySelectorAll('input[name="cat"], input[name="tipo"]').forEach(r => r.checked = r.value === '');
      readState(); render();
    });
  }

  function init() {
    // leer query params (?cat=X&tipo=Y)
    const catQ  = AseoUI.getQueryParam('cat');
    const tipoQ = AseoUI.getQueryParam('tipo');
    if (catQ)  state.cat  = catQ;
    if (tipoQ) state.tipo = tipoQ;
    buildCategoryFilters();
    if (state.cat) {
      const r = document.querySelector(`input[name="cat"][value="${state.cat}"]`);
      if (r) r.checked = true;
    }
    if (state.tipo) {
      const r = document.querySelector(`input[name="tipo"][value="${state.tipo}"]`);
      if (r) r.checked = true;
    }
    readState();
    render();
    bind();
  }

  return { init };
})();
