---
title: "Users, groups, and permissions practice"
description: "Hands-on routine for account management, password policy, and advanced permissions."
excerpt: "Practice path for useradd, passwd, chown, chmod, ACLs, and sudoers tasks."
date: 2026-05-07
locale: "en"
moduleNumber: 2
completed: true
tags: ["rhcsa", "users", "permissions", "acl"]
draft: false
relatedCert: "RHCSA EX200"
---

## Goal

Increase speed and consistency for user and permission tasks under exam constraints.

## Completed exercises

- User lifecycle with expiration policies.
- Project group creation and membership updates.
- POSIX and ACL permission scenarios.
- Basic sudo delegation by group.

## Reference commands

```bash
sudo useradd -m student1
sudo passwd student1
sudo setfacl -m u:student1:rwx /srv/lab
sudo visudo
```
