---
title: "Systemd y servicios: rutina de estudio"
description: "Procedimiento practico para administrar servicios, targets y logs durante simulacros RHCSA."
excerpt: "Como practicar enable/start/restart, analisis de fallos y persistencia de servicios."
date: 2026-05-08
locale: "es"
moduleNumber: 3
completed: true
tags: ["rhcsa", "systemd", "servicios", "logs"]
draft: false
relatedCert: "RHCSA EX200"
---

## Objetivo

Ganar velocidad para diagnosticar y corregir servicios que no levantan correctamente en boot.

## Flujo de practica

1. Crear unidad de servicio de prueba.
2. Habilitar y reiniciar servicio.
3. Forzar error controlado y diagnosticar con logs.
4. Dejar recuperacion documentada.

## Comandos clave

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now myapp.service
sudo systemctl status myapp.service
journalctl -u myapp.service -n 50 --no-pager
```
