# Deployment Guide

This guide covers deploying FlowGenie to various environments.

## 🚀 Quick Deployment

### Prerequisites

- Node.js 18+
- Flow CLI
- Docker (optional)
- OpenAI API key

### Environment Setup

1. **Clone and install**
   ```bash
   git clone https://github.com/your-username/flowgenie.git
   cd flowgenie
   npm install
   ```

2. **Configure environment variables**
   ```bash
   # Backend
   cp backend/env.example backend/.env
   # Edit backend/.env with production values
   
   # Frontend
   cp frontend/env.local.example frontend/.env.local
   # Edit frontend/.env.local with production values
   ```

## 🌐 Production Deployment

### Option 1: Traditional VPS/Cloud

#### Backend Deployment
```bash
# Build backend
cd backend
npm run build

# Start with PM2
npm install -g pm2
pm2 start dist/index.js --name flowgenie-backend

# Or with systemd
sudo systemctl enable flowgenie-backend
sudo systemctl start flowgenie-backend
```

#### Frontend Deployment
```bash
# Build frontend
cd frontend
npm run build

# Serve with nginx or serve static files
npm install -g serve
serve -s out -l 3000
```

### Option 2: Docker Deployment

#### Dockerfile (Backend)
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production

COPY backend/ ./
RUN npm run build

EXPOSE 3001
CMD ["npm", "start"]
```

#### Dockerfile (Frontend)
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

#### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
    volumes:
      - ./backend/.env:/app/.env

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
```

### Option 3: Platform-as-a-Service

#### Vercel (Frontend)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

#### Railway (Backend)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy backend
cd backend
railway login
railway deploy
```

## 🔧 Flow Blockchain Deployment

### Contract Deployment
```bash
# Configure Flow CLI
flow config

# Deploy to testnet
flow accounts create --key YOUR_PRIVATE_KEY
flow project deploy --network testnet

# Deploy to mainnet
flow project deploy --network mainnet
```

### Environment Configuration

#### Testnet
```env
FLOW_NETWORK=testnet
FLOW_ACCESS_NODE=https://rest-testnet.onflow.org
FLOW_DISCOVERY_WALLET=https://fcl-discovery.onflow.org/testnet/authn
```

#### Mainnet
```env
FLOW_NETWORK=mainnet
FLOW_ACCESS_NODE=https://rest-mainnet.onflow.org
FLOW_DISCOVERY_WALLET=https://fcl-discovery.onflow.org/mainnet/authn
```

## 🔒 Security Configuration

### Environment Variables
```env
# Production secrets
JWT_SECRET=your-super-secure-jwt-secret
OPENAI_API_KEY=your-openai-api-key

# Database (if using external DB)
DATABASE_URL=postgresql://user:password@host:port/database

# CORS
CORS_ORIGIN=https://yourdomain.com

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### SSL/TLS Setup
```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📊 Monitoring & Logging

### Health Checks
```bash
# Backend health check
curl http://localhost:3001/health

# Frontend health check
curl http://localhost:3000/api/health
```

### Log Management
```bash
# PM2 logs
pm2 logs flowgenie-backend

# System logs
journalctl -u flowgenie-backend -f
```

### Performance Monitoring
- **Application**: New Relic, DataDog, or similar
- **Infrastructure**: AWS CloudWatch, Google Cloud Monitoring
- **Flow Blockchain**: Flow Explorer, Flowscan

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          # Your deployment commands
```

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   lsof -ti:3001 | xargs kill -9
   ```

2. **Flow CLI not found**
   ```bash
   export PATH=$PATH:$HOME/.local/bin
   ```

3. **Environment variables not loading**
   - Ensure `.env` files are in correct locations
   - Check file permissions
   - Verify variable names match exactly

4. **Build failures**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Debug Mode
```bash
# Backend debug
DEBUG=* npm run dev

# Frontend debug
NODE_ENV=development npm run dev
```

## 📈 Scaling Considerations

### Backend Scaling
- Use load balancers (nginx, HAProxy)
- Implement Redis for session storage
- Consider horizontal scaling with PM2 cluster mode

### Frontend Scaling
- Use CDN for static assets
- Implement service worker for caching
- Consider Next.js static generation

### Database Scaling
- Use connection pooling
- Implement read replicas
- Consider database sharding for large datasets

## 🔄 Backup & Recovery

### Database Backups
```bash
# PostgreSQL
pg_dump flowgenie_db > backup.sql

# MongoDB
mongodump --db flowgenie_db --out backup/
```

### File System Backups
```bash
# Backup application files
tar -czf flowgenie-backup-$(date +%Y%m%d).tar.gz /path/to/app

# Backup configuration
cp -r config/ backups/config-$(date +%Y%m%d)/
```

---

For additional support, please refer to the [main README](README.md) or open an issue on GitHub.
