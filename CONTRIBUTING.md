# Contributing to FullyPorto

Thank you for your interest in contributing to FullyPorto! We appreciate your help in making this project better.

## 🌟 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if applicable**
- **Note your environment** (OS, Node version, Angular version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternatives you've considered**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the coding standards** used throughout the project
3. **Write clear commit messages**
4. **Update documentation** if needed
5. **Test your changes** thoroughly
6. **Submit a pull request**

## 💻 Development Setup

### Frontend Setup

```bash
cd Angular
npm install
npm start
```

### Backend Setup

```bash
cd MyPortApi
dotnet restore
dotnet run
```

## 📝 Coding Standards

### Angular/TypeScript

- Use TypeScript strict mode
- Follow Angular style guide
- Use meaningful variable and function names
- Add comments for complex logic
- Write unit tests for new features
- Maximum line length: 100 characters (Prettier configured)

### Commit Messages

Follow conventional commit format:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add user authentication
fix(api): resolve null reference error
docs(readme): update installation instructions
```

## 🧪 Testing

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Aim for good test coverage

### Running Tests

```bash
# Frontend tests
cd Angular
npm test

# Backend tests
cd MyPortApi
dotnet test
```

## 📋 Pull Request Process

1. **Update the README.md** with details of changes if applicable
2. **Update documentation** in the `docs/` folder
3. **Ensure all tests pass**
4. **Request review** from maintainers
5. **Address review comments** promptly
6. **Squash commits** if requested
7. PRs will be merged once approved by maintainers

## 🔍 Code Review Process

All submissions require review. We use GitHub pull requests for this purpose. Reviewers will check:

- Code quality and standards
- Test coverage
- Documentation updates
- Performance implications
- Security considerations

## 🎯 Project Priorities

Current focus areas:

1. Bug fixes
2. Performance improvements
3. Documentation enhancements
4. New features

## ❓ Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to FullyPorto! 🎉
