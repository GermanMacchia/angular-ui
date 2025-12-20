# 📦 UI Kit - Angular UI

Librería de componentes premium para aplicaciones Angular. Diseñada para ofrecer una experiencia de usuario moderna y fluida.

## 📦 Instalación

```bash
npm install @angular-ui/ui-kit daisyui@latest tailwindcss@latest @tailwindcss/postcss@latest postcss@latest
```

## Incluir

index.html

```
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
    />
```

.postcssrc.json

```
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

src/styles.css

```
@import 'tailwindcss';
@plugin "daisyui";

@source '../node_modules/gmacc-ui-kit/**/*.{mjs,js}';
```

## 🧩 Componentes Disponibles

A continuación se detallan los componentes listos para usar:

### 1. Drawer (`lib-drawer`)

Un componente de navegación lateral potente con soporte para temas (dark/light), breadcrumbs y marcadores.

**Uso:**

```html
<lib-drawer
  [items]="menuItems"
  [themes]="{ light: 'light', dark: 'dark' }"
  [logout]="onLogout"
  [usuario]="'German'"
  [rol]="'Admin'"
  [(open)]="drawerState"
>
</lib-drawer>
```

**Propiedades Principales:**

- `items`: Lista de objetos con `label`, `routerLink`, `icon`.
- `themes`: Configuración de temas para el toggle.
- `usuario / rol`: Para identificación y guardado de bookmarks.
- `logout`: Función a ejecutar al cerrar sesión.

---

### 2. LoginCard (`lib-login-card`)

Una tarjeta de inicio de sesión estilizada y reactiva.

**Uso:**

```html
<lib-login-card
  [formgroup]="miFormulario"
  [data]="configuracionInput"
  [action]="hacerLogin"
  [actionLabel]="'Entrar'"
  [loading]="estaCargando"
>
</lib-login-card>
```

**Propiedades Principales:**

- `formgroup`: El `FormGroup` de Angular Reactive Forms.
- `data`: Objeto tipo `LoginData` con la configuración de los inputs.
- `action`: Función a ejecutar al presionar el botón de envío.
- `loading`: Estado visual de carga.

---

## 🎨 Personalización

La librería utiliza variables CSS para permitir personalización fácil de colores y estilos base.
