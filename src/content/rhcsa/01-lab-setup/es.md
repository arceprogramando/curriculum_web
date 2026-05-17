---
title: "Entorno de práctica: labs oficiales Red Hat"
description: "Cómo practico RHCSA usando solo las máquinas y laboratorios de los cursos RH124 y RH134 en ROL/LMS."
excerpt: "Sin lab local en Fedora: práctica en entornos RHEL provistos por Red Hat Online Learning y el portal LMS."
date: 2026-05-16
locale: "es"
moduleNumber: 1
completed: true
tags: ["rhcsa", "rh124", "rh134", "red-hat", "rol"]
draft: false
relatedCert: "RHCSA EX200"
---

## Objetivo

Dejar claro **dónde** practico: solo en los entornos que proveen los cursos de Red Hat, no en VMs propias ni en un laboratorio local aparte.

## Cursos que uso

| Curso | Rol en mi camino | Dónde practico |
|-------|------------------|----------------|
| [RH124 — Red Hat System Administration I (v10.0)](https://rol.redhat.com/rol/app/courses/rh124-10.0) | Base ya cursada (usuarios, permisos, almacenamiento, bash, scripts) | Labs y máquinas del curso en **ROL** / **LMS** |
| [RH134 — Red Hat System Administration II (v10.0)](https://rol.redhat.com/rol/app/courses/rh134-10.0) | En curso (LVM, firewall, SELinux, arranque, contenedores, etc.) | Mismos entornos provistos por Red Hat en cada capítulo |

Acceso habitual:

- [Portal LMS](https://training-lms.redhat.com/) — sesiones y laboratorios con la cuenta activa.
- [Catálogo ROL](https://rol.redhat.com/rol/app/catalog) — material y labs por capítulo.

## Cómo trabajo cada sesión

1. Abro el capítulo o lab en ROL (por ejemplo `rh134-10.0/pages/...`).
2. Uso la **máquina o entorno que asigna el curso** (RHEL, no una VM casera mía).
3. Anoto en los módulos siguientes de este blog lo que hice, errores y comandos útiles.
4. Si el lab expira o se renueva la ventana del curso, sigo desde Red Hat sin reinstalar nada local.

## Qué no hago

- No documento aquí un “lab en Fedora” con dos VMs caseras: **no es mi flujo actual**.
- No marco como hecho un ejercicio que solo está en el índice del curso hasta haberlo hecho en el lab de Red Hat.

## Resultado

Práctica alineada con **RHEL y labs oficiales**, coherente con la preparación al **RHCSA EX200** y con el resto de entradas de este blog.
