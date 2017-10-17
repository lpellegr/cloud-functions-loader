# cloud-functions-exporter

Exports Google Cloud Functions with scale in mind.

This package was inspired by a discussion started on Medium:

https://codeburst.io/organizing-your-firebase-cloud-functions-67dc17b3b0da

## Conventions

The purpose is to keep each function source code isolated in its own file to 
ease maintenance. For the package to work properly, you have to following these 
conventions:
 
  - Put each function code in a dedicated file (optionally in a directory hierarchy).
  - Each function file must use the camel case for its name but also end with `.js`.
  - Register the path to the function source code for loading by this module.
 
In most of the cases, this solution also provides performance improvements since 
each function loads only the dependencies it needs.
Besides, not all functions are exported to Google Cloud Functions runtime, which has
small benefits on cold-starts.

## Usage example

```
require('@noticeable/cloud-functions-loader')({
    'api/env.js': false,
    'api/headers.js': false,
    'auth/onCreate.js': true,
    'auth/onDelete.js': true,
    'firestore/accessTokens/onCreate.js': true,
    'firestore/accessTokens/onDelete.js': true,
    'firestore/pendingWebhookActions/onCreate.js': true,
    'firestore/posts/onCreate.js': true,
    'firestore/posts/onDelete.js': true,
    'firestore/posts/onUpdate.js': true,
    'firestore/projects/onCreate.js': true,
    'firestore/projects/onDelete.js': true,
    'firestore/projects/onUpdate.js': true,
    'firestore/users/onDelete.js': true
});
```
