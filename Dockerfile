FROM node:18.13.0

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD [ "node","dist/main.js"]
EXPOSE 3005
