import app from "./routes.js";
import {port} from "./routes.js"

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
