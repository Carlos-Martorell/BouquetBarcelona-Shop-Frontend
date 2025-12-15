const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';


require('dotenv').config({ path: '.env' });


const mapboxKey = process.env.MAPBOX_KEY || '';

const envDevFile = `export const environment = {
  production: false,
  apiUrl: 'https://bouquetbarcelona-backend.onrender.com',
  mapboxKey: '${mapboxKey}',
};
`;

const targetDevPath = path.join(__dirname, './src/environments/environment.development.ts');

fs.writeFile(targetDevPath, envDevFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Generated environment.development.ts`);
  }
});


const envProdFile = `export const environment = {
  production: true,
  apiUrl: 'https://bouquetbarcelona-backend.onrender.com',
  mapboxKey: '${mapboxKey}',
};
`;

const targetProdPath = path.join(__dirname, './src/environments/environment.ts');

fs.writeFile(targetProdPath, envProdFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Generated environment.ts`);
  }
});