# Digital Catalog Flipbook

Aplicação web interativa de catálogo digital desenvolvida com React e Vite, utilizando animação realista de virada de páginas (flipbook) e estrutura otimizada para deploy em ambiente de produção.

O projeto demonstra arquitetura front-end moderna, organização modular de componentes e fluxo estruturado para publicação em produção.

--------------------------------;

## 📌 Visão Geral

Digital Catalog Flipbook é uma aplicação responsiva que simula a experiência de um catálogo físico por meio de animação de virada de páginas.

A solução foi projetada para:

- Catálogos de produtos
- Materiais institucionais
- Apresentações comerciais
- Conteúdos promocionais

A arquitetura é escalável e permite expansão para múltiplos catálogos.

---------------------------------;

## 🚀 Stack Tecnológica

- **React** — Arquitetura baseada em componentes
- **Vite** — Build tool e servidor de desenvolvimento rápido
- **react-pageflip** — Engine de animação de páginas
- **JavaScript** (ES6+)
- **CSS**
- **Vercel** — Deploy em produção
- **Python** — Utilitário auxiliar para conversão de PDF em imagens

---------------------------------;

## 🏗️ Arquitetura do Projeto

Estrutura organizada e modular:

    ```
    public/
    ├── pdfs/
    ├── imagens/

    src/
    ├── components/
    │     ├── Flipbook.jsx
    │     ├── Page.jsx
    │
    ├── data/
    │     ├── catalogo.js
    │
    ├── App.jsx
    ├── main.jsx
    ```

### Responsabilidade dos Componentes

**Flipbook.jsx**
Componente principal responsável pela renderização do container de páginas e controle da navegação.

**Page.jsx**
Componente reutilizável responsável pela renderização individual de cada página do catálogo.

**catalogo.js**
Arquivo centralizado que define a estrutura e os ativos (imagens) do catálogo.

--------------------------;

## ⚙️ Funcionalidades

- Animação realista de virada de páginas
- Layout responsivo
- Estrutura modular e reutilizável
- Gerenciamento organizado de ativos estáticos
- Arquitetura preparada para produção

---------------------------;

## 🧩 Fluxo de Funcionamento

- O PDF original é convertido em imagens via script Python.
- As imagens são armazenadas em public/imagens.
- O catálogo é configurado em catalogo.js.
- O componente Flipbook renderiza dinamicamente as páginas.
- O projeto é buildado com Vite e publicado na Vercel.

----------------------------------;

## 📈 Considerações de Engenharia

- Separação clara de responsabilidades
- Componentização consistente
- Organização de ativos estáticos
- Estrutura preparada para escalabilidade
- Código orientado à manutenção e reuso
