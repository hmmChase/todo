const fs = require('fs');
const { importSchema } = require('graphql-import');
const text = importSchema('src/schema/generated/prisma.graphql');
fs.writeFileSync('src/schema/schema_prep.graphql', text);
