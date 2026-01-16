# Task 009.4: Frontend Feature - Create User with Address

<role>
- **PRODUCT OWNER (PO)**: Defined the Business Truth (User Story).
- **PRODUCT & DOMAIN ANALYST (PDA)**: Defined the System Truth (Spec).
- **SOFTWARE ARCHITECT (ARC)**: Defined Technical Constraints.
- **FRONTEND DEVELOPER (DEV)**: Target audience for implementation.
</role>

<dependent_tasks>
- [Task 009.1: Frontend Setup](file:///app/docs/specs/01_in_progress/task_009_01_frontend_setup.md)
- [ADR: Address Restructuring](file:///app/docs/specs/reports/qa/ADR_ADDRESS_RESTRUCTURING.md)
</dependent_tasks>

<context>
## Business Truth (User Story)
**As a** Librarian  
**I want to** register a new user by providing their personal details and a validated address via CEP  
**So that** I can ensure the user is correctly identified and reachable, and our database remains clean with structured geographical IDs.

## System Truth (PDA Analysis)
The system requires a two-step flow for address-enabled users:
1. Lookup address details and internal IDs using the ZipCode.
2. Submit the user profile with personal data and the resolved address IDs.
</context>

<scope>
## 1. Data Layer
- [ ] Implement `RemoteLoadAddressByZipCode` (`GET /addresses/cep/:zipCode`)
- [ ] Implement `RemoteAddUser` (`POST /users`)

## 2. Presentation Layer
- [ ] Update `UserForm` to include CEP lookup button/trigger.
- [ ] Auto-fill address fields (Street, Neighborhood, City, State) upon successful lookup.
- [ ] Store internal IDs (`neighborhoodId`, `cityId`, `stateId`) in the form state.
- [ ] Implement validation for CPF (format: `000.000.000-00`) and RG.

## 3. UI/UX
- [ ] Address fields auto-populated from CEP should be read-only where possible to preserve data integrity.
- [ ] Show loading state during CEP resolution.
- [ ] Handle "CEP not found" error gracefully, allowing manual entry (though IDs will be empty, backend will resolve).
</scope>

<api_specification>
### GET /api/addresses/cep/:zipCode
**Response (200 OK)**:
```json
{
  "zipCode": "string",
  "street": "string",
  "neighborhood": "string",
  "city": "string",
  "state": "string",
  "stateId": "uuid",
  "cityId": "uuid",
  "neighborhoodId": "uuid"
}
```

### POST /api/users
**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "rg": "string",
  "cpf": "string",
  "gender": "string",
  "phone": "string",
  "address": {
    "street": "string",
    "number": "string",
    "complement": "string",
    "zipCode": "string",
    "neighborhoodId": "uuid",
    "cityId": "uuid",
    "stateId": "uuid",
    "neighborhood": "string",
    "city": "string",
    "state": "string"
  }
}
```
</api_specification>

<technical_constraints>
## Architecture Decision (ARC)
- **Data Integrity**: The frontend SHOULD send the `neighborhoodId`, `cityId`, and `stateId` returned by the lookup. This prevents double-resolution on the backend.
- **Backend Sync Alert**: Note that the backend Fastify schema currently omits `stateId` field in the request validation. The DEV should either update the backend schema or ensure the frontend sends it regardless, anticipating future fix.
- **Validation**: Strict CPF and RG validation must be performed before the POST request to avoid domain-level errors (400) from the backend.
</technical_constraints>

<acceptance_criteria>
- [ ] Given a valid 8-digit CEP, When I trigger lookup, Then fields are auto-filled and IDs stored.
- [ ] Given a successful lookup, When I save the user, Then the payload contains all IDs.
- [ ] Given a lookup failure, When I enter names manually, Then the user is still created successfully.
</acceptance_criteria>
