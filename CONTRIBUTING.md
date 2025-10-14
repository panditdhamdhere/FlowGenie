# Contributing to FlowGenie

Thank you for your interest in contributing to FlowGenie! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/your-username/flowgenie/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Detailed description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, versions)

### Suggesting Features

1. Check [existing feature requests](https://github.com/your-username/flowgenie/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
2. Create a new issue with:
   - Clear feature description
   - Use case and benefits
   - Possible implementation approach
   - Any relevant examples

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/flowgenie.git
   cd flowgenie
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the code style
   - Add tests if applicable
   - Update documentation
   - Keep commits atomic and well-described

4. **Test your changes**
   ```bash
   npm test
   npm run lint
   ```

5. **Commit your changes**
   ```bash
   git commit -m "feat: Add amazing feature
   
   - Detailed description of what was added
   - Why it was needed
   - Any breaking changes"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Provide clear description
   - Reference related issues
   - Include screenshots/videos if UI changes
   - Wait for review

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Flow CLI
- Git

### Local Development
```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

## Code Style

### TypeScript
- Use TypeScript for all new code
- Provide proper type definitions
- Avoid `any` types when possible
- Use interfaces for object shapes

### React
- Use functional components with hooks
- Follow React best practices
- Keep components focused and small
- Use proper prop types

### Naming Conventions
- Components: PascalCase (e.g., `AgentDashboard`)
- Files: camelCase for utilities, PascalCase for components
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- CSS classes: kebab-case

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(agents): Add agent creation modal

- Implement create agent form
- Add validation logic
- Integrate with backend API

Closes #123
```

```
fix(auth): Resolve token expiration issue

Fixed bug where expired tokens were not properly handled

Fixes #456
```

## Testing Guidelines

### Unit Tests
- Write tests for all new features
- Maintain >80% code coverage
- Test edge cases and error conditions
- Use descriptive test names

### Integration Tests
- Test API endpoints
- Test component interactions
- Test user flows
- Test error scenarios

### E2E Tests (Planned)
- Test complete user journeys
- Test critical paths
- Test across browsers
- Test on different devices

## Documentation

When adding features, update:
- README.md (if applicable)
- API.md (for API changes)
- USER_GUIDE.md (for user-facing features)
- FEATURES.md (for new capabilities)
- Code comments (for complex logic)

## Review Process

### What We Look For
- Code quality and style
- Test coverage
- Documentation updates
- Performance impact
- Security considerations
- Backward compatibility

### Review Timeline
- Initial review: Within 48 hours
- Follow-up reviews: Within 24 hours
- Merge: After approval from 2 maintainers

## Community

- **Discord**: [Join our community](https://discord.gg/flowgenie)
- **Twitter**: [@FlowGenie](https://twitter.com/flowgenie)
- **GitHub Discussions**: [Ask questions](https://github.com/your-username/flowgenie/discussions)

## Getting Help

If you need help:
1. Check the documentation
2. Search existing issues
3. Ask in Discord
4. Create a new discussion

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Featured in community highlights

Thank you for contributing to FlowGenie! 🚀
