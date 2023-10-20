FROM node:18 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda etapa

FROM nginx:latest

COPY --from=build-step /app/dist/sistema-examenes-frontend /usr/share/nginx/html
