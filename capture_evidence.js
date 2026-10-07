import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import http from 'http';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const REPORT_DIR = path.resolve('report_images');
const DIST_DIR = path.resolve('dist');

if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

// 1. Copiar imagem do ANTES original de Paciente enviada pelo usuário
const antesPacienteOriginal = 'C:\\Users\\zero\\.gemini\\antigravity\\brain\\055203af-60f5-4de2-a5fb-b2a756ab924d\\.user_uploaded\\media_1791404338293.png';
if (fs.existsSync(antesPacienteOriginal)) {
  fs.copyFileSync(antesPacienteOriginal, path.join(REPORT_DIR, 'figura1_paciente_antes.png'));
  console.log('✓ Figura 1 (Paciente Antes) copiada.');
}

// 2. Copiar imagem do ANTES original de Agendamento enviada pelo usuário
const antesAgendamentoOriginal = 'C:\\Users\\zero\\.gemini\\antigravity\\brain\\055203af-60f5-4de2-a5fb-b2a756ab924d\\.user_uploaded\\media_1791345773687.png';
if (fs.existsSync(antesAgendamentoOriginal)) {
  fs.copyFileSync(antesAgendamentoOriginal, path.join(REPORT_DIR, 'figura7_agendamento_antes.png'));
  console.log('✓ Figura 7 (Agendamento Antes) copiada.');
}

// Servidor estático simples embutido
function startStaticServer(port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.svg': 'image/svg+xml'
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
    server.listen(port, '127.0.0.1', () => {
      console.log(`Servidor local ativo na porta ${port}`);
      resolve(server);
    });
  });
}

async function capture() {
  const server = await startStaticServer(5199);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1200, height: 860, deviceScaleFactor: 1.25 }
  });

  const page = await browser.newPage();

  // Aceitar automaticamente qualquer diálogo nativo (confirm, alert, prompt)
  page.on('dialog', async (dialog) => {
    console.log(`Diálogo nativo interceptado: [${dialog.type()}] ${dialog.message()}`);
    await dialog.accept();
  });

  // Helper para navegar e aguardar
  async function goToHash(hash) {
    await page.goto(`http://127.0.0.1:5199/#${hash}`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));
  }

  // --- PACIENTE ---
  console.log('Capturando: Paciente Depois (limpo / foco inicial)...');
  await goToHash('cad-paciente');
  await page.screenshot({ path: path.join(REPORT_DIR, 'figura2_paciente_depois.png') });

  console.log('Capturando: Paciente Erros (validação inline + painel)...');
  await page.evaluate(() => {
    const btnSalvar = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Salvar'));
    if (btnSalvar) btnSalvar.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(REPORT_DIR, 'figura3_paciente_erros.png') });

  console.log('Capturando: Paciente Desfazer (banner undo)...');
  await page.evaluate(() => {
    const input = document.querySelector('input[type="text"]');
    if (input) {
      input.value = 'Carlos Eduardo Lima';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const btnLimpar = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Limpar'));
    if (btnLimpar) btnLimpar.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(REPORT_DIR, 'figura4_paciente_undo.png') });

  // --- MÉDICO ---
  console.log('Capturando: Médico Depois...');
  await goToHash('cad-medico');
  await page.screenshot({ path: path.join(REPORT_DIR, 'figura5_medico_depois.png') });

  console.log('Capturando: Médico Erros...');
  await page.evaluate(() => {
    const btnSalvar = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Salvar'));
    if (btnSalvar) btnSalvar.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(REPORT_DIR, 'figura6_medico_erros.png') });

  // --- AGENDAMENTO ---
  console.log('Capturando: Agendamento Presencial (Sala virtual desabilitada)...');
  await goToHash('cad-agendamento');
  await page.screenshot({ path: path.join(REPORT_DIR, 'figura8_agendamento_presencial.png') });

  console.log('Capturando: Agendamento Telemedicina (Sala virtual habilitada)...');
  await page.evaluate(() => {
    const radioTele = Array.from(document.querySelectorAll('input[type="radio"]')).find(r => r.value === 'Telemedicina');
    if (radioTele) radioTele.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(REPORT_DIR, 'figura9_agendamento_telemedicina.png') });

  console.log('Capturando: Agendamento Contador e Erros...');
  await page.evaluate(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.value = 'Paciente refere quadro agudo de enxaqueca com dor em aperto temporal esquerdo, acompanhada de fonofobia e náuseas pós-prandiais.';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const btnSalvar = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Agendar') || b.textContent.includes('Salvar'));
    if (btnSalvar) btnSalvar.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(REPORT_DIR, 'figura10_agendamento_contador_erros.png') });

  await browser.close();
  server.close();
  console.log('Todas as evidências capturadas com sucesso!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
