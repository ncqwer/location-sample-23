/* eslint-disable no-undef */
const Koa = require('koa');
const { PassThrough } = require('stream');
const EventEmitter = require('events');
const bodyParser = require('koa-bodyparser');

const events = new EventEmitter();
events.setMaxListeners(0);

new Koa()
    .use(require('@koa/cors')())
    .use(async (ctx, next) => {
        if (ctx.path !== '/sse') {
            return await next();
        }

        ctx.request.socket.setTimeout(0);
        ctx.req.socket.setNoDelay(true);
        ctx.req.socket.setKeepAlive(true);

        // 由于长链接的需求，我们需要手动设置相关标识来告诉koa这是一个长链接。
        ctx.set({
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        });

        const stream = new PassThrough();
        ctx.status = 200;
        ctx.body = stream;

        const listener = (data) => {
            let content;
            if (data.type === 'json') {
                content = JSON.stringify(data.content);
                console.log('%c [ content ]-39', 'font-size:13px; background:pink; color:#bf2c9f;', content);
            } else {
                content = `${data}`;
            }
            stream.write(`data: ${content}\n\n`);
        };

        events.on('data', listener);

        stream.on('close', () => {
            events.off('data', listener);
        });
    })
    .use(bodyParser())
    .use((ctx, next) => {
        if (ctx.path !== '/send') return next();
        events.emit('data', { type: 'json', content: ctx.request.body });
        ctx.status = 200;
    })
    .use((ctx) => {
        ctx.status = 200;
        ctx.body = 'ok';
    })
    .listen(3000, () => console.log('Listening'));
