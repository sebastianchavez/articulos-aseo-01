/* =========================================================
   ui.js — Helpers de UI compartidos: navbar, footer, toast,
          formateo CLP, render de tarjetas, etc.
   ========================================================= */

window.AseoUI = (function () {

  /* ---------- Utilidades ---------- */
  const formatCLP = (n) => {
    if (typeof n !== 'number') n = Number(n) || 0;
    return '$' + Math.round(n).toLocaleString('es-CL') + ' CLP';
  };
  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' });
  };
  const getQueryParam = (name) => new URLSearchParams(location.search).get(name);
  const escapeHTML = (s) => (s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const stars = (rating) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  };

  /* ---------- Toasts ---------- */
  function toast(message, type = 'info', duration = 3000) {
    const cont = document.getElementById('toast-container');
    if (!cont) return;
    const colors = {
      success: 'bg-emerald-500',
      error:   'bg-rose-500',
      info:    'bg-slate-700',
      warning: 'bg-amber-500'
    };
    const icons = { success: '✓', error: '✕', info: 'ⓘ', warning: '⚠' };
    const el = document.createElement('div');
    el.className = `${colors[type] || colors.info} text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[260px] max-w-sm toast-enter`;
    el.innerHTML = `<span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold">${icons[type] || ''}</span><span class="text-sm font-medium">${escapeHTML(message)}</span>`;
    cont.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(20px)';
      el.style.transition = 'all .3s';
      setTimeout(() => el.remove(), 300);
    }, duration);
  }

  /* ---------- Navbar ---------- */
  function renderNavbar(activeNav) {
    const u = AseoStore.auth.getCurrent();
    const cartCount = AseoStore.cart.count();
    const links = [
      { id: 'inicio',    href: 'index.html',     label: 'Inicio' },
      { id: 'productos', href: 'productos.html', label: 'Productos' },
      { id: 'nosotros',  href: 'nosotros.html',  label: 'Nosotros' },
      { id: 'contacto',  href: 'contacto.html',  label: 'Contacto' }
    ];
    const active = links.find(l => l.id === activeNav);
    const navHTML = `
      <header class="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/90">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <a href="index.html" class="flex items-center gap-2 font-bold text-xl">
              <span class="w-9 h-9 bg-brand-500 text-white rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
              </span>
              <span class="hidden sm:inline">Aseo<span class="text-brand-500">+</span></span>
            </a>
            <nav class="hidden md:flex items-center gap-1">
              ${links.map(l => `
                <a href="${l.href}" class="px-4 py-2 rounded-lg text-sm font-medium ${l.id === activeNav ? 'text-brand-700 bg-brand-50' : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'} transition">${l.label}</a>
              `).join('')}
            </nav>
            <div class="flex items-center gap-2">
              <a href="carrito.html" class="relative p-2 hover:bg-slate-100 rounded-lg transition" aria-label="Carrito">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                ${cartCount > 0 ? `<span class="absolute -top-1 -right-1 bg-brand-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">${cartCount}</span>` : ''}
              </a>
              ${u ? `
                <div class="relative" id="user-menu-wrap">
                  <button onclick="document.getElementById('user-menu').classList.toggle('hidden')" class="hidden sm:flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg transition text-sm font-medium">
                    <span class="w-7 h-7 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold">${escapeHTML((u.nombre || u.email).charAt(0).toUpperCase())}</span>
                    <span class="hidden lg:inline">${escapeHTML(u.nombre || u.email.split('@')[0])}</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  <div id="user-menu" class="hidden absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                    <div class="px-4 py-2 border-b border-slate-100">
                      <p class="text-sm font-semibold truncate">${escapeHTML(u.nombre || 'Usuario')}</p>
                      <p class="text-xs text-slate-500 truncate">${escapeHTML(u.email)}</p>
                    </div>
                    <a href="perfil.html" class="block px-4 py-2 text-sm hover:bg-slate-50">Mi perfil</a>
                    <a href="perfil.html#pedidos" class="block px-4 py-2 text-sm hover:bg-slate-50">Mis pedidos</a>
                    ${u.id === 'demo@aseo.cl' ? '' : `<button onclick="AseoStore.auth.logout();AseoUI.toast('Sesión cerrada','info');location.href='index.html'" class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-rose-600">Cerrar sesión</button>`}
                  </div>
                </div>
              ` : `
                <a href="login.html" class="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 hover:text-brand-600">Ingresar</a>
                <a href="registro.html" class="hidden sm:inline-flex items-center px-4 py-2 bg-brand-500 text-white text-sm font-medium rounded-lg hover:bg-brand-600 transition">Registrarme</a>
              `}
              <button id="mobile-toggle" class="md:hidden p-2 hover:bg-slate-100 rounded-lg" aria-label="Menú">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div id="mobile-menu" class="hidden md:hidden border-t border-slate-200 bg-white">
          <nav class="px-4 py-3 space-y-1">
            ${links.map(l => `
              <a href="${l.href}" class="block px-3 py-2 rounded-lg text-sm font-medium ${l.id === activeNav ? 'text-brand-700 bg-brand-50' : 'text-slate-700 hover:bg-slate-50'}">${l.label}</a>
            `).join('')}
            <div class="border-t border-slate-100 pt-2 mt-2">
              ${u ? `
                <a href="perfil.html" class="block px-3 py-2 rounded-lg text-sm font-medium">Mi perfil</a>
                ${u.id === 'demo@aseo.cl' ? '' : `<button onclick="AseoStore.auth.logout();location.href='index.html'" class="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-rose-600">Cerrar sesión</button>`}
              ` : `
                <a href="login.html" class="block px-3 py-2 rounded-lg text-sm font-medium">Ingresar</a>
                <a href="registro.html" class="block px-3 py-2 rounded-lg text-sm font-medium text-brand-600">Registrarme</a>
              `}
            </div>
          </nav>
        </div>
      </header>`;
    document.getElementById('navbar').innerHTML = navHTML;
    document.getElementById('mobile-toggle')?.addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.toggle('hidden');
    });
    // Cerrar menú de usuario al hacer click fuera
    document.addEventListener('click', (e) => {
      const wrap = document.getElementById('user-menu-wrap');
      const menu = document.getElementById('user-menu');
      if (wrap && menu && !wrap.contains(e.target)) menu.classList.add('hidden');
    });
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    const footerHTML = `
      <footer class="bg-slate-900 text-slate-300 mt-16 print:hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="col-span-2 md:col-span-1">
            <a href="index.html" class="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <span class="w-9 h-9 bg-brand-500 text-white rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
              </span>
              Aeso+
            </a>
            <p class="text-sm text-slate-400 mb-4">Artículos de aseo al detalle y al por mayor para el hogar y empresas.</p>
            <div class="flex gap-3">
              <a href="#" class="w-9 h-9 bg-slate-800 hover:bg-brand-500 rounded-lg flex items-center justify-center transition" aria-label="Facebook">f</a>
              <a href="#" class="w-9 h-9 bg-slate-800 hover:bg-brand-500 rounded-lg flex items-center justify-center transition" aria-label="Instagram">ig</a>
              <a href="#" class="w-9 h-9 bg-slate-800 hover:bg-brand-500 rounded-lg flex items-center justify-center transition" aria-label="WhatsApp">wa</a>
            </div>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Tienda</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="productos.html" class="hover:text-brand-400">Todos los productos</a></li>
              <li><a href="productos.html?tipo=mayorista" class="hover:text-brand-400">Mayorista</a></li>
              <li><a href="productos.html?cat=desinfectantes" class="hover:text-brand-400">Desinfectantes</a></li>
              <li><a href="productos.html?cat=lavanderia" class="hover:text-brand-400">Lavandería</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Mi cuenta</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="login.html" class="hover:text-brand-400">Ingresar</a></li>
              <li><a href="registro.html" class="hover:text-brand-400">Registrarme</a></li>
              <li><a href="perfil.html" class="hover:text-brand-400">Mis pedidos</a></li>
              <li><a href="recuperar-password.html" class="hover:text-brand-400">Recuperar contraseña</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Información</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="nosotros.html" class="hover:text-brand-400">Nosotros</a></li>
              <li><a href="contacto.html" class="hover:text-brand-400">Contacto</a></li>
              <li><a href="politicas-privacidad.html" class="hover:text-brand-400">Políticas de privacidad</a></li>
              <li><a href="terminos-condiciones.html" class="hover:text-brand-400">Términos y condiciones</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-slate-800">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p class="text-sm text-slate-400">© 2026 Aseo+ · Todos los derechos reservados</p>
            <p class="text-sm text-slate-400">Aceptamos: 💳 Visa · Mastercard · 🅿️ PayPal · 🏦 Transferencia</p>
          </div>
        </div>
      </footer>`;
    document.getElementById('footer').innerHTML = footerHTML;
  }

  /* ---------- Tarjeta de producto reutilizable ---------- */
  function productCard(p, opts = {}) {
    const showMayor = opts.mostrarMayor !== false;
    const detalle = p.precioDetalle;
    const mayor = p.precioMayor;
    const descuento = Math.round((1 - mayor / detalle) * 100);
    const summary = AseoStore.reviews.ratingSummary(p.id);
    const ratingDisplay = summary.count > 0
      ? `<div class="flex items-center gap-1 text-xs"><span class="text-amber-500">${stars(summary.avg)}</span><span class="text-slate-500">(${summary.count})</span></div>`
      : `<div class="text-xs text-slate-400">Sin reseñas</div>`;
    const badge = p.badge ? `<span class="absolute top-3 left-3 bg-brand-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full z-10">${p.badge}</span>` : '';
    return `
      <article class="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition relative">
        ${badge}
        <a href="producto.html?id=${p.id}" class="block">
          <div class="aspect-square bg-slate-100 overflow-hidden">
            <img src="${p.imagen}" alt="${escapeHTML(p.name)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
          </div>
          <div class="p-4">
            <p class="text-xs text-slate-500 uppercase tracking-wide mb-1">${(window.AseoData.getCategoryById(p.categoryId)?.name || '').replace(/^./, c => c.toLowerCase())}</p>
            <h3 class="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-brand-600 transition">${escapeHTML(p.name)}</h3>
            ${ratingDisplay}
            <div class="mt-3 flex items-end justify-between">
              <div>
                <p class="text-lg font-bold text-slate-900">${formatCLP(detalle)}</p>
                ${showMayor ? `<p class="text-xs text-brand-600 font-medium">Mayor: ${formatCLP(mayor)} <span class="text-brand-500">(-${descuento}%)</span></p>` : ''}
              </div>
            </div>
          </div>
        </a>
      </article>`;
  }

  /* ---------- Montar layout completo ---------- */
  function mountLayout({ activeNav } = {}) {
    AseoStore.seed();
    renderNavbar(activeNav);
    renderFooter();
  }

  /* ---------- Validación de email/contraseña ---------- */
  const validators = {
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || ''),
    required: (v) => (v || '').trim().length > 0,
    minLength: (n) => (v) => (v || '').length >= n,
    match: (other) => (v) => v === other
  };

  /* ---------- Requerir autenticación ---------- */
  function requireAuth(redirect = 'login.html') {
    if (!AseoStore.auth.isAuthenticated()) {
      location.href = redirect;
      return false;
    }
    return true;
  }

  return {
    formatCLP, formatDate, getQueryParam, escapeHTML, stars,
    toast, renderNavbar, renderFooter, productCard, mountLayout,
    validators, requireAuth
  };
})();
