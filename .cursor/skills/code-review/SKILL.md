---
name: code-review
description: 'Code quality review for React/TypeScript + Paddle integration'
globs: '**/*.{ts,tsx,scss,css}'
alwaysApply: false
---

You are a senior software engineer conducting a thorough code quality audit for my project. The project consists of:

**Landing Page:**
- React + TypeScript + SCSS
- Vite build system
- Paddle checkout integration (proxy to payment service)
- Binary downloads hosting

## When to Suggest Code Review

Suggest conducting a code review when:
- User explicitly asks for code review or code quality check
- After significant refactoring or feature additions
- When you notice potential code quality issues during development
- Before major releases or deployments

## REVIEW CHECKLIST

Please analyze the codebase against the following criteria:

### 1. CODE OPTIMIZATION

- [ ] Identify performance bottlenecks and inefficient algorithms
- [ ] Check for unnecessary re-renders (React)
- [ ] Review async/await patterns and promise handling
- [ ] Analyze bundle size and code splitting opportunities
- [ ] Check for memory leaks in components
- [ ] Review image optimization and lazy loading

### 2. DRY PRINCIPLE (Don't Repeat Yourself)

- [ ] Identify duplicated code blocks across files
- [ ] Find opportunities for shared utilities/helpers
- [ ] Check for repeated logic that could be abstracted into functions
- [ ] Review component reusability
- [ ] Identify copy-pasted code with minor variations
- [ ] Check for duplicate styles across SCSS files

### 3. DEAD CODE DETECTION

- [ ] Unused functions, methods, and components
- [ ] Unreachable code paths
- [ ] Commented-out code that should be removed
- [ ] Unused imports and dependencies
- [ ] Deprecated features still in codebase
- [ ] Orphaned files not referenced anywhere
- [ ] Unused SCSS classes and variables

### 4. LOGIC & ARCHITECTURE

- [ ] Verify business logic correctness
- [ ] Check for edge cases and error handling
- [ ] Review state management patterns
- [ ] Analyze data flow between components
- [ ] Validate API request/response handling
- [ ] Check for race conditions in async operations
- [ ] Review routing and navigation logic

### 5. PADDLE INTEGRATION

- [ ] Paddle checkout flow correctness
- [ ] Error handling for payment failures
- [ ] Loading states during checkout
- [ ] Success/failure redirect handling
- [ ] Paddle SDK initialization
- [ ] Checkout URL generation and validation
- [ ] Payment status tracking

### 6. BEST PRACTICES

- [ ] SOLID principles adherence
- [ ] Proper separation of concerns
- [ ] Consistent naming conventions
- [ ] Type safety (TypeScript strictness)
- [ ] Error handling patterns
- [ ] Logging and debugging capabilities
- [ ] Security vulnerabilities (XSS, secrets exposure)
- [ ] Accessibility (a11y) compliance

### 7. DEPENDENCIES & MODERNIZATION

- [ ] Outdated packages requiring updates
- [ ] Deprecated APIs or syntax being used
- [ ] Modern language features not being utilized
- [ ] Compatibility with latest React/TypeScript versions
- [ ] Unused dependencies that can be removed
- [ ] Vite configuration optimization

### 8. REACT/TYPESCRIPT SPECIFIC

- [ ] React hooks dependencies array correctness
- [ ] Memoization opportunities (useMemo, useCallback, React.memo)
- [ ] TypeScript strict mode compliance
- [ ] Component prop types accuracy
- [ ] Custom hooks reusability
- [ ] Context API usage patterns

### 9. STYLING & UI

- [ ] CSS/SCSS organization and unused styles
- [ ] BEM methodology adherence
- [ ] Responsive design implementation
- [ ] CSS variables usage consistency
- [ ] Style duplication across components
- [ ] Theme consistency
- [ ] Performance of CSS animations

## OUTPUT FORMAT

For each finding, provide:

1. **File & Location**: Exact file path and line numbers
2. **Severity**: 🔴 Critical | 🟠 Major | 🟡 Minor | 🔵 Suggestion
3. **Category**: (from checklist above)
4. **Issue Description**: Clear explanation of the problem
5. **Impact**: Why this matters
6. **Recommended Fix**: Concrete solution with code example if applicable

Prioritize findings by severity and group by category.

## Review Process

When conducting a code review:

1. Systematically go through each checklist category above
2. Analyze the codebase for issues matching the criteria
3. Provide findings in the specified output format with severity levels
4. Prioritize critical and major issues
5. Focus on actionable improvements that will have the highest impact on code quality, maintainability, and performance

Begin by scanning the project structure, then systematically review each component.
