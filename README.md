# Biblioteca Falero Fullstack

Sistema de Gestão de Bibliotecas moderno, construído com arquitetura limpa e tecnologias de ponta.

## 🚀 Tecnologias

### Backend
- **Node.js** com **Fastify**
- **TypeScript**
- **TypeORM** com MySql 8
- **Clean Architecture** (Domain, Application, Infra, Main)
- **TDD** (Jest)

### Frontend
- **React** com **Vite**
- **TypeScript**
- **Tailwind CSS** (Premium UI/UX)
- **Clean Architecture**
- **Vitest**

## 📦 Estrutura do Projeto

O projeto é dividido em dois repositórios principais agrupados nesta estrutura fullstack:

- `app/backend`: API e Regras de Negócio.
- `app/frontend`: Interface do Usuário e Experiência.

## 🛠️ Como rodar (Docker)

Certifique-se de ter o Docker e Docker Compose instalados.

1. Navegue até a pasta `app`.
2. Execute o ambiente de desenvolvimento:
   ```bash
   docker-compose -f docker-compose.dev.yml up -d --build
   ```
3. Acesse:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:5050](http://localhost:5050)

## 🗄️ Database Seeding

Para popular o banco com um administrador inicial:
```bash
cd backend
npm run seed:admin
```

---
Desenvolvido por **Software House**
