# Antigravity Rules

## Git & Deployment Constraints
- Only perform local development, local builds, and local commits.
- Never execute a `git push` or deploy command. The user will handle the final push and deployment manually.
- **Sandbox Strategy:** Never point the agent directly at main or production branches. The agent must work on specific, narrow feature branches checked out by the user (e.g., `feature/agent-login-fix`).

## Coding Style & Standards
- **ES6+ Javascript:** Use modern classes, arrow functions, and block-scoped variables. Avoid `var`.
- **CSS Variable System:** Store colors, glowing effects, and gradients in CSS variables under `:root` in `style.css`.
- **Modularity:** Keep files focused. Suggest extracting logic (e.g., entity classes) into separate modules if a script file exceeds 800 lines.
- **Documentation Preservation:** Retain existing comments and documentation unless they are directly contradicted by new implementations.

## Verification
- Before finishing a task, verify the syntax and outline the manual test cases used to confirm the functionality.
- **Audit for Secret Leaks:** Double-check that you did not accidentally hardcode an API key, an access token, or a local absolute path into the codebase.
