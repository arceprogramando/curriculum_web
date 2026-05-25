---
title: "Glosario RHCSA / RH134"
description: "Definiciones breves de comandos, servicios, rutas y conceptos clave para RH124, RH134 y el examen EX200."
excerpt: "Referencia rápida: rutas del sistema, systemd, cron, grep, logs y términos del curso."
date: 2026-03-26
locale: "es"
moduleNumber: 9
completed: true
tags: ["rhcsa", "rh134", "glosario", "referencia"]
draft: false
relatedCert: "RHCSA EX200"
---

## Objetivo

Tener a mano **definiciones cortas** con las **rutas** que aparecen en RH124, RH134 y los labs de ROL. Lo voy ampliando según avanzo en el curso.

## Términos repasados

| Término | Estado |
|---------|--------|
| [`journald`](#journald--repasado) | ✓ Repasado — RH134 cap. 5 (logs / journal) |
| [`journalctl`](#journalctl--repasado) | ✓ Repasado — RH134 cap. 5 (logs / journal) |
| [`rsyslog`](#rsyslog) | ✓ En curso — RH134 cap. 5 (syslog / `debug.conf`) |
| [`logger`](#logger) | ✓ En curso — RH134 cap. 5 (lab messages-debug) |

---

## Rutas del sistema (base)

| Ruta | Para qué sirve |
|------|----------------|
| `/etc` | Configuración del sistema: servicios, cron, red, usuarios, políticas. Archivos de texto editables por el admin. |
| `/var` | Datos variables: logs, caché, colas de correo, bases de datos locales. Crece con el uso del sistema. |
| `/var/log` | Archivos de log clásicos (syslog): eventos, autenticación, cron, servicios. |
| `/usr` | Programas y librerías instalados por el paquete (binarios en `/usr/bin`, unidades en `/usr/lib/systemd/`). |
| `/home` | Directorios personales de usuarios (`/home/usuario`). Config del shell en `~/.bashrc`. |
| `/tmp` | Archivos temporales (a menudo borrados al reiniciar). |
| `/root` | Home del usuario root. |
| `/bin`, `/sbin` | Comandos esenciales del sistema (`/sbin` suele ser para admin/red). En RHEL muchos son enlaces a `/usr/bin`. |

---

## Shell y línea de comandos

### Bash

**Definición:** Shell por defecto en RHEL. Interpreta comandos, variables y scripts.

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `/bin/bash` | Ejecutable del intérprete Bash. |
| `~/.bashrc` | Config del shell al abrir una terminal (alias, prompt, variables). |
| `~/.bash_profile` | Config al iniciar sesión de login. |
| `/etc/profile` | Config global de login para todos los usuarios. |
| `/etc/profile.d/` | Scripts `.sh` que se cargan al login (variables, PATH, etc.). |
| `/etc/bashrc` | Config global para shells interactivos no login. |

### Shebang

**Definición:** Primera línea de un script (`#!/bin/bash`). Indica qué intérprete ejecuta el archivo.

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `/bin/bash` | Intérprete habitual en scripts de administración en RHEL. |
| `/usr/bin/env bash` | Alternativa portable: busca `bash` en el `PATH`. |

### Variable de entorno

**Definición:** Valor exportado (`export VAR=valor`) que heredan los procesos hijos.

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `~/.bashrc`, `/etc/profile.d/` | Donde suelen definirse variables persistentes. |
| `/proc/self/environ` | Muestra las variables del proceso actual (diagnóstico). |

---

## Permisos, propietarios y roles (POSIX)

### Permisos `rwx` (lectura, escritura, ejecución)

**Definición:** Cada archivo y directorio tiene permisos para **tres categorías**: dueño (*user*), grupo (*group*) y otros (*others*). Cada categoría puede tener **r** (read), **w** (write) y **x** (execute).

**Cómo se lee en `ls -l`:**

```
-rwxr-xr--  1 root root  1234 Mar 26 10:00 script.sh
│└┬┘└┬┘└┬┘
│ u  g  o   ← user, group, others
└ tipo: - archivo, d directorio, l enlace
```

| Bloque | Letras | Significado |
|--------|--------|-------------|
| **Usuario (u)** | `rwx` | El dueño puede leer, escribir y ejecutar. |
| **Grupo (g)** | `r-x` | El grupo puede leer y ejecutar, no escribir. |
| **Otros (o)** | `r--` | El resto solo puede leer. |

En el ejemplo: **dueño** = todo; **grupo** = leer + ejecutar; **otros** = solo leer → notación **`rwxr-xr--`**.

### Valores numéricos (octal)

Cada letra vale un número; se **suman** por categoría:

| Permiso | Valor |
|---------|-------|
| `r` (read) | 4 |
| `w` (write) | 2 |
| `x` (execute) | 1 |
| `-` (ninguno) | 0 |

| Notación `rwx` | Cálculo | Octal |
|----------------|---------|-------|
| `rwx` | 4+2+1 | **7** |
| `rw-` | 4+2+0 | **6** |
| `r-x` | 4+0+1 | **5** |
| `r--` | 4+0+0 | **4** |
| `---` | 0 | **0** |

Ejemplo **`rwxr-xr-x`** → usuario **7**, grupo **5**, otros **5** → **`chmod 755`**.

Otros ejemplos habituales:

| Octal | Notación | Uso típico |
|-------|----------|------------|
| `644` | `rw-r--r--` | Archivo de texto (dueño edita, resto lee). |
| `600` | `rw-------` | Archivo privado (solo dueño). |
| `755` | `rwxr-xr-x` | Script o programa ejecutable. |
| `700` | `rwx------` | Script privado del dueño. |
| `1777` | `rwxrwxrwt` | Directorio compartido con *sticky bit* (p. ej. `/tmp`). |

### `chmod` — forma octal (numérica)

**Definición:** Asigna permisos con tres dígitos (usuario, grupo, otros).

```bash
chmod 755 script.sh      # rwxr-xr-x
chmod 644 config.conf    # rw-r--r--
chmod 600 clave.txt      # rw-------
chmod 1777 /tmp          # sticky en directorio (el 1 va delante del 777)
```

### `chmod` — forma simbólica (letras)

**Definición:** Modifica permisos por **quién** y **qué** cambiar, sin recalcular el octal entero.

| Símbolo | Significado |
|---------|-------------|
| `u` | Usuario (dueño) |
| `g` | Grupo |
| `o` | Otros |
| `a` | Todos (all) |
| `+` | Agregar permiso |
| `-` | Quitar permiso |
| `=` | Dejar exactamente estos permisos |

```bash
chmod u+x script.sh        # al dueño le sumo ejecución
chmod g-w archivo            # al grupo le quito escritura
chmod o=r archivo            # otros solo lectura
chmod a+r archivo            # todos pueden leer
chmod u=rwx,g=rx,o= script.sh   # asignación explícita por categoría
chmod +x script.sh           # ejecutable para todos (u,g,o)
```

### Propietario y grupo: `chown` / `chgrp`

**Definición:** Cambian **quién es el dueño** y **a qué grupo pertenece** el archivo (no los bits `rwx`).

```bash
chown usuario:grupo archivo
chown root:root /etc/miapp.conf
chgrp developers proyecto/
chown -R www:www /var/www/html/   # recursivo en directorio
```

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `/etc/passwd` | Usuarios del sistema (UID, shell, home). |
| `/etc/group` | Grupos y miembros (GID). |
| `/etc/shadow` | Contraseñas (solo root puede leer). |

### `umask`

**Definición:** Máscara que **resta** permisos a archivos y directorios **nuevos** (lo que queda después de crear un fichero).

```bash
umask          # ver máscara actual (ej. 0022)
umask 077      # archivos nuevos muy restrictivos para el dueño
```

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `~/.bashrc`, `/etc/profile` | Donde suele definirse `umask` por usuario o global. |

### Permisos especiales (resumen EX200)

| Bit | Octal extra | En `ls -l` | Para qué sirve |
|-----|-------------|------------|----------------|
| **SUID** | `4xxx` | `s` en lugar de `x` del **usuario** | El proceso corre con UID del **dueño** del archivo (ej. `passwd`). |
| **SGID** | `2xxx` | `s` en el **grupo** | En directorios: archivos nuevos heredan el grupo del directorio. |
| **Sticky** | `1xxx` | `t` en **otros** | En directorios: solo el dueño del archivo puede borrarlo (ej. `/tmp`). |

```bash
chmod u+s /usr/bin/comando    # SUID simbólico
chmod g+s /srv/compartido      # SGID en directorio
chmod +t /tmp                  # sticky bit
chmod 4755 archivo             # SUID + 755
```

### ACL (permisos extendidos)

**Definición:** Listas de control de acceso **más finas** que solo u/g/o (usuario concreto, permisos extra). Comandos: `getfacl`, `setfacl`.

```bash
setfacl -m u:maria:rwx /srv/proyecto
getfacl /srv/proyecto
```

**Rutas de ejemplo:** Directorios compartidos bajo `/srv/` o `/home/` en labs de RH124.

---

## Lectura y búsqueda de texto

### `less`

**Definición:** Paginador en terminal para recorrer archivos largos sin volcar todo en pantalla (`q` para salir).

**Rutas de ejemplo:**

| Ruta | Para qué sirve |
|------|----------------|
| `/var/log/messages` | Log general del sistema; típico para practicar `less`. |
| `/etc/passwd` | Lista de usuarios; archivo corto pero útil para repasar permisos de lectura. |

### `tail`

**Definición:** Muestra las **últimas líneas** de un archivo. `tail -f` sigue el archivo en tiempo real (ideal para logs).

**Rutas de ejemplo:**

| Ruta | Para qué sirve |
|------|----------------|
| `/var/log/secure` | Intentos de login, sudo, SSH. |
| `/var/log/cron` | Ejecución de tareas cron. |
| `/var/log/messages` | Eventos generales del sistema. |

### `grep`

**Definición:** Busca patrones de texto en archivos o en pipes. `grep -E` usa expresiones regulares extendidas.

**Rutas de ejemplo:**

| Ruta | Para qué sirve |
|------|----------------|
| `/var/log/messages` | Filtrar errores o servicios concretos. |
| `/etc/passwd` | Buscar usuarios (`grep root /etc/passwd`). |
| `/etc/crontab` | Revisar entradas de cron del sistema. |

### Expresión regular (regex)

**Definición:** Patrón para coincidir texto (`.`, `*`, `[]`, `^`, `$`). En RH134 se usa sobre todo con `grep -E`.

**Rutas de ejemplo:** Cualquier archivo bajo `/etc/` o `/var/log/` al filtrar configs o logs.

---

## Logs y registro del sistema

### syslog

**Definición:** Modelo clásico de registro: servicios y kernel escriben mensajes en archivos de log.

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `/var/log/messages` | Mensajes generales (kernel, servicios diversos). |
| `/var/log/secure` | Autenticación, PAM, sudo. |
| `/var/log/cron` | Salida y eventos de cron. |
| `/var/log/maillog` | Correo (si está instalado). |
| `/var/log/boot.log` | Arranque (según configuración). |

### `rsyslog`

**Definición:** Servicio que recibe y enruta mensajes syslog hacia archivos, sockets u otros destinos.

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `/etc/rsyslog.conf` | Configuración principal de enrutado de logs. |
| `/etc/rsyslog.d/` | Fragmentos de config adicionales (**solo se cargan `*.conf`**). |
| `/var/log/` | Destino habitual de los archivos generados. |

#### Lab guiado: redirigir `debug` a `/var/log/messages-debug`

**Objetivo del ejercicio (RH134 / `logs-syslog`):** que `rsyslog` escriba todos los mensajes con prioridad **debug o superior** (cualquier facility) en `/var/log/messages-debug`.

#### Para qué practico esto

Practicar syslog no es solo “pasar un lab”: es aprender **dónde mirar cuando algo falla en un servidor** y **cómo hacer que el sistema registre lo que importa**.

| En la práctica | Qué ganás |
|----------------|-----------|
| **Diagnosticar** | Servicios que no arrancan, cron que no corre, scripts que fallan → casi siempre la respuesta está en `/var/log/` con `tail`, `grep` o `less`. |
| **Separar ruido** | Enrutar por prioridad (`*.debug` a un archivo aparte) enseña a no mezclar todo en un log gigante. |
| **Auditar scripts** | Con `logger` tus backups/cron dejan huella en el log **oficial**, no en un `/tmp/mi.log` que nadie revisa. |
| **Entender RHEL** | Servicios escriben → **rsyslog** enruta → vos leés o mandás con **logger**. Ese flujo se repite en firewall, cron, systemd, etc. |
| **RHCSA EX200** | Patrón del examen: **configurar → reiniciar servicio → probar → verificar** (`debug.conf`, `systemctl restart rsyslog`, `logger`, `tail`). |

**Analogía desde desarrollo:** syslog es la “observabilidad del servidor” — niveles (debug, info, err), filtrado (`grep`/`tail`) y reglas centralizadas (`/etc/rsyslog.d/`), como Sentry o logs estructurados pero a nivel de sistema operativo.

**En una frase:** controlar **qué registra el sistema, dónde queda escrito y cómo lo leés cuando algo se rompe** — base para sysadmin, DevOps y cualquier backend que toque Linux.

**Regla (en `/etc/rsyslog.d/debug.conf`):**

```text
*.debug /var/log/messages-debug
```

| Parte | Significado |
|-------|-------------|
| `*` | Cualquier **facility** (user, mail, cron, etc.). |
| `.debug` | Prioridad **debug** y todas las **más altas** (info, notice, warning, err…). |

**Pasos (orden del lab):**

```bash
# En workstation
lab start logs-syslog

ssh student@servera
sudo -i

# Crear el archivo (nombre exacto: debug.conf)
vi /etc/rsyslog.d/debug.conf
# contenido: *.debug /var/log/messages-debug

rsyslogd -N1                    # validar sintaxis
systemctl restart rsyslog

logger -p user.debug "Debug Message Test"
tail /var/log/messages-debug    # debe verse "Debug Message Test"
```

**Salida esperada (ejemplo):**

```text
Feb 13 18:27:58 servera root[25416]: Debug Message Test
```

(También pueden aparecer líneas de `systemd`/`rsyslogd` al reiniciar el servicio.)

**Errores frecuentes:**

| Error | Causa |
|-------|--------|
| `No such file or directory` en `messages-debug` | Archivo llamado `debug-conf` en vez de **`debug.conf`** → rsyslog no carga la regla. |
| `logger` sin efecto | Reiniciar **después** de crear la regla; probar `grep "Debug Message Test" /var/log/messages`. |
| `$'\E[200~cat'` al pegar | Pegado “bracketed” del navegador; escribir el comando a mano. |

**Cerrar el lab:**

```bash
exit   # root → student → workstation
lab finish logs-syslog
```

### `journald` · ✓ Repasado {#journald--repasado}

**Estado:** repasado en RH134 (syslog, journal y labs de logging).

**Definición:** **Daemon de systemd** que recibe mensajes del kernel, de systemd y de los servicios, y los guarda en el **journal** (registro binario e indexado, no un `.log` de texto plano).

**De dónde viene:** Integrado en **systemd**. Se gestiona como servicio/unidad; la configuración principal está en `journald.conf`.

**Para qué sirve:**

| Rol | Detalle |
|-----|---------|
| **Centralizar logs** | Un solo lugar para kernel + servicios + systemd. |
| **Alimentar `journalctl`** | Sin `journald` no hay journal que consultar. |
| **Complementar syslog** | Puede reenviar a **rsyslog** (`ForwardToSyslog`) y así generar también `/var/log/messages`. |
| **Persistencia** | Decide si el journal sobrevive reinicios (`/var/log/journal/`). |

**Relación con `journalctl`:** `journald` **escribe**; `journalctl` **lee**. Siempre van juntos en la práctica.

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `/usr/lib/systemd/systemd-journald` | Proceso del daemon (referencia; se administra con `systemctl`). |
| `/var/log/journal/` | Journal **persistente** en disco (si está habilitado). |
| `/run/log/journal/` | Journal **volátil** hasta reinicio. |
| `/etc/systemd/journald.conf` | Retención, tamaño máximo, reenvío a syslog, almacenamiento. |

**Comandos útiles (servicio):**

```bash
systemctl status systemd-journald
systemctl restart systemd-journald   # tras cambiar journald.conf
```

### `journalctl` · ✓ Repasado {#journalctl--repasado}

**Estado:** repasado en RH134 (syslog, journal y labs de logging).

**Definición:** Comando para **leer y filtrar logs del journal** de systemd (`journald`). No abre archivos de texto en `/var/log/` directamente: consulta el registro estructurado que guarda el kernel, systemd y los servicios.

**De dónde viene:** Parte de **systemd**. El daemon **`journald`** escribe el journal; **`journalctl`** es la herramienta de consulta. Complementa (no reemplaza) syslog/`rsyslog` y archivos como `/var/log/messages`.

**Utilidad más fuerte:** Diagnosticar **por qué un servicio no arranca** o qué pasó **en el último reinicio**, filtrando por unidad, tiempo o prioridad sin buscar a mano en varios archivos.

**Usos habituales:**

| Uso | Comando | Para qué sirve |
|-----|---------|----------------|
| Todo el journal reciente | `journalctl` | Vista general (puede ser larga; combiná con filtros). |
| Seguir en vivo | `journalctl -f` | Como `tail -f` pero del journal (eventos nuevos al instante). |
| Logs de un servicio | `journalctl -u httpd.service` | Todo lo que registró Apache/Nginx u otra unidad. |
| Últimas N líneas | `journalctl -u httpd -n 50 --no-pager` | Las 50 entradas más recientes, sin paginador. |
| Solo errores | `journalctl -p err` | Prioridad **err** y más graves (crit, alert, emerg). |
| Desde / hasta | `journalctl --since "1 hour ago"` | Ventana de tiempo (`--until "2026-03-26 12:00"`). |
| Boot actual | `journalctl -b` | Solo mensajes desde el **último arranque**. |
| Boot anterior | `journalctl -b -1` | Qué pasó en el reinicio **previo** (muy útil si algo falló al boot). |
| Kernel | `journalctl -k` | Mensajes del kernel (hardware, drivers, montajes). |
| Diagnóstico rápido | `journalctl -xe` | Últimas entradas con contexto extra; clásico tras un fallo. |
| Estado del servicio | `systemctl status httpd` | Muestra un resumen y **últimas líneas** del journal de esa unidad. |
| Espacio del journal | `journalctl --disk-usage` | Cuánto disco ocupa el journal. |
| Liberar espacio | `journalctl --vacuum-time=7d` | Borra entradas más viejas que 7 días (admin). |

**Ejemplos combinados (los más usados en labs y EX200):**

```bash
journalctl -u rsyslog.service -n 30 --no-pager
journalctl -u sshd.service --since today
journalctl -p warning -b
journalctl -xe
grep -i fail <<< "$(journalctl -u miapp -n 20 --no-pager)"
```

**Prioridades (`-p`):** de menor a mayor gravedad — `debug`, `info`, `notice`, `warning`, `err`, `crit`, `alert`, `emerg`.  
`journalctl -p err` incluye err y todo lo más grave.

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `/usr/bin/journalctl` | Ejecutable del comando. |
| `/var/log/journal/` | Journal persistente en disco (si está habilitado). |
| `/run/log/journal/` | Journal volátil hasta reinicio. |
| `/etc/systemd/journald.conf` | Retención, tamaño máximo, reenvío a syslog. |

**`journalctl` vs. `tail /var/log/messages`:**

| | `journalctl` | `tail` + `/var/log/` |
|---|--------------|----------------------|
| Origen | Journal de **journald** | Archivos de **rsyslog** |
| Filtro por servicio | `-u nombre.service` | `grep` en el archivo |
| Por arranque | `-b`, `-b -1` | Más manual |
| Tiempo real | `journalctl -f` | `tail -f /var/log/messages` |

En RHEL conviene dominar **ambos**: muchos servicios escriben en journal y también en syslog según la config.

### `logger`

**Definición:** Comando de shell para **enviar mensajes al sistema de logs** (syslog/`rsyslog` y, según config, también al journal). No escribe un archivo a mano: delega en la infraestructura de logging del sistema.

**De dónde viene:** Parte del ecosistema **syslog** en RHEL (paquete `util-linux` / herramientas de logging). El mensaje entra por la API syslog; **`rsyslog`** (o el daemon de logs activo) lo enruta según facilidad, prioridad y reglas en `/etc/rsyslog.conf`.

**Utilidad más fuerte:** Desde **scripts, cron y one-liners** registrar eventos en el **mismo canal que el resto del sistema** — con marca de tiempo, etiqueta y prioridad — sin crear logs sueltos por ahí. Ideal para auditar backups, tareas programadas o automatismos propios.

**Cómo se usa:**

```bash
logger "Backup terminado correctamente"
logger -t mi-script "Inicio de la tarea"
logger -p user.info "Proceso OK"
logger -p user.warning "Espacio en disco bajo"
logger -p local0.err "Fallo al copiar archivos"
echo "Salida del comando" | logger -t cron-lab -p info
```

| Opción | Para qué sirve |
|--------|----------------|
| `-t TAG` | Etiqueta del proceso (aparece en el log; facilita `grep`). |
| `-p FACILITY.PRIORITY` | Facilidad y prioridad (`user.info`, `user.warning`, `local0.err`, etc.). |
| `-f ARCHIVO` | Lee líneas de un archivo y las manda al log. |
| `-i` | Incluye el PID del proceso que llama a `logger`. |

**Prioridades habituales (de menor a mayor):** `debug`, `info`, `notice`, `warning`, `err`, `crit`, `alert`, `emerg`.

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `/usr/bin/logger` | Ejecutable del comando. |
| `/etc/rsyslog.conf`, `/etc/rsyslog.d/` | Reglas que deciden **a qué archivo** va cada mensaje. |
| `/var/log/messages` | Destino habitual de mensajes `user.*` e info general. |
| `/var/log/cron` | Donde suelen verse eventos ligados a tareas programadas. |
| `/var/log/secure` | Si el mensaje se enruta a autenticación/seguridad (según reglas). |

**Ver el resultado:**

```bash
logger -t prueba-rh134 -p user.info "Mensaje de prueba desde el glosario"
grep prueba-rh134 /var/log/messages
# o en tiempo real:
tail -f /var/log/messages
```

**Cuándo usarlo vs. `echo` a un archivo:** `echo >> /tmp/mi.log` queda aislado; **`logger`** integra el evento en el logging centralizado del servidor, alineado con RH134 (syslog, cron, scripts de administración).

---

## systemd

### systemd

**Definición:** Init y gestor de servicios en RHEL. Arranca el sistema, montajes, targets y dependencias entre unidades.

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `/usr/lib/systemd/system/` | Unidades instaladas por paquetes (no editar a mano). |
| `/etc/systemd/system/` | Overrides y unidades custom del admin (prioridad sobre `/usr/lib`). |
| `/run/systemd/system/` | Unidades transientes en runtime. |

### Unidad (unit)

**Definición:** Archivo `.service`, `.timer`, `.target`, etc. que describe qué ejecutar y cuándo.

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `/etc/systemd/system/miapp.service` | Servicio definido por el admin. |
| `/etc/systemd/system/miapp.timer` | Timer asociado a un servicio. |
| `/usr/lib/systemd/system/crond.service` | Ejemplo: unidad del daemon cron. |

### `systemctl`

**Definición:** Comando para `start`, `stop`, `enable`, `disable`, `status`, `daemon-reload`, `list-timers`, etc.

**Rutas relacionadas:** Opera sobre unidades en `/etc/systemd/system/` y `/usr/lib/systemd/system/`.

### Target

**Definición:** Agrupa unidades para un estado del sistema (similar a runlevels antiguos).

**Rutas de ejemplo:**

| Ruta | Para qué sirve |
|------|----------------|
| `/usr/lib/systemd/system/multi-user.target` | Modo multiusuario (consola/red, sin GUI obligatoria). |
| `/usr/lib/systemd/system/graphical.target` | Entorno gráfico. |

### Timer (systemd)

**Definición:** Unidad `.timer` que dispara un `.service` en horarios (`OnCalendar`) o intervalos.

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `/etc/systemd/system/backup.timer` | Cuándo ejecutar el job. |
| `/etc/systemd/system/backup.service` | Qué comando ejecutar cuando el timer dispara. |

### `systemd-tmpfiles`

**Definición:** Crea, limpia y fija permisos de archivos/directorios temporales según reglas.

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `/usr/lib/tmpfiles.d/` | Reglas del paquete. |
| `/etc/tmpfiles.d/` | Reglas custom del admin. |
| `/tmp`, `/var/tmp` | Directorios que suelen gestionarse con estas reglas. |

---

## Programación de tareas

### `at`

**Definición:** Programa **un solo trabajo** en una fecha/hora futura.

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `/var/spool/at/` | Cola de trabajos pendientes (spool). |
| `/etc/at.allow`, `/etc/at.deny` | Quién puede o no usar `at`. |

### `batch`

**Definición:** Como `at`, pero ejecuta cuando baja la carga del sistema.

**Rutas relevantes:** Misma cola y permisos que `at` (`/var/spool/at/`, `at.allow`/`at.deny`).

### `crontab`

**Definición:** Tabla de tareas **recurrentes** del usuario (`crontab -e`, `crontab -l`).

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `/var/spool/cron/` | Crontabs por usuario (p. ej. `/var/spool/cron/root`). |
| `/etc/cron.allow`, `/etc/cron.deny` | Control de acceso a `crontab`. |

### `crond`

**Definición:** Daemon que ejecuta crontabs de usuarios y jobs del sistema en los directorios cron.

**Rutas relevantes:**

| Ruta | Para qué sirve |
|------|----------------|
| `/usr/sbin/crond` | Binario del daemon. |
| `/var/spool/cron/` | Crontabs de usuarios. |
| `/etc/cron.d/` | Jobs del sistema con usuario en cada línea. |
| `/etc/cron.daily/`, `/etc/cron.hourly/`, `/etc/cron.weekly/`, `/etc/cron.monthly/` | Scripts ejecutados en esos intervalos. |
| `/etc/crontab` | Crontab del sistema (formato clásico con usuario). |

### `/etc/cron.d/`

**Definición:** Archivos de cron **a nivel sistema**; cada línea incluye usuario y comando.

**Para qué sirve:** Tareas recurrentes de paquetes o del admin sin editar el crontab personal de un usuario.

---

## Otros términos útiles

### RHEL

Red Hat Enterprise Linux. Base de labs oficiales y examen RHCSA.

### ROL / LMS

Portal de cursos Red Hat (RH124, RH134) y máquinas de lab en la nube.

### Lab

Entorno RHEL provisto por el curso; no es una VM casera local.

---

## Cómo uso este glosario

- Consulto rutas + definición antes de un capítulo o simulacro EX200.
- Cuando un path nuevo se repite en labs, lo agrego con una línea de “para qué sirve”.
- Si RHEL cambia la ubicación de algo, lo anoto en la tabla.
