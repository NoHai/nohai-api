# Build runtime image
FROM node:10-alpine
WORKDIR /app
EXPOSE 5000

COPY . .
RUN npm install

CMD ["npm", "run", "production:all"]