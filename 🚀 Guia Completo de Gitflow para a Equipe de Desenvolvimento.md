Olá, equipe! 👋
Este guia tem como objetivo **padronizar o uso do Gitflow**, um modelo de ramificação poderoso que nos ajudará a manter o código organizado, colaborativo e estável em produção.

---

## 📚 Sumário

- [🤔 O que é Gitflow?](#-o-que-é-gitflow)
- [🌟 Por que usar Gitflow?](#-por-que-usar-gitflow)
- [🌳 As Branches do Gitflow](#-as-branches-do-gitflow)
    - [Branches Principais](#branches-principais)
    - [Branches de Suporte (Temporárias)](#branches-de-suporte-temporárias)
- [🔄 Fluxo de Trabalho com Exemplos](#-fluxo-de-trabalho-com-exemplos)
    - [Cenário 1: Iniciando o Projeto](#-cenário-1-iniciando-o-projeto)
    - [Cenário 2: Desenvolvendo uma Nova Funcionalidade (feature)](#-cenário-2-desenvolvendo-uma-nova-funcionalidade-feature)
    - [Cenário 3: Preparando um Release (release)](#-cenário-3-preparando-um-release-release)
    - [Cenário 4: Corrigindo um Bug Crítico em Produção (hotfix)](#-cenário-4-corrigindo-um-bug-crítico-em-produção-hotfix)
- [🛠️ Comandos Git Essenciais](#️-comandos-git-essenciais)
- [✅ Benefícios Resumidos](#-benefícios-resumidos)
- [⚠️ Considerações Importantes](#️-considerações-importantes)
- [🤝 Próximos Passos e Dúvidas](#-próximos-passos-e-dúvidas)

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

#### master (ou main) 🥇

- **Contém o código em produção**
- Cada merge deve gerar uma **tag de versão** (ex: v1.0.0)
- Recebe merges apenas de `release` ou `hotfix`

> 🚫 Nunca faça commits diretos na master!

#### develop 🛠️

- **Contém as funcionalidades em desenvolvimento** (a versão mais atual do que está sendo trabalhado para o próximo release)
- É a base para novas `feature` e `release`

> 🛑 Evite commits diretos. Use sempre `feature/*` para contribuições de novas funcionalidades.

---

### 🔸 Branches de Suporte (Temporárias)

#### feature/* ✨

- **Para novas funcionalidades**
- Criada a partir da `develop`
- Exemplo: `feature/login-social`
- Merged de volta na `develop` quando finalizada e testada

#### release/* 📦

- **Para preparar novas versões para produção**
- Criada a partir da `develop`
- Foco em ajustes finais, testes e documentação (sem novas features)
- Merged na `master` (com tag de versão) e de volta na `develop` (para incorporar ajustes)
- Exemplo: `release/v1.2.0`

> ❗️ Não adicionar novas funcionalidades em uma branch `release`.

#### hotfix/* 🩹

- **Para corrigir bugs críticos em produção**
- Criada a partir da `master` (da tag da versão que está com o bug)
- Exemplo: `hotfix/erro-login-v1.0.1` (indicando a correção para a versão afetada)
- Merged na `master` (com nova tag de patch, ex: v1.0.1) e de volta na `develop`

---

## 🔄 Fluxo de Trabalho com Exemplos

### ✅ Cenário 1: Iniciando o Projeto

```bash
# 1. Inicializa o repositório Git localmente
git init

# 2. Adiciona todos os arquivos iniciais para staging
git add .

# 3. Faz o primeiro commit na branch master (ou main)
git commit -m "Initial commit: Configuração básica do projeto"

# 4. (Opcional, mas recomendado) Cria uma tag para a versão inicial
git tag -a v0.1.0 -m "Versão inicial do projeto v0.1.0"

# 5. Adiciona o repositório remoto (ex: do GitHub)
# Substitua <url-do-seu-repositorio-remoto> pela URL correta
git remote add origin <url-do-seu-repositorio-remoto>

# 6. Envia a branch master e todas as tags para o repositório remoto
# O `-u` estabelece a ligação entre a branch local e a remota (upstream)
git push -u origin master --tags

# 7. Cria a branch develop a partir da master
# Cria a branch 'develop' baseada na 'master' e já muda para ela
git checkout -b develop master

# 8. Envia a nova branch develop para o repositório remoto
git push -u origin develop
```

### ✅ Cenário 2: Desenvolvendo uma Nova Funcionalidade (feature)

```bash
# 1. Mude para a branch develop
git checkout develop

# 2. Garanta que sua branch develop local está atualizada com a remota
git pull origin develop

# 3. Crie uma nova branch feature a partir da develop
# Substitua 'nome-da-funcionalidade' por um nome descritivo (ex: 'perfil-usuario')
git checkout -b feature/nome-da-funcionalidade develop

# 4. Trabalhe na sua funcionalidade:
#    Faça suas alterações no código...
#    Adicione os arquivos modificados:
#    git add .
#    Faça commits descritivos:
#    git commit -m "feat: Adiciona funcionalidade X para o perfil do usuário"
#    (Repita o ciclo add/commit conforme necessário)

# 5. (Opcional, mas bom para backup e colaboração/PRs) Envie sua feature branch para o remoto
git push -u origin feature/nome-da-funcionalidade

# --- Quando a funcionalidade estiver completa e testada: ---

# 6. Mude para a branch develop
git checkout develop

# 7. Atualize a develop novamente (outras features podem ter sido integradas)
git pull origin develop

# 8. Faça o merge da sua feature branch na develop
# A flag --no-ff cria um "merge commit", mantendo o histórico de que esses commits vieram de uma feature
git merge --no-ff feature/nome-da-funcionalidade -m "Merge feature/nome-da-funcionalidade: Descrição da funcionalidade completa"

# 9. Envie as atualizações da develop (com a nova feature) para o remoto
git push origin develop

# 10. (Opcional, mas recomendado para limpeza) Exclua a feature branch
# Excluir localmente:
git branch -d feature/nome-da-funcionalidade
# Excluir remotamente:
git push origin --delete feature/nome-da-funcionalidade
```

### ✅ Cenário 3: Preparando um Release (release)

```bash
# 1. Mude para a branch develop
git checkout develop

# 2. Garanta que sua develop local está atualizada
git pull origin develop

# 3. Crie a branch de release a partir da develop
# Substitua 'vX.Y.Z' pela versão do release (ex: 'v1.0.0')
git checkout -b release/vX.Y.Z develop

# 4. Envie a branch de release para o remoto (para que outros possam testar/validar)
git push -u origin release/vX.Y.Z

# 5. Nesta branch, faça apenas correções de bugs finais, atualize documentação, número de versão, etc.
#    Exemplo de commit:
#    git add .
#    git commit -m "chore: Atualiza número da versão para vX.Y.Z"
#    git commit -m "fix: Corrige bug menor no layout antes do release"
#    (Envie as alterações para a branch release remota: git push origin release/vX.Y.Z)

# --- Quando a branch de release estiver pronta e aprovada: ---

# 6. Mude para a branch master
git checkout master

# 7. Atualize a master local
git pull origin master

# 8. Faça o merge da branch de release na master
git merge --no-ff release/vX.Y.Z -m "Merge release/vX.Y.Z: Lançamento da versão vX.Y.Z"

# 9. Crie uma tag para esta versão na master
git tag -a vX.Y.Z -m "Release da versão vX.Y.Z"

# 10. Envie a master atualizada e a nova tag para o repositório remoto
git push origin master
git push origin vX.Y.Z # ou git push origin --tags

# 11. Mude de volta para a branch develop
git checkout develop

# 12. Faça o merge da branch de release na develop também
# (Isso garante que quaisquer correções feitas na release voltem para a develop)
git merge --no-ff release/vX.Y.Z -m "Merge release/vX.Y.Z: Incorpora ajustes do release na develop"

# 13. Envie a develop atualizada para o remoto
git push origin develop

# 14. (Recomendado) Exclua a branch de release
# Excluir localmente:
git branch -d release/vX.Y.Z
# Excluir remotamente:
git push origin --delete release/vX.Y.Z
```

### ✅ Cenário 4: Corrigindo um Bug Crítico em Produção (hotfix)

```bash
# 1. Mude para a branch master
git checkout master

# 2. Garanta que sua master local está atualizada com a versão de produção
git pull origin master

# 3. Crie uma branch hotfix a partir da tag da versão em produção que tem o bug
# Substitua 'vX.Y.Z' pela tag da versão com bug (ex: 'v1.0.0')
# E 'descricao-do-bug-vX.Y.Z_patch' por um nome descritivo (ex: 'login-critico-v1.0.1')
git checkout -b hotfix/descricao-do-bug-vX.Y.Z_patch vX.Y.Z

# 4. Envie a branch hotfix para o remoto (opcional, mas bom para visibilidade)
git push -u origin hotfix/descricao-do-bug-vX.Y.Z_patch

# 5. Faça a correção do bug e commite as alterações
#    git add .
#    git commit -m "fix: Corrige bug crítico [descrição do bug]"
#    (Pode ser necessário atualizar o número da versão patch aqui também)
#    git commit -m "chore: Atualiza versão para vX.Y.(Z+1)"
#    (Envie as alterações para a branch hotfix remota: git push origin hotfix/descricao-do-bug-vX.Y.Z_patch)

# --- Quando a correção estiver pronta e testada: ---

# 6. Mude para a branch master
git checkout master

# 7. Atualize a master local
git pull origin master

# 8. Faça o merge da branch hotfix na master
git merge --no-ff hotfix/descricao-do-bug-vX.Y.Z_patch -m "Merge hotfix: Corrige [descrição do bug] - vX.Y.(Z+1)"

# 9. Crie uma nova tag para a versão corrigida (patch)
# Ex: se o bug era na v1.0.0, a nova tag será v1.0.1
git tag -a vX.Y.(Z+1) -m "Hotfix: Correção para [descrição do bug] - vX.Y.(Z+1)"

# 10. Envie a master atualizada e a nova tag para o remoto
git push origin master
git push origin vX.Y.(Z+1) # ou git push origin --tags

# 11. Mude para a branch develop
git checkout develop

# 12. Atualize a develop local
git pull origin develop

# 13. Faça o merge da branch hotfix na develop também
# (Para garantir que a correção também esteja no próximo ciclo de desenvolvimento)
git merge --no-ff hotfix/descricao-do-bug-vX.Y.Z_patch -m "Merge hotfix: Incorpora correção [descrição do bug] na develop"

# 14. Envie a develop atualizada para o remoto
git push origin develop

# 15. (Recomendado) Exclua a branch hotfix
# Excluir localmente:
git branch -d hotfix/descricao-do-bug-vX.Y.Z_patch
# Excluir remotamente:
git push origin --delete hotfix/descricao-do-bug-vX.Y.Z_patch
```

---

## 🛠️ Comandos Git Essenciais

| Ação | Comando Git | Notas |
|------|-------------|-------|
| Criar nova branch e mudar para ela | `git checkout -b nome-da-branch branch-de-origem` | Ex: `git checkout -b feature/nova develop` |
| Enviar nova branch local para o remoto | `git push -u origin nome-da-branch` | O `-u` só é necessário na primeira vez. |
| Atualizar sua branch local com a remota | `git pull origin nome-da-branch` | Ex: `git pull origin develop` para atualizar sua develop local. |
| Fazer merge de uma branch na branch atual | `git merge nome-da-branch-a-mesclar` | |
| Fazer merge com "merge commit" (recomendado) | `git merge --no-ff nome-da-branch-a-mesclar -m "Msg do merge"` | Mantém o histórico mais claro. |
| Excluir branch local (após merge) | `git branch -d nome-da-branch` | `-D` (maiúsculo) para forçar se não foi merged. |
| Excluir branch remota | `git push origin --delete nome-da-branch` | |
| Criar tag anotada (para versões) | `git tag -a vX.Y.Z -m "Descrição da versão"` | Ex: `git tag -a v1.0.0 -m "Release da versão 1.0.0"` |
| Enviar todas as tags locais para o remoto | `git push origin --tags` | |
| Enviar uma tag específica para o remoto | `git push origin nome-da-tag` | Ex: `git push origin v1.0.0` |
| Listar branches locais | `git branch` | |
| Listar todas as branches (locais e remotas) | `git branch -a` | |
| Ver o histórico de commits | `git log --oneline --graph --decorate` | Forma visual e resumida. |

---

## ✅ Benefícios Resumidos

- Organização clara das responsabilidades das branches
- Integração contínua com controle
- Lançamentos versionados e rastreáveis
- Correções rápidas e seguras sem quebrar o fluxo de desenvolvimento
- Escalabilidade para equipes maiores

---

## ⚠️ Considerações Importantes

- Nunca faça commit direto na master ou develop (exceto merges planejados).
- Sempre use `git pull` na develop (ou master) antes de criar novas branches a partir delas, para garantir que está partindo da versão mais recente.
- Padronize o nome das branches (ex: `feature/descricao-curta`, `release/vX.Y.Z`, `hotfix/descricao-vX.Y.Z_patch`).
- Apague branches (feature, release, hotfix) que não estão mais em uso (local e remotamente) para manter o repositório limpo.
- Faça revisões de código (Pull Requests/Merge Requests) e testes antes de mesclar qualquer branch em develop ou master.

---

## 🤝 Próximos Passos e Dúvidas

Qualquer dúvida, sugestão ou melhoria para o guia, fale com o líder técnico ou envie uma PR com sugestões de ajuste.

Bons commits! 🚀💻
