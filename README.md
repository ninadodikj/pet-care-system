# Pet Care System

Pet Care System is a web application for managing pets and veterinary appointments.

The application provides two types of users:

* **Owner** – can register, add and manage their pets, and book veterinary appointments for their pets.
* **Veterinarian** – can view scheduled appointments and mark appointments as finished.

## Technologies

### Backend

* Java 21
* Spring Boot
* Spring Security
* JWT Authentication
* PostgreSQL
* Flyway
* Maven

### Frontend

* React
* TypeScript
* Vite
* Axios
* React Router
* Nginx

### DevOps

* Docker
* Docker Compose
* Kubernetes
* GitHub Actions
* Docker Hub
* Render

---

## Project Structure

```text
pet-care-system/
│
├── backend/                 # Spring Boot application
├── frontend/                # React application
├── k8s/                     # Kubernetes manifests
├── .github/
│   └── workflows/           # GitHub Actions workflow
└── docker-compose.yaml      # Docker Compose configuration
```

## Docker

The application is fully containerized using Docker.

Docker Compose is used to run the complete application consisting of three services:

1. **PostgreSQL database**
2. **Spring Boot backend**
3. **React frontend**

Each application component has its own Docker configuration, while Docker Compose is used to run the complete system together.

## Environment Variables

Sensitive configuration is provided through environment variables instead of being hardcoded in the application.

The main variables are:

```text
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
JWT_SECRET_KEY
```

The `.env` file is not committed to the repository.

### Running with Docker Compose

From the project root:

```bash
docker compose up --build
```

This starts the frontend, backend and PostgreSQL containers.

The application is available on:

```text
Frontend:  http://localhost:5173
Backend:   http://localhost:8080
Database:  localhost:5434
```

PostgreSQL data is stored in a Docker volume so that the database remains persistent when containers are recreated.


## Kubernetes

The project contains Kubernetes manifests located in the `k8s/` directory.

The application is deployed in a dedicated Kubernetes namespace:

```text
petcare
```

The Kubernetes configuration contains:

* **Deployments** for the frontend and backend
* **Services** for internal communication
* **StatefulSet** for PostgreSQL
* **PersistentVolumeClaim** for database persistence
* **ConfigMaps** for application configuration
* **Secrets** for sensitive information
* **Ingress** for external routing

PostgreSQL is deployed as a StatefulSet because the database requires persistent storage.

The frontend and backend are deployed as separate Kubernetes workloads, allowing them to be managed independently.

### Ingress

The project uses **Traefik** as the Ingress controller.

The Ingress routes requests based on the `pet-care.local` host:

```text
pet-care.local/       → Frontend Service
pet-care.local/api    → Backend Service
```

This allows the frontend and backend to be accessed through the same host while Kubernetes routes the requests to the appropriate service.

The Kubernetes resources can be deployed with:

```bash
kubectl apply -f k8s/
```

The status of the deployed pods can be checked with:

```bash
kubectl get pods -n petcare
```

## CI/CD

The project uses **GitHub Actions** to automate the CI/CD process.

The workflow is located in:

```text
.github/workflows/ci-cd.yml
```

The pipeline is triggered when changes are pushed to the `main` branch.

### Continuous Integration

The CI part verifies that the application can be built successfully.

It includes:

1. Checking out the source code
2. Setting up Java 21
3. Starting PostgreSQL for backend tests
4. Running backend tests
5. Setting up Node.js
6. Installing frontend dependencies
7. Building the React frontend

This ensures that changes are tested before Docker images are published.

### Docker Image Publishing

After the CI steps complete successfully, GitHub Actions builds Docker images for the backend and frontend.

The images are then pushed to **Docker Hub**, where they can be used for deployment.

The Docker Hub credentials are stored securely as GitHub Secrets.

The process is:

```text
GitHub Push
     ↓
GitHub Actions
     ↓
Backend Tests
     ↓
Frontend Build
     ↓
Build Docker Images
     ↓
Push Images to Docker Hub
```

### Continuous Deployment

After the Docker images are successfully published, the pipeline triggers the deployment process through **Render**.

This allows the application to be automatically redeployed after a successful CI pipeline.

The complete workflow is:

```text
Developer
   ↓
Push to main
   ↓
GitHub Actions
   ↓
Test & Build
   ↓
Docker Images
   ↓
Docker Hub
   ↓
Render Deployment
```

# Secrets and Configuration

Sensitive values are not stored directly in the repository.

The project uses:

* Docker environment variables
* Kubernetes Secrets
* GitHub Actions Secrets
* Render environment variables

Examples of sensitive configuration include:

```text
POSTGRES_PASSWORD
JWT_SECRET_KEY
DOCKERHUB_TOKEN
```

This keeps credentials and other sensitive configuration outside of the source code.

## Application Architecture

The main application architecture consists of three components:

```text
                ┌───────────────┐
                │    Frontend   │
                │ React + Nginx │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │    Backend    │
                │  Spring Boot  │
                │   REST API    │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │  PostgreSQL   │
                │    Database   │
                └───────────────┘
```

The same architecture is supported in the containerized environment, while Kubernetes provides orchestration, service discovery, persistent storage and external routing.

## Summary

The project demonstrates a complete containerized application with automated development and deployment processes. Docker and Docker Compose are used for containerization and local orchestration, Kubernetes is used for container orchestration, and GitHub Actions automates testing, Docker image creation, publishing and deployment.







