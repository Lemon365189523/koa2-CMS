module.exports = {

  async indexPage ( ctx ) {
  const title = 'work页面'
  await ctx.render('work', {
    title,
  })
    //   // 没有登录态则跳转到错误页面
    //   ctx.redirect('/error')
  },

}