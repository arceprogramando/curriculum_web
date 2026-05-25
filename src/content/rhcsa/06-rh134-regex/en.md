---
title: "RH134 — Regular expressions"
description: "Notes from RH134 v10.0 chapter 2: text matching with regular expressions on the command line."
excerpt: "Regex for searching and filtering text with grep and shell tools."
date: 2026-03-18
locale: "en"
moduleNumber: 6
completed: false
tags: ["rhcsa", "rh134", "regex", "grep", "shell"]
draft: false
relatedCert: "RHCSA EX200"
---

## Goal

Document **chapter 2** of [RH134 v10.0](https://rol.redhat.com/rol/app/courses/rh134-10.0) while studying it: use regular expressions for text search and filtering in admin tasks.

## Chapter content

| Section | Topic |
|---------|-------|
| 2.1 | Text matching with regular expressions |
| 2.2 | Guided exercise: text matching with regular expressions |
| 2.3 | Quiz: text matching with regular expressions |
| 2.4 | Summary |

## What I practice

- Basic metacharacters: `.`, `*`, `[]`, `^`, `$`, `\`.
- `grep` with `-E` (ERE) and patterns for logs, config files, and command output.
- Partial match vs. start/end-of-line anchors.
- Practical use in the ROL lab on real RHEL text.

## Reference commands

```bash
grep -E 'pattern' file
grep -E '^root:' /etc/passwd
grep -Ev 'comment|empty' /var/log/messages
```

## Lab notes

_(Fill in after guided exercise 2.2: patterns that worked and cases that failed.)_

## Next step

Review quiz 2.3 on ROL and note the most useful patterns for the exam here.
