import fs from 'fs';

const data = fs.readFileSync('c:\\Aquacomply logicrest\\enterprise-ui.html', 'utf8');
let parenCount = 0;
let braceCount = 0;
let tagCount = 0;

// simple check
const stack = [];
for (let i = 0; i < data.length; i++) {
    if (data[i] === '(') stack.push({char: '(', line: data.slice(0, i).split('\n').length});
    if (data[i] === '{') stack.push({char: '{', line: data.slice(0, i).split('\n').length});
    if (data[i] === ')') {
        if (stack.length && stack[stack.length - 1].char === '(') stack.pop();
        else console.log("Unmatched ) at line", data.slice(0, i).split('\n').length);
    }
    if (data[i] === '}') {
        if (stack.length && stack[stack.length - 1].char === '{') stack.pop();
        else console.log("Unmatched } at line", data.slice(0, i).split('\n').length);
    }
}
console.log("Remaining stack:", stack.map(s => s.char + '@' + s.line));
