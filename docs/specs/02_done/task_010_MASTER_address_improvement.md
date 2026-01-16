# <role>
# Product & Domain Analyst (PDA)
# </role>

# Master Plan: Address Architecture Improvement

<context>
This is the master plan for refactoring the Address handling across the application. 
The goal is to implement a robust, cached, and reusable Geography Context using Redis and ViaCEP, solving the User Creation UX issues and preparing the system for future scale.
</context>

<scope>
The implementation is divided into **4 Granular Tasks** (Bounded Contexts):

- **[Task 10.1: Infrastructure & Cache](./task_010_01_infra_cache.md)**: Redis setup and Generic Cache Protocol.
- **[Task 10.2: Geography Domain](./task_010_02_geography_domain.md)**: Core Logic for State/City/Neighborhood resolution.
- **[Task 10.3: Address Gateway](./task_010_03_address_gateway.md)**: External integration with ViaCEP and Decorator Caching.
- **[Task 10.4: User Integration](./task_010_04_user_integration.md)**: API Endpoints and User Module consumption.

</scope>

<execution_strategy>
1. Execute tasks sequentially (10.1 -> 10.2 -> 10.3 -> 10.4).
2. Each task must pass its own Acceptance Criteria before moving to the next.
3. Keep the "Green" state (passing tests) at the end of each task.
</execution_strategy>
