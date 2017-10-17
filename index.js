/**
 * Copyright 2017 Noticeable.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * Custom logic to load functions based on conventions.
 * <p>
 * The conventions are:
 * - Put each function code in a dedicated file (optionally in a directory hierarchy).
 * - Each function file must use the camel case for its name.
 * - Register the path to the function source code for loading by this module.
 * <p>
 * The purpose is to keep each function source code isolated in its own file to
 * ease maintenance. In most of the cases, this solution also provides performance
 * improvements since each function loads only the dependencies it needs.
 * Besides, not all functions are exported to Google Functions runtime, which has
 * small benefits on cold-starts.
 * <p>
 * The code was inspired by discussion started on Medium:
 * https://codeburst.io/organizing-your-firebase-cloud-functions-67dc17b3b0da
 *
 * @param functions A dictionary of functions to export. The key is the path to
 * the source code of the function to export and the value is a boolean that says
 * whether the exportation is enabled or not.
 */
module.exports = (functions) => {

    const camelcase = require('camelcase');

    for (const path in functions) {
        // exports enabled functions only
        if (functions[path]) {
            const functionName = camelcase(...path.slice(0, -3).split('/'));

            if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
                exports[functionName] = require(__dirname + '/' + path);

                if (process.env.FUNCTION_NAME === functionName) {
                    break;
                }
            }
        }
    }

};
