
const readline = require('readline');
const fs = require('fs');
const { get } = require('http');

        let dataPertanyaan = fs.readFileSync(process.argv[2], "utf-8")
        let data = JSON.parse(dataPertanyaan)

        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: `Tebakan : `
        });

        console.log(`Selemat datang dipermainan tebak-tebakan, kamu akan di berikan pertanyaan dari file ini 'data.json'.`)
        console.log(`gunakan "skip" untuk menggunakan pertanyaan.dan di akhiri pertanyaan akan di tanyakan lagi.`)
        let getSalah = 0
        let temp = 0
        console.log(`pertanyaan : ${data[temp].definition}`)
        rl.prompt()
        rl.on('line', function (line) {
            if (temp < data.length - 1) {
                if (line.toLowerCase() == "skip") {
                    temp++
                    data.push(data[temp - 1])
                    console.log(`pertanyaan selanjutnya`)
                    console.log(`pertanyaan : ${data[temp].definition}`)
                    rl.prompt()
                } else if (line.toLowerCase() !== data[temp].term) {
                    getSalah++
                    console.log(`Anda kurang beruntung! anda telah salah ${getSalah} kali,silakan coba lagi`)
                    rl.prompt()
                } else {
                    temp++
                    console.log(`Selamat anda benar`)
                    console.log(`pertanyaan : ${data[temp].definition}`)
                    rl.prompt()
                }
            } else if (line.toLowerCase() !== data[temp].term) {
                getSalah = 0
                getSalah++
                console.log(`Anda kurang beruntung! anda telah salah ${getSalah} kali,silakan coba lagi`)
                rl.prompt()

            } else {
                console.log(`Anda beruntung`)
                console.log(`Anda berhasil!`)
                process.exit()
            }
        }).on(`close`, () => {
            console.log(`good bye !`)
            process.exit()
        })