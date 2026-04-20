# 🚀 LMS Project Setup Guide

Welcome to the development guide for the LMS Project. This project is a microservices-based monorepo managed by **Turborepo**.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: Version 18 or higher.
- **PostgreSQL**: You will need to create two separate databases (or use two different ports/instances).
- **npm**: Included with Node.js.

## 🛠️ Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repository-url>
cd lms

# Install all dependencies from the root
npm install
```

## 🔐 Step 2: Environment Configuration

You must set up `.env` files for each backend service. Create the following files in their respective directories:

### Auth Service (`apps/auth-service/.env`)
```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5435
DB_USERNAME=authuser
DB_PASSWORD=authpassword
DB_NAME=authdb
DB_SYNCHRONIZE=true

JWT_SECRET=your_jwt_secret
REFRESH_JWT_SECRET=your_refresh_secret
```

### LMS Service (`apps/lms-service/.env`)
```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5436
DB_USERNAME=lmsuser
DB_PASSWORD=lmspassword
DB_NAME=lmsdb
DB_SYNCHRONIZE=true

# External Services
BUNNY_STREAM_LIBRARY_ID=your_id
BUNNY_STREAM_API_KEY=your_key
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_id
AWS_SECRET_ACCESS_KEY=your_aws_key
AWS_S3_BUCKET=your_bucket
```

## 🚗 Step 3: Running the Project

Start all microservices and front-end applications concurrently using the development script:

```bash
npm run dev
```

## 📡 Service Architecture & Ports

Once the development server is running, the system will be accessible at following locations:

| Component | Port | Description |
| :--- | :--- | :--- |
| **API Gateway** | `3000` | Entry point for all frontend requests. |
| **Auth Service** | `3001` | Handles user authentication and identity. |
| **LMS Service** | `3002` | Core Learning Management logic. |
| **Admin Panel** | `1575` | Back-office management dashboard. |
| **Teacher Panel** | `5174` | Course creation and student management. |
| **Student App** | `5173` | Course consumption and progress tracking. |

## 💡 Important Notes

- **Database Separation**: In development, we use ports `5435` and `5436` to avoid database conflicts between the Auth and LMS services.
- **API Requests**: All front-end applications are configured to communicate with the **API Gateway (Port 3000)**. The Gateway handles session verification and routes traffic to the appropriate service.
- **Shared Code**: Logic common to multiple services is located in `packages/shared-dto`.
