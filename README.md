<div>
  <h1>Project Hosted At <a href="http://152.67.6.86" target="_new">Link</a></h1>
  <h1>User Docker Compose To Run Project</h1>
  <p>
    This Docker Compose file contains the configuration for running a
    multi-container application consisting of a frontend, a backend, and a
    database.
  </p>
  <h2>Prerequisites</h2>
  <p>
    Before running the application, make sure that you have installed Docker and
    Docker Compose on your machine.
  </p>
  <h2>Usage</h2>
  <p>
    To start the application, navigate to the directory containing the
    <code>docker-compose.yml</code> file and run the following command:
  </p>
  <pre><div><div><code>docker compose -p wallet up frontend --build -d
</code></div></pre>
  <p>
    This will build the necessary Docker images and start the containers. The
    application will be accessible at <code>http://localhost:80</code>.
  </p>
  <h2>Configuration</h2>
  <p>
    The <code>docker-compose.yml</code> file defines the following services:
  </p>
  <h3>frontend</h3>
  <p>
    This service runs the frontend of the application. It is built from a
    Dockerfile located in the current directory (<code>.</code>) and named
    <code>Dockerfile.frontend</code>. The built image is named
    <code>wallet_frontend</code>.
  </p>
  <p>
    The service exposes port 80 to the host machine and maps it to the
    <code>${FRONTEND_PORT}</code> environment variable. It also exposes port
    9229 for debugging purposes.
  </p>
  <p>The service depends on the <code>backend</code> service.</p>
  <h3>backend</h3>
  <p>
    This service runs the backend of the application. It is built from a
    Dockerfile located in the current directory (<code>.</code>) and named
    <code>Dockerfile.backend</code>. The built image is named
    <code>wallet_backend</code>.
  </p>
  <p>
    The service exposes port <code>${BACKEND_PORT}</code> to the host machine
    and maps it to the <code>${BACKEND_PORT}</code> environment variable. It
    also exposes port 9228 for debugging purposes.
  </p>
  <p>The service runs the <code>yarn start:prod</code> command.</p>
  <p>The service depends on the <code>database</code> service.</p>
  <h3>database</h3>
  <p>
    This service runs the database for the application. It is built from the
    same Dockerfile as the <code>backend</code> service, but it is targeted at
    the <code>database</code> stage.
  </p>
  <p>
    The service exposes port 27018 to the host machine and maps it to the
    <code>${DATABASE_PORT}</code> environment variable.
  </p>
  <h2>Environment variables</h2>
  <p>
    The application uses environment variables to configure various settings.
    These variables are read from the <code>.env</code> file in the current
    directory.
  </p>
  <p>The following variables are used:</p>
  <ul>
    <li>
      <code>NODE_ENV</code>: Runtime environment for NodeJs.
    </li>
    <li>
      <code>NEXT_PUBLIC_API_URL</code>: Backend API url location.
    </li>
    <li>
      <code>NEXT_PUBLIC_FRONTEND_URL</code>: NextJs API url location.
    </li>
    <li>
      <code>MONGODB_URI</code>: MongoDB connection string.
    </li>
    <li>
      <code>FRONTEND_HOSTNAME</code>: Url that frontend is hosted at.
    </li>
    <li>
      <code>BACKEND_HOSTNAME</code>: Url that backend is hosted at.
    </li>
    <li>
      <code>FRONTEND_PORT</code>: The port that the frontend service should
      listen on.
    </li>
    <li>
      <code>BACKEND_PORT</code>: The port that the backend service should listen
      on.
    </li>
    <li>
      <code>DATABASE_PORT</code>: The port that the database service should
      listen on.
    </li>
  </ul>
  <h2>Networks</h2>
  <p>
    The application uses a single network named <code>webnet</code>. This
    network is created automatically by Docker Compose and is used to connect
    the services together.
  </p>
</div>
