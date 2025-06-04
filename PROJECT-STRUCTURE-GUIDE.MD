# 📁 Proyecto React Native con TypeScript — Buenas Prácticas

Este documento describe las mejores prácticas y estructura recomendada para tu proyecto **React Native + TypeScript** (como `ups-parking`).

---

## 📦 Estructura de Carpetas Sugerida

```
app/
  zone/
    components/
      ParkingLot.tsx
      ParkingArea.tsx
    icons/
      CarIcon.tsx
      PregnantIcon.tsx
    screens/
      ZoneOverviewScreen.tsx
    services/
      zoneService.ts
    hooks/
      useZone.ts
    types.ts
  speech/
    SpeechRecognition.tsx
    hooks/
      useSpeech.ts
    types.ts
components/
  ui/
    Button.tsx
    Spinner.tsx
  layout/
    PageWrapper.tsx
  text/
    ThemedText.tsx
    SvgThemedText.tsx
constants/
docs/
hooks/
  useTheme.ts
resources/
services/
  api.ts
  parkingService.ts
types/
  global.d.ts
utils/
  formatDate.ts
  logger.ts

README.md
.eslintrc.js
prettier.config.js
tsconfig.json
```

---

## 🧠 Buenas Prácticas con TypeScript

### ✅ Tipado estricto y claro
- Usa `type` para objetos literales y `interface` si vas a extender.
- No uses `any`, prefiere `unknown` + validación.

```ts
interface ParkingLot {
  id: number;
  zone: string;
  status: "available" | "occupied";
}
```

### ✅ Props bien definidas
```ts
type Props = {
  title: string;
  optionalValue?: number;
};
```

---

## ⚙️ Configuraciones Recomendadas

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@/app/*": ["app/*"],
      "@/components/*": ["components/*"]
    }
  }
}
```

### ESLint + Prettier
Instala:
```bash
yarn add -D eslint prettier eslint-config-prettier @typescript-eslint/eslint-plugin
```
Configura `.eslintrc.js`:
```js
module.exports = {
  extends: ["plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
};
```

---

## 🧩 React Query
```ts
const { data, isLoading } = useQuery([
  "zones",
  zoneId
], () => fetchZoneById(zoneId));
```

- Usa `enabled` para evitar llamadas innecesarias.
- Usa `select` para transformar datos.

---

## 🎨 Theming con NativeWind
```tsx
<View className="bg-white dark:bg-black p-4 rounded-xl">
  <Text className="text-gray-800 dark:text-white">Zona 1</Text>
</View>
```

---

## 🔐 Manejo de Errores
```ts
export const useHandleError = (error: unknown) => {
  const message = error instanceof AxiosError ? error.response?.data?.message : "Error desconocido";
  alert(message);
};
```

---

## 🗂️ Tipos Globales
```ts
// types/global.d.ts

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Zone: { id: string };
    }
  }
}
```

---

## 📄 README.md sugerido
```md
# 🚗 UPS Parking — React Native App

App móvil para gestión de parqueaderos con reconocimiento de voz, SVG dinámico y actualización en tiempo real.

## 📦 Tecnologías
- React Native + Expo
- TypeScript
- React Query
- NativeWind
- FastAPI (Backend)
- PostgreSQL

## 🧠 Funcionalidades
- Renderizado de zonas/franjas SVG desde la base de datos
- Reconocimiento de voz con NLP
- Estado en tiempo real de parqueaderos
- Interfaz adaptada a tema claro/oscuro
```

---

🚀 **¿Quieres que prepare una estructura base con carpetas vacías y archivos iniciales para copiar?**

