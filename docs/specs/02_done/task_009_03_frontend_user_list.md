# Task 009.3: Frontend Feature - List & Detail Users

<role>
You are the FRONTEND DEVELOPER (FRONTEND-DEV).
</role>

<context>
The backend provides endpoints to list and retrieve user details. The frontend needs to consume these to display the user directory.
</context>

<objectives>
1.  Implement **Load Users** functionality.
2.  Implement **View User Details** functionality.
</objectives>

<endpoints>
- `GET /users` (List all users)
- `GET /users/:id` (Get specific user details)
</endpoints>

<scope>
## 1. Data Layer
- [ ] Implement `RemoteLoadUsers` (HttpAdapter -> GET /users).
- [ ] Implement `RemoteLoadUserById` (HttpAdapter -> GET /users/:id).
- [ ] Map Backend DTO to Frontend Model.

## 2. Main Layer
- [ ] Create `makeRemoteLoadUsers` factory.
- [ ] Create `makeRemoteLoadUserById` factory.
- [ ] Update `UserListFactory` to use these.

## 3. Presentation Layer
- [ ] Update `UserList` component to render the list.
- [ ] Ensure "View Details" (if any) or simply ensuring existing "Edit" pre-fill works via `loadUserById`.
</scope>

## 4. Domain & Contracts

### Domain Model (Frontend)
```typescript
export interface User {
  id: string
  name: string
  email: string
  cpf: string
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
  role?: 'ADMIN' | 'LIBRARIAN' | 'PROFESSOR' | 'STUDENT' // flatten from login
  address?: {
    cityId: string
    // ... other address fields
  }
}
```

### API Payloads

**GET /users**
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "status": "ACTIVE",
    "login": {
      "role": "STUDENT",
      "status": "ACTIVE"
    }
  }
]
```
