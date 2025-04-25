# Medical API v2

Kadinle API v2 is a scalable and modular backend API built with **TypeScript**, **Express**, and **TypeORM**. It provides robust features for managing roles, permissions, authentication, and more. This project is designed to be production-ready and follows best practices for modern backend development.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [License](#license)

---

## Features

- **Role-Based Access Control (RBAC)**: Manage roles and permissions dynamically.
- **Authentication**: Secure authentication using JWT.
- **Validation**: Input validation with `express-validator`.
- **Database Integration**: PostgreSQL support with TypeORM.
- **File Uploads**: Handle file uploads using `multer`.
- **Caching**: In-memory caching with `node-cache`.
- **Logging**: Advanced logging with `winston` and daily rotate files.
- **Testing**: Unit and integration tests with `jest` and `supertest`.

---

## Tech Stack

- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT
- **Caching**: Redis (optional)
- **Testing**: Jest, Supertest

---

## Installation

### Prerequisites

- **Node.js**: Version 20 or higher
- **PostgreSQL**: Installed and running
- **Redis** (optional): For caching

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/tahashabaan/medical-laboratory.git
   cd medical-laboratory
