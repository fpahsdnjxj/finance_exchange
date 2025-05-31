FROM node:18 AS build

WORKDIR /src

COPY package*.json ./
ENV NODE_ENV=development
RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=build /src/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]