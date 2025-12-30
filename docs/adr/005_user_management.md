# ADR 005: Gestão de Usuários (User Management)

## Contexto e Problema
O sistema necessita de uma gestão robusta de usuários que permita a criação de perfis, listagem, atualização e exclusão, além da gestão separada de credenciais de acesso. O Frontend precisa de uma definição clara de contratos, regras de negócio e tratamento de erros para implementar as telas de administração.

## Direcionadores
- **Segurança**: Autenticação e Autorização obrigatórias via JWT.
- **Integridade**: Validação rigorosa em multicamadas (Schema e Domain).
- **Separação de Responsabilidades**: Dados de perfil separados de credenciais de login.
- **Escalabilidade**: Suporte a papéis (`admin`, `librarian`, `user`).

## Decisão
Implementamos um fluxo de gestão de usuários baseado em DDD e Clean Architecture no Backend, com os seguintes contratos:

### 1. Endpoints de Usuário
- `POST /users`: Criação de perfil básico.
    - **Requer**: Autenticação (Admin/Librarian).
    - **Payload**: `{ name, email, rg, cpf, birthDate, address? }`.
- `GET /users`: Listagem de usuários.
    - **Requer**: Autenticação (Admin/Librarian).
- `PUT /users/:id`: Atualização de perfil/role.
    - **Requer**: Autenticação (Admin).
    - **Payload**: `{ name?, email?, role?, rg?, cpf?, birthDate?, address? }`.
- `DELETE /users/:id`: Remoção de usuário.
    - **Requer**: Autenticação (Admin).
- `POST /users/:userId/login`: Criação de credenciais de acesso.
    - **Requer**: Autenticação (Admin/Librarian).
    - **Payload**: `{ username?, password }`.

### 2. Autenticação
- `POST /login`: Login com email/password. Retorna `accessToken`, `refreshToken`, `name` e `role`.
- `POST /refresh-token`: Renovação de tokens usando `refreshToken`.

### 3. Regras de Validação e Negócio
- **CPF/Email/RG**: Devem ser únicos no sistema.
- **Senha**: Mínimo 8 caracteres, contendo maiúscula, minúscula, número e caractere especial.
- **Value Objects**: Todas as validações de formato (CPF, Email, etc.) são centralizadas em Value Objects no Domínio.

### 4. Tratamento de Erros
- `400 Bad Request`: Erro de validação de formato ou parâmetros ausentes.
- `401 Unauthorized`: Token inválido ou expirado.
- `403 Forbidden`: Violação de regra de negócio (ex: CPF já existe) ou permissão insuficiente (RBAC).
- `404 Not Found`: Usuário não encontrado.

## Consequências
- **Positivo**: Alta rastreabilidade e segurança. Separação clara entre "quem é o usuário" e "como ele acessa o sistema".
- **Negativo**: Maior complexidade no frontend para gerenciar o fluxo em duas etapas (Criar Perfil -> Criar Login).
