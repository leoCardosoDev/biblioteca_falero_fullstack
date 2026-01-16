# Technical Improvement Record (TIR_003_QA_Audit_Findings)

## Context
- **Task ID**: QA-001 (Strict Audit)
- **Story ID**: N/A
- **Role**: QA
- **Affected Area**: Backend Infrastructure & Configuration

## Problem Detected
1.  **Untested Configuration**: `src/infra/db/typeorm/data-source.ts` was 0% covered. This file controls the production database connection. A typo here (e.g., wrong env var name) would crash production but pass tests.
2.  **Incomplete Exports**: `src/infra/db/typeorm/index.ts` only exported `user-repository`, leaving other repositories "hidden" from strict import patterns and coverage.
3.  **Migration Testing Gap**: Integration tests use `synchronize: true` (TypeOrmHelper), while production uses migrations. Risk: Schema drift between test/prod.

## Risk Assessment
- **High**: Misconfiguration in `data-source.ts` is a critical failure point.
- **Medium**: Export inconsistencies lead to maintainability issues.

## Correction Applied
1.  **DataSource Test**: Created `tests/infra/db/typeorm/data-source.spec.ts` to verify `AppDataSource` initialization, ensuring it uses MySQL, disables synchronization (for prod safety), and logging is on.
2.  **Export Fix**: Updated `index.ts` to export all repositories.
3.  **Index Test**: Created `tests/infra/db/typeorm/index.spec.ts` to ensure all repositories are correctly exported.

## Safety Justification
- [x] Compliance: Brought "forgotten" infrastructure files under 100% coverage.
- [x] Non-Breaking: Configuration validation only.
- [x] Localized: Changes restricted to infra exports and new tests.

## QA Recommendations
- **Maintain Migration Discipline**: Since tests bypass migrations, developers must manually verify `npm run typeorm migration:run` locally before PRs.
- **Environment Variables**: Ensure `process.env` validation is strict (partially covered by `env.ts` coverage).

## Next Steps
- [ ] Investigate valididity of remaining 0.31% missing branch in global reports.
