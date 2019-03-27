const Query = {
  async users(parent, args, ctx, info) {
    return ctx.db.query.users({}, info);
  }
};

module.exports = Query;
