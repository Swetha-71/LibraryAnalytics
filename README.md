# LibraryAnalytics

Full stack library analytics demo (Spring Boot + MongoDB backend, React frontend)

## Prerequisites
- Java 17+
- Maven
- Node.js 18+
- Docker & docker-compose (optional)
- MongoDB (if not using docker)

## Quick run (local)
### Backend
1. Configure Mongo: ensure `mongodb://localhost:27017/libraryanalytics` is reachable.
2. From `backend/` run:
```bash
mvn spring-boot:run
