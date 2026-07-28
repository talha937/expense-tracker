# Contributing to Expense Tracker

Thanks for your interest in contributing.

## Workflow

1. Fork the repository.
2. Create a branch from `main`:
   - `feat/<short-description>`
   - `fix/<short-description>`
3. Make focused changes.
4. Run checks before opening a PR.
5. Open a pull request with a clear summary and validation steps.

## Commit Style

Use Conventional Commit style where possible:
- `feat: add monthly budget progress bar`
- `fix: handle empty expense description`
- `docs: update setup instructions`

## Pull Request Expectations

- Keep PRs small and scoped.
- Include screenshots for UI changes.
- Mention related issue numbers when applicable.
- Ensure CI passes.

## Local Verification

```bash
# Frontend
cd frontend
npm ci
npm run lint
npm run build

# Backend
cd ../backend
python -m compileall .
```
