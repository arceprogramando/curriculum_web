---
title: "Entorno de práctica: labs Red Hat + lab local con Vagrant"
description: "Cómo practico RHCSA: RH124/RH134 completados, refuerzo con libro Van Vugt y RH199, más lab local Vagrant (Rocky Linux 9)."
excerpt: "Pipeline RH124 → RH134 → Libro → RH199 → EX200; labs oficiales Red Hat y lab local Vagrant."
date: 2026-08-31
locale: "es"
moduleNumber: 1
completed: true
tags: ["rhcsa", "rh124", "rh134", "rh199", "red-hat", "rol", "vagrant", "rocky-linux"]
draft: false
relatedCert: "RHCSA EX200"
---

## Objetivo

Dejar claro **dónde** practico y **en qué fase** estoy del plan hacia EX200:

1. **Cursos base completados:** RH124 y RH134 (badges Credly).
2. **Refuerzo actual:** libro *Red Hat RHCSA 9 Cert Guide* (Van Vugt) + [RH199 Rapid Track v10.0](https://rol.redhat.com/rol/app/courses/rh199-10.0) en ROL.
3. **Labs oficiales** de Red Hat en ROL/LMS cuando corresponde.
4. **Lab local** con Vagrant + VirtualBox para repetir escenarios sin depender de la ventana del curso.

## Pipeline de estudio

RH124 → RH134 → Libro → RH199 → **EX200** (objetivo) → EX294 (ruta RHCE)

Meta de práctica pre-examen: **~20 oct 2026** (plan de refuerzo de ~63 días).

## Cursos y recursos

| Recurso | Estado | Rol en mi camino |
|---------|--------|------------------|
| [RH124 — Red Hat System Administration I (v10.0)](https://rol.redhat.com/rol/app/courses/rh124-10.0) | Completado | Base: usuarios, permisos, almacenamiento, bash, scripts |
| [RH134 — Red Hat System Administration II (v10.0)](https://rol.redhat.com/rol/app/courses/rh134-10.0) | Completado | LVM, firewall, SELinux, arranque, contenedores |
| *Red Hat RHCSA 9 Cert Guide* (Sander van Vugt) | En curso (272/1593 pág.) | Refuerzo teórico/práctico hacia EX200 |
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

Práctica alineada con **RHEL y labs oficiales**, refuerzo con **libro + RH199** hacia **EX200**, más un **lab local reproducible** con Vagrant para repasar escenarios cuando quiera.
