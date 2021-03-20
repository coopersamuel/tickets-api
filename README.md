# Tickets API

Minimal GraphQL server implementing a recursive "Tickets" model. Tickets can belong to or be parents of other tickets.

## Setup

- In the repo root directory, run `npm install` to gather all dependencies.
- Next, run `npm run setup`. This will set up a local SQLite database, and add some seed data. This database will live in a local file named `database.sqlite3`.
- Then run `npm run watch`. This should start the server in development mode.

