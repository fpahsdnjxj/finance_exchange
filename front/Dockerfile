FROM node:18 AS build

WORKDIR /src

# 필요한 시스템 패키지 설치
RUN apt-get update && apt-get install -y \
    libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 libgbm-dev \
    libasound2 libatk1.0-0 libatk-bridge2.0-0 libnss3 libxss1 \
    libxshmfence-dev libxext6 libxfixes3 libx11-dev libx11-6 \
    libgtk-3-0 libpangocairo-1.0-0 libpango-1.0-0 fonts-liberation \
    libappindicator3-1 lsb-release wget xdg-utils --no-install-recommends

COPY package.json package-lock.json ./
ENV NODE_ENV=development
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.27.5
COPY --from=build /src/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
