---
title: "RH134 — System task scheduling"
description: "RH134 notes on Linux system scheduling: systemd timers, temporary files and system cron, written for RHCSA EX200 study on Red Hat Enterprise Linux."
excerpt: "Systemd timers, tmpfiles, and recurring system tasks with cron."
date: 2026-03-25
locale: "en"
moduleNumber: 8
completed: false
tags: ["rhcsa", "rh134", "systemd", "cron", "scheduling"]
draft: false
relatedCert: "RHCSA EX200"
---

## Goal

Document **chapter 4** of [RH134 v10.0](https://rol.redhat.com/rol/app/courses/rh134-10.0) while studying it: schedule and manage system tasks with systemd, cron, and temporary file policies.

## Chapter content

| Section | Topic |
|---------|-------|
| 4.1 | Managing recurring jobs with systemd timer units |
| 4.2 | Guided exercise: systemd timers |
| 4.3 | Managing temporary files |
| 4.4 | Guided exercise: managing temporary files |
| 4.5 | Scheduling recurring system tasks with cron |
| 4.6 | Guided exercise: recurring system task with cron |
| 4.7 | Quiz: system task scheduling |
| 4.8 | Summary |

## What I practice

- Paired `.timer` and `.service` units (`systemctl list-timers`, `OnCalendar`).
- Temporary file cleanup with systemd-tmpfiles.
- Jobs in `/etc/cron.d/`, `/etc/cron.daily/`, and root crontab constraints.
- Difference between user tasks (ch. 3) and system tasks (ch. 4).

## Reference commands

```bash
systemctl list-timers --all
systemctl status my-timer.timer
systemd-tmpfiles --clean
ls /etc/cron.d/
```

## Lab notes

_(Fill in after exercises 4.2, 4.4, and 4.6: timer units created, tmpfiles rules, and system cron entries.)_

## Next step

Finish quiz 4.7 on ROL and paste the concrete lab steps here when the chapter is done.
