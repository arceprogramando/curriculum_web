---
title: "RH134 — User task scheduling"
description: "RH134 notes on Linux user task scheduling: one-off and recurring jobs with at, batch and crontab, written for RHCSA EX200 practice on Red Hat systems."
excerpt: "Schedule one-time and recurring user tasks with at, batch, and cron."
date: 2026-03-22
locale: "en"
moduleNumber: 7
completed: false
tags: ["rhcsa", "rh134", "cron", "at", "scheduling"]
draft: false
relatedCert: "RHCSA EX200"
---

## Goal

Document **chapter 3** of [RH134 v10.0](https://rol.redhat.com/rol/app/courses/rh134-10.0) while studying it: schedule one-time and recurring user tasks on RHEL.

## Chapter content

| Section | Topic |
|---------|-------|
| 3.1 | Scheduling a future user job |
| 3.2 | Guided exercise: scheduling a future user job |
| 3.3 | Scheduling recurring user jobs |
| 3.4 | Guided exercise: scheduling recurring user jobs |
| 3.5 | Quiz: user task scheduling |
| 3.6 | Summary |

## What I practice

- `at` and `batch` to run commands once at a future time.
- `crontab -e` / `crontab -l` for recurring user jobs.
- Cron fields (minute, hour, day, month, weekday) and output redirection.
- Checking with `atq`, `atrm`, and user logs.

## Reference commands

```bash
echo "command" | at 14:30
atq
atrm 3
crontab -e
crontab -l
```

## Lab notes

_(Fill in after exercises 3.2 and 3.4: jobs created, schedules used, and how execution was verified.)_

## Next step

Finish quiz 3.5 on ROL and document here the cron syntax that was hardest.
