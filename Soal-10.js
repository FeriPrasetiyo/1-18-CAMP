const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Tulis kalimatmu disini > '
});

rl.prompt();
rl.on('line', sentence => {
    let temp="";
    let splitCarakter =  sentence.split(" ");
    for(let i = 0; i < splitCarakter.length; i++){
        let getCarakterDepan = splitCarakter[i].charAt(0)
        if(getCarakterDepan === "a" || getCarakterDepan === "i" || getCarakterDepan === "u"||getCarakterDepan === "e"||getCarakterDepan === "o"){
            temp += splitCarakter[i]+" "
        }else{
            temp += splitCarakter[i].substr(1)+getCarakterDepan[0]+"nyo"+" "
        }
    }
    console.log(`Hasil konversi: ${temp}`)
    rl.prompt();
}).on('close', () => {
  console.log('Good Bye!');
  process.exit(0);
});