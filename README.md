# BookWise
BookWise is a platform designed to help readers organize, track, and evaluate their reading journey.

**Features**
- OAuth login (Google, GitHub)
- Write reviews per book
- See other people's reviews
- Most popular books
- Generate statistics about your reading

## Technologies
- TypeScript
- Next.js
- Tailwind CSS
- AuthJS
- Prisma + PostgreSQL
- Docker

## Getting started
### Prerequisites
- [NodeJS](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Google OAuth credentials](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth credentials](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

### Cloning
```bash
git clone https://github.com/glmchalita/bookwise
```

### Installing dependecies
```bash
cd fast-feet-api
npm install
```

### Initializing database
```bash
docker compose up -d
```

### Running
```bash
npm start:dev
```
