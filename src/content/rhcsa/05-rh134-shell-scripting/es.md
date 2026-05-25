---
title: "RH134 — Scripts de shell y línea de comandos"
description: "Notas del capítulo 1 de RH134 v10.0: entorno de shell, scripts Bash, bucles y comandos condicionales."
excerpt: "Entorno de shell, scripts Bash simples, bucles, condicionales y laboratorio del capítulo 1."
date: 2026-03-15
locale: "es"
moduleNumber: 5
completed: false
tags: ["rhcsa", "rh134", "bash", "shell", "scripting"]
draft: false
relatedCert: "RHCSA EX200"
---

## Objetivo

Documentar el **capítulo 1** de [RH134 v10.0](https://rol.redhat.com/rol/app/courses/rh134-10.0) mientras lo estudio: reforzar la línea de comandos y automatizar tareas con scripts Bash en RHEL.

## Contenido del capítulo

| Sección | Tema |
|---------|------|
| 1.1 | Modificación del entorno de shell |
| 1.2 | Ejercicio guiado: modificación del entorno de shell |
| 1.3 | Redacción de scripts de Bash simples |
| 1.4 | Ejercicio guiado: scripts de Bash simples |
| 1.5 | Ejecución de bucles y comandos condicionales |
| 1.6 | Ejercicio guiado: bucles y comandos condicionales |
| 1.7 | Laboratorio: scripts de shell y línea de comandos |
| 1.8 | Resumen |

## Qué practico

- Variables de entorno, `export` y archivos de perfil (`~/.bashrc`, `/etc/profile.d/`).
- Scripts con shebang, permisos de ejecución y argumentos posicionales (`$1`, `$@`).
- Estructuras `if` / `elif` / `else`, `for`, `while` y `case`.
- Ejecución en el lab de ROL sin depender de un entorno local aparte.

## Comandos de referencia

```bash
chmod +x script.sh
./script.sh arg1 arg2
export VAR=valor
source ~/.bashrc
```

## Notas del laboratorio

_(Completar después del lab 1.7: scripts usados, errores de sintaxis y cómo se resolvieron.)_

## Siguiente paso

Cerrar el laboratorio del capítulo 1 en ROL y volcar aquí los pasos concretos cuando termine el capítulo.
