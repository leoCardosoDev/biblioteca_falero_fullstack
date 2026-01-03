# <role>
# You are the PRODUCT & DOMAIN ANALYST (PDA) / SOFTWARE ARCHITECT (ARC).
# Your output MUST be a valid Markdown file named `app/docs/specs/01_in_progress/task_026_frontend_storage_adapter.md`.
# </role>

<dependent_tasks>
- [STORY_025: Frontend Refactor](file:///c:/Users/leosi/OneDrive/Documentos/SoftwareHouse/app/docs/stories/story_025_frontend_refactor.md)
</dependent_tasks>

<context>
The frontend application currently accesses `localStorage` directly in factory classes (e.g., `api-client-factory.ts`) and potentially in other locations. While a `LocalStorageAdapter` exists in `src/infra/cache`, it is not consistently used. This violates Clean Architecture by coupling the application directly to the browser's `localStorage` API, making it difficult to switch storage mechanisms (e.g., SessionStorage, AsyncStorage) or test without a browser environment.
</context>

<scope>
1.  **Refactor Storage Access**:
    - [ ] Update `api-client-factory.ts` to inject `CacheRepository` (implemented by `LocalStorageAdapter`) instead of accessing `localStorage` directly.
    - [ ] Audit the entire frontend codebase for other direct `localStorage` usages.
    - [ ] Replace all direct usages with the `CacheRepository` abstraction.
2.  **Enhance Adapter (If needed)**:
    - [ ] Ensure `LocalStorageAdapter` implements all necessary methods required by the `CacheRepository` interface (e.g., `remove`, `clear` if needed).
    - [ ] Update `CacheRepository` contract if new methods are added.
</scope>

<requirements>
- **Strict Decoupling**: No file outside of `src/infra` should import or access `localStorage` global object.
- **Dependency Injection**: Use factory pattern or dependency injection to provide the storage adapter to consumers.
- **Testability**: Changes should facilitate mocking of the storage layer during tests.
</requirements>

<acceptance_criteria>
- [ ] `api-client-factory.ts` depends on `CacheRepository` interface.
- [ ] No direct `localStorage` calls exist outside of `src/infra/cache`.
- [ ] All existing storage functionality matches previous behavior.
</acceptance_criteria>

<output>
- **Codebase**: Refactored factory and usage points.
- **Verification**: Tests passing with mocked storage.
</output>
