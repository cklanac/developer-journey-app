/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

import type { NextApiRequest, NextApiResponse } from "next";
type Labels = {};
const log = (message: string | Error, severity: string, labels?: Labels) => {
  console.log(
    JSON.stringify({
      message,
      severity,
      "logging.googleapis.com/labels": labels,
    })
  );
};
const logInfo = (message: string, labels?: Labels) => {
  log(message, "INFO", labels);
};
const logWarn = (message: string, labels?: Labels) => {
  log(message, "WARNING", labels);
};
const logError = (error: Error | string, labels?: Labels) => {
  const message = error instanceof Error ? error.stack || error.message : error;
  log(message, "ERROR", labels);
};
type Data = {
  name: string | string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const name = req.query?.name ?? "unknown";
  switch (name) {
    case "info":
      logInfo("user sent info", { key: "info" });
      break;
    case "warn":
      logWarn("user sent warning", { key: "warn" });
      break;
    case "error":
      logError("user sent error", { key: "error" });
      break;
    default:
      logError(new Error(`user sent ${name}`), { key: "unknown" });
  }
  res.status(200).json({ name });
}
