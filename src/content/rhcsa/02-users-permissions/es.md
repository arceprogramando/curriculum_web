---
title: "Practica de usuarios, grupos y permisos"
description: "Práctica RHCSA de usuarios, grupos y permisos en Linux: useradd, passwd, chown, chmod, ACL y sudoers en labs Red Hat y Vagrant para el examen EX200."
excerpt: "Rutina de practica para dominar useradd, passwd, chown, chmod, ACLs y sudoers."
date: 2026-05-07
locale: "es"
moduleNumber: 2
completed: true
tags: ["rhcsa", "usuarios", "permisos", "acl"]
draft: false
relatedCert: "RHCSA EX200"
---

## Objetivo

Automatizar tareas comunes de gestion de usuarios y permisos hasta poder resolverlas bajo tiempo de examen.

## Practicas realizadas

- Alta y baja de usuarios con expiracion.
- Creacion de grupos de proyecto.
- Ajuste de permisos POSIX y ACL en directorios compartidos.
- Reglas basicas de sudo por grupo.

## Comandos de referencia

```bash
sudo useradd -m estudiante1
sudo passwd estudiante1
sudo setfacl -m u:estudiante1:rwx /srv/lab
sudo visudo
```
