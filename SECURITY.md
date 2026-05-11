# Security Policy

**DoView Boards version:** V1.1.0  
**Release date:** 2026-05-08  
**Document status:** Security policy for the first public DoView Boards prompt package release

## Supported versions

This repository currently supports the first public DoView Boards prompt package release:

| Version | Supported |
|---|---|
| V1.1.0 | Yes |

Earlier internal development builds are not supported public releases.

## Reporting security issues

Please do not report security issues by opening a public GitHub issue if the issue could expose users to risk.

To report a security concern, contact DoView Planning:

<https://doviewplanning.org/contact>

Please include:

- the affected file or feature;
- the version number, if known;
- a short description of the issue;
- steps to reproduce the issue, where safe to share;
- any suggested mitigation or fix.

## Scope

Security reports may relate to:

- `doview-board-engine.js`;
- `doview-board-builder.js`;
- generated standalone DoView Board `.html` files;
- Board Chat behaviour;
- API-key handling;
- saved-state or exported-board behaviour;
- read-only copy behaviour;
- documentation that could create unsafe security expectations;
- examples or generated-board patterns that could mislead users about risk.

## Generated board warning

Generated standalone DoView Board `.html` files are active HTML/JavaScript files. They should be treated like executable web content, not passive documents.

Do not open generated boards from untrusted sources in sensitive environments.

For higher-risk, sensitive, confidential, regulated, public, multi-user, enterprise, or production use, deploy boards with security controls appropriate to the context, such as:

- trusted hosting;
- isolated origins;
- sandboxing;
- access controls;
- review of generated content;
- approved AI endpoints where Board Chat is used;
- appropriate privacy, compliance, logging, retention, and audit arrangements.

## Read-only copies

Read-only copies are a convenience feature. They hide or disable editing through the board interface.

Read-only mode is not:

- access control;
- authentication;
- authorization;
- encryption;
- tamper protection;
- digital signing;
- audit logging;
- version control;
- a permissions system;
- a security boundary.

Do not rely on read-only mode to prove that a board is official, unchanged, approved, certified, verified, locked, or protected.

## Board Chat

Board Chat is optional. DoView Boards can be used without Board Chat.

If Board Chat is enabled, board content may be sent to an AI endpoint or provider selected or configured by the user or implementation. API keys are sensitive and should not be embedded in generated board files or exported board state.

Users with privacy, confidentiality, security, compliance, API-key, or external-data-sharing concerns should avoid Board Chat unless they have appropriate arrangements in place.

## Checksums and signed releases

Checksum or signed release verification is planned for a future release.

Until then, users should obtain DoView Boards release files only from the official DoViewPlanning GitHub repository or official DoView Planning sources.

## More security guidance

For more detail, see [`docs/security-and-read-only-notes.md`](docs/security-and-read-only-notes.md).
