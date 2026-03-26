# Trello Clone — Framework Performance Comparison

A Masters dissertation project comparing the performance of **Angular 18** and **Next.js 15 (React 18)** by building equivalent Trello-like task management applications in each framework.

The comparison focuses on **DOM handling efficiency**, **memory management**, and **user experience** under load using an automated activity simulator.

---

## Repository Structure

```
trello-clone/
├── trello-clone-angular/   # Angular 18 implementation
└── trello-clone-next/      # Next.js 15 / React 18 implementation
```

---

## Live Deployments

| App | URL |
|-----|-----|
| Angular | https://trello-angular-2e7ad.web.app |
| Next.js | https://nextjs-a1771.web.app |

---

## Features

Both applications are functionally equivalent and include:

- **Board Management** — Create, rename, and delete boards
- **List Management** — Add, edit, and delete lists within boards
- **Card Management** — Add, edit, delete, and reorder cards within lists
- **Drag and Drop** — Move cards between lists smoothly
- **Local Data Persistence** — Stores data locally to simulate real application usage

---

## Tech Stack

| | Angular App | Next.js App |
|---|---|---|
| Framework | Angular 18 | Next.js 15 |
| Language | TypeScript | JavaScript |
| Drag & Drop | Angular CDK | @dnd-kit |
| Styling | Bootstrap 5 | Bootstrap 5 |
| Icons | FontAwesome (Angular) | FontAwesome (Free) |
| IDs | Angular built-in | uuid (v4) |
| Deployment | Firebase Hosting | Firebase Hosting |

---

## Getting Started

### Angular App

```bash
cd trello-clone-angular
npm install
npm start
```

Runs on `http://localhost:4200`

### Next.js App

```bash
cd trello-clone-next
npm install
npm run dev
```

Runs on `http://localhost:3000`

---

## Building for Production

### Angular

```bash
cd trello-clone-angular
npm run build
```

Output: `dist/`

### Next.js

```bash
cd trello-clone-next
npm run build
```

Output: `out/` (static export)

---

## Deploying to Firebase

Both apps are configured for Firebase Hosting.

```bash
# Angular
cd trello-clone-angular
npm run build
firebase deploy

# Next.js
cd trello-clone-next
npm run build
firebase deploy
```

---

## Key Dependencies

### Angular App
| Package | Purpose |
|---------|---------|
| `@angular/cdk` | Drag and drop functionality |
| `@angular/fire` | Firebase integration |
| `@fortawesome/angular-fontawesome` | Icons |
| `bootstrap` | UI styling |

### Next.js App
| Package | Purpose |
|---------|---------|
| `@dnd-kit/core` | Drag and drop functionality |
| `@dnd-kit/sortable` | Sortable list support |
| `uuid` | Unique ID generation |
| `bootstrap` | UI styling |
