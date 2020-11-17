const fs = require('fs');
const url = require('url');
const http = require('http');
const https = require('https');

module.exports = (bot, opt) => {

    const token = '/' + bot.token;

    const host = opt.host || '0.0.0.0';
    const port = opt.port || 443;
    const path = url.parse(opt.url).pathname;
   const key = opt.key && fs.readFileSync(opt.key);
    const cert = opt.cert && fs.readFileSync(opt.cert);

    // Create server
    const server = key && cert ?
        https.createServer({key, cert}, listener) :
        http.createServer(listener);

    // Start server
    server.listen(port, host, () => {
        if (bot.logging) {
            console.log(`[bot.webhook] started${key ? ' secure' : ''} server on "${host}:${port}"`);
        }
    });
    var options_01 = {
        path = '/data',
        method: 'POST'
    }
    var body_01 ="";
    const req_01 = https.request(options_01, (res) => {
        res.on('data', (d) => body_01 += data)
    });
    req_01.on('end', () => {
        try {
            const update_01 = JSON.parse(body);
            console.log(update_01);
        } catch (error) {
            console.log("error_01: "+error);
        }
    })

    // Request listener
    function listener(req, res) {

        const botUrl = path && path !== '/' ? path : '';
        const fullPath = botUrl + token;
        // logica de prueba
        console.log('la url=>'+req.url);
        //console.log('el token=>'+fullPath);
        //console.log(req);
        
        if (req.url === fullPath && req.method === 'POST') {

            let body = '';

            req.on('data', (data) => body += data);
            req.on('end', () => {
                try {
                    const update = JSON.parse(body);
                    //console.log(body);
                    bot.receiveUpdates([update]).then(() => res.end());
                } catch (error) {
                    if (bot.logging) {
                        console.log('[bot.error.webhook]', error);
                    }
                    res.end();
                }

            });

        }

        // ruta que recive parametros para accionar el bot
        var wev1 = req.url;
        var wev = wev1.startsWith('/--data--');
        if(wev && req.method === 'POST'){
            let body = '';

            req.on('data', (data) => body += data);
            req.on('end', () => {
                try {
                    const update = JSON.parse(body);
                    console.log(body);
                } catch (error) {
                    if (bot.logging) {
                        console.log('[bot.error.webhook]', error);
                    }
                    res.end();
                }
            });
        }

    }//end listener
    
  

};
