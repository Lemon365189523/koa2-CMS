module.exports = async ( ctx ) => {
  const title = '首页'
  console.log('====================================');
  console.log(ctx);
  console.log('====================================');
  await ctx.render('index', {
    title
  })
}