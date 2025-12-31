# Task 024: Frontend Semantic Refactor

## 1. Goal
Refactor the frontend codebase to strictly adhere to the Ubiquitous Language and Semantic Tokens defined in `app/docs/design_system/DESIGN_SYSTEM.md` and `app/docs/business`.

## 2. Context
The current frontend uses generic naming (e.g., "Username" instead of "CPF") and hardcoded or generic colors. This creates a disconnect between the Domain/Business rules and the UI representation. We need to implement the Semantic Domain Aliases in the styling engine and update components to speak the same language as the backend.

## 3. Requirements

### 3.1 Styling Engine (Tailwind)
*   [ ] Update `tailwind.config.js` to include the Semantic Aliases defined in `DESIGN_SYSTEM.md`:
    *   `status-user-active`, `status-user-blocked`
    *   `status-loan-overdue`, `status-loan-open`
    *   `status-unit-maintenance`
*   [ ] Ensure these map correctly to the base palette.

### 3.2 UI Components (Refactor)
*   [ ] **LoginForm** (`presentation/components/login-form.tsx`):
    *   Change "Usuário" label to what is defined in the Domain (likely "Email" for login, or "CPF" if that was the decision, but `User` entity has `email` and `cpf`. `Login` entity usually uses `email` or `username`. Check `backlog_04_access_control.md`). *Correction*: `backlog_04` says Login uses `email` and `password`. So "Usuário" might be ambiguous, "Email" is precise.
    *   Use semantic colors for errors/buttons.
*   [ ] **UI Primitives** (`presentation/components/ui`):
    *   Review `Badge`, `Button`, `Input` to ensure they accept/use the new semantic variants if applicable.

### 3.3 Standardization
*   [ ] Replace any hardcoded strings with Domain Terminology where applicable.

## 4. Definition of Done
*   [ ] `tailwind.config.js` contains all semantic tokens.
*   [ ] `login-form.tsx` uses precise labels and semantic tokens.
*   [ ] No hardcoded colors in key components (use `bg-primary`, `text-status-user-active`, etc.).
