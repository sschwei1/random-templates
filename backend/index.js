const Koa = require('koa');
const proxy = require('koa-proxy');
const Router = require('@koa/router');
const bodyParser = require('koa-body');
const { PrismaClient } = require('@prisma/client');

const app = new Koa();
const router = new Router();
const prisma = new PrismaClient();

router.get('/api/userList', async (ctx) => {
  console.log('ctx', ctx.request.query);
  ctx.body = await prisma.user.findMany();
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(proxy({
    host: 'http://127.0.0.1:3000'
  }));


app.listen(4000);