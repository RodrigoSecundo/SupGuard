# SupGuard - Back-end

### Este é o back-end do projeto **SupGuard**, desenvolvido com **Python, Flask e PostgreSQL** para aplicar lógica ao frontend. Ainda não está completo, mas já cadastra usuários no banco de dados.

# Requisitos:

Antes de rodar este projeto, você precisa ter os seguintes softwares instalados na sua máquina:

- ✅ Python 3.13 → https://www.python.org/downloads/
- ✅ PostgreSQL (com pgAdmin incluso, eu recomendo) → https://www.postgresql.org/download/
- ✅ Git (opcional) → https://git-scm.com/
- ✅ Postman (opcional) → https://www.postman.com/

# Configuração do ambiente:

1- Baixe os arquivos do backend do projeto ou clone o repositório

2- Crie e ative um ambiente virtual:

    python -m venv venv

3- Ative o ambiente:

- Windows:

      venv\Scripts\activate

- Linux/macOS:

      source venv/bin/activate

4- Instale as dependências:

    pip install Flask Flask-Cors Flask-SQLAlchemy psycopg2-binary Werkzeug

# Configuração do banco de dados:

Edite o arquivo `config.py` com os dados do seu banco PostgreSQL:

    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://seu.usuario:sua.senha@localhost:5432/supguard")

Certifique-se de que:
- O banco `supguard` existe
- O usuário e senha estão corretos (conforme os que você criou durante a instalação)

# Criar as tabelas no banco:

A seguir, execute no terminal o script a seguir para criar as tabelas:

    python criar_tabelas.py

Se tudo estiver certo, aparecerá:

    Tabelas criadas com sucesso!

# Rodando o servidor

Inicie o servidor Flask com:

    python app.py

Se tudo estiver cereto, você verá algo como:

    * Running on http://0.0.0.0:5000 (Press CTRL+C to quit)

Após isso, prossiga para a instalação do frontend do projeto e a instalação das depêndecias seguindo o readme dedicado ao frontend.

OBS: O código está voltado a rodar o projeto no android studio, com isso devido à possível imcompatibilidade de IP, pode ser que haja falhas dependendo do IP do seu computador/celular. Em caso de dúvida ou dicas, segue abaixo:

# Dúvidas, dicas ou suporte:

Caso tenha problemas para rodar o projeto, abra uma issue neste repositório ou entre em contato comigo pelo:

Instagram: rodrigo_secundo

Linkedin: https://www.linkedin.com/in/rodrigo-secundo-araújo-b4a682254/
