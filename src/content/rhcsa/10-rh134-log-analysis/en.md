---
title: "RH134 — Log analysis and storage"
description: "Notes from RH134 v10.0 chapter 5: logging architecture, syslog, persistent journal, and time synchronization."
excerpt: "Log architecture, rsyslog, journalctl, persistent journal, and chrony."
date: 2026-05-24
locale: "en"
moduleNumber: 10
completed: false
tags: ["rhcsa", "rh134", "syslog", "journal", "rsyslog", "chrony"]
draft: false
relatedCert: "RHCSA EX200"
---

## Goal

Document **chapter 5** of [RH134 v10.0](https://rol.redhat.com/rol/app/courses/rh134-10.0) while studying it: understand **how events are logged** on RHEL, query them via **syslog** and **journal**, make the journal **persistent**, and keep **time** in sync.

## Chapter content

| Section | Topic |
|---------|-------|
| 5.1 | System logging architecture |
| 5.2 | Quiz: system logging architecture |
| 5.3 | Interpretation and management of syslog events |
| 5.4 | Guided exercise: syslog events |
| 5.5 | Search and interpret system journal log entries |
| 5.6 | Guided exercise: journal log entries |
| 5.7 | Configure a persistent system journal |
| 5.8 | Guided exercise: persistent system journal |
| 5.9 | Maintain time synchronization |

## What I practice (mental map)

```
Services / kernel / scripts
        ↓
   journald (journal)  ←→  rsyslog (/var/log/)
        ↓                        ↓
   journalctl              tail / grep / logger
```

| Layer | Tools | Key paths |
|-------|-------|-----------|
| **Classic syslog** | `rsyslog`, `logger`, `tail`, `grep` | `/etc/rsyslog.conf`, `/etc/rsyslog.d/*.conf`, `/var/log/messages` |
| **Journal (systemd)** | `journalctl` | `/var/log/journal/`, `/etc/systemd/journald.conf` |
| **Time** | `chronyd`, `chronyc`, `timedatectl` | `/etc/chrony.conf` |

## Key labs and exercises

### Syslog — `messages-debug` (5.4)

Rule in **`/etc/rsyslog.d/debug.conf`** (exact name with `.conf`):

```text
*.debug /var/log/messages-debug
```

```bash
systemctl restart rsyslog
logger -p user.debug "Debug Message Test"
tail /var/log/messages-debug
```

See also [glossary — messages-debug lab](/en/rhcsa-ex200/09-rh134-glosario/).

### Journal — queries (5.5 / 5.6)

```bash
journalctl -p warning
journalctl -b
journalctl --list-boots
journalctl -u rsyslog -n 20 --no-pager
journalctl -xe
```

### Persistent journal (5.7 / 5.8)

```bash
ls /var/log/journal/
journalctl --disk-usage
# Config: /etc/systemd/journald.conf → Storage=persistent (or auto)
sudo systemctl restart systemd-journald
```

### Time synchronization (5.9)

```bash
timedatectl
chronyc tracking
systemctl status chronyd
```

## Reference commands

```bash
rsyslogd -N1                              # validate rsyslog config
logger -p user.info "test message"
journalctl --vacuum-time=7d               # maintenance (admin)
```

## Lab notes

_(Fill in after 5.4, 5.6, and 5.8: configs changed, errors — e.g. `debug-conf` without `.conf` — and fixes.)_

## Next step

Finish quizzes 5.2 and labs with `lab finish` when done; paste key output from persistent journal and chrony here.
