FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli@15

COPY . .

RUN ng build

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]