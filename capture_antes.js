import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import http from 'http';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const REPORT_DIR = path.resolve('report_images');
const DIST_DIR = path.resolve('dist');

function startStaticServer(port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png'
  };

  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0].split('#')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(DIST_DIR, reqPath);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        fs.readFile(path.join(DIST_DIR, 'index.html'), (err2, data2) => {
          if (err2) {
            res.writeHead(404);
            res.end('Not found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data2);
          }
        });
      } else {
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(data);
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

async function captureAntes() {
  const server = await startStaticServer(5198);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1200, height: 860, deviceScaleFactor: 1.25 }
  });

  const page = await browser.newPage();

  // MÉDICO ANTES: sem banner, sem sufixo 'anos', sem dicas de formato
  await page.goto('http://127.0.0.1:5198/#cad-medico', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));
  await page.evaluate(() => {
    document.querySelector('.form-instruction-banner')?.remove();
    document.querySelector('.suffix-badge')?.remove();
    document.querySelectorAll('.field-cue-text').forEach(el => el.remove());
  });
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: path.join(REPORT_DIR, 'figura4_medico_antes.png') });
  console.log('✓ Figura 4 (Médico Antes) capturada.');

  // AGENDAMENTO ANTES: sem banner, sem dicas, sem contador de caracteres, link sala virtual ativo no presencial
  await page.goto('http://127.0.0.1:5198/#cad-agendamento', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));
  await page.evaluate(() => {
    document.querySelector('.form-instruction-banner')?.remove();
    document.querySelector('.char-counter')?.remove();
    document.querySelectorAll('.field-cue-text').forEach(el => el.remove());
    // Reabilitar campo de link no presencial para demonstrar a inconsistência anterior
    const inputUrl = document.querySelector('input[type="url"]');
    if (inputUrl) {
      inputUrl.removeAttribute('disabled');
      inputUrl.placeholder = 'https://meet.google.com/exemplo-sala';
    }
  });
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: path.join(REPORT_DIR, 'figura7_agendamento_antes.png') });
  console.log('✓ Figura 7 (Agendamento Antes) capturada.');

  await browser.close();
  server.close();
}

captureAntes().catch(console.error);
