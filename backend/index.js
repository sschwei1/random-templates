const Koa = require('koa');
const proxy = require('koa-proxy');
const Router = require('@koa/router');
const bodyParser = require('koa-body');
const { PrismaClient } = require('@prisma/client');

const app = new Koa();
const router = new Router();
const prisma = new PrismaClient();

router.use('/api', async (ctx, next) => {
  console.log('--------------');
  const bodySchema = {payload: null, error: null};

  try {
    await next();
    bodySchema.payload = ctx.body;
  } catch(e) {
    bodySchema.error = e;
    console.log('error', e)
  }

  ctx.body = bodySchema;
});

router.get('/api/user/list', async (ctx) => {
  const filter = ctx.request.query;
  console.log('filter', filter);

  let {ageMin, ageMax} = filter;

  ageMin = Number(ageMin);
  ageMax = Number(ageMax);

  ageMin = isNaN(ageMin) ? 0 : ageMin;
  ageMax = isNaN(ageMax) ? 999 : ageMax;

  if(ageMin > ageMax) {
    let tmp = ageMax;
    ageMax = ageMin;
    ageMin = tmp;
  }

  ctx.body = await prisma.$queryRaw`SELECT * from user WHERE user.age >= ${ageMin} AND user.age <= ${ageMax}`;
});

router.post('/api/user/add', async (ctx) => {
  const userInformation = ctx.request.body;
  console.log('userInformation', userInformation);

  userInformation.birthday = new Date(userInformation.birthday);

  ctx.body = await prisma.user.create({
    data: userInformation
  });
})

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(proxy({
    host: 'http://127.0.0.1:3000'
  }));


app.listen(4000);