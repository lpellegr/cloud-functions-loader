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
