---
title: "RH134 — Programación de tareas de usuario"
description: "Notas del capítulo 3 de RH134 v10.0: trabajos futuros y recurrentes con at, batch y crontab."
excerpt: "Programar tareas de usuario puntuales y periódicas con at, batch y cron."
date: 2026-03-22
locale: "es"
moduleNumber: 7
completed: false
tags: ["rhcsa", "rh134", "cron", "at", "scheduling"]
draft: false
relatedCert: "RHCSA EX200"
---

## Objetivo

Documentar el **capítulo 3** de [RH134 v10.0](https://rol.redhat.com/rol/app/courses/rh134-10.0) mientras lo estudio: programar tareas de usuario puntuales y recurrentes en RHEL.

## Contenido del capítulo

| Sección | Tema |
|---------|------|
| 3.1 | Programación de un trabajo de usuario futuro |
| 3.2 | Ejercicio guiado: programación de un trabajo de usuario futuro |
| 3.3 | Programación de trabajos de usuario recurrentes |
| 3.4 | Ejercicio guiado: programación de trabajos de usuario recurrentes |
| 3.5 | Cuestionario: programación de tareas de usuario |
| 3.6 | Resumen |

## Qué practico

- `at` y `batch` para ejecutar comandos una sola vez en un momento futuro.
- `crontab -e` / `crontab -l` para tareas recurrentes del usuario.
- Campos de cron (minuto, hora, día, mes, día de la semana) y redirección de salida.
- Verificación con `atq`, `atrm` y logs del usuario.

## Comandos de referencia

```bash
echo "comando" | at 14:30
atq
atrm 3
crontab -e
crontab -l
```

## Notas del laboratorio

_(Completar después de los ejercicios 3.2 y 3.4: jobs creados, horarios usados y cómo comprobé que se ejecutaron.)_

## Siguiente paso

Cerrar el cuestionario 3.5 en ROL y documentar aquí la sintaxis de cron que más me costó.
