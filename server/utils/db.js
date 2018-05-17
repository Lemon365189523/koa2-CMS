const mongoose = require('mongoose');

let uri = 'mongodb://localhost:27017/FWJ-CMS';


//链接成功
mongoose.connection.on('on',function(){
    console.log('Mongoose链接成功: ' + uri)
})

// 连接失败
mongoose.connection.on('error', function(err) {
    console.log('Mongoose 连接失败: ' + err);
});

// 断开连接
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose 断开连接');
});


var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' },
  user: 'myUserName',
  pass: 'myPassword'
}

console.log('db:' + uri);
// mongoose.connect(uri,options);
mongoose.connect(uri);
