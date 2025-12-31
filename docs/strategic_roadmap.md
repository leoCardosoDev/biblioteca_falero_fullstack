# 🗺️ Strategic Roadmap: Implementation Order

## 🏆 Principles of Prioritization
1.  **Foundational First**: Shared Kernel (Geography) and Core Domain (User) must be stable before features use them.
2.  **Integrity & Governance**: Fix data architecture (Timestamps, Soft Delete, IDs) *before* adding volume.
3.  **Fixes before Features**: Resolve known inconsistencies (Load Users) before building new dependent flows.
4.  **Backend leads Frontend**: APIs must exist before UI consumes them.

---

## 🚀 Phase 1: Foundation & Shared Kernel (The "Bedrock")
*Goal: Establish the immutable truths of the system.*

1.  **Task 017**: Shared Kernel - State (DB + Seed) [DONE]
    - *Why*: User addresses depend on this. Zero dependency.
2.  **Task 018**: Shared Kernel - City (DB + Seed) [DONE]
    - *Why*: Depends on State.
3.  **Task 019**: Shared Kernel - Neighborhood (On-Demand)
    - *Why*: Completes the Geography triad.
4.  **Task 007**: Backend Refactor - Domain Core (User & Address)
    - *Why*: Implements the `Address` VO using the Geography tables above. Defines the new `User` structure.

---

## 🛡️ Phase 2: Data Governance & Integrity (The "Rules")
*Goal: Ensure data quality and auditability before scaling.*

5.  **Task 020**: Timestamp Governance (`created_at`/`updated_at`)
    - *Why*: Applies to User and future tables. Best to enforce before migration data grows.
6.  **Task 021**: Soft Delete & Explicit Status
    - *Why*: Critical for "User" lifecycle.
7.  **Task 022**: DB Performance & Integrity (Indexes/Locking)
    - *Why*: Prevents race conditions from day one.
8.  **Task 023**: Domain Events Infrastructure
    - *Why*: Prepare the ground for decoupling (needed for Auth refactor).

---

## 🔧 Phase 3: Access Control & Technical Debt (The "Refinement")
*Goal: Fix known issues and separate Concerns (Identity vs Access).*

9.  **Task 016**: Fix Backend Load Users (TD002)
    - *Why*: The frontend is currently broken/incomplete for user management. Needs the `User` refactor (Task 007) to be done first.
10. **Task 008**: Backend Refactor - Auth (Login Separation)
    - *Why*: Strictly separates `Login` from `User`. Heavy refactor.
11. **Task 009**: Frontend Refactor - Auth
    - *Why*: Consumes the new Auth API.

---

## 🏗️ Phase 4: Core Business Features (The "Value")
*Goal: Implement the functional pillars.*

### Catalog & Inventory (Books)
12. **Task 010**: Backend Feature - Catalog (Work/Author/Publisher)
13. **Task 013**: Frontend Feature - Catalog
14. **Task 011**: Backend Feature - Inventory (WorkCopy)
15. **Task 014**: Frontend Feature - Inventory

### Circulation (Loans)
16. **Task 012**: Backend Feature - Circulation (Loan/Reservation)
    - *Why*: Depends on User and Inventory being ready.
17. **Task 015**: Frontend Feature - Circulation

---

## 📊 Summary of Execution Order

| Order | Task ID | Description | Type |
| :--- | :--- | :--- | :--- |
| **1** | `017` | Geography: State [DONE] | 🧱 Infra |
| **2** | `018` | Geography: City | 🧱 Infra |
| **3** | `019` | Geography: Neighborhood | 🧱 Infra |
| **4** | `007` | Domain: User & Address | 🧠 Domain |
| **5** | `020` | Gov: Timestamps | 🛡️ Arch |
| **6** | `021` | Gov: Soft Delete | 🛡️ Arch |
| **7** | `022` | Gov: Indexes/Locking | 🛡️ Arch |
| **8** | `023` | Gov: Domain Events | 🛡️ Arch |
| **9** | `016` | Fix: Load Users | 🐛 Fix |
| **10** | `008` | Refactor: Auth Backend | ♻️ Refactor |
| **11** | `009` | Refactor: Auth Frontend | ♻️ Refactor |
| **12+** | `010-015` | Features (Catalog/Circulation) | ✨ Feature |

---
**Recommendation**: Start immediately with **Task 017**.
