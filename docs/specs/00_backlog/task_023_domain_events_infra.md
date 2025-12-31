# Task 023: Domain Events Infrastructure

<role>
You are the BACKEND ENGINEER.
</role>

<dependent_tasks>
- Task 020/021.
</dependent_tasks>

<context>
We need a mechanism to capture and persist Domain Events (`UserCreated`, `LoanClosed`, etc.) for audit trails and future decoupling.
We will store them in a simple `domain_event` table first.
</context>

<scope>
1. **Backend**:
   - Create `DomainEvent` entity (`id`, `aggregate_id`, `type`, `payload`, `created_at`).
   - Create Migration for `domain_event` table.
   - Implement a simple `DomainEvents` helper/service to:
     - Record an event.
     - Persist it transactionally when the aggregate is saved (or explicitly).
   - *Example Events to Implement*:
     - `UserCreated` (payload: user basic data).
     - `LoanStatusChanged` (payload: old_status, new_status).
2. **Frontend**:
   - None.
</scope>

<requirements>
- **Stack**: Node.js, TypeORM, PostgreSQL.
- **Negative Constraints**: Do NOT implement a full Kafka/RabbitMQ bus yet. Just the DB table persistence.
- **Performance**: Events table grows fast; keep payload JSONB efficient.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
- **ADR**: `app/docs/adr/009_mature_data_architecture.md`
</standards_compliance>

<database_schema>
```sql
CREATE TABLE domain_event (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  aggregate_id UUID NOT NULL,
  type VARCHAR(100) NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_domain_event_agg ON domain_event(aggregate_id);
CREATE INDEX idx_domain_event_type ON domain_event(type);
```
</database_schema>

<api_specification>
N/A - Internal Mechanism.
</api_specification>

<acceptance_criteria>
- [ ] Backend: `domain_event` table exists.
- [ ] Backend: Helpers allow creating and saving events.
- [ ] Backend: Critical actions (User creation) generate a stored event.
</acceptance_criteria>

<output>
1. **Summary**: Created infrastructure for Domain Events.
2. **Decisions**: Using "Outbox Pattern" style (table storage) for simplicity now.
3. **Manual Test Guide**: Perform action, check `SELECT * FROM domain_event`.
</output>
