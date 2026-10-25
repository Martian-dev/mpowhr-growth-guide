import { runSheetSync } from "../server/posh/maintenance.js";
const result = await runSheetSync(true);
console.log(result);
if (
  "error" in result ||
  !result.configured ||
  ("failed" in result && result.failed)
)
  process.exitCode = 1;
