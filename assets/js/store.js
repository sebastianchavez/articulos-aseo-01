/* =========================================================
   store.js — Capa de persistencia (localStorage)
   Simula un backend con carrito, usuarios, pedidos y reseñas.
   ========================================================= */

window.AseoStore = (function () {

  const KEYS = {
    cart:    'aaseo_cart',
    user:    'aaseo_user',
    users:   'aaseo_users',
    orders:  'aaseo_orders',
    reviews: 'aaseo_reviews'
  };

  const DEMO_USER = {
    id: 'demo@aseo.cl',
    nombre: 'Cliente Demo',
    email: 'demo@aseo.cl',
    telefono: '+56 9 1234 5678',
    direccion: 'Av. Principal 1234, Santiago',
    fechaRegistro: '2026-01-15'
  };

  function get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  }
  function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /* ---------- Inicialización (sembrado) ---------- */
  function seed() {
    if (!localStorage.getItem(KEYS.users)) {
      // Solo guarda password de demo (mock); cualquier email registrado se valida como '123456'
      set(KEYS.users, [{
        ...DEMO_USER,
        password: '123456'
      }]);
    }
    if (!localStorage.getItem(KEYS.orders)) {
      set(KEYS.orders, window.AseoData.seedOrders);
    }
    if (!localStorage.getItem(KEYS.reviews)) {
      set(KEYS.reviews, window.AseoData.seedReviews);
    }
  }

  /* ---------- Carrito ---------- */
  const cart = {
    getAll() { return get(KEYS.cart, []); },
    add(productId, cantidad, tipoVenta) {
      const items = this.getAll();
      const key = productId + '|' + tipoVenta;
      const existing = items.find(i => (i.productId + '|' + i.tipoVenta) === key);
      if (existing) existing.cantidad += cantidad;
      else items.push({ productId, cantidad, tipoVenta });
      set(KEYS.cart, items);
      return items;
    },
    update(productId, tipoVenta, cantidad) {
      const items = this.getAll();
      const i = items.findIndex(x => x.productId === productId && x.tipoVenta === tipoVenta);
      if (i > -1) {
        if (cantidad <= 0) items.splice(i, 1);
        else items[i].cantidad = cantidad;
        set(KEYS.cart, items);
      }
      return items;
    },
    remove(productId, tipoVenta) {
      const items = this.getAll().filter(i => !(i.productId === productId && i.tipoVenta === tipoVenta));
      set(KEYS.cart, items);
      return items;
    },
    clear() { set(KEYS.cart, []); },
    count() {
      return this.getAll().reduce((sum, i) => sum + i.cantidad, 0);
    },
    total() {
      return this.getAll().reduce((sum, i) => {
        const p = window.AseoData.getProductById(i.productId);
        if (!p) return sum;
        const precio = i.tipoVenta === 'mayorista' ? p.precioMayor : p.precioDetalle;
        return sum + precio * i.cantidad;
      }, 0);
    },
    detailedItems() {
      return this.getAll().map(i => {
        const p = window.AseoData.getProductById(i.productId);
        const precio = p ? (i.tipoVenta === 'mayorista' ? p.precioMayor : p.precioDetalle) : 0;
        return { ...i, producto: p, precioUnitario: precio, subtotal: precio * i.cantidad };
      }).filter(i => i.producto);
    }
  };

  /* ---------- Auth ---------- */
  const auth = {
    getCurrent() { return get(KEYS.user, null); },
    isAuthenticated() { return !!this.getCurrent(); },
    login(email, password) {
      const users = get(KEYS.users, []);
      const u = users.find(x => x.email === email && x.password === password);
      if (!u) return { ok: false, error: 'Email o contraseña incorrectos.' };
      const safe = { ...u }; delete safe.password;
      set(KEYS.user, safe);
      return { ok: true, user: safe };
    },
    register(data) {
      const users = get(KEYS.users, []);
      if (users.some(u => u.email === data.email)) {
        return { ok: false, error: 'Ya existe una cuenta con ese email.' };
      }
      const newUser = {
        id: data.email,
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono || '',
        direccion: data.direccion || '',
        password: data.password,
        fechaRegistro: new Date().toISOString().slice(0, 10)
      };
      users.push(newUser);
      set(KEYS.users, users);
      const safe = { ...newUser }; delete safe.password;
      set(KEYS.user, safe);
      return { ok: true, user: safe };
    },
    logout() { localStorage.removeItem(KEYS.user); },
    updateProfile(updates) {
      const current = this.getCurrent();
      if (!current) return;
      const users = get(KEYS.users, []);
      const idx = users.findIndex(u => u.email === current.email);
      if (idx > -1) {
        users[idx] = { ...users[idx], ...updates };
        set(KEYS.users, users);
        const safe = { ...users[idx] }; delete safe.password;
        set(KEYS.user, safe);
      }
    },
    recover(email) {
      // Mock: siempre "envía" instrucciones
      const users = get(KEYS.users, []);
      return { ok: users.some(u => u.email === email), email };
    }
  };

  /* ---------- Pedidos ---------- */
  const orders = {
    getAll() { return get(KEYS.orders, []); },
    getByUser(userId) {
      return this.getAll().filter(o => o.userId === userId);
    },
    getById(id) { return this.getAll().find(o => o.id === id); },
    create(data) {
      const list = this.getAll();
      const nextNum = 1000 + list.length + 1;
      const order = {
        id: 'ASO-' + nextNum,
        fecha: new Date().toISOString().slice(0, 10),
        estado: 'Preparando',
        ...data
      };
      list.unshift(order);
      set(KEYS.orders, list);
      return order;
    }
  };

  /* ---------- Reseñas ---------- */
  const reviews = {
    getAll() { return get(KEYS.reviews, []); },
    getByProduct(productId) { return this.getAll().filter(r => r.productId === productId); },
    add(productId, userName, rating, comment) {
      const list = this.getAll();
      const nueva = {
        id: 'r' + Date.now(),
        productId, userName, rating,
        comment: comment || '',
        date: new Date().toISOString().slice(0, 10)
      };
      list.unshift(nueva);
      set(KEYS.reviews, list);
      return nueva;
    },
    ratingSummary(productId) {
      const list = this.getByProduct(productId);
      if (!list.length) return { avg: 0, count: 0 };
      const avg = list.reduce((s, r) => s + r.rating, 0) / list.length;
      return { avg: Math.round(avg * 10) / 10, count: list.length };
    },
    hasReviewed(productId, userName) {
      return this.getAll().some(r => r.productId === productId && r.userName === userName);
    }
  };

  return { cart, auth, orders, reviews, seed, KEYS, DEMO_USER };
})();
