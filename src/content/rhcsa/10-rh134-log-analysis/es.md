---
title: "RH134 — Análisis y almacenamiento de registros"
description: "Notas del capítulo 5 de RH134 v10.0: arquitectura de logging, syslog, journal persistente y sincronización horaria."
excerpt: "Arquitectura de logs, rsyslog, journalctl, journal persistente y chrony."
date: 2026-05-24
locale: "es"
moduleNumber: 10
completed: false
tags: ["rhcsa", "rh134", "syslog", "journal", "rsyslog", "chrony"]
draft: false
relatedCert: "RHCSA EX200"
---

## Objetivo

Documentar el **capítulo 5** de [RH134 v10.0](https://rol.redhat.com/rol/app/courses/rh134-10.0) mientras lo estudio: entender **cómo se registran los eventos** en RHEL, consultarlos con **syslog** y **journal**, hacer el journal **persistente** y mantener la **hora** sincronizada.

## Contenido del capítulo

| Sección | Tema |
|---------|------|
| 5.1 | Arquitectura de registro del sistema |
| 5.2 | Cuestionario: arquitectura de registro del sistema |
| 5.3 | Interpretación y gestión de eventos de syslog |
| 5.4 | Ejercicio guiado: interpretación y gestión de eventos de syslog |
| 5.5 | Búsqueda e interpretación de entradas del diario del sistema |
| 5.6 | Ejercicio guiado: búsqueda e interpretación del diario del sistema |
| 5.7 | Configuración de un diario del sistema persistente |
| 5.8 | Ejercicio guiado: configuración de un diario persistente |
| 5.9 | Mantenimiento de la sincronización de la hora |

## Qué practico (mapa mental)

```
Servicios / kernel / scripts
        ↓
   journald (journal)  ←→  rsyslog (/var/log/)
        ↓                        ↓
   journalctl              tail / grep / logger
```

| Capa | Herramientas | Rutas clave |
|------|--------------|-------------|
| **Syslog clásico** | `rsyslog`, `logger`, `tail`, `grep` | `/etc/rsyslog.conf`, `/etc/rsyslog.d/*.conf`, `/var/log/messages` |
| **Journal (systemd)** | `journalctl` | `/var/log/journal/`, `/etc/systemd/journald.conf` |
| **Hora** | `chronyd`, `chronyc`, `timedatectl` | `/etc/chrony.conf` |

## Labs y ejercicios clave

### Syslog — `messages-debug` (5.4)

Regla en **`/etc/rsyslog.d/debug.conf`** (nombre exacto con `.conf`):

```text
*.debug /var/log/messages-debug
```

```bash
systemctl restart rsyslog
logger -p user.debug "Debug Message Test"
tail /var/log/messages-debug
```

Ver también el [glosario — lab messages-debug](/rhcsa-ex200/09-rh134-glosario/).

### Journal — consulta (5.5 / 5.6)

```bash
journalctl -p warning
journalctl -b
journalctl --list-boots
journalctl -u rsyslog -n 20 --no-pager
journalctl -xe
```

### Journal persistente (5.7 / 5.8)

```bash
ls /var/log/journal/
journalctl --disk-usage
# Config: /etc/systemd/journald.conf → Storage=persistent (o auto)
sudo systemctl restart systemd-journald
```

### Sincronización horaria (5.9)

```bash
timedatectl
chronyc tracking
systemctl status chronyd
```

## Comandos de referencia

```bash
rsyslogd -N1                              # validar config rsyslog
logger -p user.info "mensaje de prueba"
journalctl --vacuum-time=7d               # mantenimiento (admin)
```

## Notas del laboratorio

_(Completar tras 5.4, 5.6 y 5.8: configs tocadas, errores — ej. `debug-conf` sin `.conf` — y cómo se resolvieron.)_

## Siguiente paso

Cerrar cuestionarios 5.2 y labs con `lab finish` cuando corresponda; volcar acá salidas clave de journal persistente y chrony.
