## Integrating Dynatrace With Prometheus

In this module we'll learn how to integrate Dynatrace with Prometheus in Kubernetes.

### Step 1: Create the Dockerfile and script

1. Create a directory for the docker artifacts

   ```bash
   (bastion)$ cd ~
   (bastion)$ mkdir -p docker/
   (bastion)$ cd docker/
   ```

2. Create a new file named `Dockerfile` and add the following content:

   ```docker
   FROM alpine:latest
   COPY . /app
   WORKDIR /app
   RUN apk add --no-cache wget
   ENTRYPOINT [ "sh" ]
   CMD ["hello_world.sh"]
   ```

1. Create a new file named `hello_world.sh` and add the following content:

   ```bash
   echo "Hello World from a Docker Container."
   ```

1. Ensure that the script is an executable:

   ```bash
   (bastion)$ chmod +x hello_world.sh
   ```

### Step 2. Build and Tag a Container Image

1. Build the container image (`-t` specifies the repository and a tag). The `$USER` variable will tag the image with your username.

   ```bash
   (bastion)$ docker build -t acl/hello-world:$USER .
   ```

1. List all container images on your local machine.

   ```bash
   (bastion)$ docker images
   ```

1. Set another tag.

   ```bash
   (bastion)$ docker tag acl/hello-world:$USER acl/hello-world:$USER-stable
   ```

1. List all container images on your local machine.

   ```bash
   (bastion)$ docker images
   ```

### Step 3. Run a Container

1. Run the container based on a container image.

   ```bash
   (bastion)$ docker run acl/hello-world:$USER-stable
   ```
