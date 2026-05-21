const fs = require('fs');
let text = fs.readFileSync('watchhouse.csv', 'utf8');

function parseCSV(str) {
    let arr = [];
    let quote = false;
    let row = [];
    let col = '';
    for (let c = 0; c < str.length; c++) {
        let cc = str[c], nc = str[c + 1];
        if (cc == '\"' && quote && nc == '\"') { col += cc; ++c; continue; }
        if (cc == '\"') { quote = !quote; continue; }
        if (cc == ',' && !quote) { row.push(col); col = ''; continue; }
        if ((cc == '\r' || cc == '\n') && !quote) {
            if (cc == '\r' && nc == '\n') ++c;
            row.push(col); arr.push(row); row = []; col = ''; continue;
        }
        col += cc;
    }
    if (col || row.length) { row.push(col); arr.push(row); }
    return arr;
}

const data = parseCSV(text);
const products = [];

for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row.length < 15) continue;
    if (!row[0].includes('http')) continue;

    // Format the name by stripping trailing dot
    let name = row[5] ? row[5].trim() : "Unknown";
    if (name.endsWith('.')) name = name.slice(0, -1);

    products.push({
        id: i,
        name: name,
        img: row[4],
        badgeLeft: row[2] && row[3] ? `${row[2]} ${row[3]}` : null,
        tag1Title: row[6],
        tag1Val: row[7],
        tag2Title: row[8],
        tag2Val: row[9],
        price: row[13]
    });
}
fs.writeFileSync('src/productsData.json', JSON.stringify(products, null, 2));
console.log("Written items:", products.length);
