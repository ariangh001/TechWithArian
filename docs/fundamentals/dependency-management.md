---
sidebar_position: 2
sidebar_label: 'Dependency Management'
---

# Dependency Management

Effective dependency management is crucial for maintaining secure open source software.

## Understanding Dependencies

### Direct vs Transitive Dependencies

- **Direct Dependencies**: Packages you explicitly install
- **Transitive Dependencies**: Dependencies of your dependencies

Both can introduce vulnerabilities, but transitive dependencies are often overlooked.

## Best Practices

### 1. Keep Dependencies Up-to-Date

Regularly update your dependencies to receive security patches:

```bash
# Check for outdated packages
npm outdated
pip list --outdated

# Update dependencies
npm update
pip install --upgrade package-name
```

### 2. Use Dependency Lock Files

Lock files ensure consistent installations:

- **package-lock.json** (Node.js)
- **requirements.txt** with pinned versions (Python)
- **Gemfile.lock** (Ruby)
- **Cargo.lock** (Rust)

### 3. Minimize Dependencies

Reduce your attack surface:

- Only include necessary dependencies
- Review and remove unused packages regularly
- Consider lighter alternatives

### 4. Verify Package Integrity

- Use checksums to verify package integrity
- Prefer packages from official registries
- Review package maintainers and popularity

## Dependency Scanning

### Automated Scanning Tools

Integrate scanning into your CI/CD pipeline:

- **Snyk**: Comprehensive vulnerability scanning
- **OWASP Dependency-Check**: Open source dependency scanner
- **GitHub Dependabot**: Automated dependency updates
- **WhiteSource**: Enterprise dependency management

### Manual Review Process

1. **Review Release Notes**: Understand changes in updates
2. **Check Security Advisories**: Review CVE databases
3. **Assess Maintainer Activity**: Active projects are more secure
4. **Review License Compatibility**: Ensure license compliance

## Handling Vulnerabilities

### When a Vulnerability is Found

1. **Assess Severity**: Use CVSS scores and impact analysis
2. **Check for Updates**: Look for patched versions
3. **Evaluate Workarounds**: Temporary mitigations if update isn't possible
4. **Plan Remediation**: Schedule and execute fixes
5. **Document Decisions**: Record why certain actions were taken

### Vulnerability Prioritization

- **Critical**: Immediate action required
- **High**: Address within days
- **Medium**: Address within weeks
- **Low**: Address in next release cycle

## Dependency Management Tools

### Package Managers

- **npm/yarn** (Node.js)
- **pip/poetry** (Python)
- **Maven/Gradle** (Java)
- **Cargo** (Rust)
- **Go Modules** (Go)

### Security Tools

- **npm audit**: Built-in npm vulnerability scanner
- **safety**: Python dependency vulnerability scanner
- **bundler-audit**: Ruby gem vulnerability scanner

## Next Steps

- Set up [Automated Scanning](../tools/dependency-scanning)
- Learn about [Vulnerability Management](../vulnerabilities/overview)
- Review [CI/CD Security](../best-practices/cicd-security)

