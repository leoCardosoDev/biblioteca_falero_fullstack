# PRODUCT & DOMAIN ANALYST (PDA)
This is a Technical Debt specification.

<context>
- The current User Management implementation returns a limited set of fields (`id`, `name`, `email`) in the `GET /api/users` collection endpoint.
- The "Edit User" form requires complete profile data including `cpf`, `rg`, `birthDate`, and full address details.
- Existing files: `http-user-repository.ts`, `user-routes.ts`, `users-controller.ts`.
</context>

<scope>
1. **Backend**: [COMPLETED] Implemented `GET /api/users/:id` returning full detailed profile.
2. **Frontend**: 
    - Update `UserRepository` contract to include `loadById(id: string): Promise<UserModel>`.
    - Implement `loadById` in `HttpUserRepository`.
    - Handle potential 404 or connection errors in the service layer.
    - Update "Edit User" flow to fetch the user by ID before opening the modal (or use a loading state inside the modal).
</scope>

<requirements>
- **Stack**: React, TypeScript, Axios.
- **Standards**: Adhere to `STANDARD_FRONTEND.md`. Use `zipCode` (not `cep`) in address objects.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: BACKEND**: `workflow/standards/STANDARD_BACKEND.md`
- **Context: FRONTEND**: `workflow/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<api_specification>
#### GET /api/users/:id
**Request**:
Params: `id: string` (UUID)

**Response (200 OK)**:
```json
{
  "id": "uuid",
  "name": "Full Name",
  "email": "user@example.com",
  "rg": "123456789",
  "cpf": "52998224725",
  "birthDate": "1990-01-01",
  "address": {
    "street": "Rua Exemplo",
    "number": "123",
    "complement": "Apt 1",
    "neighborhood": "Centro",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "12345678"
  }
}
```
</api_specification>

<acceptance_criteria>
- [x] Backend: New endpoint `GET /api/users/:id` returns 200 with full user data.
- [x] Backend: New endpoint returns 404 if user does not exist.
- [ ] Frontend: `UserRepository` has `loadById` method.
- [ ] Frontend: "Editar Usuário" modal fetches and displays full user data (CPF, RG, BirthDate, Address).
</acceptance_criteria>

<output>
1. **Summary**: Resolved the mismatch between list payload and edit form requirements.
2. **Decisions**: Implementation of a dedicated detail endpoint was chosen to maintain list performance while ensuring form integrity.
3. **Manual Test Guide**: 
   - Login as admin.
   - Go to "Usuários".
   - Click "Editar" on a user.
   - Confirm all fields (RG, CPF, Address) are populated correctly.
</output>
