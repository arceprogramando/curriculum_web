---
title: "RHCSA / RH134 Glossary"
description: "Short definitions of commands, services, paths, and key concepts for RH124, RH134, and the EX200 exam."
excerpt: "Quick reference: system paths, systemd, cron, grep, logs, and course terminology."
date: 2026-03-26
locale: "en"
moduleNumber: 9
completed: true
tags: ["rhcsa", "rh134", "glossary", "reference"]
draft: false
relatedCert: "RHCSA EX200"
---

## Goal

Keep **short definitions** with the **paths** that show up in RH124, RH134, and ROL labs. I expand this as I progress through the course.

## Reviewed terms

| Term | Status |
|------|--------|
| [`journald`](#journald--reviewed) | ✓ Reviewed — RH134 ch. 5 (logs / journal) |
| [`journalctl`](#journalctl--reviewed) | ✓ Reviewed — RH134 ch. 5 (logs / journal) |
| [`rsyslog`](#rsyslog) | ✓ In progress — RH134 ch. 5 (syslog / `debug.conf`) |
| [`logger`](#logger) | ✓ In progress — RH134 ch. 5 (messages-debug lab) |

---

## Base system paths

| Path | What it is for |
|------|----------------|
| `/etc` | System configuration: services, cron, network, users, policies. Admin-editable text files. |
| `/var` | Variable data: logs, cache, mail queues, local databases. Grows with system use. |
| `/var/log` | Classic log files (syslog): events, auth, cron, services. |
| `/usr` | Installed programs and libraries (binaries in `/usr/bin`, units in `/usr/lib/systemd/`). |
| `/home` | User home directories (`/home/user`). Shell config in `~/.bashrc`. |
| `/tmp` | Temporary files (often cleared on reboot). |
| `/root` | Root user home directory. |
| `/bin`, `/sbin` | Essential system commands (`/sbin` often for admin/network). On RHEL many link to `/usr/bin`. |

---

## Shell and command line

### Bash

**Definition:** Default shell on RHEL. Interprets commands, variables, and scripts.

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `/bin/bash` | Bash interpreter executable. |
| `~/.bashrc` | Shell config when opening a terminal (aliases, prompt, variables). |
| `~/.bash_profile` | Config on login shell. |
| `/etc/profile` | Global login config for all users. |
| `/etc/profile.d/` | `.sh` scripts loaded at login (variables, PATH, etc.). |
| `/etc/bashrc` | Global config for interactive non-login shells. |

### Shebang

**Definition:** First line of a script (`#!/bin/bash`). Tells the system which interpreter runs the file.

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `/bin/bash` | Usual interpreter for admin scripts on RHEL. |
| `/usr/bin/env bash` | Portable alternative: finds `bash` in `PATH`. |

### Environment variable

**Definition:** Exported value (`export VAR=value`) inherited by child processes.

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `~/.bashrc`, `/etc/profile.d/` | Where persistent variables are often set. |
| `/proc/self/environ` | Shows current process environment (troubleshooting). |

---

## Permissions, owners, and roles (POSIX)

### `rwx` permissions (read, write, execute)

**Definition:** Every file and directory has permissions for **three categories**: owner (*user*), group (*group*), and others (*others*). Each category may have **r** (read), **w** (write), and **x** (execute).

**How to read `ls -l`:**

```
-rwxr-xr--  1 root root  1234 Mar 26 10:00 script.sh
│└┬┘└┬┘└┬┘
│ u  g  o   ← user, group, others
└ type: - file, d directory, l link
```

| Block | Letters | Meaning |
|-------|---------|---------|
| **User (u)** | `rwx` | Owner can read, write, and execute. |
| **Group (g)** | `r-x` | Group can read and execute, not write. |
| **Others (o)** | `r--` | Everyone else can only read. |

In the example: **owner** = all; **group** = read + execute; **others** = read only → notation **`rwxr-xr--`**.

### Numeric (octal) values

Each letter has a value; **add** them per category:

| Permission | Value |
|------------|-------|
| `r` (read) | 4 |
| `w` (write) | 2 |
| `x` (execute) | 1 |
| `-` (none) | 0 |

| `rwx` notation | Calculation | Octal |
|----------------|-------------|-------|
| `rwx` | 4+2+1 | **7** |
| `rw-` | 4+2+0 | **6** |
| `r-x` | 4+0+1 | **5** |
| `r--` | 4+0+0 | **4** |
| `---` | 0 | **0** |

Example **`rwxr-xr-x`** → user **7**, group **5**, others **5** → **`chmod 755`**.

Common examples:

| Octal | Notation | Typical use |
|-------|----------|-------------|
| `644` | `rw-r--r--` | Text file (owner edits, others read). |
| `600` | `rw-------` | Private file (owner only). |
| `755` | `rwxr-xr-x` | Executable script or program. |
| `700` | `rwx------` | Private executable for owner. |
| `1777` | `rwxrwxrwt` | Shared directory with *sticky bit* (e.g. `/tmp`). |

### `chmod` — octal (numeric) form

**Definition:** Sets permissions with three digits (user, group, others).

```bash
chmod 755 script.sh      # rwxr-xr-x
chmod 644 config.conf    # rw-r--r--
chmod 600 secret.txt     # rw-------
chmod 1777 /tmp          # sticky on directory (leading 1 before 777)
```

### `chmod` — symbolic form

**Definition:** Changes permissions by **who** and **what** to change, without recalculating full octal.

| Symbol | Meaning |
|--------|---------|
| `u` | User (owner) |
| `g` | Group |
| `o` | Others |
| `a` | All |
| `+` | Add permission |
| `-` | Remove permission |
| `=` | Set exactly these permissions |

```bash
chmod u+x script.sh        # add execute for owner
chmod g-w file             # remove write for group
chmod o=r file             # others read-only
chmod a+r file             # everyone can read
chmod u=rwx,g=rx,o= script.sh   # explicit per category
chmod +x script.sh         # executable for all (u,g,o)
```

### Owner and group: `chown` / `chgrp`

**Definition:** Changes **who owns** the file and **which group** it belongs to (not the `rwx` bits).

```bash
chown user:group file
chown root:root /etc/myapp.conf
chgrp developers project/
chown -R www:www /var/www/html/   # recursive on directory
```

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `/etc/passwd` | System users (UID, shell, home). |
| `/etc/group` | Groups and members (GID). |
| `/etc/shadow` | Passwords (root-readable only). |

### `umask`

**Definition:** Mask that **subtracts** permissions from **new** files and directories.

```bash
umask          # show current mask (e.g. 0022)
umask 077      # very restrictive new files for owner
```

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `~/.bashrc`, `/etc/profile` | Where `umask` is often set per user or globally. |

### Special permissions (EX200 summary)

| Bit | Extra octal | In `ls -l` | What it is for |
|-----|-------------|------------|----------------|
| **SUID** | `4xxx` | `s` instead of user **x** | Process runs as file **owner** UID (e.g. `passwd`). |
| **SGID** | `2xxx` | `s` on **group** | On dirs: new files inherit the directory’s group. |
| **Sticky** | `1xxx` | `t` on **others** | On dirs: only file owner can delete their file (e.g. `/tmp`). |

```bash
chmod u+s /usr/bin/command    # SUID symbolic
chmod g+s /srv/shared         # SGID on directory
chmod +t /tmp                 # sticky bit
chmod 4755 file               # SUID + 755
```

### ACL (extended permissions)

**Definition:** Access control lists **finer** than u/g/o only (specific user, extra rules). Commands: `getfacl`, `setfacl`.

```bash
setfacl -m u:maria:rwx /srv/project
getfacl /srv/project
```

**Example paths:** Shared directories under `/srv/` or `/home/` in RH124 labs.

---

## Reading and searching text

### `less`

**Definition:** Terminal pager to scroll long files without dumping everything on screen (`q` to quit).

**Example paths:**

| Path | What it is for |
|------|----------------|
| `/var/log/messages` | General system log; common `less` practice file. |
| `/etc/passwd` | User list; short file useful for read-permission drills. |

### `tail`

**Definition:** Shows the **last lines** of a file. `tail -f` follows the file in real time (great for logs).

**Example paths:**

| Path | What it is for |
|------|----------------|
| `/var/log/secure` | Login attempts, sudo, SSH. |
| `/var/log/cron` | Cron job execution. |
| `/var/log/messages` | General system events. |

### `grep`

**Definition:** Searches text patterns in files or pipes. `grep -E` uses extended regex.

**Example paths:**

| Path | What it is for |
|------|----------------|
| `/var/log/messages` | Filter errors or specific services. |
| `/etc/passwd` | Find users (`grep root /etc/passwd`). |
| `/etc/crontab` | Review system cron entries. |

### Regular expression (regex)

**Definition:** Pattern to match text (`.`, `*`, `[]`, `^`, `$`). In RH134 mainly used with `grep -E`.

**Example paths:** Any file under `/etc/` or `/var/log/` when filtering configs or logs.

---

## Logs and system logging

### syslog

**Definition:** Classic logging model: services and kernel write messages to log files.

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `/var/log/messages` | General messages (kernel, various services). |
| `/var/log/secure` | Authentication, PAM, sudo. |
| `/var/log/cron` | Cron output and events. |
| `/var/log/maillog` | Mail (if installed). |
| `/var/log/boot.log` | Boot messages (depending on config). |

### `rsyslog`

**Definition:** Service that receives and routes syslog messages to files, sockets, or other targets.

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `/etc/rsyslog.conf` | Main routing configuration. |
| `/etc/rsyslog.d/` | Additional config snippets (**only `*.conf` files are loaded**). |
| `/var/log/` | Usual destination for generated log files. |

#### Guided lab: redirect `debug` to `/var/log/messages-debug`

**Exercise goal (RH134 / `logs-syslog`):** have `rsyslog` write all messages at **debug priority or higher** (any facility) to `/var/log/messages-debug`.

#### Why practice this

Practicing syslog is not just “passing a lab”—it is learning **where to look when something breaks on a server** and **how to make the system record what matters**.

| In practice | What you gain |
|-------------|----------------|
| **Troubleshooting** | Services that won’t start, cron that doesn’t run, scripts that fail—the answer is usually in `/var/log/` with `tail`, `grep`, or `less`. |
| **Less noise** | Routing by priority (`*.debug` to a separate file) teaches you not to dump everything into one huge log. |
| **Script audit trail** | With `logger`, backups/cron jobs leave traces in the **official** log, not in `/tmp/my.log` nobody checks. |
| **Understanding RHEL** | Services write → **rsyslog** routes → you read or send with **logger**. Same pattern shows up with firewall, cron, systemd, etc. |
| **RHCSA EX200** | Exam pattern: **configure → restart service → test → verify** (`debug.conf`, `systemctl restart rsyslog`, `logger`, `tail`). |

**Analogy from development:** syslog is “server-side observability”—levels (debug, info, err), filtering (`grep`/`tail`), and centralized rules (`/etc/rsyslog.d/`), like Sentry or structured logs but at the OS level.

**In one sentence:** control **what the system logs, where it is written, and how you read it when something breaks**—a foundation for sysadmin, DevOps, and any backend work on Linux.

**Rule (in `/etc/rsyslog.d/debug.conf`):**

```text
*.debug /var/log/messages-debug
```

| Part | Meaning |
|------|---------|
| `*` | Any **facility** (user, mail, cron, etc.). |
| `.debug` | **debug** priority and all **higher** ones (info, notice, warning, err…). |

**Steps (lab order):**

```bash
# On workstation
lab start logs-syslog

ssh student@servera
sudo -i

# Create the file (exact name: debug.conf)
vi /etc/rsyslog.d/debug.conf
# content: *.debug /var/log/messages-debug

rsyslogd -N1                    # validate syntax
systemctl restart rsyslog

logger -p user.debug "Debug Message Test"
tail /var/log/messages-debug    # should show "Debug Message Test"
```

**Expected output (example):**

```text
Feb 13 18:27:58 servera root[25416]: Debug Message Test
```

(You may also see `systemd`/`rsyslogd` lines from restarting the service.)

**Common mistakes:**

| Mistake | Cause |
|---------|--------|
| `No such file or directory` for `messages-debug` | File named `debug-conf` instead of **`debug.conf`** → rsyslog never loads the rule. |
| `logger` has no effect | Restart **after** creating the rule; try `grep "Debug Message Test" /var/log/messages`. |
| `$'\E[200~cat'` when pasting | Browser “bracketed paste”; type the command manually. |

**Finish the lab:**

```bash
exit   # root → student → workstation
lab finish logs-syslog
```

### `journald` · ✓ Reviewed {#journald--reviewed}

**Status:** reviewed in RH134 (syslog, journal, and logging labs).

**Definition:** **systemd daemon** that receives messages from the kernel, systemd, and services, and stores them in the **journal** (binary, indexed log—not a plain-text `.log` file).

**Where it comes from:** Built into **systemd**. Managed as a service/unit; main config in `journald.conf`.

**What it is for:**

| Role | Detail |
|------|--------|
| **Centralize logs** | One place for kernel + services + systemd. |
| **Feed `journalctl`** | Without `journald` there is no journal to query. |
| **Complement syslog** | Can forward to **rsyslog** (`ForwardToSyslog`) and also produce `/var/log/messages`. |
| **Persistence** | Decides whether the journal survives reboots (`/var/log/journal/`). |

**Relation to `journalctl`:** `journald` **writes**; `journalctl` **reads**. You almost always use them together.

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `/usr/lib/systemd/systemd-journald` | Daemon process (reference; manage with `systemctl`). |
| `/var/log/journal/` | **Persistent** journal on disk (if enabled). |
| `/run/log/journal/` | **Volatile** journal until reboot (depending on config). |
| `/etc/systemd/journald.conf` | Retention, max size, forward to syslog, storage. |

**Useful commands (service):**

```bash
systemctl status systemd-journald
systemctl restart systemd-journald   # after changing journald.conf
```

### `journalctl` · ✓ Reviewed {#journalctl--reviewed}

**Status:** reviewed in RH134 (syslog, journal, and logging labs).

**Definition:** Command to **read and filter logs from the systemd journal** (`journald`). It does not open plain text files in `/var/log/` directly—it queries the structured log stored by the kernel, systemd, and services.

**Where it comes from:** Part of **systemd**. The **`journald`** daemon writes the journal; **`journalctl`** is the query tool. It complements (does not replace) syslog/`rsyslog` and files like `/var/log/messages`.

**Strongest use case:** Troubleshoot **why a service failed to start** or what happened **since the last reboot**, filtering by unit, time, or priority without hunting through multiple files.

**Common uses:**

| Use | Command | What it is for |
|-----|---------|----------------|
| Recent journal | `journalctl` | General view (can be long—combine with filters). |
| Live follow | `journalctl -f` | Like `tail -f` for the journal (new events as they arrive). |
| Service logs | `journalctl -u httpd.service` | Everything recorded by Apache/Nginx or another unit. |
| Last N lines | `journalctl -u httpd -n 50 --no-pager` | 50 most recent entries, no pager. |
| Errors only | `journalctl -p err` | **err** priority and higher (crit, alert, emerg). |
| Time window | `journalctl --since "1 hour ago"` | Filter by time (`--until "2026-03-26 12:00"`). |
| Current boot | `journalctl -b` | Messages since the **last boot** only. |
| Previous boot | `journalctl -b -1` | What happened on the **prior** reboot. |
| Kernel | `journalctl -k` | Kernel messages (hardware, drivers, mounts). |
| Quick diagnosis | `journalctl -xe` | Recent entries with extra context; classic after a failure. |
| Service status | `systemctl status httpd` | Summary plus **recent journal lines** for that unit. |
| Journal disk use | `journalctl --disk-usage` | How much disk the journal uses. |
| Free space | `journalctl --vacuum-time=7d` | Drop entries older than 7 days (admin). |

**Combined examples (most used in labs and EX200):**

```bash
journalctl -u rsyslog.service -n 30 --no-pager
journalctl -u sshd.service --since today
journalctl -p warning -b
journalctl -xe
```

**Priorities (`-p`):** lowest to highest severity — `debug`, `info`, `notice`, `warning`, `err`, `crit`, `alert`, `emerg`.  
`journalctl -p err` includes err and everything more severe.

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `/usr/bin/journalctl` | Command executable. |
| `/var/log/journal/` | Persistent journal on disk (if enabled). |
| `/run/log/journal/` | Volatile journal until reboot. |
| `/etc/systemd/journald.conf` | Retention, max size, forward to syslog. |

**`journalctl` vs. `tail /var/log/messages`:**

| | `journalctl` | `tail` + `/var/log/` |
|---|--------------|----------------------|
| Source | **journald** journal | **rsyslog** files |
| Filter by service | `-u name.service` | `grep` in the file |
| By boot | `-b`, `-b -1` | More manual |
| Live | `journalctl -f` | `tail -f /var/log/messages` |

On RHEL it pays to know **both**: many services write to the journal and also to syslog depending on config.

### `logger`

**Definition:** Shell command to **send messages to the system log** (syslog/`rsyslog` and, depending on config, the journal too). It does not write a file by hand—it uses the system’s logging infrastructure.

**Where it comes from:** Part of the **syslog** ecosystem on RHEL (`util-linux` / logging tools). The message goes through the syslog API; **`rsyslog`** (or the active log daemon) routes it by facility, priority, and rules in `/etc/rsyslog.conf`.

**Strongest use case:** From **scripts, cron, and one-liners**, record events in the **same pipeline as the rest of the system**—with timestamp, tag, and priority—without scattered ad-hoc log files. Ideal for auditing backups, scheduled jobs, or custom automation.

**How to use it:**

```bash
logger "Backup finished successfully"
logger -t my-script "Task started"
logger -p user.info "Process OK"
logger -p user.warning "Disk space low"
logger -p local0.err "Copy failed"
echo "command output" | logger -t cron-lab -p info
```

| Option | What it is for |
|--------|----------------|
| `-t TAG` | Process tag (shows in logs; easy to `grep`). |
| `-p FACILITY.PRIORITY` | Facility and priority (`user.info`, `user.warning`, `local0.err`, etc.). |
| `-f FILE` | Read lines from a file and send them to the log. |
| `-i` | Include the PID of the calling process. |

**Common priorities (low to high):** `debug`, `info`, `notice`, `warning`, `err`, `crit`, `alert`, `emerg`.

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `/usr/bin/logger` | Command executable. |
| `/etc/rsyslog.conf`, `/etc/rsyslog.d/` | Rules that decide **which file** each message goes to. |
| `/var/log/messages` | Usual destination for `user.*` and general info. |
| `/var/log/cron` | Often shows events tied to scheduled tasks. |
| `/var/log/secure` | If the message is routed to auth/security (per rules). |

**See the result:**

```bash
logger -t rh134-test -p user.info "Test message from glossary"
grep rh134-test /var/log/messages
# or live:
tail -f /var/log/messages
```

**When to use it vs. `echo` to a file:** `echo >> /tmp/my.log` stays isolated; **`logger`** integrates the event into centralized server logging—aligned with RH134 (syslog, cron, admin scripts).

---

## systemd

### systemd

**Definition:** Init and service manager on RHEL. Boots the system, mounts, targets, and unit dependencies.

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `/usr/lib/systemd/system/` | Package-installed units (do not edit by hand). |
| `/etc/systemd/system/` | Admin overrides and custom units (overrides `/usr/lib`). |
| `/run/systemd/system/` | Transient runtime units. |

### Unit

**Definition:** A `.service`, `.timer`, `.target`, etc. file describing what to run and when.

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `/etc/systemd/system/myapp.service` | Admin-defined service. |
| `/etc/systemd/system/myapp.timer` | Timer linked to a service. |
| `/usr/lib/systemd/system/crond.service` | Example: cron daemon unit. |

### `systemctl`

**Definition:** Command for `start`, `stop`, `enable`, `disable`, `status`, `daemon-reload`, `list-timers`, etc.

**Related paths:** Operates on units in `/etc/systemd/system/` and `/usr/lib/systemd/system/`.

### Target

**Definition:** Groups units for a system state (similar to legacy runlevels).

**Example paths:**

| Path | What it is for |
|------|----------------|
| `/usr/lib/systemd/system/multi-user.target` | Multi-user mode (console/network, GUI optional). |
| `/usr/lib/systemd/system/graphical.target` | Graphical environment. |

### Timer (systemd)

**Definition:** A `.timer` unit that triggers a `.service` on a schedule (`OnCalendar`) or interval.

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `/etc/systemd/system/backup.timer` | When to run the job. |
| `/etc/systemd/system/backup.service` | What command runs when the timer fires. |

### `systemd-tmpfiles`

**Definition:** Creates, cleans, and sets permissions on temp files/directories per rules.

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `/usr/lib/tmpfiles.d/` | Package rules. |
| `/etc/tmpfiles.d/` | Admin custom rules. |
| `/tmp`, `/var/tmp` | Directories often managed by these rules. |

---

## Task scheduling

### `at`

**Definition:** Schedules **one job** at a future date/time.

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `/var/spool/at/` | Pending job queue (spool). |
| `/etc/at.allow`, `/etc/at.deny` | Who may or may not use `at`. |

### `batch`

**Definition:** Like `at`, but runs when system load is low.

**Relevant paths:** Same queue and permissions as `at` (`/var/spool/at/`, `at.allow`/`at.deny`).

### `crontab`

**Definition:** Table of **recurring** user jobs (`crontab -e`, `crontab -l`).

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `/var/spool/cron/` | Per-user crontabs (e.g. `/var/spool/cron/root`). |
| `/etc/cron.allow`, `/etc/cron.deny` | Access control for `crontab`. |

### `crond`

**Definition:** Daemon that runs user crontabs and system cron jobs.

**Relevant paths:**

| Path | What it is for |
|------|----------------|
| `/usr/sbin/crond` | Daemon binary. |
| `/var/spool/cron/` | User crontabs. |
| `/etc/cron.d/` | System jobs with explicit user per line. |
| `/etc/cron.daily/`, `/etc/cron.hourly/`, `/etc/cron.weekly/`, `/etc/cron.monthly/` | Scripts run on those intervals. |
| `/etc/crontab` | System crontab (classic format with user field). |

### `/etc/cron.d/`

**Definition:** **System-level** cron files; each line includes user and command.

**What it is for:** Recurring tasks from packages or the admin without editing a user's personal crontab.

---

## Other useful terms

### RHEL

Red Hat Enterprise Linux. Base OS for official labs and the RHCSA exam.

### ROL / LMS

Red Hat course portal (RH124, RH134) and cloud lab machines.

### Lab

RHEL environment provided by the course—not a self-hosted home VM.

---

## How I use this glossary

- I check paths + definition before a chapter or EX200 practice.
- When a new path repeats in labs, I add it with a one-line “what it is for”.
- If RHEL moves something, I note it in the table.
