# sit323-737-2023-t1-prac7p

## Starting application

Please not that the image `namanyash/sit323-737-2023-t1-prac9p:v16` for Kubernetes deployment has been pushed to DockerHub.

### Starting MongoDB

Use the following commands to create the Kubernetes entities for MongoDB:

```
kubectl apply -f .\mongoPV.yaml
kubectl apply -f .\mongoPVC.yaml
kubectl apply -f .\mongoDeploy.
kubectl apply -f .\mongoService.yaml
kubectl get services
```

### Staring Node application

Use the output of the `get services` command to get the IP address for MongoDB service:

Concert the string `<mongo-service-IP-address>:27017` to base64 and replace the value for the "connectionString" secret in the `appDeploy.yaml` file.

Deploy the application using the following command:

```
kubectl apply -f .\appDeploy.yaml

```

## Testing application

To test the application check the application logs in container pod and ensure that the string "Database connected" is logged.

Create a Kubernetes service:
`kubectl apply -f .\appService.yaml`

Start port forwarding for the service:
`kubectl port-forward service/node-app-service 8000`

test the following endpoints:

POST `http://localhost:8000/db/addTask`

- Requires "taskDetails" value.
- Adds a task to the database.

PUT `http://localhost:8000/db/updateTask`

- Requires "id" and "taskDetails" value.
- Updates the task with the provided id to the value provided for taskDetails

GET `http://localhost:8000/db/getAllTasks`

- Gets all tasks from database

GET `http://localhost:8000/db/getTask`

- Requires a value for "id"
- Gets the task corresponding to the provided ID from database

DELETE `http://localhost:8000/db/deleteTask`

- Requires a value for "id"
- Deletes the task corresponding to the provided ID from database
