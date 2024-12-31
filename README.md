# Project Setup Guide

This guide will walk you through the steps to set up your environment and get the necessary components running.

## 1. Setup Environment

### Step 1: Build the binaries

1. Navigate to the `docker/binary` directory:

   ```bash
   cd docker/binary
   ```

2. Run the following command to build the binaries:
   ```bash
   docker-compose up --build -d
   ```
   This command will generate the required binaries in the `dist` folder for `ragemp` on Linux.

### Step 2: Start the Development Server

1. After building the binaries, navigate back to the root directory by running:

   ```bash
   cd ../../
   ```

2. Go to the `docker/dev` directory:

   ```bash
   cd docker/dev
   ```

3. Run the following command to start the development server and compiler:

   ```bash
   docker-compose up --build
   ```

   This will build and start the server in development mode along with the compiler.

## 2. Restart the Server

If you need to restart the server, follow these steps:

1. Open a new terminal window.

2. Run the following command to restart the server:
   ```bash
   docker-compose restart server
   ```

This will restart the server in the development environment.

## 3. Notes

- Make sure you have Docker and Docker Compose installed on your system.
- These steps assume you are working on a Linux machine for the `ragemp` binary generation.
