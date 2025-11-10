import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.ts", "**/*.tsx"], // Aplica estas reglas solo a archivos TS/TSX
    rules: {
      // 1. Desactiva la regla que prohíbe el uso de 'any' explícito.
      // Esto permitirá que uses 'as any' sin advertencias.
      "@typescript-eslint/no-explicit-any": "off", 
      
      // Opcional: Si tienes otras reglas de TS que te molestan (ej: require type imports)
      // "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
