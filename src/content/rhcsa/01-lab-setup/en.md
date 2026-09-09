---
title: "Practice environment: Red Hat labs + local Vagrant lab"
description: "How I practice RHCSA EX200: RH024 done; RH104, Van Vugt book and RH199 in progress; RH124 and RH134 earned; official Red Hat labs plus a local Vagrant lab."
excerpt: "Pipeline RH024 → RH104 → RH124 → RH134 → Book → RH199 → EX200; official labs and Vagrant."
date: 2026-09-08
locale: "en"
moduleNumber: 1
completed: true
tags: ["rhcsa", "rh024", "rh104", "rh124", "rh134", "rh199", "red-hat", "rol", "vagrant", "rocky-linux"]
draft: false
relatedCert: "RHCSA EX200"
---

## Goal

Make it clear **where** I practice and **which phase** of the EX200 plan I'm in:

1. **RHCSA path on ROL:** RH024 (video) completed; RH104 Fundamentals v9.1 in progress.
2. **Earned base courses:** RH124 and RH134 (Credly badges).
3. **Current reinforcement:** *Red Hat RHCSA 9 Cert Guide* (Van Vugt, Ch. 7 permissions) + [RH199 Rapid Track v10.0](https://rol.redhat.com/rol/app/courses/rh199-10.0).
4. **Official labs** on ROL/LMS and **local lab** VirtualBox/Vagrant (2 VMs) for SSH/networking.

## Study pipeline

RH024 → RH104 → RH124 → RH134 → Book → RH199 → **EX200** (target) → EX294 (RHCE path)

Pre-exam practice target: **~Oct 30, 2026** (~73-day plan; day ~20/73).

## Courses and resources

| Resource | Status | Role in my path |
|----------|--------|-----------------|
| RH024 — Getting Started (video) | Completed (Sep 8) | RHCSA path prerequisite on ROL |
| [RH104 — Linux Fundamentals (v9.1)](https://rol.redhat.com/rol/app/courses/rh104-9.1) | In progress (10/56) | Fundamentals + GNOME labs via VNC |
| [RH124 — Red Hat System Administration I (v10.0)](https://rol.redhat.com/rol/app/courses/rh124-10.0) | Completed | Foundation: users, permissions, storage, bash |
| [RH134 — Red Hat System Administration II (v10.0)](https://rol.redhat.com/rol/app/courses/rh134-10.0) | Completed | LVM, firewall, SELinux, boot, containers |
| *Red Hat RHCSA 9 Cert Guide* (Sander van Vugt) | In progress (335/1593 p.) | Now Ch. 7 Permissions / ACL |
| [RH199 — RHCSA Rapid Track (v10.0)](https://rol.redhat.com/rol/app/courses/rh199-10.0) | In progress (10/154 p.) | Accelerated review on ROL |

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

1. Open the chapter on ROL (RH199, `rh134-10.0/pages/...`) or advance in the Van Vugt book.
2. Use the **environment assigned by the course**, or bring up the **local lab** with `vagrant up`, depending on what I need to repeat.
3. Capture commands and notes in the following modules on this blog.
4. If the official lab expires or the course window renews, I keep practicing in the local lab without depending on Red Hat.

## What I avoid

- I don't mark an exercise as done until I've actually run it in a real lab (official or local).
- I don't use the local lab to skip the course material: it's a complement for repetition and experimentation.

## Outcome

Practice aligned with **official RHEL labs**, reinforcement with **RH104 + book + RH199** toward **EX200**, plus a **local lab** (Vagrant/VirtualBox, 2 VMs) for SSH/networking and review.
