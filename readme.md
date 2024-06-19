# Microservices for Authentication and Posting

This repository is an extension of the previous project, where a social posting app was created. In this repository, we have extracted two core modules: Authentication and Posting, and transformed them into microservices. These microservices communicate with each other to provide a seamless experience.

## Project Structure

- **Authentication Service**
  - Connects to MongoDB for managing user data.
  - Handles user registration, login, and authentication.

- **Post Service**
  - Connects to MySQL for managing posts.
  - Handles creating, reading, updating, and deleting posts.

## Technologies Used

- **MongoDB**: Database for storing user data.
- **MySQL**: Database for storing post data.
- **Prisma**: ORM for database connectivity.
- **Docker**: Containerization of both microservices.

## Getting Started

### Prerequisites

- Docker installed on your machine.
- MongoDB and MySQL databases set up (can also be done using Docker).

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ayeshawaheed329/Social-Posting-Microservices.git
    cd your-repo
    ```

2. **Environment Variables:**

    Create a `.env` file in both the `auth-service` and `post-service` directories and add the necessary environment variables:

    For `auth-service`:

    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

    For `post-service`:

    ```env
    MYSQL_HOST=your_mysql_host
    MYSQL_USER=your_mysql_user
    MYSQL_PASSWORD=your_mysql_password
    MYSQL_DATABASE=your_mysql_database
    ```

3. **Run Docker Compose:**

    ```bash
    docker-compose up --build
    ```

    This command will build and start both microservices in Docker containers.

### Communication Between Services

The services communicate via HTTP requests, with the Authentication service issuing JWT tokens that the Post service can validate.

## Docker

### Build and Run Services Individually

1. **Authentication Service:**

    ```bash
    cd Auth-Service
    docker build -t Auth-Service .
    docker run -d -p 5000:5000 --env-file .env Auth-Service
    ```

2. **Post Service:**

    ```bash
    cd Post-Service
    docker build -t Post-Service .
    docker run -d -p 5001:5001 --env-file .env Post-Service
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or enhancements.

---
