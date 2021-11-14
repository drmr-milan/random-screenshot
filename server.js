const express = require('express');
const helmet = require("helmet");
const path = require('path');
const puppeteer = require('puppeteer');
const PORT = process.env.PORT || 5515;

const app = express();
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives:{
            defaultSrc:["'self'",'image.prntscr.com','i.imgur.com','fonts.googleapis.com','fonts.gstatic.com']
        } 
    })
);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/run', async(req, res) => {
    let url_base = `http://prnt.sc/`;
    let new_link = ''; console.log('start');

    (async () => {
        const browser = await puppeteer.launch();

        const page = await browser.newPage(); let random = randomGenerator();
        await page.goto(`${url_base}${random}`);
        const issueSrcs = await page.evaluate(() => {
            const srcs = document.getElementById("screenshot-image").getAttribute("src")
            return srcs;
        });
        console.log(issueSrcs)

        new_link = issueSrcs.slice(7);
        await browser.close();
        console.log("End")
        res.redirect(`http://localhost:5515?l=${new_link}`)
    })();    
})

function randomGenerator() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return `${alphabet[Math.floor(Math.random() * alphabet.length)]}${alphabet[Math.floor(Math.random() * alphabet.length)]}${Math.floor(1000 + Math.random() * 9000)}`;
}

