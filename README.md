# parco-app-challenge

Welcome to the Parking Management Application README! This application is designed to create, update, and provide paginated access to parking lots

### Key Features

Parking Lot Creation: Add new parking lots to the database with detailed information such as name, spots, contact, and parkingType.
Parking Lot Updates: Modify the information of existing parking lots, such as spots or contact.
Parking Lot Pagination: Easily access a paginated list of all registered parking lots in the application

## Stack

Node
Typescript
Express
Postgres
SQLite
Mongodb

Install exact node dependencies:

```bash
npm install
```

Run preversion to format with prettier, chek lint, and run all test:

```bash
npm run preversion
```

Run all tests:

```bash
npm test
```

Run dev test with nodemon

```bash
npm run test:dev
```

Build the app for production:

```bash
npm run build
```

## Start application

This repository works with a Mongo memory database connection and Postgres local connection. You can start with Mongo or Postgres connection by passing the DB environment var.

Start server with Mongo memory connection:

```bash
DB=mongo npm start
```

Start server with Postgres local connection:

```bash
DB=sql npm start
```

Start server with default db connection:

```bash
npm start
```

## API

Host:
Open [http://localhost:8000](http://localhost:8000) with your browser.

### Create a parking

```code
{
    url: 'http://localhost:8000/api/v1/parking',
    method: 'POST',
    ContentType: 'application/json'
    body: {
      "name": "plaza chida",
      "spots": 500,
      "contact": "52331443470",
      "parkingType": "public"
    }
}
```

### Update a parking

```code
{
    url: 'http://localhost:8000/api/v1/parking/:id/update',
    method: 'PUT',
    ContentType: 'application/json'
    body: {
      "spots": 500,
      "contact": "52331443470"
    }
}
```

### Get a pagination of parkings

```code
{
    url: 'http://localhost:8000/api/v1/parking/paginate?order=spots&sort=asc&limit=10&skip=0',
    method: 'GET',
    ContentType: 'application/json'
}
```
