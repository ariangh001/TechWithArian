---
sidebar_position: 1
sidebar_label: 'Race Condition'
---

# Race Condition Vulnerabilities

Race conditions occur when multiple processes or threads access and modify shared resources concurrently, leading to unpredictable behavior and security vulnerabilities.

## Understanding Race Conditions

A race condition is a flaw where the output depends on the sequence or timing of uncontrollable events. In security contexts, race conditions can lead to:

- **Time-of-check to time-of-use (TOCTOU) vulnerabilities**
- **Resource exhaustion**
- **Authentication bypass**
- **Privilege escalation**

## Common Scenarios

### File System Race Conditions

Multiple processes accessing the same file can create security vulnerabilities:

```python
# ❌ Bad: TOCTOU vulnerability
import os

def unsafe_file_access(filename):
    if os.path.exists(filename):  # Check
        # Between check and use, file could be replaced!
        with open(filename, 'r') as f:  # Use
            return f.read()
```

```python
# ✅ Good: Use atomic operations
import os

def safe_file_access(filename):
    try:
        with open(filename, 'r') as f:
            return f.read()
    except FileNotFoundError:
        return None
```

### Authentication Race Conditions

Race conditions in authentication can allow unauthorized access:

```javascript
// ❌ Bad: Race condition in session creation
let sessionCounter = 0;

function createSession(userId) {
    sessionCounter++; // Not atomic!
    const sessionId = `${userId}-${sessionCounter}`;
    sessions[sessionId] = { userId, createdAt: Date.now() };
    return sessionId;
}
```

```javascript
// ✅ Good: Use atomic operations or locks
import { randomBytes } from 'crypto';

function createSession(userId) {
    const sessionId = randomBytes(32).toString('hex'); // Cryptographically secure
    sessions[sessionId] = { userId, createdAt: Date.now() };
    return sessionId;
}
```

### Database Race Conditions

Concurrent database operations can lead to inconsistent state:

```sql
-- ❌ Bad: Race condition in balance update
-- Process 1 and Process 2 both read balance = 100
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
-- Both processes subtract 50, final balance might be incorrect
```

```sql
-- ✅ Good: Use transactions with proper locking
BEGIN TRANSACTION;
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
COMMIT;
```

## Prevention Strategies

### 1. Use Atomic Operations

Prefer atomic operations that complete in a single step:

- File operations: Use `open()` with proper flags instead of `exists()` + `open()`
- Database: Use transactions with appropriate isolation levels
- Memory: Use atomic primitives or locks

### 2. Implement Proper Locking

Use locks to serialize access to shared resources:

```python
import threading

# ✅ Good: Use locks
lock = threading.Lock()

def safe_shared_resource_access():
    with lock:
        # Critical section - only one thread at a time
        modify_shared_resource()
```

### 3. Use Thread-Safe Data Structures

Choose thread-safe implementations:

```python
# ❌ Bad: Regular dictionary (not thread-safe)
shared_dict = {}

# ✅ Good: Thread-safe dictionary
from collections.abc import MutableMapping
import threading

class ThreadSafeDict(MutableMapping):
    def __init__(self):
        self._dict = {}
        self._lock = threading.RLock()
    
    def __getitem__(self, key):
        with self._lock:
            return self._dict[key]
    
    def __setitem__(self, key, value):
        with self._lock:
            self._dict[key] = value
    
    def __delitem__(self, key):
        with self._lock:
            del self._dict[key]
    
    def __iter__(self):
        with self._lock:
            return iter(self._dict)
    
    def __len__(self):
        with self._lock:
            return len(self._dict)
```

### 4. Validate After Operations

For file operations, validate permissions and file properties after opening:

```python
# ✅ Good: Validate after opening
import os
import stat

def safe_file_read(filename):
    try:
        with open(filename, 'r') as f:
            # Verify file is a regular file, not a symlink
            file_stat = os.fstat(f.fileno())
            if stat.S_ISLNK(file_stat.st_mode):
                raise ValueError("Symlinks not allowed")
            
            # Verify permissions
            if file_stat.st_mode & stat.S_IROTH:
                raise ValueError("File is world-readable")
            
            return f.read()
    except FileNotFoundError:
        return None
```

### 5. Use Database Transactions

Always use transactions for multi-step database operations:

```javascript
// ✅ Good: Database transaction
async function transferFunds(fromAccount, toAccount, amount) {
    const transaction = await db.beginTransaction();
    try {
        await db.query(
            'UPDATE accounts SET balance = balance - ? WHERE id = ?',
            [amount, fromAccount],
            { transaction }
        );
        await db.query(
            'UPDATE accounts SET balance = balance + ? WHERE id = ?',
            [amount, toAccount],
            { transaction }
        );
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}
```

## Testing for Race Conditions

### Stress Testing

Create multiple concurrent requests to identify race conditions:

```python
import concurrent.futures
import threading

def test_race_condition():
    results = []
    lock = threading.Lock()
    
    def worker():
        result = your_function_under_test()
        with lock:
            results.append(result)
    
    # Run many concurrent threads
    with concurrent.futures.ThreadPoolExecutor(max_workers=100) as executor:
        futures = [executor.submit(worker) for _ in range(1000)]
        concurrent.futures.wait(futures)
    
    # Verify consistency
    assert len(set(results)) == 1, "Race condition detected!"
```

### Code Review Checklist

- [ ] Are file operations using atomic operations?
- [ ] Are shared resources protected with locks?
- [ ] Are database operations wrapped in transactions?
- [ ] Are counter/session ID generation using secure random methods?
- [ ] Are concurrent operations tested with stress tests?

## Real-World Examples

### Example 1: Temporary File Race Condition

**Vulnerability:** Creating temporary files with predictable names allows attackers to create the file first.

```python
# ❌ Bad
import tempfile
filename = f"/tmp/temp_{os.getpid()}.tmp"  # Predictable!
with open(filename, 'w') as f:
    f.write(data)
```

```python
# ✅ Good
import tempfile
fd, filename = tempfile.mkstemp(suffix='.tmp', prefix='secure_')
try:
    with os.fdopen(fd, 'w') as f:
        f.write(data)
finally:
    os.unlink(filename)
```

### Example 2: Session Fixation

**Vulnerability:** Session IDs generated sequentially can be predicted.

```javascript
// ❌ Bad
let sessionId = 0;
function generateSessionId() {
    return `session-${++sessionId}`;
}
```

```javascript
// ✅ Good
import crypto from 'crypto';
function generateSessionId() {
    return crypto.randomBytes(32).toString('hex');
}
```

## Summary

Race conditions are subtle but dangerous vulnerabilities. Always:

1. **Use atomic operations** when possible
2. **Implement proper locking** for shared resources
3. **Use transactions** for database operations
4. **Validate after operations** for file access
5. **Test with concurrent requests** to identify issues
6. **Review code** for time-of-check to time-of-use patterns

Remember: If multiple processes or threads can access a resource, you need to protect it!

