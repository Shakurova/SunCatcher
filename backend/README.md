This tutorial shows you how to create and deploy a Flask web app in an Alpine Linux + NGINX Docker container to Azure Web Apps for Containers using the Azure CLI.

See [VSCODE.md](VSCODE.md) for using Visual Studio Code and the Azure Portal instead.

## Prerequisites
To complete this tutorial:

- [Install Python 3](https://www.python.org/downloads/)
- [Install Docker Community Edition](https://www.docker.com/community-edition)
- (Optional) [Install the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)

## Create app and run it locally

First create a root folder, name it e.g. ```flask-quickstart``` and create a single ```app``` folder inside the root folder. Now let's write our app, copy and paste the following code into ```app/main.py```:

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
  return 'Hello, World!'

if __name__ == '__main__':
  app.run()
```

Now let's create a dockerfile for the app, we'll use an Alpine Linux container with an NGINX web server. Put the following in a file named `Dockerfile` inside of the ```flask-quickstart``` folder:

```Dockerfile
FROM tiangolo/uwsgi-nginx-flask:python3.6-alpine3.7

ENV LISTEN_PORT=8000
EXPOSE 8000

COPY /app /app
```

Now build and run the docker container:
```
docker build --rm -t flask-quickstart .
docker run --rm -it -p 8000:8000 flask-quickstart
```

Open a web browser, and navigate to the sample app at ```http://localhost:8000```.

You can see the Hello World message from the sample app displayed in the page.

![Flask app running locally](https://docs.microsoft.com/en-us/azure/app-service/media/app-service-web-get-started-python/localhost-hello-world-in-browser.png)

In your terminal window, press Ctrl+C to exit the web server and stop the container.

If you make code changes you can re-run the docker build and run commands above to update the container.

