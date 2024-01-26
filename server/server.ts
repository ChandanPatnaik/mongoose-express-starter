import { configs } from "./configs";
import App from "./plugins/app.plugin";

// Create an instance of the App class.
const app = new App();

// Get the port from the configurations.
const port = configs.PORT;

// Start the server by calling the listen method.
app.listen({
  port,
});
