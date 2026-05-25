---
title: "RH134 — Programación de tareas del sistema"
description: "Notas del capítulo 4 de RH134 v10.0: timers de systemd, archivos temporales y cron del sistema."
excerpt: "Timers de systemd, tmpfiles y tareas recurrentes del sistema con cron."
date: 2026-03-25
locale: "es"
moduleNumber: 8
completed: false
tags: ["rhcsa", "rh134", "systemd", "cron", "scheduling"]
draft: false
relatedCert: "RHCSA EX200"
---

## Objetivo

Documentar el **capítulo 4** de [RH134 v10.0](https://rol.redhat.com/rol/app/courses/rh134-10.0) mientras lo estudio: programar y gestionar tareas del sistema con systemd, cron y políticas de archivos temporales.

## Contenido del capítulo

| Sección | Tema |
|---------|------|
| 4.1 | Gestión de trabajos repetidos con unidades timer de systemd |
| 4.2 | Ejercicio guiado: timers de systemd |
| 4.3 | Gestión de archivos temporales |
| 4.4 | Ejercicio guiado: gestión de archivos temporales |
| 4.5 | Programación de tareas recurrentes del sistema con cron |
| 4.6 | Ejercicio guiado: tarea recurrente del sistema con cron |
| 4.7 | Cuestionario: programación de tareas del sistema |
| 4.8 | Resumen |

## Qué practico

- Unidades `.timer` y `.service` emparejadas (`systemctl list-timers`, `OnCalendar`).
- Configuración de limpieza de temporales con systemd-tmpfiles.
- Jobs en `/etc/cron.d/`, `/etc/cron.daily/` y restricciones del crontab de root.
- Diferencia entre tareas de usuario (cap. 3) y tareas del sistema (cap. 4).

## Comandos de referencia

```bash
systemctl list-timers --all
systemctl status mi-timer.timer
systemd-tmpfiles --clean
ls /etc/cron.d/
```

## Notas del laboratorio

_(Completar después de los ejercicios 4.2, 4.4 y 4.6: unidades timer creadas, reglas tmpfiles y entradas de cron del sistema.)_

## Siguiente paso

Cerrar el cuestionario 4.7 en ROL y volcar aquí los pasos concretos del lab cuando termine el capítulo.
