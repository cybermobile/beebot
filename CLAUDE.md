# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bytebot is an open-source AI desktop agent that provides AI with its own virtual computer environment. The project consists of multiple packages working together to enable AI-controlled desktop automation.

## Architecture

The project uses a monorepo structure with the following key packages:

- **packages/bytebot-agent**: NestJS backend service that coordinates AI and desktop actions, handles task management, and provides WebSocket/REST APIs
  - Core modules: agent (AI processing), tasks (task management), auth (Clerk integration)
  - Key files: `agent.processor.ts` (main AI logic), `agent.computer-use.ts` (desktop control)
- **packages/bytebot-ui**: Next.js frontend application for task management and desktop viewing
  - App Router structure: `src/app/` with `(auth)`, `tasks`, `desktop` routes
  - API proxy: `src/app/api/[[...path]]/route.ts` forwards requests to agent with auth
- **packages/bytebotd**: Desktop daemon that controls the virtual Ubuntu environment
  - Modules: computer-use (desktop control), input-tracking (user input monitoring)
- **packages/bytebot-agent-cc**: Agent service for Claude Computer Use integration
- **packages/shared**: Shared TypeScript types and utilities across packages
- **packages/bytebot-llm-proxy**: LiteLLM proxy for multi-provider AI support

Tech Stack:
- Backend: NestJS, Prisma ORM, PostgreSQL, class-validator/transformer for DTOs
- Frontend: Next.js 15+, React 19, TailwindCSS v4, Clerk authentication
- AI: Supports Anthropic Claude, OpenAI GPT, Google Gemini
- Deployment: Docker, Kubernetes/Helm support

## Data Flow

1. User creates task via UI → API proxy with Clerk auth → Agent service
2. Agent processes task → Calls AI provider → Sends commands to desktop daemon
3. Desktop daemon executes actions → Returns screenshots/results to agent
4. Agent updates task status → WebSocket updates to UI

## Development Commands

### Backend (bytebot-agent)
```bash
cd packages/bytebot-agent
npm install
npm run prisma:dev          # Run migrations and generate Prisma client (dev)
npm run start:dev            # Start with hot reload
npm run build                # Production build
npm run lint                 # Run ESLint
npm run test                 # Run tests
```

### Frontend (bytebot-ui)
```bash
cd packages/bytebot-ui
npm install
npm run dev                  # Start development server
npm run build                # Production build
npm run lint                 # Run linter
```

### Desktop Daemon (bytebotd)
```bash
cd packages/bytebotd
npm install
npm run start:dev            # Start with hot reload
npm run build                # Production build
npm run lint                 # Run ESLint
```

### Shared Package
```bash
cd packages/shared
npm run build                # Build TypeScript
```

### Docker Development
```bash
# Start development infrastructure (desktop + Postgres)
docker compose -f docker/docker-compose.development.yml up -d

# Full stack with all services
docker compose -f docker/docker-compose.yml up -d
```

## Environment Configuration

### Backend (bytebot-agent/.env)
- `DATABASE_URL`: PostgreSQL connection string (default: `postgresql://postgres:postgres@postgres:5432/bytebotdb`)
- `CLERK_SECRET_KEY`: Clerk authentication secret (required for multi-user)
- `BYTEBOT_DESKTOP_BASE_URL`: Desktop service URL (default: `http://localhost:9990`)
- `BYTEBOT_ANALYTICS_ENDPOINT`: Optional analytics endpoint
- AI provider keys (choose one): `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, or `GEMINI_API_KEY`

### Frontend (bytebot-ui/.env)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk public key (required for auth)
- `CLERK_SECRET_KEY`: Clerk secret key (required for auth)
- `BYTEBOT_AGENT_BASE_URL`: Backend API URL (default: `http://localhost:9991`)
- `BYTEBOT_DESKTOP_VNC_URL`: VNC websocket URL for desktop viewing

## Database Operations

The project uses Prisma ORM with PostgreSQL. Key models include:
- `Task`: Main task entity with status tracking
- `Message`: Task-related messages
- `User`: User accounts (when Clerk auth is enabled)
- `Summary`: Task summaries

Run migrations when schema changes:
```bash
cd packages/bytebot-agent
npx prisma migrate dev       # Development
npx prisma migrate deploy    # Production
```

## API Endpoints

- Agent API: `http://localhost:9991` (REST + WebSocket)
- Desktop API: `http://localhost:9990` (computer control endpoints)
- UI: `http://localhost:9992`

## Testing Approach

Each package has Jest configured. Run tests with:
```bash
npm run test                 # Run all tests
npm run test:watch           # Watch mode
npm run test:cov             # Coverage report

# Run single test file (example)
npm test -- path/to/test.spec.ts

# Run tests with specific pattern
npm test -- --testNamePattern="should create task"
```

## Key Development Notes

- All packages depend on the shared package - build it first when making changes
- The agent service requires database migrations before starting
- Desktop daemon communicates with the virtual desktop container
- UI proxies VNC connections to the desktop for live viewing
- Authentication via Clerk is optional but recommended for multi-user setups
- WebSocket connections require Bearer token in auth header when Clerk is enabled
- The UI's API proxy (`src/app/api/[[...path]]/route.ts`) handles auth token forwarding automatically