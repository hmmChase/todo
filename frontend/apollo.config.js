module.exports = {
  client: {
    excludes: ['**/__tests__/**/*'],

    service: {
      name: 'hmmgraphql',
      localSchemaFile: '../backend/prisma/schema.prisma'
    }
  }
};
