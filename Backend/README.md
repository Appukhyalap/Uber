# User Registration Endpoint Documentation

## POST `/users/register`

Registers a new user in the system.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

#### **Field Requirements**
- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email.
- `password` (string, required): Minimum 6 characters.

---

### **Responses**

| Status Code | Description                                 | Example Response Body                                  |
|-------------|---------------------------------------------|--------------------------------------------------------|
| 201         | User registered successfully                | `{ "message": "User registered successfully", "user": { ... }, "token": "..." }` |
| 400         | Validation error (invalid/missing fields)   | `{ "errors": [ ... ] }`                                |
| 409         | Email already registered                    | `{ "message": "Email already registered" }`            |
| 500         | Server error                                | `{ "message": "Internal server error" }` (if handled)  |

---

### **Example Request**

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "johndoe@example.com",
    "password": "yourpassword"
  }'
```

---

### **Notes**
- All required fields must be present and valid.
- On success, a JWT token is returned for authentication.
- Uses `express-validator` for input validation.

---

# User Login Endpoint Documentation

## POST `/users/login`

Authenticates a user and returns a JWT token.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

#### **Field Requirements**
- `email` (string, required): Must be a valid email.
- `password` (string, required): Minimum 6 characters.

---

### **Responses**

| Status Code | Description                                 | Example Response Body                                  |
|-------------|---------------------------------------------|--------------------------------------------------------|
| 200         | Login successful                            | `{ "token": "...", "user": { ... } }`                  |
| 400         | Validation error (invalid/missing fields)   | `{ "errors": [ ... ] }`                                |
| 401         | Invalid email or password                   | `{ "message": "invalid email or password" }`           |
| 500         | Server error                                | `{ "message": "Internal server error" }` (if handled)  |

---

### **Example Request**

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "johndoe@example.com",
    "password": "yourpassword"
  }'
```

---

### **Notes**
- Both fields are required and validated.
- On success, a JWT token and user object are returned.
- Uses `express-validator