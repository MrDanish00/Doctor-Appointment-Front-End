# Step 1: Build frontend
FROM node:18 AS build-frontend
WORKDIR /app
COPY package*.json ./
COPY src ./src
COPY public ./public
RUN npm install
RUN npm run build

# Step 2: Backend + serve frontend
FROM node:18
WORKDIR /app

# Copy backend code
COPY server ./server
COPY package*.json ./

# Copy frontend build into backend public folder
COPY --from=build-frontend /app/dist ./server/public

RUN npm install --production

# Expose port (backend)
EXPOSE 5000

CMD ["node", "server/index.js"]
