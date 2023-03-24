# Usage

## docker-compose.yml

```
version: "3.9"
services:
  rest:
    image: bxr1ng/rest:latest
    ports:
      - "80:80"
    environment:
      MY_SQL_HOST: "host"
      MY_SQL_USER: "user"
      MY_SQL_PASSWORD: "password"
      MY_SQL_PORT: 3306
      MY_SQL_DATABASE: "database"
```
