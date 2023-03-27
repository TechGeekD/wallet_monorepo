<div>
  <h1>GraphQL Wallet API <a href="http://152.67.6.86:3000/graphiql" target="_new">Endpoint</a></h1>
  <p>
    This GraphQL API provides operations to manage Wallets and Wallet
    Transactions.
  </p>
  <h2>Getting Started</h2>
  <h3>Prerequisites</h3>
  <p>To use this API, you need to have:</p>
  <ul>
    <li>
      A GraphQL client to make queries and mutations to this API (e.g.,
      <a href="https://www.apollographql.com/" target="_new">Apollo</a>)
    </li>
    <li>The URL of the GraphQL endpoint</li>
  </ul>
  <h3>Available Operations</h3>
  <p>The following operations are available in this API:</p>
  <h4>Queries</h4>
  <ul>
    <li>
      <code
        >getAllWalletTransaction(walletId: String!, skip: Int!, limit:
        Int!)</code
      >: Returns a list of wallet transactions for the specified wallet ID, with
      optional pagination.
    </li>
    <li>
      <code>getWallet(walletId: String!)</code>: Returns the wallet with the
      specified ID.
    </li>
  </ul>
  <h4>Mutations</h4>
  <ul>
    <li>
      <code>createWallet(createWalletInput: WalletInput!)</code>: Creates a new
      wallet with the specified name and optional balance.
    </li>
    <li>
      <code>updateWallet(updateWalletInput: UpdateWalletInput!)</code>: Updates
      the wallet with the specified ID, with optional name and balance.
    </li>
    <li>
      <code>removeWallet(id: Int!)</code>: Removes the wallet with the specified
      ID.
    </li>
    <li>
      <code>setupWallet(setupWalletInput: WalletInput!)</code>: Creates or
      updates a wallet with the specified name and balance.
    </li>
    <li>
      <code>transactWallet(transactWalletInput: walletTransactionInput!)</code>:
      Creates a new transaction for the specified wallet ID with the specified
      description, amount, and type (credit or debit).
    </li>
  </ul>
  <h4>Types</h4>
  <ul>
    <li>
      <code>WalletOutput</code>: The output type for wallets, containing the
      wallet's balance, name, and ID.
    </li>
    <li>
      <code>walletTransactionOutput</code>: The output type for wallet
      transactions, containing the transaction's description, wallet ID, amount,
      type, ID, transaction ID, and balance.
    </li>
    <li>
      <code>WALLET_TX_TYPE</code>: The enumeration for wallet transaction types,
      with options for credit and debit.
    </li>
    <li>
      <code>WalletInput</code>: The input type for creating a new wallet or
      updating a wallet's name and balance.
    </li>
    <li>
      <code>UpdateWalletInput</code>: The input type for updating a wallet's
      name and balance.
    </li>
    <li>
      <code>walletTransactionInput</code>: The input type for creating a new
      wallet transaction with the specified description, amount, and type
      (credit or debit).
    </li>
  </ul>
  <h3>Example Usage</h3>
  <p>To get all wallets:</p>
  <pre><div><code>query {
    getWallet(walletId: "provide_wallet_id") {
      balance
      name
      <span >id</span>
    }
  }
  </code></div></pre>
  <p>To create a new wallet:</p>
  <pre><div><code>mutation {
  <span>createWallet</span>(<span>createWalletInput: {name: <span>"New Wallet"</span>, balance: <span>100</span>}</span>) {
    balance
    name
    id
  }
}
</code></div></pre>
  <h2>Built With</h2>
  <ul>
    <li>
      <a href="https://graphql.org/" target="_new">GraphQL</a> - Query language
      and runtime for APIs
    </li>
    <li>
      <a href="https://nodejs.org/" target="_new">Node.js</a> - JavaScript
      runtime
    </li>
    <li>
      <a href="https://www.apollographql.com/docs/apollo-server/" target="_new"
        >Apollo Server</a
      >
      - GraphQL server implementation for Node.js
    </li>
  </ul>
</div>
