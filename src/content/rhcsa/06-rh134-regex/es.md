---
title: "RH134 — Expresiones regulares"
description: "Notas del capítulo 2 de RH134 v10.0: coincidencias de texto con expresiones regulares en la línea de comandos."
excerpt: "Regex para búsqueda y filtrado de texto con grep y herramientas de la shell."
date: 2026-03-18
locale: "es"
moduleNumber: 6
completed: false
tags: ["rhcsa", "rh134", "regex", "grep", "shell"]
draft: false
relatedCert: "RHCSA EX200"
---

## Objetivo

Documentar el **capítulo 2** de [RH134 v10.0](https://rol.redhat.com/rol/app/courses/rh134-10.0) mientras lo estudio: usar expresiones regulares para búsquedas y filtrado de texto en tareas de administración.

## Contenido del capítulo

| Sección | Tema |
|---------|------|
| 2.1 | Coincidencias de texto con expresiones regulares |
| 2.2 | Ejercicio guiado: coincidencias de texto con expresiones regulares |
| 2.3 | Cuestionario: coincidencias de texto con expresiones regulares |
| 2.4 | Resumen |

## Qué practico

- Metacaracteres básicos: `.`, `*`, `[]`, `^`, `$`, `\`.
- `grep` con `-E` (ERE) y patrones para logs, archivos de configuración y salida de comandos.
- Diferencia entre coincidencia parcial y anclas de inicio/fin de línea.
- Aplicación práctica en el lab de ROL sobre texto real de RHEL.

## Comandos de referencia

```bash
grep -E 'patron' archivo
grep -E '^root:' /etc/passwd
grep -Ev 'comentario|vacío' /var/log/messages
```

## Notas del laboratorio

_(Completar después del ejercicio guiado 2.2: patrones que funcionaron y casos que fallaron.)_

## Siguiente paso

Repasar el cuestionario 2.3 en ROL y anotar aquí los patrones más útiles para el examen.
