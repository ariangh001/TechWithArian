---
sidebar_position: 1
sidebar_label: 'Secure Coding'
---

# Secure Coding Practices

Writing secure code is the foundation of secure software. Follow these practices to reduce vulnerabilities.

## Input Validation

### Always Validate Input

Never trust user input. Validate and sanitize all inputs:

```javascript
// ❌ Bad: No validation
function processUserInput(input) {
  return eval(input); // Dangerous!
}

// ✅ Good: Validate and sanitize
function processUserInput(input) {
  if (typeof input !== 'string' || input.length > 100) {
    throw new Error('Invalid input');
  }
  // Sanitize and process safely
  return sanitize(input);
}
```

### Common Validation Rules

- **Type Checking**: Ensure correct data types
- **Length Limits**: Prevent buffer overflows
- **Format Validation**: Use regex or parsers for structured data
- **Whitelist Approach**: Allow only known good values

## Authentication & Authorization

### Strong Authentication

- Use strong password requirements
- Implement multi-factor authentication (MFA)
- Use secure password hashing (bcrypt, Argon2)
- Implement account lockout policies

### Proper Authorization

- Verify permissions for every action
- Use principle of least privilege
- Implement role-based access control (RBAC)
- Check authorization server-side, not client-side

## Secrets Management

### Never Commit Secrets

```bash
# ❌ Bad: Secrets in code
const API_KEY = "sk_live_1234567890";

# ✅ Good: Use environment variables
const API_KEY = process.env.API_KEY;

# ✅ Better: Use secrets management service
const API_KEY = await secretsManager.getSecret('api-key');
```

### Best Practices

- Use environment variables for local development
- Use secrets management services (AWS Secrets Manager, HashiCorp Vault)
- Rotate secrets regularly
- Never log secrets
- Use different secrets for different environments

## Error Handling

### Secure Error Messages

```javascript
// ❌ Bad: Exposes sensitive information
catch (error) {
  return `Database error: ${error.message}`; // May expose DB structure
}

// ✅ Good: Generic error messages
catch (error) {
  log.error('Database operation failed', error);
  return 'An error occurred. Please try again.';
}
```

### Logging Best Practices

- Log security events (authentication, authorization failures)
- Don't log sensitive data (passwords, tokens, PII)
- Use appropriate log levels
- Implement log rotation and retention policies

## SQL Injection Prevention

### Use Parameterized Queries

```javascript
// ❌ Bad: String concatenation
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ Good: Parameterized queries
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
```

### ORM Best Practices

- Use ORMs that prevent SQL injection
- Avoid raw SQL when possible
- Validate and sanitize inputs before database operations

## Cross-Site Scripting (XSS) Prevention

### Output Encoding

```javascript
// ❌ Bad: Direct HTML injection
document.innerHTML = userInput;

// ✅ Good: Use textContent or encoding
document.textContent = userInput;
// Or use a library that escapes HTML
document.innerHTML = escapeHtml(userInput);
```

### Content Security Policy (CSP)

Implement CSP headers to prevent XSS:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
```

## Dependency Security

### Regular Updates

- Keep dependencies up-to-date
- Use automated dependency scanning
- Review security advisories regularly

### Minimal Dependencies

- Only include necessary dependencies
- Review transitive dependencies
- Prefer well-maintained packages

## Code Review Checklist

- [ ] Input validation implemented
- [ ] Authentication and authorization checks present
- [ ] No hardcoded secrets
- [ ] Error handling doesn't expose sensitive info
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (output encoding)
- [ ] Dependencies are up-to-date
- [ ] Security logging implemented

## Next Steps

