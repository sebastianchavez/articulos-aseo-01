/* =========================================================
   pages/product-detail.js — Vista de detalle de producto
   ========================================================= */

window.AseoProductDetail = (function () {

  let product = null;
  let currentImage = 0;

  function renderBreadcrumb() {
    const cat = AseoData.getCategoryById(product.categoryId);
    document.getElementById('breadcrumb').innerHTML = `
      <a href="index.html" class="hover:text-brand-600">Inicio</a>
      <span class="mx-2">/</span>
      <a href="productos.html" class="hover:text-brand-600">Productos</a>
      <span class="mx-2">/</span>
      <a href="productos.html?cat=${cat.id}" class="hover:text-brand-600">${cat.name}</a>
      <span class="mx-2">/</span>
      <span class="text-slate-700">${AseoUI.escapeHTML(product.name)}</span>`;
  }

  function renderImages() {
    const main = document.getElementById('main-image');
    main.src = product.galeria[currentImage] || product.imagen;
    main.alt = product.name;
    const thumbs = document.getElementById('thumbs');
    const imgs = (product.galeria && product.galeria.length) ? product.galeria : [product.imagen];
    thumbs.innerHTML = imgs.map((src, i) => `
      <button class="aspect-square rounded-xl overflow-hidden border-2 ${i === currentImage ? 'border-brand-500' : 'border-slate-200'} hover:border-brand-400 transition" data-idx="${i}">
        <img src="${src}" class="w-full h-full object-cover" alt="">
      </button>`).join('');
    thumbs.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      currentImage = Number(b.dataset.idx);
      renderImages();
    }));
  }

  function renderHeader() {
    const cat = AseoData.getCategoryById(product.categoryId);
    document.getElementById('cat-badge').textContent = cat.name;
    const badge = document.getElementById('product-badge');
    if (product.badge) {
      badge.textContent = product.badge;
      badge.classList.remove('hidden');
    }
    document.getElementById('product-name').textContent = product.name;
    const summary = AseoStore.reviews.ratingSummary(product.id);
    document.getElementById('stars').textContent = AseoUI.stars(summary.avg);
    document.getElementById('rating-text').textContent = summary.count > 0
      ? `${summary.avg} · ${summary.count} reseña${summary.count !== 1 ? 's' : ''}`
      : 'Sin reseñas aún';
    document.getElementById('price-detalle').textContent = AseoUI.formatCLP(product.precioDetalle);
    if (product.mayorMinimo > 0) {
      const wrap = document.getElementById('price-mayor-wrap');
      wrap.classList.remove('hidden');
      wrap.classList.add('flex');
      document.getElementById('price-mayor').textContent = AseoUI.formatCLP(product.precioMayor);
      document.getElementById('mayor-min').textContent = product.mayorMinimo;
    }
    document.getElementById('product-short').textContent = product.descriptionCorta;
    document.getElementById('stock-info').textContent = `${product.stock} disponibles`;

    // Specs
    document.getElementById('spec-cat').textContent = cat.name;
    document.getElementById('spec-stock').textContent = product.stock + ' unidades';
    document.getElementById('spec-detalle').textContent = AseoUI.formatCLP(product.precioDetalle);
    document.getElementById('spec-mayor').textContent = AseoUI.formatCLP(product.precioMayor);
    document.getElementById('spec-min').textContent = product.mayorMinimo + ' unidades';
    document.getElementById('spec-rating').textContent = summary.avg ? `${summary.avg} / 5 (${summary.count} reseñas)` : 'Sin calificación';
  }

  function bindCantidadYTipo() {
    const qty = document.getElementById('qty-input');
    document.getElementById('qty-inc').addEventListener('click', () => {
      qty.value = Math.min(product.stock, Number(qty.value) + 1);
      updateMayorHint();
    });
    document.getElementById('qty-dec').addEventListener('click', () => {
      qty.value = Math.max(1, Number(qty.value) - 1);
      updateMayorHint();
    });
    qty.addEventListener('input', updateMayorHint);

    const tipoRadios = document.querySelectorAll('input[name="tipoVenta"]');
    const grupo = document.getElementById('tipo-venta-group');
    grupo.querySelectorAll('label').forEach(lab => {
      lab.addEventListener('click', () => {
        grupo.querySelectorAll('label').forEach(x => {
          x.classList.remove('border-brand-500', 'bg-brand-50');
          x.classList.add('border-slate-200');
          x.querySelector('span:first-child').classList.remove('text-brand-700');
        });
        lab.classList.add('border-brand-500', 'bg-brand-50');
        lab.classList.remove('border-slate-200');
        lab.querySelector('span:first-child').classList.add('text-brand-700');
        tipoRadios.forEach(r => r.checked = (r.value === lab.dataset.tipo));
        updateMayorHint();
      });
    });
  }

  function updateMayorHint() {
    const tipo = document.querySelector('input[name="tipoVenta"]:checked').value;
    const qty = Number(document.getElementById('qty-input').value) || 1;
    const hint = document.getElementById('mayor-hint');
    if (tipo === 'mayorista' && qty < product.mayorMinimo) {
      hint.classList.remove('hidden');
      hint.classList.add('block');
      document.getElementById('mayor-hint-n').textContent = product.mayorMinimo;
      document.getElementById('mayor-hint-m').textContent = product.mayorMinimo - qty;
    } else {
      hint.classList.add('hidden');
    }
  }

  function bindAddToCart() {
    document.getElementById('add-cart').addEventListener('click', () => {
      const qty = Number(document.getElementById('qty-input').value) || 1;
      const tipo = document.querySelector('input[name="tipoVenta"]:checked').value;
      if (qty < 1) { AseoUI.toast('Cantidad inválida', 'error'); return; }
      AseoStore.cart.add(product.id, qty, tipo);
      AseoUI.toast(`Agregado: ${product.name} (${qty})`, 'success');
    });
  }

  function bindTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => {
          b.classList.remove('text-brand-700', 'border-brand-500');
          b.classList.add('text-slate-600', 'border-transparent');
        });
        btn.classList.add('text-brand-700', 'border-brand-500');
        btn.classList.remove('text-slate-600', 'border-transparent');
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
        document.getElementById('tab-' + btn.dataset.tab).classList.remove('hidden');
      });
    });
  }

  function renderReviews() {
    const list = AseoStore.reviews.getByProduct(product.id);
    const summary = AseoStore.reviews.ratingSummary(product.id);
    const summaryEl = document.getElementById('reviews-summary');
    const listEl = document.getElementById('reviews-list');
    const empty = document.getElementById('reviews-empty');
    if (summary.count === 0) {
      summaryEl.innerHTML = '';
      listEl.innerHTML = '';
      empty.classList.remove('hidden');
      return;
    }
    empty.classList.add('hidden');
    summaryEl.innerHTML = `
      <div class="bg-slate-50 rounded-xl p-5 flex items-center gap-6">
        <div class="text-center">
          <p class="text-4xl font-bold">${summary.avg}</p>
          <p class="text-amber-500 text-xl">${AseoUI.stars(summary.avg)}</p>
          <p class="text-xs text-slate-500 mt-1">${summary.count} reseña${summary.count !== 1 ? 's' : ''}</p>
        </div>
      </div>`;
    listEl.innerHTML = list.map(r => `
      <div class="border-b border-slate-100 pb-4">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-9 h-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">${AseoUI.escapeHTML(r.userName.charAt(0).toUpperCase())}</div>
          <div class="flex-1">
            <p class="font-semibold text-sm">${AseoUI.escapeHTML(r.userName)}</p>
            <p class="text-xs text-slate-500">${AseoUI.formatDate(r.date)}</p>
          </div>
          <span class="text-amber-500">${AseoUI.stars(r.rating)}</span>
        </div>
        <p class="text-slate-700 text-sm">${AseoUI.escapeHTML(r.comment)}</p>
      </div>`).join('');

    // link a reseña
    const u = AseoStore.auth.getCurrent();
    const link = document.getElementById('write-review-link');
    if (u) {
      link.href = `resena.html?productId=${product.id}`;
      link.textContent = 'Escribe una reseña sobre este producto →';
    } else {
      link.href = 'login.html';
      link.textContent = 'Inicia sesión para escribir una reseña →';
    }
  }

  function renderRelated() {
    const related = AseoData.getRelatedProducts(product.id, 4);
    document.getElementById('related-grid').innerHTML = related.map(p => AseoUI.productCard(p)).join('');
  }

  function init() {
    const id = AseoUI.getQueryParam('id');
    product = AseoData.getProductById(id);
    if (!product) {
      document.querySelector('main').innerHTML = `
        <div class="text-center py-20">
          <h1 class="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <a href="productos.html" class="text-brand-600 hover:underline">Volver al catálogo</a>
        </div>`;
      return;
    }
    document.title = `${product.name} · Aseo+`;
    renderBreadcrumb();
    renderImages();
    renderHeader();
    bindCantidadYTipo();
    bindAddToCart();
    bindTabs();
    renderReviews();
    renderRelated();
    document.getElementById('desc-text').textContent = product.description;
  }

  return { init };
})();
