# Lobster Design Docs

This folder contains the machine-readable design baseline for the Lobster mock desktop client.

Current phase:

- Single-user static narrative prototype
- Static conversations and messages
- Three built-in PRD scenario cards
- No real QQ integration
- No real multi-user sync
- No direct Aliyun LLM integration yet

Files:

- `architecture/system-design.json`
  The top-level system design, current-phase scope, future evolution path, and runtime boundaries.
- `interaction/card-spec.json`
  The built-in interaction specification for the three PRD scenario cards.
- `schemas/domain-schema.json`
  The canonical domain entities shared across the desktop client and the future LLM-enhanced mock layer.
- `schemas/api-schema.json`
  The future contract for internal mock APIs once the project moves beyond local JSON-backed data.

Recommended usage:

1. Treat `architecture/system-design.json` as the source of truth for current scope and future evolution.
2. Implement frontend mock fixtures from `schemas/domain-schema.json`.
3. Build the three built-in PRD scenario cards from `interaction/card-spec.json`.
4. Use `schemas/api-schema.json` only when the project adds a local BFF or LLM-backed mock service.
5. When Aliyun LLM integration starts, keep the LLM output constrained to the entities and payload shapes defined here.

Design principles captured here:

- Current phase is a single-user static mock narrative prototype.
- Frontend never calls Aliyun LLM APIs directly.
- LLM is used for understanding and structured generation, not for mutable business state.
- Card lifecycle and state transitions are deterministic and local in the current phase.
- Tencent ecosystem integrations remain mock adapters in the current prototype phase.
