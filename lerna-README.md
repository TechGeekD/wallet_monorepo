<div>
  <h1>Lerna Monorepo</h1>
  <p>
    This is a Lerna project with a root package and multiple packages under the
    <code>packages</code> directory. The project is configured to use Yarn
    Workspaces and Lerna to manage dependencies and scripts across the packages.
  </p>
  <h2>Installation and Setup</h2>
  <p>To get started with the project, clone the repository and run:</p>
  <pre><div><code>yarn bootstrap</code></div></pre>
  <p>
    This will install all the dependencies for the root package as well as all
    the packages under <code>packages</code>.
  </p>
  <h2>Scripts</h2>
  <p>The following scripts are available for use:</p>
  <ul>
    <li>
      <code>create_lerna</code>: creates a new package under
      <code>packages</code> using Lerna
    </li>
    <li>
      <code>bootstrap</code>: installs all the dependencies for the packages and
      links any cross-dependencies
    </li>
    <li>
      <code>preclean</code>: runs a prebuild script for all packages and removes
      the <code>dist</code> directory
    </li>
    <li><code>prebuild</code>: runs a prebuild script for all packages</li>
    <li>
      <code>export</code>: runs an export script for the
      <code>@wallet/frontend</code> package in parallel
    </li>
    <li><code>start</code>: starts the application for all packages</li>
    <li><code>build</code>: builds all packages</li>
    <li>
      <code>start:dev</code>: starts the application in development mode for all
      packages
    </li>
    <li>
      <code>start:debug</code>: starts the application in debug mode for all
      packages
    </li>
    <li>
      <code>start:prod</code>: starts the application in production mode for all
      packages
    </li>
    <li>
      <code>build:backend</code>: builds the
      <code>@wallet/backend</code> package in parallel
    </li>
    <li>
      <code>build:frontend</code>: builds the
      <code>@wallet/frontend</code> package in parallel
    </li>
    <li>
      <code>start:frontend</code>: starts the
      <code>@wallet/frontend</code> package
    </li>
    <li>
      <code>start:dev:frontend</code>: starts the
      <code>@wallet/frontend</code> package in development mode
    </li>
    <li>
      <code>start:debug:frontend</code>: starts the
      <code>@wallet/frontend</code> package in debug mode
    </li>
    <li>
      <code>start:backend</code>: starts the
      <code>@wallet/backend</code> package
    </li>
    <li>
      <code>start:dev:backend</code>: starts the
      <code>@wallet/backend</code> package in development mode
    </li>
    <li>
      <code>start:debug:backend</code>: starts the
      <code>@wallet/backend</code> package in debug mode
    </li>
    <li>
      <code>start:prod:backend</code>: starts the
      <code>@wallet/backend</code> package in production mode
    </li>
    <li>
      <code>release:patch</code>: bumps the patch version number for all
      packages and creates a git commit and tag
    </li>
    <li>
      <code>clean</code>: removes the <code>node_modules</code> directories for
      all packages and the root package
    </li>
    <li>
      <code>docker</code>: starts the <code>backend_dev</code> service using
      Docker Compose and builds the Docker image
    </li>
  </ul>
  <h2>Workspaces</h2>
  <p>
    The <code>workspaces</code> field in the <code>package.json</code> file
    lists all the packages that are part of the project. Currently, there is
    only one directory listed: <code>packages/*</code>.
  </p>
</div>
