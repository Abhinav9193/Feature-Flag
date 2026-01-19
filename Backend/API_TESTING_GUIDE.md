# API Testing Guide & Documentation

This guide provides step-by-step instructions to test the Feature Flag Backend System. It includes a complete list of available APIs, example data, and `curl` commands that you can copy and paste directly into your terminal.

## 🛠️ Prerequisites

1.  **Ensure MySQL is running** and the database `feature_flags_dev` exists.
2.  **Start the Application**:
    ```bash
    mvn spring-boot:run
    ```
3.  The application will be running at `http://localhost:8080`.

---

## 📋 1. Health Check
Verify the system is running.

- **Method**: `GET`
- **URL**: `/api/v1/health`

### Test Command
```bash
curl -X GET http://localhost:8080/api/v1/health
```

### Expected Response
```text
Feature Flag System is Up and Running!
```

---

## 🔐 2. Admin APIs (Manage Flags)

### A. Create a New Feature Flag
Create a new feature flag in the system.

- **Method**: `POST`
- **URL**: `/api/flags`
- **Body**:
  ```json
  {
    "key": "USER_PROFILE_V2",
    "description": "New user profile page design",
    "enabled": false
  }
  ```

### Test Command
```bash
curl -X POST http://localhost:8080/api/flags \
  -H "Content-Type: application/json" \
  -d '{"key": "user_profile_v2", "description": "New user profile page design", "enabled": false}'
```
*(Note: Small case key `user_profile_v2` will automatically be converted to `USER_PROFILE_V2`)*

### Expected Response (201 Created)
```json
{
  "id": 1,
  "key": "USER_PROFILE_V2",
  "description": "New user profile page design",
  "enabled": false,
  "updatedAt": "2024-03-20T10:00:00"
}
```

---

### B. Get All Feature Flags
Retrieve a list of ALL flags (both enabled and disabled).

- **Method**: `GET`
- **URL**: `/api/flags`

### Test Command
```bash
curl -X GET http://localhost:8080/api/flags
```

### Expected Response (200 OK)
```json
[
  {
    "id": 1,
    "key": "NEW_DASHBOARD",
    "description": "Enable the new dashboard layout",
    "enabled": false,
    "updatedAt": "..."
  },
  {
    "id": 2,
    "key": "DARK_MODE",
    "description": "Enable dark mode theme",
    "enabled": true,
    "updatedAt": "..."
  },
  ...
]
```

---

### C. Toggle a Feature Flag
Enable or disable a specific flag.

- **Method**: `PATCH`
- **URL**: `/api/flags/{key}`
- **Body**: `{ "enabled": boolean }`

### Test Command (Enable the 'NEW_DASHBOARD' flag)
```bash
curl -X PATCH http://localhost:8080/api/flags/NEW_DASHBOARD \
  -H "Content-Type: application/json" \
  -d '{"enabled": true}'
```

### Expected Response (200 OK)
```json
{
  "id": 1,
  "key": "NEW_DASHBOARD",
  "description": "Enable the new dashboard layout",
  "enabled": true,
  "updatedAt": "..."
}
```

---

## 🌍 3. Public APIs (Client Consumption)

### Get Active Flags
Retrieve ONLY the flags that are currently `enabled`. This endpoint is cached for performance.

- **Method**: `GET`
- **URL**: `/api/public/flags`

### Test Command
```bash
curl -X GET http://localhost:8080/api/public/flags
```

### Expected Response
Returns only flags where `enabled: true`.

```json
[
  {
    "id": 2,
    "key": "DARK_MODE",
    "description": "Enable dark mode theme",
    "enabled": true,
    "updatedAt": "..."
  },
  {
    "id": 1,
    "key": "NEW_DASHBOARD",
    "description": "Enable the new dashboard layout",
    "enabled": true,
    "updatedAt": "..."
  }
]
```

---

## ⚠️ 4. Testing Error Cases

### Case: Create Duplicate Flag
Try to create a flag that already exists (e.g., `DARK_MODE`).

```bash
curl -X POST http://localhost:8080/api/flags \
  -H "Content-Type: application/json" \
  -d '{"key": "DARK_MODE", "description": "Duplicate", "enabled": true}'
```
**Response**: `400 Bad Request` with message "Feature flag with key 'DARK_MODE' already exists".

### Case: Toggle Non-Existent Flag
Try to toggle a flag that doesn't exist.

```bash
curl -X PATCH http://localhost:8080/api/flags/FAKE_KEY \
  -H "Content-Type: application/json" \
  -d '{"enabled": true}'
```
**Response**: `404 Not Found` with message "Feature flag not found with key: FAKE_KEY".
