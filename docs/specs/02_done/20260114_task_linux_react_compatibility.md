# Role: FRONTEND DEVELOPER & ARCHITECT
# This is a valid Markdown file named `app/docs/specs/01_in_progress/frontend/20260114_task_linux_react_compatibility.md`.

<role>
You are an experienced Frontend Developer and System Architect. Your goal is to ensure the React application runs correctly in a Linux (WSL) environment, addressing case-sensitivity issues that were masked in Windows.
</role>

<dependent_tasks>
- None. This is a fix triggered by environment migration.
</dependent_tasks>

<context>
- The project is migrating development environments from Windows to WSL (Ubuntu).
- Linux filesystems are case-sensitive, whereas Windows is not.
- We discovered that `App.tsx` was being imported as `.../app` in `app-factory.tsx`, causing a crash on WSL.
- We need to ensure no other such issues exist.
</context>

<scope>
1. **Frontend**:
    - **Rename PascalCase files to kebab-case** in `app/frontend/src/presentation/react` to comply with standards and fix Linux compatibility.
    - **Identified Files to Rename**:
        - `src/presentation/react/components/layout/Header.tsx` -> `header.tsx`
        - `src/presentation/react/components/layout/Sidebar.tsx` -> `sidebar.tsx`
        - `src/presentation/react/components/forms/parts/book/BookCategorization.tsx` -> `book-categorization.tsx`
        - `src/presentation/react/components/forms/parts/book/BookCoverUpload.tsx` -> `book-cover-upload.tsx`
        - `src/presentation/react/components/forms/parts/book/BookGeneralInfo.tsx` -> `book-general-info.tsx`
        - `src/presentation/react/components/forms/parts/book/BookTechnicalInfo.tsx` -> `book-technical-info.tsx`
        - `src/presentation/react/components/forms/parts/loan/LoanParticipants.tsx` -> `loan-participants.tsx`
        - `src/presentation/react/components/forms/parts/loan/LoanTerms.tsx` -> `loan-terms.tsx`
        - `src/presentation/react/components/forms/parts/reservation/ReservationDetails.tsx` -> `reservation-details.tsx`
        - `src/presentation/react/components/forms/parts/reservation/ReservationParticipants.tsx` -> `reservation-participants.tsx`
        - `src/presentation/react/components/forms/parts/user/UserAddress.tsx` -> `user-address.tsx`
        - `src/presentation/react/components/forms/parts/user/UserGeneralInfo.tsx` -> `user-general-info.tsx`
    - **Already Renamed (Pending Final Verification)**:
        - `src/presentation/react/App.tsx` -> `app.tsx`
        - `src/presentation/react/components/ui/Input.tsx` -> `input.tsx`
        - `src/presentation/react/components/ui/Modal.tsx` -> `modal.tsx`
        - `src/presentation/react/components/ui/Select.tsx` -> `select.tsx`
    - Audit and update all imports referencing these files.
    - Verify that the application builds and runs successfully in the WSL environment.

2. **Structural Cleanup (Completed)**:
    - Removed redundant configuration files from `app/frontend/src`.
</scope>

<requirements>
- **Stack**: React, Vite, TypeScript.
- **Constraints**: 
    - STRICTLY follow kebab-case for all filenames.
    - Ensure all imports match the new lowercase filenames.
</requirements>

<standards_compliance>
- **General**: `workflow/standards/STANDARD_GENERAL.md`
- **Context: FRONTEND**: `workflow/standards/STANDARD_FRONTEND.md`
</standards_compliance>

<acceptance_criteria>
- [x] All 16 identified PascalCase files are renamed to kebab-case.
- [x] All imports referencing these files are updated to lowercase.
- [x] `npm run build` passes successfully in WSL.
- [x] Application loads in the browser without "Failed to resolve import" errors.
</acceptance_criteria>

<output>
1. **Summary**: List of all 16 files renamed and imports fixed.
2. **Decisions**: Enforced kebab-case for all React component files.
3. **Manual Test Guide**: Run `npm run build` then `npm run dev` and open localhost.
</output>
