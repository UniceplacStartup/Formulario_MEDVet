

Olá, equipe! 👋  
Este guia tem como objetivo **padronizar o uso do Gitflow**, um modelo de ramificação poderoso que nos ajudará a manter o código organizado, colaborativo e estável em produção.

---

## 📚 Sumário

- [🤔 O que é Gitflow?](#%F0%9F%A4%94-o-que-%C3%A9-gitflow)
    
- [🌟 Por que usar Gitflow?](#%F0%9F%8C%9F-por-que-usar-gitflow)
    
- [🌳 As Branches do Gitflow](#%F0%9F%8C%B3-as-branches-do-gitflow)
    
    - [Branches Principais](#branches-principais)
        
    - [Branches de Suporte (Temporárias)](#branches-de-suporte-tempor%C3%A1rias)
        
- [🔄 Fluxo de Trabalho com Exemplos](#%F0%9F%94%84-fluxo-de-trabalho-com-exemplos)
    
    - [Cenário 1: Iniciando o Projeto](#cen%C3%A1rio-1-iniciando-o-projeto)
        
    - [Cenário 2: Desenvolvendo uma Nova Funcionalidade (`feature`)](#cen%C3%A1rio-2-desenvolvendo-uma-nova-funcionalidade-feature)
        
    - [Cenário 3: Preparando um Release (`release`)](#cen%C3%A1rio-3-preparando-um-release-release)
        
    - [Cenário 4: Corrigindo um Bug Crítico em Produção (`hotfix`)](#cen%C3%A1rio-4-corrigindo-um-bug-cr%C3%ADtico-em-produ%C3%A7%C3%A3o-hotfix)
        
- [🛠️ Comandos Git Essenciais](#%F0%9F%9B%A0%EF%B8%8F-comandos-git-essenciais)
    
- [✅ Benefícios Resumidos](#%E2%9C%85-benef%C3%ADcios-resumidos)
    
- [⚠️ Considerações Importantes](#%E2%9A%A0%EF%B8%8F-considera%C3%A7%C3%B5es-importantes)
    
- [🤝 Próximos Passos e Dúvidas](#%F0%9F%A4%9D-pr%C3%B3ximos-passos-e-d%C3%BAvidas)
    

---

## 🤔 O que é Gitflow?

Gitflow é um modelo de ramificação criado por **Vincent Driessen**, que define um processo claro de como trabalhar com o Git em equipes de desenvolvimento.  
Ele organiza o desenvolvimento em **branches com funções bem definidas**, desde novas funcionalidades até correções em produção.

---

## 🌟 Por que usar Gitflow?

✔️ Permite desenvolvimento paralelo eficiente  
✔️ Facilita a colaboração em equipe  
✔️ Mantém um histórico limpo e compreensível  
✔️ Organiza o processo de release  
✔️ Garante estabilidade e resposta rápida a bugs

---

## 🌳 As Branches do Gitflow

### 🔹 Branches Principais

#### `master` (ou `main`) 🥇

- **Contém o código em produção**
    
- Cada merge deve gerar uma **tag de versão** (ex: `v1.0.0`)
    
- Recebe merges apenas de `release` ou `hotfix`
    

> 🚫 Nunca faça commits diretos na `master`

#### `develop` 🛠️

- **Contém as funcionalidades em desenvolvimento**
    
- É a base para novas `feature` e `release`
    

> 🛑 Evite commits diretos. Use sempre `feature/*` para contribuições

---

### 🔸 Branches de Suporte (Temporárias)

#### `feature/*` ✨

- **Para novas funcionalidades**
    
- Criada a partir da `develop`
    
- Exemplo: `feature/login-social`
    
- Merged na `develop` quando finalizada
    

#### `release/*` 📦

- **Para preparar novas versões**
    
- Criada a partir da `develop`
    
- Foco em ajustes finais e documentação
    
- Merged na `master` (com tag) e `develop`
    
- Exemplo: `release/v1.2.0`
    

> ❗️ Não adicionar novas funcionalidades aqui

#### `hotfix/*` 🩹

- **Para corrigir bugs em produção**
    
- Criada a partir da `master`
    
- Exemplo: `hotfix/erro-login`
    
- Merged na `master` (com nova tag) e na `develop`
    

---

## 🔄 Fluxo de Trabalho com Exemplos

### ✅ Cenário 1: Iniciando o Projeto

bash

CopiarEditar

`# Inicializa o repositório git init git add . git commit -m "Initial commit: setup do projeto"  # Cria tag inicial git tag -a v0.1.0 -m "Versão inicial"  # Envia para o repositório remoto git remote add origin <url-do-repo> git push -u origin master --tags  # Cria a develop git checkout -b develop git push -u origin develop`

---

### ✅ Cenário 2: Desenvolvendo uma Nova Funcionalidade (`feature`)

bash

CopiarEditar

`# Atualiza a develop git checkout develop git pull origin develop  # Cria a feature git checkout -b feature/perfil-usuario develop  # Trabalha normalmente git add . git commit -m "feat: adiciona funcionalidade de perfil de usuário"  # Mescla na develop após testes git checkout develop git merge feature/perfil-usuario git push origin develop  # Remove a branch se quiser git branch -d feature/perfil-usuario git push origin --delete feature/perfil-usuario`

---

### ✅ Cenário 3: Preparando um Release (`release`)

bash

CopiarEditar

`# Cria a release a partir da develop git checkout develop git pull origin develop git checkout -b release/v1.0.0  # Faz ajustes finais git commit -m "docs: atualiza changelog e versão"  # Mescla na master git checkout master git merge release/v1.0.0 git tag -a v1.0.0 -m "Lançamento da versão 1.0.0" git push origin master --tags  # Mescla de volta na develop git checkout develop git merge release/v1.0.0  # Remove a branch git branch -d release/v1.0.0 git push origin --delete release/v1.0.0`

---

### ✅ Cenário 4: Corrigindo um Bug Crítico em Produção (`hotfix`)

bash

CopiarEditar

`# Cria a hotfix a partir da master git checkout master git pull origin master git checkout -b hotfix/login-bug  # Corrige o bug git commit -m "fix: corrige bug de login"  # Mescla na master git checkout master git merge hotfix/login-bug git tag -a v1.0.1 -m "Correção crítica de login" git push origin master --tags  # Mescla também na develop git checkout develop git merge hotfix/login-bug  # Remove a branch git branch -d hotfix/login-bug git push origin --delete hotfix/login-bug`

---

## 🛠️ Comandos Git Essenciais

|Ação|Comando|
|---|---|
|Criar branch|`git checkout -b feature/nome`|
|Enviar branch pro remoto|`git push -u origin feature/nome`|
|Atualizar sua branch local|`git pull origin develop`|
|Fazer merge|`git checkout develop && git merge feature/nome`|
|Apagar branch local/remota|`git branch -d nome` / `git push origin --delete nome`|
|Criar tag|`git tag -a v1.0.0 -m "Descrição"`|
|Enviar tags|`git push origin --tags`|

---

## ✅ Benefícios Resumidos

- Organização clara das responsabilidades das branches
    
- Integração contínua com controle
    
- Lançamentos versionados e rastreáveis
    
- Correções rápidas e seguras sem quebrar o fluxo de desenvolvimento
    
- Escalabilidade para equipes maiores
    

---

## ⚠️ Considerações Importantes

- Nunca commit direto na `master` ou `develop`
    
- Sempre use pull antes de criar novas branches
    
- Padronize o nome das branches
    
- Apague branches que não estão mais em uso
    
- Faça revisões e testes antes de mergear qualquer branch
    

---

## 🤝 Próximos Passos e Dúvidas

Qualquer dúvida, sugestão ou melhoria para o guia, fale com o líder técnico ou envie uma PR com sugestões de ajuste.

Bons commits! 🚀💻