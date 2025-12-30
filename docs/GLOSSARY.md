# GLOSSÁRIO VIVO DO FALERO (Linguagem Ubíqua)

Este documento define os termos usados no código e na comunicação do projeto.
Ambiguidade aqui gera bugs lá.

---

## 👥 ENTIDADES PRINCIPAIS

### User (Usuário)
A pessoa física que utiliza o sistema.
- **Identidade:** Definida pelo `Id` (UUID).
- **Unicidade:** Garantida pelo `Email`.
- **Regras:**
    - Deve possuir Nome, Email e CPF válidos.
    - Pode possuir RG, Data de Nascimento e Endereço (opcionais na atualização).

---

## 📦 VALUE OBJECTS (Aventuras de Dados)

### Cpf (Cadastro de Pessoas Físicas)
Identificador fiscal brasileiro.
- **Formato:** 11 dígitos numéricos. Aceita formatação com pontos e traço.
- **Validação:** Algoritmo oficial de dígito verificador (mod 11).
- **Regra:** Não aceita dígitos repetidos (ex: 111.111.111-11).

### Email
Endereço eletrônico de contato.
- **Regra:** Deve ter formato válido (regex), não ser vazio e ter no máximo 256 caracteres.
- **Papel:** Chave natural de unicidade do usuário no sistema.

### Name (Nome)
Nome completo do usuário.
- **Regra:** Deve ter no mínimo 2 caracteres.
- **Tratamento:** Espaços em branco nas pontas são removidos (trim).

### Rg (Registro Geral)
Documento de identidade.
- **Regra:** Não pode ser uma string vazia se for fornecido.

### BirthDate (Data de Nascimento)
Data de nascimento do usuário.
- **Regra:** Deve ser uma data válida no passado. (Verificar se há limite de idade no futuro).

### Address (Endereço)
Localização física do usuário.
- **Composição:** Rua, Número, Bairro, Cidade, Estado (UF), CEP.
- **Regra:** Se fornecido, todos os campos obrigatórios do endereço devem estar preenchidos.
- **Estado (UF):** Deve ter exatamente 2 caracteres.

---

## 🏗️ CONCEITOS TÉCNICOS NO DOMÍNIO

### Sut (System Under Test)
O objeto principal que está sendo testado em um teste unitário.

### Double / Mock / Spy
Objetos simulados usados em testes para isolar o comportamento do SUT.
- **Spy:** Um mock que "espiona" as chamadas (guarda os valores recebidos e o que retornou).

### Notification Pattern
Padrão de tratamento de erros onde o domínio retorna o erro como valor (ex: `Either<Error, Success>`) em vez de lançar exceções (`throw`).
