# Setup Guide for Production and Development

## Production Setup

To set up the production environment, follow these steps:

1. Navigate to the production Docker directory:

   ```bash
   cd docker/prod
   ```

2. Build and start the Docker containers:

   ```bash
   docker compose up --build -d
   ```

   This will build and start the production environment in detached mode.

---

## Development Setup

To set up the development environment, follow the steps below.

### Step 1: Prepare the Binary

1. Open a terminal for the binary build.

   Navigate to the binary Docker directory:

   ```bash
   cd docker/binary
   ```

2. Build and start the Docker containers:

   ```bash
   docker compose up --build -d
   ```

   This will generate the binary and place it in the `packages/server/dist` directory.

3. After the binary is generated, execute `docker compose down` for delete containers and close the terminal.

### Step 2: Start Docker Development Environment

1. Open three separate terminals: one for Docker development, one for RAGE MP, and one for the compiler.

2. In the **Docker Development** terminal, navigate to the development Docker directory:

   ```bash
   cd docker/dev
   ```

3. Build and start the Docker containers for development:

   ```bash
   docker compose up --build -d
   ```

### Step 3: Manage the Server (RAGE MP)

1. In the **RAGE MP** terminal, navigate to the same directory as the Docker development terminal:

   ```bash
   cd docker/dev
   ```

2. Use the following commands to manage the server:

   - Restart the server:

     ```bash
     docker compose restart server
     ```

   - Or stop and start the server:

     ```bash
     docker compose stop server
     docker compose start server
     ```

   - If you've made updates, you can use `--build` to rebuild the Docker containers:

     ```bash
     docker compose up --build -d
     ```

### Step 4: Compile and Run the Server (Compiler)

1. In the **Compiler** terminal, start docker container with node:20 and navigate to the server directory:

   ```bash
   docker run -it --rm -v "$(pwd)":/app node:20 bash -c "cd /app && bash"
   cd packages/server
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

---

## Notes

- Make sure that your system meets the necessary requirements for Docker and Node.js.
- The steps for the development setup assume you are working with Docker containers for both the application and services.
- For any updates or changes to the server, remember to restart the Docker container using the `docker compose` commands listed above.
