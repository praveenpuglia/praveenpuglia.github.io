---
layout: post
title: My GraphQL Schema & Types Generation Workflow
date: 2021-01-26
tags: [graphql, typescript]
---

At [Voicezen](https://voicezen.ai), we use multiple GraphQL endpoints. We also use Vue with TypeScript. Naturally, we need type definitions for everything the endpoints expose.

We end up needing both the schema from an [Introspection Query](https://graphql.org/learn/introspection/) and the types to use in TypeScript land. The schema is used to build a tool that dynamically builds a UI for running queries / mutations from the UI itself based on the parameters they accept. More on the tool may be in a later post.

We have an opinionated setup and like to have our types generated in a certain way. Examples -

- Enums should be UPPERCASE and separated by underscores.
- We prefer interfaces over types.

We keep the generated types & schema at **/src/graphql/types** directory.

We use **.env** file to store the endpoint details in environment variables. This not only helps us with schema generation but also with the [Vue Apollo](https://apollo.vuejs.org/) setup.

[GraphQL Code Generator](https://graphql-code-generator.com/) helps us with all of this. Here are the packages we use & for convenience we have a script to run the generator.

```json
"devDependencies": {
  "@graphql-codegen/cli": "^1.7.0",
  "@graphql-codegen/introspection": "^1.18.0",
  "@graphql-codegen/typescript": "1.7.0",
},
"scripts": {
  "gql:setup": "node ./scripts/gen-gql-types.js",
}
```

The actual generator is the **gen-gql-types.js**. You can keep it anywhere but we prefer to keep it in the project root inside **scripts** directory.

Here's what the **.env** file looks like.

```bash
VUE_APP_GRAPHQL_SAMURAI=http://localhost:8001/samurai
VUE_APP_GRAPHQL_NINJA=http://localhost:8001/ninja
VUE_APP_GRAPHQL_DORAEMON=http://localhost:8001/doraemon
```

Finally, the generator script.

```js
// Imports
const generate = require("@graphql-codegen/cli").generate;
const dotenv = require("dotenv-flow");
const chalk = require("chalk");

// We use dotenv to get access to the current environment variables.
const envVars = dotenv.config().parsed;
if (envVars.error) {
  throw envVars.error;
}

// From the variables, we pick all the variables that start with
// VUE_APP_GRAPHQL
const gqlEndpoints = Object.keys(envVars).filter((key) =>
  key.startsWith("VUE_APP_GRAPHQL")
);

function generateTypes() {
  const dir = `${process.cwd()}/src/graphql/types`;
  console.log(
    chalk.bgBlueBright(chalk.black(`Output directory set to : ${dir}`))
  );

  gqlEndpoints.forEach((entry) => {
    const endpoint = entry.substring(16).toLowerCase();

    const typesPath = `${dir}/${endpoint}.ts`;
    const schemaPath = `${dir}/${endpoint}.json`;

    console.log(
      `Generating GraphQL Types for ${endpoint} in - ${chalk.bold.blue(
        endpoint
      )}.ts`
    );
    console.log(
      `Generating GraphQL Schema for ${endpoint} in - ${chalk.bold.blue(
        endpoint
      )}.json`
    );
    generate(
      // GraphQL Codegen Configuration
      {
        overwrite: true,
        schema: `${envVars[entry]}/graphql`,
        config: {
          declarationKind: "interface",
          skipTypename: true,
          namingConvention: {
            typeNames: "change-case#pascalCase",
            enumValues: "upper-case#upperCase",
            transformUnderscore: true,
          },
        },
        generates: {
          [typesPath]: {
            plugins: ["typescript"],
          },
          [schemaPath]: {
            plugins: ["introspection"],
          },
        },
      },
      true
    )
      .then(() => {
        console.log(
          chalk.green(
            `Finished types & schema generation for ${chalk.bold.greenBright(
              endpoint
            )} endpoint.`
          )
        );
      })
      .catch(() => {
        console.log(
          chalk.red(
            `Types & schema generation failed for ${chalk.bold.redBright(
              endpoint
            )} endpoint.`
          )
        );
      });
  });
}

generateTypes();
```

Every time we build the project, we run the **gql:setup** script as a prerequisite and it fetches the latest schema and types for us to work with.

This setup gives us good control over what sort of code we want to generate. It plays nice with multiple graphql endpoints as well since all we have to do to is add an entry in **.env** file and re-run the script.

We also use some [chalk](https://www.npmjs.com/package/chalk) magic for colorful logging in console.

Hope this helps and if it does, do let me know in the comments.
