---
title: "RHCSA lab setup on Fedora"
description: "Baseline setup for a repeatable RHCSA EX200 study environment."
excerpt: "How I prepare virtual machines, networking, and snapshots for daily practice."
date: 2026-05-06
locale: "en"
moduleNumber: 1
completed: true
tags: ["linux", "rhcsa", "lab", "virtualization"]
draft: false
relatedCert: "RHCSA EX200"
---

## Goal

Build a stable local lab so each study session starts fast and focuses on exam objectives.

## Main steps

1. Provision two VMs (main server and secondary node).
2. Configure internal networking for service tests.
3. Create baseline snapshots.
4. Keep a reset checklist with core commands.

## Key commands

```bash
sudo dnf update -y
sudo hostnamectl set-hostname rhcsa-lab
ip a
```
