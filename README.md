# Guía Completa de Comandos de Git

## Introducción
Git es un sistema de control de versiones distribuido que te permite rastrear cambios en tu código. Esta guía te proporciona los comandos más importantes con explicaciones detalladas sobre cuándo usarlos y cuándo evitarlos.

---

## 📋 TABLA DE CONTENIDOS
1. [Configuración Inicial](#configuración-inicial)
2. [Comandos Básicos](#comandos-básicos)
3. [Trabajo con Cambios](#trabajo-con-cambios)
4. [Commits](#commits)
5. [Ramas](#ramas)
6. [Fusión de Código](#fusión-de-código)
7. [Historial](#historial)
8. [Sincronización Remota](#sincronización-remota)
9. [Deshaciendo Cambios](#deshaciendo-cambios)
10. [Etiquetas](#etiquetas)
11. [Colaboración Avanzada](#colaboración-avanzada)

---

## Configuración Inicial

### `git config --global user.name "Tu Nombre"`
**¿Qué hace?** Define tu nombre de usuario en Git a nivel global.

**¿Cuándo usarlo?**
- Primera vez que instalas Git
- Cuando necesitas cambiar tu nombre de usuario
- Antes de hacer tus primeros commits

**¿Cuándo NO usarlo?**
- No lo ejecutes múltiples veces sin necesidad (innecesario)

**Ejemplo:**
```bash
git config --global user.name "Juan José"
git config --global user.email "juan@example.com"
```

---

### `git config --list`
**¿Qué hace?** Muestra todas las configuraciones de Git.

**¿Cuándo usarlo?**
- Para verificar que tu configuración sea correcta
- Cuando necesitas revisar qué usuario tienes configurado
- Solucionar problemas de configuración

**¿Cuándo NO usarlo?**
- No hay casos donde no deba usarse

---

## Comandos Básicos

### `git init`
**¿Qué hace?** Inicializa un nuevo repositorio Git en la carpeta actual.

**¿Cuándo usarlo?**
- Cuando empiezas un nuevo proyecto
- Para convertir una carpeta existente en repositorio Git

**¿Cuándo NO usarlo?**
- Si el repositorio ya existe (evita ejecutarlo dos veces)
- Cuando ya tienes un `.git` folder

**Ejemplo:**
```bash
git init mi-proyecto
```

---

### `git clone <URL>`
**¿Qué hace?** Descarga un repositorio remoto a tu máquina local.

**¿Cuándo usarlo?**
- Para descargar un proyecto existente
- Cuando necesitas trabajar en un repositorio compartido
- Para hacer una copia local de un proyecto en GitHub

**¿Cuándo NO usarlo?**
- Si ya tienes el repositorio descargado
- Cuando necesitas actualizar (usa `git pull` en lugar)

**Ejemplo:**
```bash
git clone https://github.com/usuario/proyecto.git
git clone https://github.com/usuario/proyecto.git mi-carpeta
```

---

## Trabajo con Cambios

### `git status`
**¿Qué hace?** Muestra el estado actual del repositorio (archivos modificados, nuevos, eliminados).

**¿Cuándo usarlo?**
- Constantemente, para ver qué has cambiado
- Antes de hacer commit
- Para verificar en qué rama estás

**¿Cuándo NO usarlo?**
- No hay caso donde evitarlo

**Ejemplo:**
```bash
git status
```

---

### `git add <archivo>`
**¿Qué hace?** Prepara archivos para el commit (los añade al área de staging).

**¿Cuándo usarlo?**
- Después de hacer cambios que quieras guardar
- Antes de hacer commit
- Para elegir qué cambios incluir en el commit

**¿Cuándo NO usarlo?**
- No agregues archivos que no quieras versionar
- No agregues archivos con información sensible

**Ejemplo:**
```bash
git add archivo.txt
git add . # Agrega todos los cambios
git add src/ # Agrega una carpeta completa
```

---

### `git add .`
**¿Qué hace?** Agrega TODOS los cambios del directorio actual.

**¿Cuándo usarlo?**
- Cuando todos tus cambios deben incluirse en el commit
- Al final de una tarea completa

**¿Cuándo NO usarlo?**
- Cuando tienes archivos sin terminar
- Si hay cambios que no deberían ir juntos
- Cuando hay archivos con información sensible (contraseñas, tokens)

**Ejemplo:**
```bash
git add .
```

---

### `git diff`
**¿Qué hace?** Muestra las diferencias entre tu versión actual y la versión anterior.

**¿Cuándo usarlo?**
- Para revisar exactamente qué cambiaste
- Antes de hacer commit para verificar cambios
- Para comparar versiones

**¿Cuándo NO usarlo?**
- No hay caso donde evitarlo

**Ejemplo:**
```bash
git diff
git diff archivo.txt
git diff rama1 rama2
```

---

### `git diff --staged`
**¿Qué hace?** Muestra las diferencias entre archivos preparados (staged) y la última versión.

**¿Cuándo usarlo?**
- Después de `git add` para revisar qué irá en el commit
- Para verificar cambios antes de confirmarlos

**¿Cuándo NO usarlo?**
- No hay caso donde evitarlo

**Ejemplo:**
```bash
git diff --staged
```

---

## Commits

### `git commit -m "Mensaje descriptivo"`
**¿Qué hace?** Guarda los cambios preparados en el historial de Git con un mensaje descriptivo.

**¿Cuándo usarlo?**
- Después de `git add` cuando tus cambios están completos
- Regularmente durante el desarrollo
- Cuando completaste una tarea o corrección

**¿Cuándo NO usarlo?**
- No hagas commit de código incompleto
- No commits sin mensaje (siempre describe qué hiciste)
- No commits muy grandes (mejor varios commits pequeños)

**Ejemplo:**
```bash
git commit -m "Añade función de autenticación"
git commit -m "Fix: corrige bug en validación de email"
```

---

### `git commit -am "Mensaje"`
**¿Qué hace?** Agrega (add) y hace commit en un solo comando, pero SOLO para archivos ya rastreados.

**¿Cuándo usarlo?**
- Cuando sabes que todos los cambios deben ir al commit
- Para archivos que ya están en Git
- Como atajo después de pequeñas modificaciones

**¿Cuándo NO usarlo?**
- Cuando tienes archivos nuevos (usa `git add .` primero)
- Cuando quieres revisar los cambios antes (usa `git status`)
- Cuando tienes cambios parciales

**Ejemplo:**
```bash
git commit -am "Actualiza documentación"
```

---

### `git commit --amend`
**¿Qué hace?** Modifica el último commit (añade cambios o cambia el mensaje).

**¿Cuándo usarlo?**
- Cuando olvidas agregar un archivo al último commit
- Para corregir el mensaje del último commit
- Cuando quieres incluir pequeños cambios en el commit anterior

**¿Cuándo NO usarlo?**
- **NUNCA** después de hacer push (si ya lo subiste)
- Cuando hay commits posteriores al que quieres modificar
- Si el commit ya está compartido en el equipo

**Ejemplo:**
```bash
git add archivo-olvidado.txt
git commit --amend --no-edit # Añade sin cambiar el mensaje
git commit --amend -m "Nuevo mensaje" # Cambia el mensaje
```

---

## Ramas

### `git branch`
**¿Qué hace?** Lista todas tus ramas locales.

**¿Cuándo usarlo?**
- Para ver en qué rama estás
- Para verificar qué ramas existen
- Como referencia antes de cambiar de rama

**¿Cuándo NO usarlo?**
- No hay caso donde evitarlo

**Ejemplo:**
```bash
git branch
git branch -a # Muestra ramas locales y remotas
```

---

### `git branch <nombre-rama>`
**¿Qué hace?** Crea una nueva rama.

**¿Cuándo usarlo?**
- Cuando empiezas a trabajar en una nueva característica
- Para aislar cambios antes de fusionarlos
- Cuando trabajas en equipo (rama por característica)

**¿Cuándo NO usarlo?**
- No crees demasiadas ramas sin propósito
- No hagas ramas de ramas si no es necesario

**Ejemplo:**
```bash
git branch feature/nueva-caracteristica
git branch bugfix/corregir-login
```

---

### `git checkout <nombre-rama>`
**¿Qué hace?** Cambia a otra rama.

**¿Cuándo usarlo?**
- Para cambiar entre ramas de trabajo
- Para volver a la rama principal (main/master)
- Para trabajar en diferentes características

**¿Cuándo NO usarlo?**
- Cuando tienes cambios sin commit (Git te avisará)
- No cambies entre ramas sin guardar tu trabajo

**Ejemplo:**
```bash
git checkout main
git checkout feature/nueva-caracteristica
```

---

### `git checkout -b <nombre-rama>`
**¿Qué hace?** Crea una rama NUEVA y cambia a ella en un solo comando.

**¿Cuándo usarlo?**
- Es la forma más común de empezar una nueva rama
- Cuando necesitas crear y cambiar en uno sola acción
- Como atajo para `git branch` + `git checkout`

**¿Cuándo NO usarlo?**
- No cuando necesitas crear una rama basada en una rama que no es la actual

**Ejemplo:**
```bash
git checkout -b feature/login
git checkout -b bugfix/problema-crítico
```

---

### `git switch <nombre-rama>`
**¿Qué hace?** Cambia a otra rama (comando más moderno que `checkout`).

**¿Cuándo usarlo?**
- En versiones recientes de Git (2.23+)
- Como alternativa moderna a `git checkout`
- Más clara intención (cambiar rama vs otros usos de checkout)

**¿Cuándo NO usarlo?**
- En versiones antiguas de Git (usa `git checkout` entonces)

**Ejemplo:**
```bash
git switch main
git switch -c feature/nueva # Crea y cambia (-c)
```

---

### `git branch -d <nombre-rama>`
**¿Qué hace?** Elimina una rama localmente.

**¿Cuándo usarlo?**
- Después de fusionar una rama (cuando ya no la necesitas)
- Para limpiar ramas antiguas
- Para eliminar ramas de desarrollo locales

**¿Cuándo NO usarlo?**
- No elimines ramas con cambios sin fusionar
- No elimines la rama principal (main/master)
- Usa `-D` solo si estás SEGURO de lo que haces

**Ejemplo:**
```bash
git branch -d feature/completada
git branch -D feature/sin-usar # Fuerza la eliminación
```

---

## Fusión de Código

### `git merge <nombre-rama>`
**¿Qué hace?** Fusiona otra rama en la rama actual.

**¿Cuándo usarlo?**
- Cuando terminas una característica y quieres llevarla a main
- Para combinar el trabajo de diferentes ramas
- Cuando otra rama está lista para integración

**¿Cuándo NO usarlo?**
- Cuando hay conflictos sin resolver
- No hagas merge de ramas sin revisar los cambios
- No hagas merge a ramas protegidas sin aprobación

**Ejemplo:**
```bash
git checkout main
git merge feature/nueva-caracteristica
```

---

### `git merge --no-ff <rama>`
**¿Qué hace?** Fusiona creando siempre un commit de merge (mantiene historial limpio).

**¿Cuándo usarlo?**
- Para mantener un historial claro de dónde vienen los cambios
- En proyectos profesionales
- Cuando trabajas en equipo

**¿Cuándo NO usarlo?**
- En proyectos pequeños puede ser excesivo

**Ejemplo:**
```bash
git merge --no-ff feature/authentication
```

---

### `git rebase <rama>`
**¿Qué hace?** Reapila tus commits encima de otra rama (reescribe el historial).

**¿Cuándo usarlo?**
- Para limpiar el historial antes de push
- Para evitar merges innecesarios
- Cuando quieres un historial lineal

**¿Cuándo NO usarlo?**
- **NUNCA** después de hacer push (si otros ya usan tus commits)
- En ramas compartidas
- Si no entienes bien cómo funciona rebase

**Ejemplo:**
```bash
git rebase main
```

---

## Historial

### `git log`
**¿Qué hace?** Muestra el historial de commits.

**¿Cuándo usarlo?**
- Para ver qué cambios se han hecho
- Para encontrar cuándo se introdujo un bug
- Para entender la historia del proyecto

**¿Cuándo NO usarlo?**
- No hay caso donde evitarlo

**Ejemplo:**
```bash
git log
git log --oneline # Versión resumida
git log --graph --decorate --oneline --all # Versión bonita
git log -n 5 # Últimos 5 commits
```

---

### `git log -p`
**¿Qué hace?** Muestra el historial con los cambios línea por línea.

**¿Cuándo usarlo?**
- Para ver exactamente qué cambió en cada commit
- Para entender cambios específicos
- Para investigar bugs

**¿Cuándo NO usarlo?**
- Cuando necesitas solo una visión general

**Ejemplo:**
```bash
git log -p
git log -p -n 3 # Últimos 3 commits con cambios
```

---

### `git blame <archivo>`
**¿Qué hace?** Muestra quién hizo cada línea del archivo.

**¿Cuándo usarlo?**
- Para saber quién escribió una línea específica
- Para encontrar cuándo se introdujo algo
- Para pedir explicación sobre un cambio

**¿Cuándo NO usarlo?**
- No para "culpar" a alguien, sino para entender cambios

**Ejemplo:**
```bash
git blame archivo.js
```

---

### `git show <commit-id>`
**¿Qué hace?** Muestra los detalles de un commit específico.

**¿Cuándo usarlo?**
- Para ver qué cambió en un commit
- Para entender un cambio específico
- Para revisar un commit en particular

**¿Cuándo NO usarlo?**
- Cuando necesitas ver todos los cambios (usa `git log`)

**Ejemplo:**
```bash
git show abc123
git show HEAD~2 # Dos commits atrás
```

---

## Sincronización Remota

### `git remote`
**¿Qué hace?** Muestra los repositorios remotos conectados.

**¿Cuándo usarlo?**
- Para verificar qué remotos tienes configurados
- Para ver dónde estás compartiendo código

**¿Cuándo NO usarlo?**
- No hay caso donde evitarlo

**Ejemplo:**
```bash
git remote
git remote -v # Muestra URLs completas
```

---

### `git remote add <nombre> <URL>`
**¿Qué hace?** Añade un nuevo repositorio remoto.

**¿Cuándo usarlo?**
- Cuando necesitas conectar tu repositorio local a GitHub/GitLab
- Para agregar un segundo repositorio remoto
- Después de crear un repositorio local con `git init`

**¿Cuándo NO usarlo?**
- No agregues remotos inválidos
- No agregues el mismo remoto dos veces

**Ejemplo:**
```bash
git remote add origin https://github.com/usuario/proyecto.git
```

---

### `git push <remoto> <rama>`
**¿Qué hace?** Sube tus commits locales al repositorio remoto.

**¿Cuándo usarlo?**
- Cuando terminas tu trabajo y quieres compartirlo
- Regularmente durante el desarrollo
- Cuando necesitas guardar tu código en la nube

**¿Cuándo NO usarlo?**
- No hagas push de código incompleto o roto
- No hagas push a ramas protegidas sin aprobación

**Ejemplo:**
```bash
git push origin main
git push origin feature/nueva-caracteristica
```

---

### `git push -u origin <rama>`
**¿Qué hace?** Sube y conecta una rama local con su versión remota.

**¿Cuándo usarlo?**
- Primera vez que subes una rama
- Establece el tracking automático para futuros push/pull
- Necesario para nuevas ramas

**¿Cuándo NO usarlo?**
- No cuando la rama ya existe en remoto

**Ejemplo:**
```bash
git push -u origin feature/login
```

---

### `git pull <remoto> <rama>`
**¿Qué hace?** Descarga cambios del remoto y los fusiona con tu rama actual.

**¿Cuándo usarlo?**
- Para obtener cambios que otros hicieron
- Regularmente durante desarrollo en equipo
- Antes de empezar a trabajar

**¿Cuándo NO usarlo?**
- Cuando tienes cambios sin commit (Git te prevendrá)

**Ejemplo:**
```bash
git pull origin main
git pull # Si ya tienes tracking
```

---

### `git fetch <remoto>`
**¿Qué hace?** Descarga cambios del remoto SIN fusionarlos.

**¿Cuándo usarlo?**
- Para ver qué cambios hay sin afectar tu trabajo
- Cuando quieres revisar antes de fusionar
- Para actualizar referencias remotas

**¿Cuándo NO usarlo?**
- Cuando necesitas integrar cambios inmediatamente (usa `git pull`)

**Ejemplo:**
```bash
git fetch origin
git fetch # Fetch de todos los remotos
```

---

## Deshaciendo Cambios

### `git restore <archivo>`
**¿Qué hace?** Descarta cambios en un archivo (versión moderna).

**¿Cuándo usarlo?**
- Cuando hiciste cambios que no querías
- Cuando necesitas volver a la última versión guardada
- Para revertir archivos específicos

**¿Cuándo NO usarlo?**
- Si los cambios están en commit, mejor usa `git revert`

**Ejemplo:**
```bash
git restore archivo.txt
git restore . # Descarta todos los cambios
```

---

### `git checkout -- <archivo>`
**¿Qué hace?** Descarta cambios en un archivo (versión antigua).

**¿Cuándo usarlo?**
- Mismo que `git restore` (compatibilidad con versiones antiguas)
- En equipos con versiones antiguas de Git

**¿Cuándo NO usarlo?**
- Prefiere `git restore` en versiones nuevas

**Ejemplo:**
```bash
git checkout -- archivo.txt
```

---

### `git reset <archivo>`
**¿Qué hace?** Quita un archivo del área de staging (lo que añadiste con `git add`).

**¿Cuándo usarlo?**
- Cuando agregaste un archivo por error con `git add`
- Para deshacer `git add` sin perder cambios

**¿Cuándo NO usarlo?**
- No uses en commits pasados (usa `git revert`)

**Ejemplo:**
```bash
git reset archivo.txt # Quita del staging
git reset . # Quita todos los cambios del staging
```

---

### `git reset --hard`
**¿Qué hace?** Descarta TODOS los cambios y vuelve a la última versión.

**¿Cuándo usarlo?**
- **SOLO** cuando estás seguro de querer perder TODO
- Emergencias completas
- Cuando necesitas empezar de cero

**¿Cuándo NO usarlo?**
- **NUNCA** si no estás 100% seguro
- No uses después de push
- No perderás trabajo (piénsalo dos veces)

**Ejemplo:**
```bash
git reset --hard
git reset --hard HEAD~3 # Vuelve 3 commits atrás
```

---

### `git revert <commit>`
**¿Qué hace?** Crea un NUEVO commit que deshace los cambios de otro commit.

**¿Cuándo usarlo?**
- Para deshacer cambios de forma segura en commits ya pusheados
- En equipos (mantiene el historial)
- Cuando no puedes reescribir el historial

**¿Cuándo NO usarlo?**
- Cuando los cambios son muy recientes (mejor `git reset`)

**Ejemplo:**
```bash
git revert abc123
```

---

### `git clean -fd`
**¿Qué hace?** Elimina archivos no rastreados.

**¿Cuándo usarlo?**
- Para limpiar archivos generados que no necesitas
- Cuando tienes archivos temporales
- Para restaurar un estado limpio

**¿Cuándo NO usarlo?**
- **Cuidado**: esto ELIMINA archivos, no solo desde Git

**Ejemplo:**
```bash
git clean -fd
git clean -fdn # Simula sin ejecutar (-n)
```

---

## Etiquetas

### `git tag <nombre>`
**¿Qué hace?** Crea una etiqueta (versión) en el commit actual.

**¿Cuándo usarlo?**
- Para marcar versiones de lanzamiento
- Cuando completaste un milestone importante
- Para versiones v1.0, v2.1, etc.

**¿Cuándo NO usarlo?**
- No tags para trabajo en progreso
- No tags sin significado

**Ejemplo:**
```bash
git tag v1.0.0
git tag -a v1.0.0 -m "Versión 1.0.0 - Lanzamiento inicial"
```

---

### `git tag -l`
**¿Qué hace?** Lista todas las etiquetas.

**¿Cuándo usarlo?**
- Para ver qué versiones existen
- Para encontrar una etiqueta específica

**¿Cuándo NO usarlo?**
- No hay caso donde evitarlo

**Ejemplo:**
```bash
git tag -l
```

---

### `git push origin <tag>`
**¿Qué hace?** Sube una etiqueta al repositorio remoto.

**¿Cuándo usarlo?**
- Después de crear una versión importante
- Para compartir etiquetas con el equipo

**¿Cuándo NO usarlo?**
- No todas las tags necesitan ser pusheadas

**Ejemplo:**
```bash
git push origin v1.0.0
```

---

## Colaboración Avanzada

### `git stash`
**¿Qué hace?** Guarda cambios temporalmente sin hacer commit.

**¿Cuándo usarlo?**
- Necesitas cambiar de rama urgentemente pero no quieres hacer commit
- Necesitas limpiar tu área de trabajo temporalmente
- Para guardar trabajo sin terminar

**¿Cuándo NO usarlo?**
- No lo uses como sustituto de commits regulares
- Pueden perderse si no lo recuperas

**Ejemplo:**
```bash
git stash
git stash list # Ver stashes guardados
git stash pop # Recupera el último stash
```

---

### `git stash pop`
**¿Qué hace?** Recupera los cambios guardados con `git stash`.

**¿Cuándo usarlo?**
- Cuando vuelves a tu rama después de cambiar
- Para aplicar cambios guardados temporalmente

**¿Cuándo NO usarlo?**
- No cuando el stash es muy antiguo (puede causar conflictos)

**Ejemplo:**
```bash
git stash pop
```

---

### `git cherry-pick <commit>`
**¿Qué hace?** Copia un commit específico a tu rama actual.

**¿Cuándo usarlo?**
- Cuando necesitas un cambio específico de otra rama
- Para aplicar un bugfix a múltiples ramas
- Cuando no quieres hacer merge completo

**¿Cuándo NO usarlo?**
- Para cambios que ya están en otra rama
- No lo uses excesivamente

**Ejemplo:**
```bash
git cherry-pick abc123
```

---

### `git squash`
**¿Qué hace?** Combina múltiples commits en uno solo.

**¿Cuándo usarlo?**
- Para limpiar el historial antes de merge
- Cuando tienes muchos commits pequeños de una característica
- Para mantener el historial legible

**¿Cuándo NO usarlo?**
- En commits ya pusheados
- Cuando el historial detallado es importante

**Ejemplo:**
```bash
git rebase -i HEAD~5 # Abre editor para combinar commits
```

---

### `git bisect`
**¿Qué hace?** Busca binariamente el commit que introdujo un bug.

**¿Cuándo usarlo?**
- Cuando un bug apareció hace varios commits
- Para encontrar exactamente cuándo se rompió algo
- En proyectos grandes

**¿Cuándo NO usarlo?**
- Cuando sabes dónde está el problema

**Ejemplo:**
```bash
git bisect start
git bisect bad # Marca commit actual como malo
git bisect good v1.0.0 # Marca versión buena
# Git te guía automáticamente
```

---

## 🎯 Tabla Rápida de Decisiones

| Necesito... | Comando | ⚠️ Cuidado |
|---|---|---|
| Ver cambios | `git status` | Hazlo constantemente |
| Guardar cambios | `git add .` + `git commit` | Revisa primero |
| Cambiar de rama | `git checkout` | Sin cambios sin guardar |
| Crear rama | `git checkout -b` | Dale nombre descriptivo |
| Bajar cambios | `git pull` | Antes de empezar |
| Subir cambios | `git push` | Después de revisar |
| Deshacer último commit | `git revert` | Mantiene historial |
| Descartar cambios | `git restore` | Perderás el trabajo |
| Ver historial | `git log` | Hazlo siempre |
| Fusionar | `git merge` | Revisa conflictos |

---

## ⚠️ Comandos Peligrosos (Usar con Cuidado)

```bash
git reset --hard          # ❌ Borra TODO
git rebase                # ❌ Reescribe historial
git push --force          # ❌ Sobrescribe remoto
git reset --hard HEAD~5   # ❌ Borra 5 commits
git clean -fd             # ❌ Borra archivos
```

**NUNCA uses estos después de `git push`**

---

## 💡 Mejores Prácticas

1. **Commits pequeños y específicos** - Cada commit = 1 cambio lógico
2. **Mensajes claros** - Describe QUÉ y POR QUÉ
3. **Ramas por característica** - Una rama = una tarea
4. **Pull antes de trabajar** - Sincronízate regularmente
5. **Revisa antes de push** - Verifica con `git status` y `git diff`
6. **No ignores conflictos** - Resuélvelos correctamente
7. **Usa `.gitignore`** - Excluye archivos innecesarios
8. **No guardes secretos** - Nunca commites contraseñas/tokens

---

## 🆘 Ayuda de Emergencia

¿Hiciste algo mal? Aquí está la solución:

**"Rompí todo, quiero volver atrás"**
```bash
git reflog              # Ve el historial completo
git reset --hard <hash> # Vuelve a ese punto
```

**"Necesito ese archivo de hace 5 commits"**
```bash
git checkout HEAD~5 -- archivo.txt
```

**"Hice push de algo malo"**
```bash
git revert <commit>
git push
```

**"Cambié de rama sin guardar cambios"**
```bash
git stash              # Guarda temporalmente
git checkout rama-correcta
git stash pop          # Recupera cambios
```

---

## 📚 Recursos Adicionales

- [Documentación oficial de Git](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Visualizador de Git](https://git-school.github.io/visualizing-git/)
- [Learn Git Branching](https://learngitbranching.js.org/)

---

**Creado:** 7 de junio de 2026
**Última actualización:** 7 de junio de 2026

*Guía completa de Git - Úsala como referencia diaria* ✨
