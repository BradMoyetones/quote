# App de referencia

https://app.formatocotizacion.com/es

## Creación de Logo

- https://yqnn.github.io/svg-path-editor/

- https://danmarshall.github.io/google-font-to-svg-path/

- https://www.figma.com/


## Themes and components

- https://tweakcn.com/editor/theme

- https://animate-ui.com/

- https://ui.shadcn.com/

- https://tailark.com

## Prisma Commands

| Script | Comando | Descripción |
|--------|---------|-------------|
| `prisma:generate` | `prisma generate` | Genera el cliente de Prisma después de editar el `schema.prisma`. |
| `prisma:format` | `prisma format` | Formatea el archivo `schema.prisma` automáticamente. |
| `prisma:push` | `prisma db push` | Sincroniza el schema con la base de datos sin migraciones (solo dev). |
| `prisma:migrate` | `prisma migrate dev` | Crea una migración y la aplica a la base de datos. |
| `prisma:studio` | `prisma studio` | Abre el panel visual para inspeccionar y editar datos. |

### Workflow recomendado

1. Edita `schema.prisma`
2. Ejecuta:

```sh
npm run prisma:format
npm run prisma:generate
npm run prisma:push      # o prisma:migrate si es cambio definitivo
```

3. Abre Prisma Studio (opcional)

```sh
npm run prisma:studio
```