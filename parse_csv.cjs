const fs = require('fs');

const csvData = fs.readFileSync('watchhouse.csv', 'utf8');
const lines = csvData.split(/\r?\n(?=(?:(?:[^"]*"){2})*[^"]*$)/);

if (lines.length > 0) {
    const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, ''));

    const products = lines.slice(1).map((line, i) => {
        if (!line.trim()) return null;

        // Custom simple split that handles quotes
        const r = {};
        const vals = line.match(/(?:^|,)("([^"]|(?:\\"))*"|[^,]*)/g).map(v => v.replace(/^,/, '').replace(/^"|"$/g, '').trim());

        headers.forEach((h, j) => {
            r[h] = vals[j] || '';
        });

        let price = r['text-14-medium'] || r['product-price__prices'] || r['quick-add__price'] || r['quick-add__price 2'] || r['quick-add__price 3'];
        if (!price || price === '') price = '£' + (Math.floor(Math.random() * 20) + 10) + '.00';

        let badgeLeft = '';
        if (r['text-12-medium'] && r['text-12-book']) {
            badgeLeft = `${r['text-12-medium']} ${r['text-12-book']}`.trim();
        } else if (r['text-12-medium']) {
            badgeLeft = r['text-12-medium'].trim();
        }

        return {
            id: i + 1,
            name: (r['text-18-medium'] || `Product ${i + 1}`).replace(/\.$/, ''),
            img: r['product-card__image src'],
            badgeLeft: badgeLeft || null,
            tag1Title: r['ellipsis'] || '',
            tag1Val: r['ellipsis 2'] || '',
            tag2Title: r['ellipsis 3'] || '',
            tag2Val: r['ellipsis 4'] || '',
            price: price
        };
    }).filter(p => p !== null && p.name !== 'Tools for the trade');

    fs.writeFileSync('src/productsData.json', JSON.stringify(products, null, 2));
    console.log('Parsed', products.length, 'products and wrote to productsData.json');
}
