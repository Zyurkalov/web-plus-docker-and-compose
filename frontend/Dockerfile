FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build 

FROM nginx:1.27-alpine AS frontend-runner
WORKDIR /app
COPY --from=builder app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d
ENTRYPOINT ["nginx", "-g", "daemon off;"]