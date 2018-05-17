


class AdminCotroller{

  async indexPage ( ctx ) {
    const title = 'admin page'
    await ctx.render('admin', {
      title,
    })
  }

}

module.exports = new AdminCotroller();