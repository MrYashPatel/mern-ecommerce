### Step 1: Build Vite Frontend ###
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend

# Install dependencies for the frontend
COPY frontend/package*.json ./
RUN npm install --frozen-lockfile
COPY frontend/ ./
RUN npm run build

### Step 2: Setup Backend ###
FROM node:22-alpine AS backend-builder
WORKDIR /app/backend

# Backend package.json is in root
COPY package*.json ./
RUN npm install --omit=dev

# Copy backend code from backend folder
COPY backend/ ./

### Step 3: Final Runtime Image ###
FROM node:22-alpine
WORKDIR /app/backend

# Copy backend code
COPY --from=backend-builder /app/backend ./

# Copy built frontend files to public folder
COPY --from=frontend-builder /app/frontend/dist ./public

# Expose the backend port
EXPOSE 5000

# Set environment variables (optional if using --env-file)
ENV NODE_ENV=production
ENV PORT=5000
ENV MONGO_URI=mongodb+srv://yashkumarpatel11:L6ND87QXcdLOt1AZ@ecommerce-devops.frnt9eo.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce-devops
# Start the backend server
CMD ["node", "index.js"]