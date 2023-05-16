const k8s = require("@kubernetes/client-node");

// Create a Kubernetes API client
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// Specify the Secret name and namespace
const secretName = "mongodb-credentials";
const namespace = "default";

const kubernetesSecrets = async () => {
  // Get the Secret
  await k8sApi
    .readNamespacedSecret(secretName, namespace)
    .then((response) => {
      const secretData = response.body.data;

      console.log("Setting environment variables");
      process.env["MONGO_USERNAME"] = Buffer.from(
        secretData.username,
        "base64"
      ).toString("utf-8");
      process.env["MONGO_PASSWORD"] = Buffer.from(
        secretData.password,
        "base64"
      ).toString("utf-8");
      process.env["MONGO_CONNECTION_STRING"] = Buffer.from(
        secretData.connectionString,
        "base64"
      ).toString("utf-8");
      console.log("Env vars set!!");
    })
    .catch((err) => {
      if (err.statusCode == 404) {
        console.log("Secret not found");
        console.log("Error:", err);
        return null;
      }
      console.log("MongoERROR");
      console.log("Error:", err);
      console.log("MongoERROR");
      return null;
    });
};

module.exports = kubernetesSecrets;
