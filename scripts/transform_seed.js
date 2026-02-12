
const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '../convex/seed.ts');
const content = fs.readFileSync(seedPath, 'utf8');

// Regex to find specs object blocks: specs: { ... }
// We use a regex specific to the formatting in the file
const newContent = content.replace(/specs:\s*\{([\s\S]*?)\}/g, (match, body) => {
    // Parse the body lines
    const lines = body.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            // Extract key and value: "Key": "Value" or "Key": "Value",
            const parts = line.match(/"([^"]+)":\s*"([^"]+)"/);
            if (parts) {
                return `      { label: "${parts[1]}", value: "${parts[2]}" }`;
            }
            return null;
        })
        .filter(Boolean);

    if (lines.length > 0) {
        return `specs: [\n${lines.join(',\n')}\n    ]`;
    }

    // Create generic fallback for single line or other formats
    // Attempt to parse single line specs: specs: { "A": "B", "C": "D" }
    const singleLineParts = [];
    const regex = /"([^"]+)":\s*"([^"]+)"/g;
    let m;
    while ((m = regex.exec(body)) !== null) {
        singleLineParts.push(`{ label: "${m[1]}", value: "${m[2]}" }`);
    }
    if (singleLineParts.length > 0) {
        return `specs: [${singleLineParts.join(', ')}]`;
    }

    return match; // fallback if no match
});

fs.writeFileSync(seedPath, newContent, 'utf8');
console.log('Successfully transformed specs objects to arrays in seed.ts');
