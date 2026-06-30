# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
COPY packages/ ./packages/

# Install all dependencies (including devDependencies for build)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the project
RUN yarn build

# Production stage
FROM node:20-slim AS runner

WORKDIR /app

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# If this had a server, I'd expose a port here, but it's an SDK.
# For now, I'll just set up a basic environment.
RUN yarn install --production --frozen-lockfile

CMD ["node"]
