const fs = require('fs');
const { importSchema } = require('graphql-import');
const text = importSchema('src/generated/prisma.graphql');
fs.writeFileSync('src/schema_prep.graphql', text);
