# Aseo+ · E-commerce de Artículos de Aseo

Sitio web e-commerce multipágina para venta de artículos de aseo al detalle y al por mayor. Construido con **HTML + JavaScript nativo + Tailwind CSS** y datos mockeados persistidos en `localStorage`.

## 🚀 Cómo ejecutar

Este proyecto es estático: basta con servir los archivos con cualquier servidor HTTP local.

### Opción 1: VS Code Live Server
1. Abre la carpeta en VS Code.
2. Click derecho sobre `index.html` → **Open with Live Server**.

### Opción 2: Python
```bash
python -m http.server 8080
```
Luego abre http://localhost:8080

### Opción 3: Node.js
```bash
npx serve .
```

### Opción 4: Abrir directamente
Doble click sobre `index.html`. Funciona, aunque algunas APIs del navegador se comportan mejor con un servidor.

> **Importante:** No abras los HTML con `file://` para evitar restricciones de `localStorage` entre páginas. Usa siempre un servidor local.

---

## 🔑 Cuenta demo

Para probar el flujo de autenticación y pedidos:
- **Email:** `demo@aseo.cl`
- **Contraseña:** `123456`

También puedes crear cuentas nuevas desde la página de registro. Los datos se guardan en el navegador.

---

## 📁 Estructura

```
/
├── index.html                       Landing / Inicio
├── nosotros.html                    Empresa + equipo
├── productos.html                   Catálogo con filtros
├── producto.html                    Detalle (?id=p001)
├── carrito.html                     Carrito de compras
├── checkout.html                    Pago + dirección + envío
├── confirmacion.html                Confirmación + imprimir
├── perfil.html                      Mi perfil + historial
├── pedido-detalle.html              Detalle (?id=ASO-1001)
├── resena.html                      Form reseña (?productId=p001)
├── contacto.html                    Form + horario + mapa
├── politicas-privacidad.html
├── terminos-condiciones.html
├── login.html                       Iniciar sesión
├── registro.html                    Crear cuenta
├── recuperar-password.html
└── assets/
    ├── css/styles.css
    └── js/
        ├── data.js                  Catálogo + reseñas + pedidos demo
        ├── store.js                 Capa localStorage (auth/cart/orders/reviews)
        ├── ui.js                    Navbar, footer, toasts, formatCLP
        └── pages/
            ├── home.js
            ├── products.js
            └── product-detail.js
```

---

## 🧪 Flujo de prueba sugerido

1. Abre `index.html` y explora el landing.
2. Ve a **Productos** y filtra por categoría o búsqueda.
3. Entra a un producto y agrégalo al carrito (probar tipo *detalle* y *mayorista*).
4. Abre el **Carrito** y ajusta cantidades.
5. Procede al **Checkout**, completa dirección y elige envío/pago.
6. Confirma la compra → llegarás a la pantalla de confirmación con:
   - 🖨️ **Imprimir comprobante** (`window.print()` con CSS optimizado)
   - 📋 **Ver historial de pedidos** (perfil.html)
7. En **Mi perfil** verás los pedidos. Abre el detalle de uno.
8. Si el pedido está *Entregado*, puedes dejar reseña con estrellas ⭐.
9. Prueba también **Iniciar sesión** con la cuenta demo para ver pedidos pre-cargados.

---

## 🛒 Catálogo mockeado

- **8 categorías** y **28 productos** con descripciones, precios detalle/mayor, stock, rating y reseñas.
- Imágenes servidas desde Unsplash (URLs externas).
- 18 reseñas pre-cargadas distribuidas en productos destacados.
- 3 pedidos demo del usuario `demo@aseo.cl`.

## 💾 Persistencia (localStorage)

| Key              | Contenido                                  |
|------------------|--------------------------------------------|
| `aaseo_cart`     | Items del carrito                          |
| `aaseo_user`     | Sesión del usuario actual                  |
| `aaseo_users`    | Usuarios registrados (incluye demo)        |
| `aaseo_orders`   | Pedidos realizados                         |
| `aaseo_reviews`  | Reseñas (incluye 18 seed)                  |

Para **reiniciar el estado** del demo, ejecuta en la consola del navegador:
```js
['aaseo_cart','aaseo_user','aaseo_users','aaseo_orders','aaseo_reviews']
  .forEach(k => localStorage.removeItem(k));
location.reload();
```

---

## 🎨 Stack

- **HTML5** multipágina
- **Tailwind CSS 3** vía CDN (`cdn.tailwindcss.com`) con paleta personalizada
- **JavaScript ES2020** nativo (sin frameworks)
- **localStorage** como capa de persistencia
- **Google Fonts** (Inter)

## 📱 Responsive

Diseño mobile-first, probado en breakpoints `sm`, `md`, `lg`, `xl`.

## 🖨️ Impresión

La página `confirmacion.html` tiene estilos `@media print` optimizados para imprimir el comprobante (oculta navbar, footer y botones).
