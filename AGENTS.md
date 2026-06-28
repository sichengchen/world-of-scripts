# World of Scripts Agent Instructions

World of Scripts is an interactive web app for exploring writing systems, their histories, and their documented relationships. Agents working in this repository should preserve the app's core purpose: a clear, sourced, visually navigable map of scripts, glyphs, timelines, regions, writing directions, and lineage relationships.

This project values conservative content curation, readable interaction design, and simple TypeScript implementation. Treat historical claims, script relationships, Unicode samples, visual glyphs, and source attribution as important product behavior.

## General Rule
- Avoid over-engineering; avoid useless defensive fallback or backward-compatibility code.
- Think more, code less. Prefer simple, elegant solutions.
- Do not be afraid to refactor when it makes the implementation clearer.
- Agentic development is not strictly phase-based. Do not force traditional phases for small projects.
- Never write internal housekeeping information to code, `README.md`, or other public areas. Use internal project areas only.

## Documentation Rule
- Save permanent or important contracts and docs inside `.agents/docs`.
- Save temporary docs such as fix plans, audit reports, scratch notes, and investigation logs inside `.agents/temporary`.
- Do not place internal planning or housekeeping artifacts in public project docs unless explicitly requested.

## Git Rule
- Use Conventional Commit messages.
- Split changes into multiple commits when it improves clarity.
- Commit on the go when the scope is clear and the user has asked for git work.

## Coding Workflow
- Unless a change is very small or atomic, discuss a detailed plan before implementation.
- Keep implementation focused on the requested outcome.
- Prefer existing project patterns over introducing new abstractions.
- Do not add dependencies or architectural layers unless they clearly reduce complexity.

## Project Overview
- This repository is `world-of-scripts`, a Vite + React + TypeScript app for exploring writing systems and their documented relationships.
- The primary experience is an interactive React Flow graph with lineage, timeline, and A-Z views.
- The project is data-heavy. Treat script metadata, glyph samples, relationships, and sources as product-critical content, not placeholder copy.

## Project Commands
- Install dependencies with `npm install`.
- Start local development with `npm run dev`.
- Build with `npm run build`.
- Validate curated content and graph layout with `npm run validate:content`.
- Before handing off changes that touch data, graph layout, or rendering logic, run `npm run validate:content`.
- Before handing off broader code changes, run `npm run build` unless there is a clear reason not to.

## Source Layout
- `src/App.tsx` contains the main application UI, graph interactions, filtering, search, inspector, and dialogs.
- `src/data/scripts.ts` contains the curated writing-system dataset, relationship edges, regions, types, and guided traces.
- `src/data/validate.ts` enforces content invariants at runtime and in the validation script.
- `src/graph.ts` builds graph nodes, edges, positions, view modes, timeline layout, and related-node traversal.
- `src/components/ui` contains shadcn/ui components. Add new shadcn components through the CLI instead of hand-writing registry output.
- `src/styles.css` contains Tailwind v4 and app-level styling.
- `scripts/validate-content.ts` validates data plus graph layout constraints such as node overlap and lineage edge intersections.

## Data And Content Rules
- Every script entry must have a stable `id`, display `name`, `type`, `status`, `region`, `sampleGlyphs`, `summary`, and `sources`.
- Use `characterRows` for finite inventories where possible. For representative inventories, provide enough examples to satisfy validation.
- Relationship edges must be sourced and should stay conservative. Do not add low-confidence relationships just to make the graph look complete.
- Keep source labels and URLs close to the data they justify.
- If adding a script that appears in the lineage view, update `lineagePositions` in `src/graph.ts` when a deliberate placement is needed.
- After adding, removing, or changing relationship edges, do a layout optimization pass over the affected lineage nodes in `src/graph.ts`; check for crossings, awkward routing, and misleading vertical order, not only validator errors.
- If adding or moving lineage nodes, run `npm run validate:content` to catch overlaps and edge intersections.
- Preserve Unicode glyphs intentionally. Do not replace script samples with ASCII approximations.

## UI And Implementation Notes
- Use React 19, Vite 7, TypeScript strict mode, Tailwind CSS v4, React Flow, lucide-react icons, and shadcn/ui conventions already present in the repo.
- Use the `@/` path alias for imports from `src` when it matches existing style.
- Keep graph node dimensions stable; layout validation assumes `SCRIPT_NODE_WIDTH` and `SCRIPT_NODE_HEIGHT`.
- Prefer small, direct transformations over new state-management layers.
- Avoid broad visual rewrites unless the task is explicitly about design or interaction changes.
