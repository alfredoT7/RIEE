# Resumen de Cambios - Integración de Autenticación con Backend

## 📋 Cambios Realizados

### 1. ✅ Creado `authService.js`
**Ubicación:** `/src/renderer/src/services/authService.js`

Servicio centralizado para manejar autenticación:
- `login(username, password)` - Login con usuario o email
- `register(dentistData)` - Registro de dentista
- `logout()` - Cerrar sesión
- `getToken()` - Obtener token JWT
- `isAuthenticated()` - Verificar si está autenticado
- `getCurrentUser()` - Obtener usuario actual

**Características:**
- Maneja tokens JWT en localStorage
- Conecta con endpoints reales del backend
- Manejo de errores robusto

### 2. ✅ Actualizado `Api.js`
**Ubicación:** `/src/renderer/src/api/Api.js`

**Cambios:**
- ❌ **ELIMINADO:** Basic Authentication (username/password en headers)
- ✅ **AGREGADO:** Interceptor de requests para JWT
- ✅ **AGREGADO:** Interceptor de responses para manejar 401
- ✅ Token se agrega automáticamente como `Authorization: Bearer {token}`

```javascript
// Antes (Basic Auth)
auth: {
    username: username,
    password: password
}

// Ahora (JWT)
config.headers.Authorization = `Bearer ${token}`;
```

### 3. ✅ Actualizado `AuthContext.jsx`
**Ubicación:** `/src/renderer/src/context/AuthContext.jsx`

**Cambios:**
- Usa `authService` para todas las operaciones
- `login(username, password)` - ahora llama al backend real
- `register(dentistData)` - nuevo método para registro
- Manejo correcto de tokens JWT
- Estado de autenticación sincronizado con localStorage

### 4. ✅ Actualizado `Login.jsx`
**Ubicación:** `/src/renderer/src/pages/login/Login.jsx`

**Cambios:**
- Conectado con backend real via `AuthContext`
- Manejo de errores del servidor
- Mensajes de éxito/error con toast
- Loading states mejorados
- Redirección automática al home después de login exitoso

### 5. ✅ Actualizado `useRegister.js`
**Ubicación:** `/src/renderer/src/pages/register/useRegister.js`

**Cambios:**
- Usa `AuthContext.register()` en lugar de API directa
- Autenticación automática después del registro
- Redirección al home (ya autenticado)
- Mejor manejo de errores del backend

---

## 🔐 Flujo de Autenticación

### Login:
1. Usuario ingresa username/email y password
2. `Login.jsx` → `AuthContext.login()`
3. `AuthContext` → `authService.login()`
4. `authService` → POST a `/api/v1/riee/auth/login`
5. Backend responde con token JWT
6. Token guardado en localStorage
7. Estado de autenticación actualizado
8. Redirección al home

### Register:
1. Usuario completa formulario en 4 pasos
2. `Register.jsx` → `useRegister.handleSubmit()`
3. `useRegister` → `AuthContext.register()`
4. `AuthContext` → `authService.register()`
5. `authService` → POST a `/api/v1/riee/auth/register`
6. Backend responde con token JWT
7. Token guardado en localStorage
8. Usuario autenticado automáticamente
9. Redirección al home

### Requests Protegidos:
1. Usuario hace request a endpoint protegido
2. Interceptor de axios agrega `Authorization: Bearer {token}`
3. Backend valida token
4. Si token expirado → interceptor catch 401 → logout automático

---

## 🚀 Cómo Probar

### 1. Asegúrate de que el backend esté corriendo
```bash
# Backend debe estar en http://localhost:8080
```

### 2. Inicia la aplicación
```bash
npm run dev
```

### 3. Probar Login
- Ve a `/login`
- Ingresa credenciales de prueba:
  - Username: `juanperez` (o email: `juan.perez@dental.com`)
  - Password: `password123`
- Click en "Ingresar"
- Deberías ser redirigido al home

### 4. Probar Registro
- Ve a `/register`
- Completa los 4 pasos del formulario
- Click en "Registrar"
- Serás autenticado y redirigido al home

### 5. Verificar Token
- Abre DevTools → Application → Local Storage
- Deberías ver `token` y `user`

---

## 📝 Endpoints Usados

### Login
```
POST http://localhost:8080/api/v1/riee/auth/login
Content-Type: application/json

{
  "username": "juanperez",  // o email
  "password": "password123"
}

Response:
{
  "success": true,
  "status": 200,
  "message": "Login exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "type": null
  },
  "errors": null,
  "timestamp": "2025-11-06T23:06:54.806217470Z"
}
```

### Register
```
POST http://localhost:8080/api/v1/riee/auth/register
Content-Type: application/json

{
  "nombres": "Juan Carlos",
  "apellidos": "Pérez Gonzales",
  "email": "juan.perez@dental.com",
  "username": "juanperez",
  "telefono": 71234567,
  "ciDentista": 7654321,
  "universidad": "Universidad Mayor de San Andrés",
  "promocion": 2018,
  "imagenUrl": "https://example.com/photos/juan.jpg",
  "password": "password123",
  "especialidadIds": [1, 2]
}

Response:
{
  "success": true,
  "status": 201,
  "message": "Registro exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "type": null
  },
  "errors": null,
  "timestamp": "2025-11-06T23:07:46.116949512Z"
}
```

---

## 🔧 Archivos Modificados

1. ✨ **NUEVO:** `/src/renderer/src/services/authService.js`
2. ✨ **NUEVO:** `/src/renderer/src/components/auth/Login.jsx` (alternativo, no usado)
3. ✨ **NUEVO:** `/src/renderer/src/components/auth/Login.css` (alternativo, no usado)
4. 📝 **MODIFICADO:** `/src/renderer/src/api/Api.js`
5. 📝 **MODIFICADO:** `/src/renderer/src/context/AuthContext.jsx`
6. 📝 **MODIFICADO:** `/src/renderer/src/pages/login/Login.jsx`
7. 📝 **MODIFICADO:** `/src/renderer/src/pages/register/useRegister.js`

---

## ⚠️ Notas Importantes

1. **Token JWT:** Se guarda en localStorage (considera usar httpOnly cookies en producción)
2. **CORS:** Asegúrate de que el backend permita requests desde Electron
3. **Seguridad:** 
   - Tokens expiran (maneja renovación si es necesario)
   - Limpia tokens al hacer logout
   - Interceptor maneja expiración automáticamente

4. **Variables de entorno:** Ya no se usan VITE_API_USERNAME y VITE_API_PASSWORD

---

## 🎯 Próximos Pasos Recomendados

1. Implementar refresh token para sesiones largas
2. Agregar Google OAuth real (actualmente es placeholder)
3. Implementar "Olvidé mi contraseña"
4. Agregar rate limiting en el frontend
5. Mejorar mensajes de error específicos del backend
6. Agregar tests unitarios para authService

---

## 🐛 Troubleshooting

### Error: "Network Error"
- Verifica que el backend esté corriendo en http://localhost:8080
- Revisa CORS en el backend

### Error: 401 Unauthorized
- Token expirado o inválido
- El interceptor limpiará automáticamente el token

### Login no funciona
- Abre DevTools Console
- Revisa logs de errores
- Verifica que las credenciales sean correctas

### Token no se guarda
- Revisa permisos de localStorage
- Verifica que la respuesta del backend tenga el formato correcto

---

**Fecha:** 6 de Noviembre, 2025  
**Status:** ✅ Implementación Completa  
**Backend API:** http://localhost:8080/api/v1/riee/auth
