const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const errorColor = '\x1b[31m%s\x1b[0m';
const checkSign = '\u{2705}';
const crossSign = '\u{274C}';


require('dotenv').config({ path: '.env' });



const mapboxKey = process.env.MAPBOX_KEY;

if (!mapboxKey) {
  console.error(errorColor, `${crossSign} ERROR: MAPBOX_KEY not found in environment variables`);
  console.error('Make sure you have:');
  console.error('1. Created .env file with MAPBOX_KEY=your_key');
  console.error('2. Or set MAPBOX_KEY in Vercel Environment Variables');
  process.exit(1);
}

console.log(successColor, `${checkSign} Found MAPBOX_KEY: ${mapboxKey.substring(0, 10)}...`);

const envDevFile = `export const environment = {
  production: false,
  apiUrl: 'https://bouquetbarcelona-backend.onrender.com',
  mapboxKey: '${mapboxKey}',
};
`;

const targetDevPath = path.join(__dirname, './src/environments/environment.development.ts');

fs.writeFileSync(targetDevPath, envDevFile);
console.log(successColor, `${checkSign} Generated environment.development.ts`);

const envProdFile = `export const environment = {
  production: true,
  apiUrl: 'https://bouquetbarcelona-backend.onrender.com',
  mapboxKey: '${mapboxKey}',
};
`;

const targetProdPath = path.join(__dirname, './src/environments/environment.ts');

fs.writeFileSync(targetProdPath, envProdFile);
console.log(successColor, `${checkSign} Generated environment.ts`);

