# Notes Full Stack

## Setup

1. **Start a MongoDB server:** If you have Docker installed, you can run:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

2. **Configure Environment Variables:** In the `/backend` directory, copy `.env.example` to `.env` to configure the necessary environment variables to run the backend server.
3. **Install and run:** to

```bash
# Install dependencies for both frontend and backend, seed the database, and start the development servers
npm install
npm run install:all

# Seed the database with initial data and start both frontend and backend servers
cd backend && npm run seed

# Start both frontend and backend servers
cd ../ && npm run dev
```
