# API Error Response Design (PDA)

## Standards Compliance
- [ ] @[STANDARD_GITFLOW.md]
- [ ] @[STANDARD_GENERAL.md]
- [ ] @[STANDARD_BACKEND.md]


## Problem Statement
Current API error responses (e.g., 400 Bad Request) often return empty bodies `{}`, which causes friction for frontend developers and support.

## Standardized Error Schema
All error responses MUST return a JSON body with the following structure:

```json
{
  "error": {
    "type": "string", // Machine-readable category (e.g., VALIDATION, BUSINESS, SYSTEM)
    "code": "string", // Specific error identifier (e.g., INVALID_CPF, EMAIL_IN_USE)
    "message": "string", // Human-readable message in PT-BR
    "details": [ // Optional: Specific field-level or contextual details
      {
        "field": "string",
        "issue": "string",
        "message": "string"
      }
    ]
  }
}
```

## Error Categories (Types)

| Type | Description | HTTP Status |
| :--- | :--- | :--- |
| `VALIDATION` | Input data failed validation (Zod schemas, format, size). | 400 |
| `BUSINESS` | Violates business rules (e.g., book already loaned). | 403 / 422 |
| `REPOSITORY` | Entity not found or conflict in database. | 404 / 409 |
| `SECURITY` | Authentication or Authorization issues. | 401 / 403 |
| `SYSTEM` | Unexpected unhandled exceptions. | 500 |

## Concrete Example: Invalid CPF (Requested Case)
**Input:** `{"cpf": "123"}`
**Response (400 Bad Request):**
```json
{
  "error": {
    "type": "VALIDATION",
    "code": "INVALID_PARAMETERS",
    "message": "Um ou mais campos informados são inválidos.",
    "details": [
      {
        "field": "cpf",
        "issue": "too_small",
        "message": "O CPF deve conter pelo menos 11 dígitos numéricos."
      }
    ]
  }
}
```

## Roadmap for ARC
1. **Global Hook**: Fastify `setErrorHandler` should be the only place where these bodies are constructed.
2. **Exception Mapping**: Create a registry for mapping internal `Error` classes to these standard codes.
