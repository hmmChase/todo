// https://github.com/prisma/graphql-import/issues/267

const fs = require('fs');
const { importSchema } = require('graphql-import');

const text = importSchema('schema/generated/prisma.graphql');

fs.writeFileSync('schema/schema_prep.graphql', text);
