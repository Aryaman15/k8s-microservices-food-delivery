# Food Delivery Microservices on Kubernetes

##  🚧 Project Status

The project is currently being upgraded. Some parts may not work as described here. Please check back for updates.

---

This repository demonstrates a fully functional microservices-based food delivery application built using Node.js, Express, and MongoDB. The services are containerized using Docker and orchestrated with Kubernetes. The project comprises several independent microservices along with a frontend aggregator for unified access, providing a realistic example of a production–grade microservices architecture.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Services](#services)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Deployment](#setup--deployment)
  - [Local Deployment with Docker Compose](#local-deployment-with-docker-compose)
  - [Kubernetes Deployment](#kubernetes-deployment)
- [Configuration](#configuration)
- [Testing & Verification](#testing--verification)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project implements a food delivery application using microservices architecture. Each service runs as an independent Docker container and is deployed on Kubernetes. The application’s primary components include the user, restaurant, order, and delivery microservices, with their respective MongoDB databases deployed inside the cluster. A frontend aggregator is provided (using EJS) to integrate the overall system into a single interface.

---

## Architecture

- **Microservices**:
  - **User Service** – Handles user registration, login, and user management.
  - **Restaurant Service** – Manages restaurant details, menus, and related operations.
  - **Order Service** – Responsible for order placement, tracking, and management.
  - **Delivery Service** – Oversees delivery assignment and tracking.
- **Databases**: Each service has its dedicated MongoDB instance running as a separate pod and exposed via a ClusterIP Service (e.g., user-db, restaurant-db, order-db, and delivery-db).
- **Frontend Aggregator**: A simple EJS-based aggregator provides a unified dashboard to interact with the microservices.
- **Deployment & Orchestration**: Docker images are pushed to Docker Hub (using the Docker Hub username, for example, `nsvpavan`) and Kubernetes YAML manifests from the `k8s` directory deploy and manage the microservices.

---

## Services

- **user-service**: Exposes RESTful APIs for user registration, authentication, and profile management.
- **restaurant-service**: Provides APIs for managing restaurant data, menus, and details.
- **order-service**: Handles order creation, updates, and status tracking; also communicates with user and restaurant services.
- **delivery-service**: Manages delivery assignments, tracking, and updates.

---

## Project Structure

```
food-delivery-app/
├── backend/
│   ├── user-service/
│   ├── restaurant-service/
│   ├── order-service/
│   └── delivery-service/
├── frontend-aggregator/
│   └── (EJS-based aggregator files)
├── k8s/
│   ├── namespace.yaml
│   ├── user-service-deployment.yaml
│   ├── user-service-service.yaml
│   ├── restaurant-service-deployment.yaml
│   ├── restaurant-service-service.yaml
│   ├── order-service-deployment.yaml
│   ├── order-service-service.yaml
│   ├── delivery-service-deployment.yaml
│   ├── delivery-service-service.yaml
│   ├── user-db-deployment.yaml
│   ├── user-db-service.yaml
│   ├── restaurant-db-deployment.yaml
│   ├── restaurant-db-service.yaml
│   ├── order-db-deployment.yaml
│   ├── order-db-service.yaml
│   ├── delivery-db-deployment.yaml
│   └── delivery-db-service.yaml
├── docker-compose.yml
└── README.md
```

---

## Prerequisites

- **Docker** installed on your machine.
- **Kubernetes cluster** (e.g., Minikube or any other local/remote cluster).
- **kubectl** configured to communicate with your cluster.
- Docker Hub account with images pushed using the username (e.g., `nsvpavan`).

---

## Setup & Deployment

### Local Deployment with Docker Compose

For running the entire stack locally using Docker Compose, use the provided `docker-compose.yml` file. This is useful for development and quick testing.

```bash
docker-compose up --build
```

### Kubernetes Deployment

1. **Start your Kubernetes Cluster**  
   For example, using Minikube:

   ```bash
   minikube start --driver=docker
   ```

2. **Set Up the Namespace**  
   Apply the namespace manifest:

   ```bash
   kubectl apply -f k8s/namespace.yaml
   ```

3. **Deploy Microservice Databases**  
   Apply the YAML files for each database:

   ```bash
   kubectl apply -f k8s/user-db-deployment.yaml
   kubectl apply -f k8s/user-db-service.yaml
   kubectl apply -f k8s/restaurant-db-deployment.yaml
   kubectl apply -f k8s/restaurant-db-service.yaml
   kubectl apply -f k8s/order-db-deployment.yaml
   kubectl apply -f k8s/order-db-service.yaml
   kubectl apply -f k8s/delivery-db-deployment.yaml
   kubectl apply -f k8s/delivery-db-service.yaml
   ```

4. **Deploy Microservices**  
   Then, deploy each microservice:

   ```bash
   kubectl apply -f k8s/user-service-deployment.yaml
   kubectl apply -f k8s/user-service-service.yaml
   kubectl apply -f k8s/restaurant-service-deployment.yaml
   kubectl apply -f k8s/restaurant-service-service.yaml
   kubectl apply -f k8s/order-service-deployment.yaml
   kubectl apply -f k8s/order-service-service.yaml
   kubectl apply -f k8s/delivery-service-deployment.yaml
   kubectl apply -f k8s/delivery-service-service.yaml
   ```

5. **Verify Deployments**  
   Check that all pods are running:

   ```bash
   kubectl get pods -n fooddelivery
   kubectl get deployments -n fooddelivery
   ```

6. **Test Endpoints**  
   Use port-forwarding for local testing:

   ```bash
   kubectl port-forward svc/user-service 3001:3001 -n fooddelivery
   ```

   Then test via curl:

   ```bash
   curl http://localhost:3001/health
   ```

---

## Configuration

- **Environment Variables**:  
  Each microservice expects a `MONGODB_URI` variable pointing to its respective in-cluster database service (e.g., `mongodb://user-db:27017/users` for the user service).

- **Init Containers**:  
  Optionally, init containers in the deployments wait for the databases to become available before starting the application containers.

- **Image Tagging**:  
  Docker images are tagged and pushed to Docker Hub (e.g., `nsvpavan/backend-user-service:latest`). Make sure your deployment YAMLs reference these images.

---

## Testing & Verification

- **Verify Pod Status**:

  ```bash
  kubectl get pods -n fooddelivery
  ```

- **Check Logs for Issues**:

  ```bash
  kubectl logs <pod-name> -n fooddelivery
  ```

- **Service Connectivity**:  
  Use a temporary pod (via busybox) to test service DNS resolution:

  ```bash
  kubectl run -it --rm --restart=Never busybox --image=busybox -n fooddelivery -- sh
  ```

  Inside the pod:

  ```bash
  wget -qO- http://user-db:27017
  ```

- **API Testing**:  
  Use curl or Postman to test the exposed endpoints as necessary.

---

## Troubleshooting

- **Database Connection Timeouts**:  
  Ensure that the environment variables in the deployments point to the correct service names (e.g., `user-db` and not `user_db`).

- **Deployment Updates**:  
  If changes are not reflected, use `kubectl edit` or `kubectl patch` commands to ensure the correct environment variables are in place.

- **Pod Logs**:  
  Check logs for errors or connection issues:

  ```bash
  kubectl logs <pod-name> -n fooddelivery
  ```

---

## Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
