  /* 当token验证异常时候的处理，如token过期、token错误 */
  module.exports = async (ctx , next) => {
    return next().catch((err) => {
        console.log('----报错------');
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                success: false,
                message: err.originalError ? err.originalError.message : err.message
            }
            console.log('401 code');
            // const title = 'admin page'
            // ctx.render('admin', {
            //   title,
            // })
        } else {
          console.log('====================================');
          console.log(err);
          console.log('====================================');
          throw err;
        }
    });
}