---
title: "RH134 — Gestión declarativa y convergencia del sistema"
description: "Notas del capítulo 4.4 de RH134: automatización, estado deseado y puente hacia DevOps e IaC."
excerpt: "Introducción a administración declarativa, runtime y herramientas que convergen el sistema (ch04s04)."
date: 2026-05-16
locale: "es"
moduleNumber: 4
completed: false
tags: ["rhcsa", "rh134", "declarativo", "automatizacion"]
draft: false
relatedCert: "RHCSA EX200"
---

## Objetivo

Documentar el capítulo **RH134 v10.0 — sección 4.4** ([curso en ROL](https://rol.redhat.com/rol/app/courses/rh134-10.0/pages/ch04s04)) mientras lo estudio: entender la idea de **llevar el sistema a un estado deseado** en lugar de ejecutar pasos manuales uno por uno.

## Qué introduce este ejercicio

- **Automatización de sistemas** — repetir tareas de forma fiable y auditable.
- **Administración declarativa** — describir *cómo debe quedar* el sistema, no solo *qué comando correr*.
- **Gestión de runtime** — qué corre ahora, cómo se supervisa y se recupera.
- **Configuración persistente del sistema** — cambios que sobreviven reinicios y despliegues.
- **Herramientas que convergen el estado** — el sistema se acerca al objetivo hasta alinear configuración y servicios.

## Misma filosofía que después verás en

| Área | Ejemplo |
|------|---------|
| Cultura y entrega | DevOps, CI/CD |
| Infraestructura | Infraestructura como código |
| Orquestación | Kubernetes, OpenShift |
| Aprovisionamiento inicial | cloud-init |
| Automatización en hosts | Ansible |

En RHCSA el foco sigue siendo **Linux en el host**; este capítulo conecta esas prácticas con el ecosistema más amplio sin dejar de ser administración de sistema.

## Notas del laboratorio

_(Completar después del ejercicio: comandos usados, archivos tocados, errores y cómo se resolvieron.)_

## Siguiente paso

Repasar el ejercicio en ROL y volcar aquí los pasos concretos del lab cuando termine el capítulo.
