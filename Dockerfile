FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos HTML e o app.js
COPY consulta.html ./
COPY index.html ./
COPY app.js ./

# Instala o http-server (não precisa de package.json)
RUN npm install -g http-server

# Expondo a porta 8080
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["http-server", ".", "-p", "8080"]
