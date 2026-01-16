# 🧠 Strategic Analysis & Reorganization

## 1. Context Analysis
**Current State**: The project has successfully established the "Bedrock" (Geography, Shared Kernel) and "Governance" (Timestamps, Soft Delete, Domain Events) layers. The Backend Identity/Auth refactor is complete (Task 008), but the Frontend (Task 009) is lagging behind. Use Cases for the Core Domain (User) are solid.

### ✅ What has been done?
- **Infra**: State, City, Neighborhood (Geography) populated.
- **Domain**: User & Address Refactored (DDD).
- **Architecture**:
    - Timestamp Governance (createdAt, updatedAt).
    - Soft Delete (deletedAt, status).
    - Concurrency Control (Optimistic Locking).
    - Domain Events (Infrastructure ready).
- **Backend Refactor**: Segregation of Login vs User (Auth).
- **Error Handling**: Standardized AppError.

### 🚧 What needs to be done?
- **Frontend Sync**: Update Frontend to match new Backend Auth contracts (Task 009).
- **Documentation**: Update API Docs & Seeds (Task 024) to reflect the brave new world.
- **Core Features (The "Meat")**:
    - Catalog (Books/Works).
    - Inventory (Copies).
    - Circulation (Loans).

### 📋 Next Steps Order
1.  **Task 009**: Frontend Auth Refactor (Unlock the UI for testing).
2.  **Task 024**: Documentation (Solidify knowledge).
3.  **Task 026**: User Governance (Admin/Librarian Hierarchy).
    -   `026.1`: Infrastructure (Power Levels).
    -   `026.2`: Domain Logic (The Guard).
    -   `026.3`: API Exposure.
4.  **Task 010**: Backward Catalog (The first complex Domain).
5.  **Task 011**: Backend Inventory.
6.  **Task 012**: Backend Circulation.

---

## 2. Granularity Strategy (The Rule of Gold)
Following the **DDD + Clean Architecture** principle: **"One Task = One Aggregate/Entity Verification"**.

### General Rules for Breakdown
1.  **Foundation First**: Simple Value Objects / Enums / Independent Entities.
2.  **Core Second**: The main Aggregates (without complex relationships).
3.  **Aggregate Root Third**: The Entity that binds them all.
4.  **Mutations Last**: Complex updates/deletes only after Create/Read is solid.

---

## 3. Detailed Action Plan (Granular Backlog)

### 🔴 Task 009: Frontend Refactor (Auth)
*Goal: Re-align Frontend with Backend Task 008.*

- **Task 009.1**: Refactor `AuthContext` & Adapters (Handle new Login Response).
- **Task 009.2**: Fix Login Page & Error Handling.
- **Task 009.3**: Update User Management (Add User with new fields).

### 📚 Task 010: Backend Catalog (Bounded Context)
*Goal: Create the bibliographic catalog.*

- **Phase 1: Foundation (CRUDs)**
    - `task_010_01_language`: Language Entity.
    - `task_010_02_genre`: Genre Entity.
    - `task_010_03_work_type`: WorkType Entity.
    - `task_010_04_location`: Location Entity (Aisle/Shelf).
- **Phase 2: Independent Core**
    - `task_010_05_author`: Author Entity.
    - `task_010_06_publisher`: Publisher Entity.
- **Phase 3: The Aggregate (Work)**
    - `task_010_07_work_create_read`: Work (Entity + Relations).
    - `task_010_08_work_update`: managing updates.
    - `task_010_09_work_delete`: Soft delete strategies.

### 📦 Task 011: Backend Inventory (Copies)
*Goal: Manage physical instances of Works.*

- **Phase 1: Foundation**
    - `task_011_01_copy_status`: Value Objects (Condition, Status).
    - `task_011_02_acquisition`: Acquisition Method (Purchase, Donation).
- **Phase 2: The Aggregate (WorkCopy)**
    - `task_011_03_work_copy_core`: Create/Read Copy (Links to Work + Location).
    - `task_011_04_work_copy_management`: Inventory adjustments (Lost, Damaged).

### 🔄 Task 012: Backend Circulation (Loans)
*Goal: Manage the flow of copies.*

- **Phase 1: Foundation**
    - `task_012_01_circulation_policies`: Config (Loan days, limits).
- **Phase 2: Transactions**
    - `task_012_02_reservation`: Reserve a Work (Queue).
    - `task_012_03_loan_checkout`: Create Loan (User + Copy).
    - `task_012_04_loan_checkin`: Return Copy + Fine Calculation.
