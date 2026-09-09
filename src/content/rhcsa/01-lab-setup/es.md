---
title: "Labs Red Hat y lab local con Vagrant"
description: "Cómo practico RHCSA EX200 en Linux: RH024 hecho; RH104, Van Vugt y RH199 en curso; RH124 y RH134 acreditados; labs oficiales Red Hat y lab Vagrant."
excerpt: "Pipeline RH024 → RH104 → RH124 → RH134 → Libro → RH199 → EX200; labs oficiales y Vagrant."
date: 2026-09-08
locale: "es"
moduleNumber: 1
completed: true
tags: ["rhcsa", "rh024", "rh104", "rh124", "rh134", "rh199", "red-hat", "rol", "vagrant", "rocky-linux"]
draft: false
relatedCert: "RHCSA EX200"
---

## Objetivo

Dejar claro **dónde** practico y **en qué fase** estoy del plan hacia EX200:

1. **Path RHCSA en ROL:** RH024 (video) completado; RH104 Fundamentals v9.1 en curso.
2. **Cursos base acreditados:** RH124 y RH134 (badges Credly).
3. **Refuerzo actual:** libro *Red Hat RHCSA 9 Cert Guide* (Van Vugt, Cap. 7 permisos) + [RH199 Rapid Track v10.0](https://rol.redhat.com/rol/app/courses/rh199-10.0).
4. **Labs oficiales** en ROL/LMS y **lab local** VirtualBox/Vagrant (2 VMs) para SSH/red.

## Pipeline de estudio

RH024 → RH104 → RH124 → RH134 → Libro → RH199 → **EX200** (objetivo) → EX294 (ruta RHCE)

Meta de práctica pre-examen: **~30 oct 2026** (plan ~73 días; día ~20/73).

## Cursos y recursos

| Recurso | Estado | Rol en mi camino |
|---------|--------|------------------|
| RH024 — Getting Started (video) | Completado (8 sep) | Requisito path RHCSA en ROL |
| [RH104 — Linux Fundamentals (v9.1)](https://rol.redhat.com/rol/app/courses/rh104-9.1) | En curso (10/56) | Fundamentals + labs GNOME vía VNC |
| [RH124 — Red Hat System Administration I (v10.0)](https://rol.redhat.com/rol/app/courses/rh124-10.0) | Completado | Base: usuarios, permisos, almacenamiento, bash |
| [RH134 — Red Hat System Administration II (v10.0)](https://rol.redhat.com/rol/app/courses/rh134-10.0) | Completado | LVM, firewall, SELinux, arranque, contenedores |
| *Red Hat RHCSA 9 Cert Guide* (Sander van Vugt) | En curso (335/1593 pág.) | Ahora Cap. 7 Permissions / ACL |
| [RH199 — RHCSA Rapid Track (v10.0)](https://rol.redhat.com/rol/app/courses/rh199-10.0) | En curso (10/154 pág.) | Repaso acelerado en ROL |

Acceso habitual:

- [Portal LMS](https://training-lms.redhat.com/) — sesiones y laboratorios con la cuenta activa.
- [Catálogo ROL](https://rol.redhat.com/rol/app/catalog) — material y labs por capítulo.

## Lab local con Vagrant (Rocky Linux 9)

Para practicar cuando no tengo el lab de Red Hat abierto, mantengo un lab base en el repo: `labs/rhcsa-base/Vagrantfile`. Levanta dos VMs con **Rocky Linux 9** (compatible con RHEL 9), ideal para escenarios de red, SSH, cron remoto, firewalld, etc.

| VM | Hostname | IP privada | Recursos |
|----|----------|------------|----------|
| `server` | `server.lab.local` | `192.168.56.10` | 1 vCPU / 1024 MB |
| `client` | `client.lab.local` | `192.168.56.11` | 1 vCPU / 1024 MB |

Características del entorno:

- **Box:** `rockylinux/9`, provider **VirtualBox**.
- **Red privada host-only** con IPs fijas (más simple y repetible que DHCP para practicar).
- **Zona horaria** `America/Montevideo` (UTC-3), útil para no confundirme con logs, cron y journal.
- **Provisioning idempotente:** `dnf update` + herramientas de administración (`vim-enhanced`, `bash-completion`, `man-pages`, `bind-utils`, `net-tools`, `iproute`, `policycoreutils-python-utils`, `setools-console`, `chrony`, `rsync`, etc.) y entradas en `/etc/hosts` para resolver `server` y `client` por nombre.

Uso rápido desde `labs/rhcsa-base/`:

```bash
vagrant up            # crea/levanta server y client
vagrant ssh server    # entrar al servidor
vagrant ssh client    # entrar al cliente
vagrant halt          # apagar las VMs
vagrant destroy -f    # borrar el lab para empezar de cero
```

> Los artefactos locales de Vagrant (`.vagrant/`, `*.log`, `*.box`) están en `.gitignore`, así que no se versionan.

## Cómo trabajo cada sesión

1. Abro el capítulo en ROL (RH199, `rh134-10.0/pages/...`) o avanzo en el libro Van Vugt.
2. Uso el **entorno que asigna el curso** o levanto el **lab local** con `vagrant up` según lo que necesite repetir.
3. Anoto en los módulos siguientes de este blog lo que hice, errores y comandos útiles.
4. Si el lab oficial expira o se renueva la ventana del curso, sigo practicando en el lab local sin depender de Red Hat.

## Qué evito

- No marco como hecho un ejercicio que solo está en el índice del curso hasta haberlo hecho en un lab real (oficial o local).
- No uso el lab local para saltarme el material de los cursos: es un complemento para repetir y experimentar.

## Resultado

Práctica alineada con **RHEL y labs oficiales**, refuerzo con **RH104 + libro + RH199** hacia **EX200**, más un **lab local** (Vagrant/VirtualBox, 2 VMs) para SSH/red y repaso.
