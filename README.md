# Shipment Exception API

A NestJS REST API for recording, querying, and resolving logistical shipment exceptions (delays, damages, weather events, customs holds).

---

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) (Express HTTP adapter)
- **Language**: TypeScript (Node.js ES modules)
- **Validation**: `class-validator` & `class-transformer` with global `ValidationPipe`
- **Testing**: [Playwright](https://playwright.dev/) for end-to-end API testing and node test runner for service unit tests

---

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm

### Installation

```bash
npm install
```

### Running the API

Start the NestJS development server:

```bash
npm run start
```

By default, the server listens on `http://localhost:3000` (or the port specified by the `PORT` environment variable).

---

## API Endpoints

### 1. Health Check
- **`GET /health`**
  - Returns: `{ "status": "ok" }`

### 2. Create Exception
- **`POST /exceptions`**
  - Request Body:
    ```json
    {
      "shipmentId": "SHIP-1001",
      "type": "DELAY",
      "description": "Carrier missed the scheduled collection window."
    }
    ```
  - Validation:
    - `shipmentId`: string, minimum 1 character
    - `type`: one of `DAMAGE`, `DELAY`, `CUSTOMS_HOLD`, `WEATHER`, `CARRIER_STRIKE`
    - `description`: string, minimum 10 characters
    - Extraneous fields are automatically rejected with `400 Bad Request`.
  - Response: `201 Created` with entity payload and `OPEN` status.

### 3. List Exceptions
- **`GET /exceptions`**
  - Returns an array of all recorded shipment exceptions.

### 4. Resolve Exception
- **`POST /exceptions/:id/resolve`**
  - Updates the status of the exception to `RESOLVED`.
  - Returns `404 Not Found` if the exception ID does not exist.

---

## Quality & Testing

| Command | Description |
| :--- | :--- |
| `npm run typecheck` | Run TypeScript compiler type check without emitting files (`tsc --noEmit`) |
| `npm test` | Run the Playwright automated API test suite (`playwright test`) |
| `npm run test:ui` | Open the interactive Playwright test runner UI |
| `npm run quality` | Run typecheck followed by Playwright tests |

---

## Repository & Team Standards

This repository is configured with project-level agent rules and skills located in [`.agents/`](.agents/):
- **[`engineering.md`](.agents/rules/engineering.md)**: Engineering standards, SOLID architectural separation, and testing practices.
- **[`agents.md`](.agents/agents.md)**: Persona roles for `@builder`, `@reviewer`, and `@qa`.
- **[`skills/api-quality`](.agents/skills/api-quality/)**: Automated quality gate workflow.
