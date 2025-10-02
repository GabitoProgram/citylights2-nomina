# Instrucciones de Despliegue en Render

## Nómina Service

Este microservicio maneja la gestión de nóminas y reportes.

### Configuración de Variables de Entorno

Las siguientes variables deben configurarse en Render:

- `DATABASE_URL`: Se configura automáticamente desde la base de datos
- `NODE_ENV`: production
- `PORT`: 10000

### Comandos de Build

```bash
npm install && npm run build && npx prisma generate && npx prisma migrate deploy
```

### Comando de Start

```bash
npm run start:prod
```

## Características

- ✅ NestJS Framework
- ✅ PostgreSQL con Prisma ORM
- ✅ Generación de PDFs con jsPDF y PDFKit
- ✅ Generación de Excel con xlsx
- ✅ QR Code generation
- ✅ Integración con Puppeteer para reportes

## Nota sobre Puppeteer

Para solucionar problemas con Puppeteer en producción, asegúrate de tener esta configuración en main.ts:

```typescript
// En producción, configurar Puppeteer para entornos sin GUI
if (process.env.NODE_ENV === 'production') {
  process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = 'true';
  process.env.PUPPETEER_EXECUTABLE_PATH = '/usr/bin/chromium-browser';
}
```