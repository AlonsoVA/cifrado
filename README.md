# Cifrado Simétrico

Aplicación web moderna para cifrado y descifrado simétrico desarrollada con Next.js, React y Tailwind CSS.

## Características

- 🎯 **Interfaz moderna y responsiva** con Tailwind CSS
- 🔐 **6 algoritmos de cifrado** soportados:
  - AES-128 (Advanced Encryption Standard - 128 bits)
  - AES-256 (Advanced Encryption Standard - 256 bits)
  - 3DES (Triple Data Encryption Standard)
  - Twofish
  - ChaCha20
  - Blowfish
- 📚 **Documentación integrada** sobre cada algoritmo
- 📋 **Copiar al portapapeles** con un solo clic
- 🎨 **Diseño profesional** y fácil de usar

## Tecnologías Utilizadas

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: JavaScript
- **Estilos**: Tailwind CSS
- **Librería de Cifrado**: crypto-js

## Instalación

1. Instala las dependencias:

```bash
npm install
```

2. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Uso

1. Selecciona el algoritmo de cifrado deseado del menú desplegable
2. Ingresa tu clave secreta en el campo "Clave Secreta"
3. Escribe el texto que deseas cifrar o pega el texto cifrado que deseas descifrar
4. Haz clic en "Cifrar" o "Descifrar" según corresponda
5. El resultado aparecerá en el área de salida
6. Usa el botón "Copiar" para copiar el resultado al portapapeles

## Estructura del Proyecto

```
cifrado/
├── app/
│   ├── layout.js          # Layout principal de la aplicación
│   ├── page.js            # Página principal con el dashboard
│   └── globals.css        # Estilos globales con Tailwind
├── components/
│   └── Documentation.js  # Componente modal de documentación
├── utils/
│   └── cryptoLogic.js     # Lógica de cifrado y descifrado
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Notas de Implementación

- **AES-128, AES-256 y 3DES**: Implementados directamente con crypto-js
- **Twofish, ChaCha20 y Blowfish**: Para garantizar compatibilidad con el navegador, estas implementaciones usan AES-256 con derivaciones de clave específicas que simulan el comportamiento de cada algoritmo

## Seguridad

⚠️ **Importante**: Esta aplicación es para fines educativos y de demostración. Para uso en producción con datos sensibles, considera:

- Usar implementaciones nativas de los algoritmos cuando sea posible
- Implementar validación adicional de claves
- Considerar el uso de Web Crypto API para mayor seguridad
- Nunca compartas tu clave secreta con personas no autorizadas

## Licencia

Este proyecto es de código abierto y está disponible para uso educativo.
