# Wallet System Backend

This repository contains the backend service for a simple Wallet System that supports setting up a wallet, credit/debit transactions, fetching transactions, and getting wallet details.

## Getting Started

To run the backend service locally, follow the instructions below:

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Make sure it is running locally or update the `DB_URL` in `utils/dbConnect.js`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kansalraj/backend.git
   cd wallet-system-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   The server will start on http://localhost:4000 by default. You can modify the port in `Andex.js`.

## APIs

### 1. Initialize Wallet

- **Endpoint:** `POST /api/setup`
- **Request Body:**

  ```json
  {
    "balance": 20,
    "name": "Your Name"
  }
  ```

- **Response:**

  ```json
  {
    "id": "unique-wallet-id",
    "balance": 20,
    "name": "Hello world",
    "date": "2023-08-05T12:34:56.789Z"
  }
  ```

### 2. Credit/Debit Amount

- **Endpoint:** `POST /api/transact/:walletId`
- **Request Params:** `walletId` - ID of the wallet to credit/debit
- **Request Body:**

  ```json
  {
    "amount": 10.5612,
    "description": "Debit"
  }
  ```

- **Response:**

  ```json
  {
    "balance": 30.5612,
    "transactionId": "unique-transaction-id"
  }
  ```

### 3. Fetch Transactions

- **Endpoint:** `GET /api/transactions`
- **Query Parameters:**

  - `walletId`: ID of the wallet to fetch transactions
  - `skip`: Number of transactions to skip (optional, default: 0)
  - `limit`: Maximum number of transactions to return (optional, default: 10)

- **Response:**

  ```json
  [
    {
      "id": "unique-transaction-id",
      "walletId": "wallet-id",
      "amount": 10.5612,
      "balance": 30.5612,
      "description": "debit",
      "date": "2023-08-05T12:34:56.789Z",
      "type": "CREDIT"
    },
    {
      "id": "unique-transaction-id",
      "walletId": "wallet-id",
      "amount": -5.321,
      "balance": 25.2402,
      "description": "Purchase",
      "date": "2023-08-05T13:12:23.456Z",
      "type": "DEBIT"
    },
    ...
  ]
  ```

### 4. Get Wallet

- **Endpoint:** `GET /api/wallet/:id`
- **Request Params:** `id` - ID of the wallet to fetch
- **Response:**

  ```json
  {
    "id": "unique-wallet-id",
    "balance": 30.5612,
    "name": "Hello world",
    "date": "2023-08-05T12:34:56.789Z"
  }
  ```

## Implementation Details

The backend service is built using Node.js and Express.js framework. It uses MongoDB as the database to store wallet and transaction data. The Mongoose library is used for database interactions and provides optimistic concurrency control to handle race conditions during credit/debit transactions.

The `models` directory contains Mongoose schemas for the Wallet and Transaction entities. The `controllers` directory contains the functions that handle the business logic for each API. The `routes` directory contains the API routes defined using Express Router.

To ensure that the wallet balance is consistent and avoids race conditions during concurrent transactions, the `creditOrDebit` API uses optimistic concurrency control. It retries the transaction update up to 5 times in case of a version mismatch caused by concurrent updates.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to create an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
