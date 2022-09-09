const readline = require('readline');
const fs = require('fs');

let dataPertanyaan = fs.readFileSync('data.json', "utf-8")
let data = JSON.parse(dataPertanyaan)

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `Tebakan : `
})

console.log(`Selemat datang dipermainan tebak kata, silakan isi dengan jawaban yang benar ya !`)

let temp = 0
console.log(`pertanyaan : ${data[temp].definition}`)
rl.prompt()
rl.on('line', function (line) {
    if (temp < data.length - 1) {
        if (line.toLowerCase() !== data[temp].term) {
            console.log(`jawaban anda kurang tepat`)
            rl.prompt()
        } else {
            temp++
            console.log(`Selamat anda benar`)
            console.log(`pertanyaan : ${data[temp].definition}`)
            rl.prompt()
        }
    } else if (line.toLowerCase() !== data[temp].term) {
        console.log(`jawaban anda kurang tepat`)
        rl.prompt()

    } else {
        console.log(`jawaban anda benar`)
        console.log(`Hore anda menang !`)
        process.exit()
    }
}).on(`close`, () => {
    console.log(`good bye !`)
    process.exit()
})