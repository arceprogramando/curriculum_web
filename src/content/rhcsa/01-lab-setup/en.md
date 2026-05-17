---
title: "Practice environment: official Red Hat labs"
description: "How I practice RHCSA using only the machines and labs from RH124 and RH134 on ROL/LMS."
excerpt: "No local Fedora lab: practice on RHEL environments provided by Red Hat Online Learning and the LMS portal."
date: 2026-05-16
locale: "en"
moduleNumber: 1
completed: true
tags: ["rhcsa", "rh124", "rh134", "red-hat", "rol"]
draft: false
relatedCert: "RHCSA EX200"
---

## Goal

Make it clear **where** I practice: only on environments supplied by Red Hat courses, not on self-hosted VMs or a separate home lab.

## Courses I use

| Course | Role in my path | Where I practice |
|--------|-----------------|-------------------|
| [RH124 — Red Hat System Administration I (v10.0)](https://rol.redhat.com/rol/app/courses/rh124-10.0) | Completed foundation (users, permissions, storage, bash, scripts) | Course **ROL** / **LMS** labs and machines |
| [RH134 — Red Hat System Administration II (v10.0)](https://rol.redhat.com/rol/app/courses/rh134-10.0) | In progress (LVM, firewall, SELinux, boot, containers, etc.) | Same Red Hat-provided environments per chapter |

Usual access:

- [LMS portal](https://training-lms.redhat.com/) — sessions and labs with an active account.
- [ROL catalog](https://rol.redhat.com/rol/app/catalog) — chapter material and labs.

## How I work each session

1. Open the chapter or lab on ROL (e.g. `rh134-10.0/pages/...`).
2. Use the **machine or environment assigned by the course** (RHEL, not a home VM).
3. Capture commands and notes in the following modules on this blog.
4. If a lab expires or the course window renews, I continue from Red Hat without reinstalling anything locally.

## What I do not do

- I do not document a “Fedora lab” with two homemade VMs here — **that is not my current workflow**.
- I do not mark an exercise as done in this blog until I have actually run it in Red Hat’s lab.

## Outcome

Practice aligned with **official RHEL labs**, consistent with **RHCSA EX200** prep and the rest of this blog.
