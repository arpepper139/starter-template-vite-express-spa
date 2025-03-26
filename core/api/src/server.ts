/**
 * Entry point into the API server
 */
import app from "./app.js";
import {env} from "./config/env.js"

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 [server]: Server is running at http://localhost:${PORT}`);
});