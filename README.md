# Blood Donation System Backend

Node.js + Express + Sequelize + MySQL backend for a Blood Donation Management System.

## Setup

1) Install dependencies

```bash
npm install
```

2) Create `.env`

Copy `.env.example` to `.env` and fill DB credentials.

3) Create database (MySQL)

Create `DB_NAME` database in your MySQL server, or run:

```bash
npm run db:create
```

4) Run the API

```bash
npm run dev
```

Server runs on `PORT` (default `4000`).

## Quick start: seed an OWNER

Set these in `.env` (or edit the script values):
- `OWNER_EMAIL`
- `OWNER_PASSWORD`
- `OWNER_NAME`

Then run:

```bash
npm run seed:owner
```

