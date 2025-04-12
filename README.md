# 🧠 Smart Product Search

Una aplicación web construida con **Next.js (App Router)** y **TailwindCSS** que permite buscar productos usando lenguaje natural gracias a una integración con **OpenAI** o modelos similares. Muestra resultados recomendados con una interfaz clara, moderna y responsiva.

## 🚀 Tecnologías usadas

- [Next.js 14](https://nextjs.org/) con App Router
- [TailwindCSS](https://tailwindcss.com/) para estilos
- [OpenAI API](https://platform.openai.com/)
- api dummyjson (`https://dummyjson.com/products`)

## 📦 Funcionalidades (MVP)

- [x] Input para búsqueda con lenguaje natural
- [x] Productos simulados con `products.json`
- [x] Interfaz con cards de productos (nombre, imagen, precio, descripción)
- [x] Integración con modelo de IA para recomendar productos
- [x] Mostrar razón de cada recomendación

## ✨ Mejoras previstas

- [x] Ruta dinámica para detalle del producto `/product/[id]`
- [x] Animación de carga tipo ChatGPT
- [x] Validación de accesibilidad y diseño responsive
- [x] Deploy en Vercel con variables de entorno


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
