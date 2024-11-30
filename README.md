# Orçamento Pessoal 📝

O **Orçamento Pessoal** é uma aplicação web que permite o controle e gerenciamento de seus gastos de forma prática e intuitiva. Nele, você pode adicionar e consultar seus orçamentos, categorizando-os por tipo de despesa (lazer, transporte, saúde, alimentação ou educação), e filtrá-los por data e categoria.

## Tecnologias Utilizadas 

- **JavaScript**: Para a lógica de funcionamento e interação dinâmica da página.
- **Bootstrap**: Para o design responsivo e estilização da interface.
- **Docker**: Para containerizar a aplicação e garantir um ambiente consistente para execução.

## Funcionalidades

1. **Adicionar Orçamento**:
   - Informe a data (dia, mês e ano) do orçamento.
   - Selecione o tipo de despesa (lazer, transporte, saúde, alimentação ou educação).
   - Adicione um comentário
   - Informe o valor da despesa.

2. **Consulta de Orçamentos**:
   - Visualize uma lista com todos os orçamentos cadastrados.
   - Filtre orçamentos por **data** e **categoria**.

## Como Rodar Localmente

#### 1. Clone o repositório:

Primeiro, clone o repositório do projeto para sua máquina local:

git clone https://github.com/EmmanuelDeLuca/orcamento-pessoal.git

#### 2. Acesse o diretório do projeto:

cd orcamento-pessoal


## Executar com Docker:

Se você tiver o Docker instalado, pode rodar o projeto facilmente executando os seguintes comandos:

* docker build -t orcamento-pessoal .
* docker run -p 3000:3000 orcamento-pessoal

Isso irá construir a imagem Docker e iniciar o aplicativo na porta `3000`. Agora você pode acessar o **Orçamento Pessoal** no navegador através de `http://localhost:3000`.



