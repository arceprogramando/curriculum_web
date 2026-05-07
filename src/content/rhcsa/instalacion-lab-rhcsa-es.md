---
title: "Instalacion del laboratorio RHCSA en Fedora"
description: "Configuracion base del entorno de practica para RHCSA EX200 con enfoque en repetibilidad."
excerpt: "Paso a paso para preparar un laboratorio local: VMs, red, snapshots y checklist de arranque."
date: 2026-05-06
locale: "es"
moduleNumber: 1
completed: true
tags: ["linux", "rhcsa", "laboratorio", "virtualizacion"]
draft: false
relatedCert: "RHCSA EX200"
---

## Objetivo

Dejar un entorno listo para practicar todos los objetivos del examen RHCSA EX200 sin perder tiempo en configuraciones repetidas.

## Pasos principales

1. Crear dos VMs (servidor y nodo secundario).
2. Configurar red interna para pruebas de servicios.
3. Crear snapshots de estado inicial.
4. Registrar checklist de comandos base para reset rapido.

## Comandos clave

```bash
sudo dnf update -y
sudo hostnamectl set-hostname rhcsa-lab
ip a
```

## Resultado

Laboratorio estable para practicar usuarios, systemd, networking, storage y troubleshooting.
