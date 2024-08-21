# Desafio | Front-end - Módulo 8

## Descrição do Projeto

Este projeto é uma aplicação para controle de finanças pessoais, desenvolvida como parte do Módulo 8 do curso. Após meses trabalhando em projetos mais simples, você foi designado pelo seu Tech Lead para desenvolver uma aplicação que será apresentada a um cliente muito importante.

## Funcionalidades

A aplicação inclui as seguintes funcionalidades:

### Funcionalidades Obrigatórias:

- **Cadastro do usuário**: Permite o registro de novos usuários na plataforma.
- **Login de usuário**: Autentica o usuário e permite o acesso à área logada.
- **Logout de usuário**: Desconecta o usuário da aplicação.
- **Cadastro de uma nova transação**: Adiciona novas transações financeiras (entrada ou saída) ao sistema.
- **Edição de uma transação**: Permite a modificação de transações já cadastradas.
- **Exclusão de uma transação**: Remove transações do sistema.
- **Listagem de transações**: Exibe todas as transações cadastradas pelo usuário.
- **Resumo das transações**: Apresenta um sumário das entradas, saídas e saldo total.

### Funcionalidades Extras (Opcional):

- **Ordenação da tabela por data**: O usuário pode ordenar as transações por data.
- **Filtragem por categoria**: Permite filtrar transações por categorias específicas.
- **Edição de perfil de usuário**: Permite ao usuário editar suas informações pessoais.

## Detalhamento de Funcionalidades

### Cadastro de Usuário

- Preenchimento de formulário com validação de campos.
- Envio de dados para a API e redirecionamento para a página de login em caso de sucesso.

### Login de Usuário

- Validação de campos e envio de dados para autenticação via API.
- Armazenamento de token e userId no localStorage.
- Redirecionamento para a tela principal em caso de sucesso.

### Página Principal

- Acesso restrito a usuários logados.
- Exibição de transações, resumo de finanças e opções para adicionar, editar ou excluir transações.

### Cadastro e Edição de Transações

- Modal para adicionar ou editar transações, com preenchimento automático no caso de edição.
- Validação de todos os campos e atualização automática da tabela e resumo após a confirmação.

### Exclusão de Transações

- Exclusão direta ao clicar no ícone de lixeira, com a possibilidade de implementar um popup de confirmação.

### Listagem de Transações

- Exibição de transações em tabela com colunas para data, dia da semana, descrição, categoria, valor, e ações (editar/excluir).
- Cores e sinais diferenciados para valores de entrada (roxo) e saída (laranja).

### Ordenação e Filtragem

- Ordenação da coluna de data na tabela.
- Filtros cumulativos por categoria, com botões para aplicar e limpar filtros.

### Edição de Perfil

- Modal para edição das informações do usuário logado, com validação de campos e atualização da API.

### Logout e Exibição de Nome

- Exibição do nome do usuário logado no header e funcionalidade para deslogar.
