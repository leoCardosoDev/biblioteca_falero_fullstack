# ADR 011: Granular Domain Context Strategy

## Status
Accepted

## Context
Implementing large Bounded Contexts (like Catalog, Inventory) as single monolithic tasks leads to:
1.  Giant Pull Requests difficult to review.
2.  High risk of improved complexity.
3.  Bottlenecks in development (Dependencies).

## Decision
We will adopt a **Granular Entity-First Strategy** for all future Bounded Context implementations.
A "Feature" concept (e.g., Catalog) will be broken down into atomic tasks per Aggregate or Entity.

## Detailed Strategy
1.  **Foundation Phase**: Implement independent entities (Enums, Simple VOs) first.
2.  **Core Phase**: Implement standalone Entities (Author, Publisher).
3.  **Aggregate Phase**: Implement the Root Entity only AFTER dependencies are solid.
4.  **Evolution Phase**: Separate Create/Read from Update/Delete if the Aggregate is complex.

## Consequences
### Positive
- Smaller, faster PRs.
- Clearer dependency graph.
- Easier to test and validate.
- Parallel development possible (if dependencies allow).

### Negative
- More "Task" files to manage.
- Requires strict ordering in execution.

## Compliance
All future Specs in `app/docs/specs` MUST follow this granularity.
