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
- Uses `express-validator` for