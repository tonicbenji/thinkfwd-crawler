const crawler = require("js-crawler");
const fs = require("fs");
const R = require("ramda");

const settings = {
    root: 'https://astralpool.com.au',
    wait: {
        min: 12,
        max: 71,
        skew: 0
    },
    crawler: {
        depth: Infinity,
        shouldCrawl: (url) => { return R.contains(domain(settings.root), url); }
    }
}

const cl = s => console.log(s);

function randGaussBoxMuller() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5;
    if (num > 1 || num < 0) return randn_bm();
    return num;
}

const domain = url => { return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]; }

const stream = fs.createWriteStream('crawl.txt');

var count = 1;

new crawler()
    .configure(settings.crawler)
    .crawl(settings.root, (page) => {
        stream.write(page.url + '\n');
        setTimeout(() => {
            cl(`Async ${count}. ${page.url}`)
        }, randGaussBoxMuller(settings.wait.min, settings.wait.max, settings.wait.skew));
        count++;
    });
