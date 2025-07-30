# Site para Decoradora de Natal Profissional

## 📖 Sobre o Projeto

Esta é uma aplicação web full-stack desenvolvida para uma decoradora de Natal profissional com mais de 30 anos de experiência. O projeto foi criado com um significado especial, pois a cliente é a minha mãe, e o objetivo foi traduzir a sua arte e o seu atendimento personalizado numa experiência digital moderna e eficiente.

Diferente de um e-commerce tradicional, a plataforma funciona como uma poderosa ferramenta de negócio, focada em dar credibilidade, apresentar o portfólio de forma interativa e, principalmente, em qualificar e captar leads de forma automatizada. A aplicação gere todo o fluxo, desde a inspiração inicial do cliente até ao registo do pedido de orçamento no banco de dados e o primeiro contacto via WhatsApp.

**Link para o site ao vivo:** [www.ju-decoracao-de-natal.com.br](https://www.ju-decoracao-de-natal.com.br)

---

## ✨ Funcionalidades Principais

* **Galeria Dinâmica:** Os produtos (árvores e guirlandas) são carregados diretamente de um banco de dados Supabase, permitindo uma gestão de conteúdo fácil e centralizada.
* **Filtros Avançados:** A galeria possui um sistema de filtros em cascata que permite aos utilizadores refinar a sua busca por tipo de produto, altura, estilo e cores.
* **Carrossel de Produtos Interativo:** Ao clicar num produto, um modal expande-se e permite a navegação entre os diferentes projetos através de setas ou gestos de deslizar (swipe).
* **Formulários de Orçamento Inteligentes:**
    * **Inspirado:** Ao solicitar um orçamento a partir de um produto, o formulário é pré-preenchido com as características da inspiração (estilo, cores, enfeites).
    * **Geral:** Um formulário de contacto completo que também funciona como um pedido de orçamento para projetos do zero.
* **Integração com Supabase:** Todos os pedidos de orçamento são automaticamente guardados numa tabela PostgreSQL no Supabase, criando um registo de todos os leads.
* **Seletores em Cascata de Localização:** Utiliza a API oficial do IBGE para carregar dinamicamente a lista de cidades com base no estado selecionado.
* **Automação com WhatsApp:** Após o envio bem-sucedido, o sistema gera uma mensagem detalhada e abre uma conversa no WhatsApp, otimizando o primeiro contacto.

---

## 🚀 Tecnologias Utilizadas

* **Framework:** [Next.js](https://nextjs.org/) (com App Router)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Backend & Base de Dados:** [Supabase](https://supabase.io/) (PostgreSQL)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Animações:** [Framer Motion](https://www.framer.com/motion/)
* **Deployment:** [Vercel](https://vercel.com/)

---

## 🛠️ Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto na sua máquina.

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/nome-do-repositorio.git](https://github.com/seu-usuario/nome-do-repositorio.git)
    ```

2.  **Navegue para a pasta do projeto:**
    ```bash
    cd nome-do-repositorio
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as Variáveis de Ambiente:**
    * Crie um ficheiro chamado `.env.local` na raiz do projeto.
    * Adicione as suas chaves do Supabase, que pode encontrar no painel do seu projeto:
        ```env
        NEXT_PUBLIC_SUPABASE_URL=SUA_URL_AQUI
        NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_AQUI
        ```

5.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---

## 👤 Autor

* **João Calsavara**
* **LinkedIn:** [https://www.linkedin.com/in/joão-pedro-leite-calsavara-b951b6230/](https://www.linkedin.com/in/joão-pedro-leite-calsavara-b951b6230/)
