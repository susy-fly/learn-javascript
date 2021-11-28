// koa2是一个class所以 要开始字母大写
const Koa = require('koa');

const app = new Koa();

// 对于任何请求 app将调用该异步函数处理请求
// ctx 由koa传入的封装了request和responese的变量 
// next是koa传入的将要处理的一下个异步函数
// 每个async函数都可以做自己的事情 每个异步函数称为 中间件（use的顺序 决定了中间件的顺序）
app.use(async (ctx, next) => {
    const start = new Date().getTime();
    // 处理下一个异步函数
    await next();
    const ms = new Date().getTime() - start;
    console.log(`${ctx.request.method} ${ctx.request.url}: ${ms}ms`);
    ctx.response.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
    await next();
    // 设置response的Content-Type和内容
    // ctx.response.type 相当于 ctx.type
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

// 在端口3000监听
app.listen(3000);
console.log('app started at port 3000...');
