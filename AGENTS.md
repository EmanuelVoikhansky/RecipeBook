# AGENTS.md

Instructions for AI coding agents working in this repository.

## Pull requests

### 1. Description layout

Every PR description starts with these two sections, in this order:

```markdown
## Author's comments

## AI comments

<everything the agent writes>
```

- Leave **Author's comments** empty, with no placeholder text. It is for the PR author.
- Put everything the agent writes under **AI comments**: the summary, how it was tested, notes, and any attribution line.

### 2. Keep the architecture diagrams in `docs/` current

Purpose: keep the docs from drifting out of sync with the code.

Before creating a PR:

1. Check every architecture diagram in `docs/` (currently `nest-architecture.svg` and `nest-request-lifecycle.svg`) against the changes on the branch. A diagram is out of date if any component, connection, request stage or label it shows has since been added, removed, renamed or changed in the code.
2. If no diagram is out of date, create the PR. Under **AI comments**, say that the diagrams were checked and needed no changes.
3. If a diagram is out of date, update it, along with any text in `docs/` that describes it. Then **stop**: show the user what changed and wait for them to confirm before creating the PR.

The diagrams are hand-written SVG. Edit them directly, keep their existing layout, colors and legend, and check that they still render.
