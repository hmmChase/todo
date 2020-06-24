// https://github.com/prisma/graphql-import/issues/267
// https://spectrum.chat/zeit/now/v2-no-such-file-or-directory-graphql-schema-files~71053e4b-c98a-4d97-90c7-8b69f8dcf513

const fs = require('fs');
const { importSchema } = require('graphql-import');

const text = importSchema('schema/generated/prisma.graphql');

fs.writeFileSync('schema/schema_prep.graphql', text);
