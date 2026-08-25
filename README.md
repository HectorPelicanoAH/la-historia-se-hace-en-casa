# La historia se hace en casa

Cuento infantil interactivo y programa familiar de historia. El MVP contiene el capítulo paleolítico **La llama compartida**, actividades seguras, un reto y el mapa editorial de 24 viajes. No usa cuentas, cookies, rastreadores ni backend.

## Desarrollo

Requiere Node.js 22.13 o posterior.

```bash
npm ci
npm run dev
npm run lint
npm test
```

## Exportación estática

`npm run build:pages` genera `out/`, crea `.nojekyll` y calcula automáticamente el `basePath`: vacío para un repositorio `usuario.github.io`, o `/<repositorio>` para un proyecto. Para probar ambos casos:

```bash
REPOSITORY_NAME=proyecto-demo npm run build:pages
REPOSITORY_NAME=usuario.github.io npm run build:pages
```

Sirve siempre `out/` por HTTP (por ejemplo, `npx serve out`), no mediante `file://`.

## Publicación

El workflow `.github/workflows/deploy-pages.yml` compila y publica cada push a `main`. En **Settings → Pages → Build and deployment**, selecciona **GitHub Actions**. La URL esperada es `https://hectorpelicanoah.github.io/la-historia-se-hace-en-casa/`.

## Criterio histórico y privacidad

La escena se sitúa hace unos 35.000 años. Las interpretaciones del arte se presentan con cautela y la tecnología como conocimiento aplicado. Las actividades infantiles excluyen fuego, filos y golpes reales. El progreso se guarda únicamente en `localStorage`, sin datos personales.
