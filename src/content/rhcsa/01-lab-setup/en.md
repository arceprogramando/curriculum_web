---
title: "Practice environment: Red Hat labs + local Vagrant lab"
description: "How I practice RHCSA by combining the official RH124/RH134 labs on ROL/LMS with a reproducible local lab on Rocky Linux 9 (Vagrant + VirtualBox)."
excerpt: "Two environments: official Red Hat labs and a local Vagrant lab (Rocky Linux 9, server and client VMs)."
date: 2026-07-21
locale: "en"
moduleNumber: 1
completed: true
tags: ["rhcsa", "rh124", "rh134", "red-hat", "rol", "vagrant", "rocky-linux"]
draft: false
relatedCert: "RHCSA EX200"
---

## Goal

Make it clear **where** I practice. I use two complementary environments:

1. The **official labs** from the RH124 and RH134 courses on ROL/LMS.
2. A **reproducible local lab** with Vagrant + VirtualBox to repeat scenarios without depending on the course window.

## Courses I use

| Course | Role in my path | Where I practice |
|--------|-----------------|-------------------|
| [RH124 — Red Hat System Administration I (v10.0)](https://rol.redhat.com/rol/app/courses/rh124-10.0) | Completed foundation (users, permissions, storage, bash, scripts) | Course **ROL** / **LMS** labs and machines |
| [RH134 — Red Hat System Administration II (v10.0)](https://rol.redhat.com/rol/app/courses/rh134-10.0) | In progress (LVM, firewall, SELinux, boot, containers, etc.) | Same Red Hat-provided environments per chapter |

Usual access:

- [LMS portal](https://training-lms.redhat.com/) — sessions and labs with an active account.
- [ROL catalog](https://rol.redhat.com/rol/app/catalog) — chapter material and labs.

## Local Vagrant lab (Rocky Linux 9)

To practice when I don't have the Red Hat lab open, I keep a base lab in the repo: `labs/rhcsa-base/Vagrantfile`. It brings up two **Rocky Linux 9** VMs (RHEL 9 compatible), ideal for networking, SSH, remote cron, firewalld, and similar scenarios.

| VM | Hostname | Private IP | Resources |
|----|----------|------------|-----------|
| `server` | `server.lab.local` | `192.168.56.10` | 1 vCPU / 1024 MB |
| `client` | `client.lab.local` | `192.168.56.11` | 1 vCPU / 1024 MB |

Environment features:

- **Box:** `rockylinux/9`, **VirtualBox** provider.
- **Host-only private network** with fixed IPs (simpler and more repeatable than DHCP for practice).
- **Timezone** `America/Montevideo` (UTC-3), so logs, cron and journal times match my real setup.
- **Idempotent provisioning:** `dnf update` + admin tooling (`vim-enhanced`, `bash-completion`, `man-pages`, `bind-utils`, `net-tools`, `iproute`, `policycoreutils-python-utils`, `setools-console`, `chrony`, `rsync`, etc.) and `/etc/hosts` entries to resolve `server` and `client` by name.

Quick usage from `labs/rhcsa-base/`:

```bash
vagrant up            # create/start server and client
vagrant ssh server    # log into the server
vagrant ssh client    # log into the client
vagrant halt          # power off the VMs
vagrant destroy -f    # wipe the lab and start fresh
```

> Local Vagrant artifacts (`.vagrant/`, `*.log`, `*.box`) are in `.gitignore`, so they are not versioned.

## How I work each session

1. Open the chapter or lab on ROL (e.g. `rh134-10.0/pages/...`).
2. Use the **environment assigned by the course**, or bring up the **local lab** with `vagrant up`, depending on what I need to repeat.
3. Capture commands and notes in the following modules on this blog.
4. If the official lab expires or the course window renews, I keep practicing in the local lab without depending on Red Hat.

## What I avoid

- I don't mark an exercise as done until I've actually run it in a real lab (official or local).
- I don't use the local lab to skip the course material: it's a complement for repetition and experimentation.

## Outcome

Practice aligned with **official RHEL labs**, plus a **reproducible local Vagrant lab** to review scenarios whenever I want, consistent with **RHCSA EX200** prep and the rest of this blog.
