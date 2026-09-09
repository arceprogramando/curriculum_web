---
title: "RH134 — Declarative management and system convergence"
description: "RH134 notes on declarative Linux management: desired state, system convergence, and the path toward DevOps and infrastructure as code for RHCSA EX200."
excerpt: "Introduction to declarative administration, runtime management, and convergence tools (ch04s04)."
date: 2026-05-16
locale: "en"
moduleNumber: 4
completed: false
tags: ["rhcsa", "rh134", "declarative", "automation"]
draft: false
relatedCert: "RHCSA EX200"
---

## Goal

Capture **RH134 v10.0 — section 4.4** ([course page on ROL](https://rol.redhat.com/rol/app/courses/rh134-10.0/pages/ch04s04)) while working through it: understand **converging the system to a desired state** instead of only running ad‑hoc commands.

## What this exercise introduces

- **System automation** — reliable, repeatable, auditable tasks.
- **Declarative administration** — describe *how the system should look*, not only *which command to run next*.
- **Runtime management** — what is running now, how it is monitored and recovered.
- **Persistent system configuration** — changes that survive reboots and redeployments.
- **Convergence tools** — the system moves toward the target until configuration and services align.

## Same philosophy you will see later in

| Area | Example |
|------|---------|
| Culture and delivery | DevOps, CI/CD |
| Infrastructure | Infrastructure as Code |
| Orchestration | Kubernetes, OpenShift |
| Initial provisioning | cloud-init |
| Host automation | Ansible |

For RHCSA the focus stays on **Linux on the host**; this chapter bridges daily sysadmin work with the wider ecosystem.

## Lab notes

_(Fill in after the exercise: commands used, files touched, failures and fixes.)_

## Next step

Finish the ROL lab and paste the concrete steps here when the chapter is done.
