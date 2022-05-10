const http = require('http');
const crypto = require('crypto');
const falso = require('@ngneat/falso');

const port = process.argv[2] || 3000;
let data = [];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const commonHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT',
  'Access-Control-Allow-Headers':
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  'Access-Control-Max-Age': 2592000,
};

const generateData = (limit) =>
  [...Array(limit)]
    .map(() => ({
      product_id: crypto.randomUUID(),
      name: `${falso.randProductName()} by ${falso.randFullName()}`,
      desc: falso.randProductDescription(),
    }))
    //.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    .sort((a, b) => a.name.localeCompare(b.name));

const getPayload = (req) =>
  new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const route = url.pathname;
  const method = req.method;
  const params = url.searchParams;

  if (method === 'OPTIONS') {
    res.writeHead(200, commonHeaders);
    res.end();
    return;
  }

  if (method === 'GET' && route === '/products') {
    await delay(500);
    res.writeHead(200, {
      ...commonHeaders,
      'Content-Type': 'application/json',
    });
    const page = Number(params.get('p'));
    const itemsPerPage = Number(params.get('perPage'));
    const offset = (page - 1) * itemsPerPage;
    const query = (params.get('q') || '').toLowerCase();
    const filtered = query
      ? data.filter((p) => p.name.toLowerCase().includes(query))
      : data;

    res.write(
      JSON.stringify({
        products: filtered.slice(offset, offset + itemsPerPage),
      })
    );
    res.end();
    return;
  }

  if (method === 'PUT' && route === '/products') {
    await delay(500);

    const newProduct = await getPayload(req);

    if (newProduct.product_id) {
      const index = data.findIndex(
        (p) => p.product_id === newProduct.product_id
      );
      if (index !== -1) {
        Object.assign(newProduct, { ...data[index], ...newProduct });
        data.splice(index, 1);
      }
    } else {
      Object.assign(newProduct, {
        product_id: crypto.randomUUID(),
        name: '',
        desc: '',
        ...newProduct,
      });
    }
    data.push(newProduct);
    data.sort((a, b) => a.name.localeCompare(b.name));

    res.writeHead(200, {
      ...commonHeaders,
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(newProduct));
    res.end();
    return;
  }

  res.writeHead(404, commonHeaders);
  res.end();
});

const start = () => {
  console.log('Generating data');
  data = generateData(100);
  console.log(`Listening on port ${port}`);
  server.listen(port);
};

const shutdown = () => {
  console.log('Shutting down');
  server.close();
  process.exit();
};

process.on('SIGINT', shutdown);

start();
