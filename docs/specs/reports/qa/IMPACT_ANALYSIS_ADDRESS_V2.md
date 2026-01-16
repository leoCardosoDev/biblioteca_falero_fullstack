<thinking>
I have mapped the codebase and identified the following impacts:

1.  **Domain Layer**:
    - `Address` VO: Needs to enforce `Id` VO for `neighborhoodId`, `cityId`, `stateId`.
    - `AddressDTO` (Gateway): Currently uses strings. Needs to remain DTO (strings are fine from ViaCEP), but the *Internal* Service layer must resolve them to IDs.
    - `GetOrCreateGeoEntityService`: Must return `Id` objects.

2.  **Application Layer**:
    - `DbAddUser`: Logic `resolveAddress` uses `Address.create`. Needs adapt to new `Id` based Constructor.
    - `AddressResolutionService`: Must return the new `ResolvedAddress` structure with IDs for frontend.

3.  **Infrastructure Layer**:
    - `UserTypeOrmEntity`: Needs new `@ManyToOne` fields.
    - `UserMapper` (DTOs): Needs to map new ID fields to the Frontend DTO.
    - `CachedAddressGateway`: Currently stores strings. Needs to be updated to store/retrieve the full DTO structure, possibly including resolved IDs if we cache the *resolved* version (better).

4.  **Presentation Layer**:
    - `AddUserController`: The `AddUserAddressInput` type needs to match the expected payload.
    - Tests: `add-user-controller.spec.ts` mocks need updating.

5.  **Test Layer**:
    - `db-add-user.spec.ts`: Heavily impacted. Mocks for `GetOrCreateGeoEntityService` return strings, must return IDs.
    - `add-user-controller.spec.ts`: Mocks return strings.

**Critical Gap Identified**:
- `UserMapper.toDTO` currently maps `address.neighborhoodId` (string) -> DTO (string).
- With `Address.neighborhoodId` becoming `Id`, the Mapper must call `.value`.
</thinking>

# [REPORT] Complete Impact Analysis & Gap Map

<analysis_context>
**Objective**: "Blindar o Domínio" (Shield the Domain) by enforcing Strict IDs and Strict persistence.
**Scope**: Domain, Application, Infrastructure, Presentation, Tests.
</analysis_context>

<impact_map>
## 1. Domain Layer (The Core)
| File | Impact | Action Required |
| :--- | :--- | :--- |
| `src/domain/value-objects/address.ts` | **HIGH** | Change `neighborhoodId`, `cityId` types from `string` to `Id`. Add `stateId: Id`. |
| `src/domain/services/geo/get-or-create-geo-entity-service.ts` | **MEDIUM** | Update return type `GeoIdsDTO` to use `Id` VO. |
| `src/domain/gateways/address-gateway.ts` | **LOW** | `AddressDTO` can remain primitive (it's data transfer), but `ResolvedAddress` needs IDs. |

## 2. Application Layer (Usage)
| File | Impact | Action Required |
| :--- | :--- | :--- |
| `src/application/usecases/db-add-user.ts` | **HIGH** | Update `resolveAddress` to create `Id` instances before calling `Address.create`. |
| `src/application/services/address/address-resolution-service.ts` | **MEDIUM** | Ensure it returns IDs to the frontend. |

## 3. Infrastructure Layer (Persistence & Adapters)
| File | Impact | Action Required |
| :--- | :--- | :--- |
| `src/infra/db/typeorm/entities/user-entity.ts` | **CRITICAL** | Add `addressState` relation. Convert City/Neighborhood to `@ManyToOne`. |
| `src/infra/db/typeorm/repositories/user-repository.ts` | **HIGH** | Update `toDomain` and `toPersistence` mappers to handle the Relation Objects vs IDs. |
| `src/infra/gateways/cached-address-gateway.ts` | **MEDIUM** | Ensure cache keys/values support the new richer structure. |

## 4. Presentation Layer (API)
| File | Impact | Action Required |
| :--- | :--- | :--- |
| `src/presentation/dtos/user-mapper.ts` | **HIGH** | Update simple property access `user.address.cityId` to `user.address.cityId.value` (since it will be an Object). |
| `src/presentation/controllers/add-user-controller.ts` | **LOW** | Should automatically align via DTOs, but validation must allow UUIDs. |

## 5. Test Layer (Safety Net)
| File | Impact | Action Required |
| :--- | :--- | :--- |
| `tests/application/usecases/db-add-user.spec.ts` | **CRITICAL** | Update all mocks (GetOrCreateGeoEntityService) to return `Id` VOs. |
| `tests/presentation/controllers/add-user-controller.spec.ts` | **HIGH** | Update Mock `Address` creation to use `Id`. |
| `tests/infra/db/typeorm/user-repository.spec.ts` | **HIGH** | Update integration tests to insert Dependencies (State, City) before User. |
</impact_map>

<gap_analysis>
**Identified Gaps:**
1.  **Mapper Breakage**: `UserMapper` currently expects strings. It *will* break at runtime if we change Domain to Objects without updating it.
2.  **Test Mocks**: Most tests mock dependencies returning strings. These tests will fail immediately upon Domain change.
3.  **Circular Dependency (Risk)**: `Address` VO depends on `Id`. `Id` is logically stable, but ensuring `Address` creation doesn't become too complex for simple tests is key.

**Mitigation:**
- Execute changes in layer order: **Domain -> Infra -> App -> Presentation**.
- **Run Tests** after *each* layer change to catch broken mocks early.
</gap_analysis>
