---
title: "RH134 — Shell scripts and command line"
description: "Notes from RH134 v10.0 chapter 1: shell environment, Bash scripts, loops, and conditional commands."
excerpt: "Shell environment, simple Bash scripts, loops, conditionals, and chapter 1 lab."
date: 2026-03-15
locale: "en"
moduleNumber: 5
completed: false
tags: ["rhcsa", "rh134", "bash", "shell", "scripting"]
draft: false
relatedCert: "RHCSA EX200"
---

## Goal

Document **chapter 1** of [RH134 v10.0](https://rol.redhat.com/rol/app/courses/rh134-10.0) while studying it: strengthen the command line and automate tasks with Bash scripts on RHEL.

## Chapter content

| Section | Topic |
|---------|-------|
| 1.1 | Modifying the shell environment |
| 1.2 | Guided exercise: modifying the shell environment |
| 1.3 | Writing simple Bash scripts |
| 1.4 | Guided exercise: writing simple Bash scripts |
| 1.5 | Running loops and conditional commands |
| 1.6 | Guided exercise: loops and conditional commands |
| 1.7 | Lab: shell scripts and command line |
| 1.8 | Summary |

## What I practice

- Environment variables, `export`, and profile files (`~/.bashrc`, `/etc/profile.d/`).
- Scripts with shebang, execute permissions, and positional arguments (`$1`, `$@`).
- `if` / `elif` / `else`, `for`, `while`, and `case` structures.
- Running everything in the ROL lab without a separate local environment.

## Reference commands

```bash
chmod +x script.sh
./script.sh arg1 arg2
export VAR=value
source ~/.bashrc
```

## Lab notes

_(Fill in after lab 1.7: scripts used, syntax errors, and how they were fixed.)_

## Next step

Finish chapter 1 lab on ROL and paste the concrete steps here when the chapter is done.
