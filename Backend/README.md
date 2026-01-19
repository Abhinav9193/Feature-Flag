# Feature Flag & Remote Configuration System

This is a Spring Boot 3.x backend application designed to manage feature flags and remote configuration. It provides a robust system for toggling features on/off dynamically without redeploying code, suitable for both internal admin management and public client consumption.

## 🚀 Technology Stack

- **Java**: 17
- **Framework**: Spring Boot 3.2.1
- **Database**: MySQL
- **ORM**: Spring Data JPA
- **Caching**: Spring Cache (In-Memory / ConcurrentMap)
- **Tooling**: Maven, Lombok

## 🏗 Architecture & Design

The project follows a **Clean Layered Architecture**:

- **Controller Layer**: Handles HTTP requests and delegates to services.
- **Service Layer**: Contains business logic, validation, and transaction management.
- **Repository Layer**: Manages database interactions using Spring Data JPA.
- **DTOs**: Ensures separation between internal entities and external API contracts.
- **Global Exception Handling**: Centralized error management for consistent API responses.

## ✨ Features Implemented

### 1. Core Feature Flag Management
- **CRUD Operations**: Create, Read, and Toggle feature flags.
- **Data Integrity**: Enforces unique, uppercase keys for all flags.
- **Auditing**: Automatic handling of `createdAt` and `updatedAt` timestamps.

### 2. Performance (Caching)
- **High Performance**: Active flags are cached in memory (`active_flags`).
- **Cache Eviction**: Smart cache invalidation occurs automatically when flags are created or toggled to ensure data consistency.

### 3. Error Handling
- **Custom Exceptions**: Specific exceptions for `ResourceNotFound` and `FeatureFlag` domain errors.
- **Standardized Responses**: All errors return a consistent JSON structure with timestamp, message, status, and path.

### 4. Application Configuration
- **Profiles**: Separate configurations for `dev` (Local) and `prod` (Production).
- **Format**: All configuration is managed via standard `.properties` files.

### 5. Automated Data Seeding
- **Dev Mode**: Automatically populates the database with sample flags (`NEW_DASHBOARD`, `BETA_CHAT`, `DARK_MODE`) when running in the `dev` profile.

## 🔌 API Endpoints

### Admin Endpoints (`/api/flags`)
| Method | Endpoint | Description | Payload |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/flags` | Create a new flag | `{ "key": "...", "description": "...", "enabled": true }` |
| `GET` | `/api/flags` | Get all flags | - |
| `PATCH` | `/api/flags/{key}` | Toggle a flag | `{ "enabled": false }` |

### Public Endpoints (`/api/public/flags`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/public/flags` | Get only **active** flags (Cached) |

## 📂 Project Structure

```text
src/main/java/com/featureflags/
├── config/             # CacheConfig, DataInitializer
├── controller/         # FeatureFlagController, PublicFlagController
├── dto/                # Request/Response objects
├── entity/             # FeatureFlag (JPA Entity)
├── exception/          # GlobalExceptionHandler, Custom Exceptions
├── repository/         # FeatureFlagRepository
├── service/            # FeatureFlagService
└── FeatureFlagApplication.java
```

## ⚙️ Setup & Running

1. **Database Setup**:
   Ensure MySQL is running on port `3306`.
   Create a database named `feature_flags_dev`.
   *(Credentials found in `application-dev.properties`)*

2. **Build**:
   ```bash
   mvn clean install
   ```

3. **Run**:
   ```bash
   mvn spring-boot:run
   ```
   *The application will start on port `8080` with the `dev` profile active by default.*

## 📜 History of Changes

1. **Project Init**: Initialized Spring Boot app with Maven.
2. **Database**: Configured MySQL and JPA entities.
3. **API Logic**: Built Service and Controller layers with DTOs.
4. **Resiliency**: Implemented Global Exception Handling.
5. **Optimization**: Added Spring Caching logic.
6. **Data**: Added `DataInitializer` for seed data.
7. **Refactor**: Converted all `YAML` configuration files to `.properties`.
