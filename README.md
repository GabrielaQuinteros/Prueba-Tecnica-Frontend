<div align="center">

<img src="./src/assets/boxful-logo.png" alt="Logo de Boxful" width="190" />

# 📦 Prueba Técnica Boxful - Frontend

Aplicación web para registrar usuarios, crear envíos y consultar el historial de órdenes.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Responsive](https://img.shields.io/badge/Diseño-Responsive-3651D4)
![Flaticon](https://img.shields.io/badge/Iconos-Flaticon-FF3401)

</div>

---

## 📖 Descripción

Este repositorio contiene el frontend realizado para la prueba técnica Full Stack de Boxful.

La aplicación permite que un usuario se registre, inicie sesión, cree órdenes de envío y consulte su historial. También incluye las funcionalidades del punto extra relacionadas con pago contra entrega y visualización del monto a liquidar.

El diseño fue desarrollado tomando como referencia las vistas proporcionadas en Figma y se adaptó para funcionar tanto en computadoras como en dispositivos móviles.

El backend del proyecto se encuentra en:

🔗 [Prueba Técnica Boxful - Backend](https://github.com/GabrielaQuinteros/Prueba-Tecnica-Backend)

---

## ✨ Funcionalidades

### Autenticación

- Registro de usuarios.
- Inicio de sesión.
- Validación de formularios.
- Confirmación del número de teléfono.
- Validación de contraseñas iguales.
- Botones para mostrar u ocultar las contraseñas.
- Selección del código telefónico según el país.
- Mensaje específico cuando el correo ya está registrado.
- Almacenamiento temporal de la sesión.
- Protección de las rutas privadas.
- Cierre de sesión.

### Órdenes

- Formulario dividido en dos pasos.
- Información de recolección.
- Fecha programada.
- Información del destinatario.
- Código de país y número telefónico.
- Departamento y municipio.
- Punto de referencia e indicaciones.
- Creación dinámica de paquetes.
- Eliminación de paquetes antes de enviar la orden.
- Validación de medidas, peso y contenido.
- Modal de éxito después de crear y enviar una orden.
- Opción para crear otra orden o regresar al historial.

### Historial

- Consulta de las órdenes del usuario autenticado.
- Ordenamiento desde la orden más reciente.
- Filtros por fecha.
- Selección individual o múltiple de órdenes.
- Cantidad de paquetes por orden.
- Descarga opcional de órdenes en formato CSV.
- Tabla adaptable con desplazamiento horizontal en dispositivos pequeños.

### Punto extra

- Activación opcional de pago contra entrega.
- Ingreso del monto esperado.
- Visualización del monto total a liquidar.
- Actualización automática del total después de crear una orden.
- Consulta del resumen de liquidación al backend.
- Modal visual de orden enviada.

---

## 🖼️ Apartado visual

La aplicación utiliza la siguiente imagen en las pantallas de autenticación:

<div align="center">

<img src="./src/assets/boxful1.png" alt="Imagen utilizada en Login y Registro" width="280" />

</div>

Las cinco vistas principales son:

| Vista | Descripción |
| --- | --- |
| 🔐 Inicio de sesión | Permite ingresar utilizando correo electrónico y contraseña |
| 👤 Registro | Solicita los datos necesarios para crear una cuenta |
| 📍 Crear orden | Recopila la información de recolección y del destinatario |
| 📦 Agregar productos | Permite agregar y eliminar los paquetes de la orden |
| 🔎 Historial | Muestra, filtra, selecciona y descarga las órdenes creadas |

También se incluyen:

- Modal para confirmar el número de teléfono.
- Modal de creación exitosa.
- Menú lateral de navegación.
- Nombre del usuario autenticado.
- Monto actual a liquidar.

---

## 📱 Diseño responsive

La aplicación está preparada para utilizarse en diferentes tamaños de pantalla.

### Escritorio

- Menú lateral completo.
- Formularios organizados en columnas.
- Tabla de historial con todas sus columnas.
- Nombre del usuario y liquidación visibles en el encabezado.

### Dispositivos móviles

- Menú lateral reducido.
- Navegación mediante iconos.
- Formularios organizados en una sola columna.
- Botones adaptados al ancho disponible.
- Tabla con desplazamiento horizontal interno.
- Encabezado y monto de liquidación ajustados.
- Sin desplazamiento horizontal en toda la página.

El ancho mínimo soportado es de `320px`.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
| --- | --- |
| React | Creación de componentes y vistas |
| TypeScript | Tipado de formularios, respuestas y modelos |
| Vite | Entorno de desarrollo y compilación |
| React Router | Navegación y protección de rutas |
| Axios | Comunicación con el backend |
| Flaticon UIcons | Iconos de la interfaz |
| CSS | Diseño responsive y estilos basados en Figma |

---

## 📁 Estructura del proyecto

```text
frontend/
├── src/
│   ├── assets/
│   │   ├── boxful-logo.png
│   │   └── boxful1.png
│   ├── components/
│   │   └── AppLayout.tsx
│   ├── lib/
│   │   └── api.ts
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── NewOrderPage.tsx
│   │   └── OrdersPage.tsx
│   ├── styles/
│   │   ├── auth.css
│   │   └── history.css
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── package.json
└── README.md
```

---

## ✅ Requisitos

Antes de iniciar se necesita:

- Node.js `20.19` o superior dentro de la versión 20, o Node.js `22.12` o superior.
- npm.
- El backend de Boxful funcionando.
- MongoDB activo para que el backend pueda guardar los datos.

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/GabrielaQuinteros/Prueba-Tecnica-Frontend.git
cd Prueba-Tecnica-Frontend
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Configurar la dirección del backend

La aplicación utiliza por defecto:

```text
http://localhost:3000
```

Copia `.env.example` como `.env.local`. Si el backend utiliza otra dirección, modifica `VITE_API_URL` dentro de ese archivo:

```env
VITE_API_URL="http://localhost:3000"
```

### 4. Iniciar el backend

Antes de ejecutar el frontend, comprueba que el backend esté funcionando en el puerto configurado.

### 5. Iniciar el frontend

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

---

## 🔗 Rutas de la aplicación

| Ruta | Acceso | Descripción |
| --- | --- | --- |
| `/login` | Pública | Inicio de sesión |
| `/register` | Pública | Registro de usuario |
| `/orders/new` | Privada | Creación de una orden |
| `/orders` | Privada | Historial de órdenes |

Las rutas privadas requieren un token guardado en la sesión.

Si un usuario intenta ingresar sin autenticarse, será enviado a `/login`.

---

## 🔐 Manejo de la sesión

Después del registro o inicio de sesión se almacenan temporalmente:

```text
boxful_token
boxful_user
```

Estos datos se guardan en `sessionStorage`.

Se eligió `sessionStorage` para que la información de la sesión permanezca solamente durante la sesión actual del navegador.

Axios agrega automáticamente el token a las peticiones:

```text
Authorization: Bearer TOKEN_JWT
```

Si el backend responde con `401 Unauthorized`, el token inválido es eliminado.

Al cerrar sesión se eliminan el token y los datos del usuario.

---

## 👤 Registro

El registro solicita:

- Nombre.
- Apellido.
- Sexo.
- Fecha de nacimiento.
- Correo electrónico.
- Código de país.
- Número de WhatsApp.
- Contraseña.
- Repetición de contraseña.

Antes de enviar los datos se muestra un modal para confirmar el número telefónico.

El usuario puede:

- Aceptar y continuar con el registro.
- Cancelar y corregir el número.
- Cerrar el modal.

Los campos de contraseña incluyen iconos para mostrar u ocultar su contenido.

Si el correo ya existe, se muestra:

```text
Este correo ya está registrado. Usa un correo diferente o inicia sesión.
```

---

## 🔑 Inicio de sesión

El usuario ingresa:

- Correo electrónico.
- Contraseña.

Cuando las credenciales son correctas:

1. Se guarda el token JWT.
2. Se guarda la información básica del usuario.
3. Se abre la pantalla para crear una orden.

Cuando las credenciales son incorrectas se muestra un mensaje y el usuario permanece en Login.

---

## 📍 Creación de una orden

La creación está dividida en dos pasos para que el formulario sea más sencillo.

### Paso 1: datos del envío

Se solicitan:

- Dirección de recolección.
- Fecha programada.
- Nombre y apellido del destinatario.
- Correo electrónico.
- Teléfono.
- Dirección del destinatario.
- Departamento.
- Municipio.
- Punto de referencia.
- Indicaciones adicionales.
- Pago contra entrega, si aplica.
- Monto esperado del pago contra entrega.

El campo de fecha permite escribir la fecha o seleccionarla utilizando el calendario.

### Paso 2: productos

Cada producto solicita:

- Largo en centímetros.
- Alto en centímetros.
- Ancho en centímetros.
- Peso en libras.
- Contenido del paquete.

Los campos numéricos comienzan vacíos para que el usuario pueda escribir directamente.

Después de completar los datos se presiona **Agregar**. El producto aparece en el listado inferior y puede eliminarse antes de enviar la orden.

La aplicación no permite enviar una orden sin productos.

---

## 💵 Pago contra entrega

El pago contra entrega, también llamado PCE o COD, es opcional.

Cuando el interruptor está desactivado:

- No se solicita un monto.
- El campo permanece deshabilitado.
- La orden se crea como una orden normal sin cobro al destinatario.

Cuando se activa:

- El campo de monto esperado queda disponible.
- El monto debe ser mayor que cero.
- El valor se envía al backend junto con la orden.

El monto esperado puede ser diferente del monto real que finalmente recolecte el repartidor.

El cálculo final no se realiza en el navegador. El backend es responsable de aplicar el costo del envío y la comisión correspondiente.

---

## 💰 Monto a liquidar

El encabezado de las pantallas privadas consulta:

```http
GET /orders/settlement-summary
```

El total se actualiza:

- Al entrar a una pantalla privada.
- Después de crear una orden.
- Cuando el usuario cambia entre las vistas principales.

La cantidad mostrada puede ser positiva o negativa, dependiendo de las órdenes COD y no COD del usuario.

### Orden con pago contra entrega

El monto esperado ingresado al crear la orden no aumenta inmediatamente el total a liquidar.

Cuando el webhook confirma que la orden fue pagada y registra el monto real recolectado, el backend calcula:

```text
Liquidación = monto real recolectado - costo de envío - comisión COD
```

La comisión se calcula así:

```text
Comisión COD = monto real recolectado × 0.0001
```

Esto equivale al `0.01%` y tiene un máximo de `$25.00` por orden.

### Orden sin pago contra entrega

Para una orden sin COD/PCE se calcula:

```text
Liquidación = - costo de envío
```

Por esta razón el monto total también puede mostrar un valor negativo.

El cálculo financiero, los costos por día y las actualizaciones mediante webhook se procesan en el backend.

---

## 🔎 Historial y filtros

El historial consulta las órdenes mediante:

```http
GET /orders
```

Los filtros seleccionados se envían al backend:

```http
GET /orders?from=YYYY-MM-DD&to=YYYY-MM-DD
```

De esta forma el filtrado ocurre directamente en MongoDB y el frontend recibe únicamente los resultados necesarios.

El historial también permite:

- Seleccionar una orden.
- Seleccionar todas las órdenes visibles.
- Consultar la cantidad de paquetes.
- Descargar las órdenes filtradas o seleccionadas.

Las órdenes aparecen desde la más reciente hasta la más antigua.

---

## 📄 Descarga CSV

La descarga CSV es opcional según los requerimientos, pero fue incluida en el proyecto.

Si existen órdenes seleccionadas, solamente se descargan esas órdenes. Si no hay ninguna seleccionada, se descargan todas las órdenes visibles.

El archivo incluye:

- Número de orden.
- Información del destinatario.
- Teléfono.
- Direcciones.
- Departamento y municipio.
- Fecha programada.
- Estado.
- Cantidad de paquetes.
- Contenido.

### ¿Cómo se genera el CSV?

El archivo se genera directamente en el frontend desde `OrdersPage.tsx`.

El proceso consiste en:

1. Tomar las órdenes seleccionadas o todas las órdenes visibles.
2. Convertir cada orden en una fila.
3. Escapar comillas y valores que podrían interpretarse como fórmulas.
4. Unir los encabezados y las filas utilizando comas.
5. Crear el archivo con `Blob` y descargarlo mediante un enlace temporal.

```ts
const csvContent = [
  headers.map(escapeCsv).join(','),
  ...rows.map((row) => row.map(escapeCsv).join(',')),
].join('\n');

const csvFile = new Blob([`\uFEFF${csvContent}`], {
  type: 'text/csv;charset=utf-8',
});
```

Se utiliza `\uFEFF` para que Excel reconozca correctamente la codificación UTF-8 y muestre caracteres como tildes y la letra `ñ`.

También se protegen las celdas que comienzan con caracteres como `=`, `+`, `-` o `@`, evitando que una hoja de cálculo las interprete como fórmulas.

El código completo se encuentra en:

```text
src/pages/OrdersPage.tsx
```

---

## 🎨 Diseño e iconos

Los iconos utilizados pertenecen a Flaticon UIcons:

```css
@import '@flaticon/flaticon-uicons/css/regular/rounded.css';
```

Entre ellos se encuentran:

- Agregar.
- Buscar.
- Calendario.
- Caja.
- Eliminar.
- Mostrar contraseña.
- Ocultar contraseña.
- Cerrar sesión.
- Flechas de navegación.
- Liquidación.
- Confirmación y advertencia.

---

## 🧪 Comprobaciones del proyecto

### Compilar el frontend

```bash
npm run build
```

### Ejecutar el análisis estático

```bash
npm run lint
```

Antes de crear un commit se recomienda ejecutar ambos comandos.

---

## 📜 Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia Vite en modo desarrollo |
| `npm run build` | Compila TypeScript y genera la versión de producción |
| `npm run lint` | Revisa el código |
| `npm run preview` | Muestra localmente la compilación de producción |

---

## ⚠️ Errores comunes

### El navegador muestra `ERR_CONNECTION_REFUSED`

Comprueba que el frontend esté funcionando:

```bash
npm run dev
```

### No se pueden cargar las órdenes

Comprueba que:

- El backend esté activo.
- MongoDB esté funcionando.
- La dirección de `VITE_API_URL` sea correcta.
- El token no haya expirado o sido eliminado.

### El backend responde con `401 Unauthorized`

Cierra la sesión e ingresa nuevamente para obtener un token válido.

### El puerto 5173 ya está ocupado

Puede existir otra instancia de Vite ejecutándose. Se debe cerrar el proceso anterior o utilizar la dirección alternativa que muestre Vite.

### Los cambios no aparecen

Guarda los archivos y actualiza el navegador. Vite normalmente aplica los cambios automáticamente durante el desarrollo.

---

## 📝 Anotaciones del desarrollo

- React era una tecnología requerida para las vistas, por eso se utilizó junto con TypeScript.
- NextJS y Ant Design se indicaban como tecnologías sugeridas, no obligatorias. Se eligió Vite para mantener una estructura sencilla y enfocarse en el flujo solicitado.
- Las vistas fueron construidas tomando como referencia el diseño proporcionado en Figma.
- Los estilos se separaron parcialmente entre autenticación, historial y estilos generales para que sea más fácil ubicar cada pantalla.
- Los formularios utilizan componentes controlados para conservar los valores entre pasos.
- Los paquetes se mantienen temporalmente en el estado del formulario hasta que la orden es enviada.
- Los paquetes agregados pueden eliminarse antes de enviar la orden.
- Los filtros se envían al backend y no se aplican solamente en el navegador.
- El nombre mostrado en el encabezado se obtiene del usuario autenticado.
- Todos los iconos funcionales pertenecen a Flaticon UIcons.
- La misma imagen fue utilizada en Login y Registro para mantener consistencia visual.
- La tabla del historial utiliza desplazamiento horizontal interno en pantallas pequeñas para no romper el diseño.
- La descarga CSV se genera desde el navegador porque era una funcionalidad opcional.
- El cálculo financiero y la actualización del webhook se mantienen en el backend para no duplicar reglas de negocio en el frontend.

---

## 🔭 Posibles mejoras

Estas funcionalidades no forman parte del alcance actual, pero podrían agregarse después:

- Recuperación de contraseña.
- Renovación automática del token.
- Notificaciones visuales tipo toast.
- Paginación del historial.
- Detalle completo de cada orden.
- Edición de un paquete ya agregado.
- Pruebas automatizadas del frontend.
- Selector de departamentos y municipios.
- Mejoras de accesibilidad mediante pruebas específicas.
- Despliegue público del frontend.
- Tema oscuro.

---

## 👩‍💻 Autora

Desarrollado por **Gabriela Quinteros** como parte de la prueba técnica Full Stack de Boxful.