function pola(str) {
    let splitAngka = str.split(" ")
    let angkaPertama = splitAngka[0]
    let angkaKedua = splitAngka[2]
    let angkaKetiga = splitAngka[4]

    let result = [];

  for (let i = 0; i < 10; i++) {
    let getAnkaPertama = angkaPertama.replace("#", i);
    for (let j = 0; j < 10; j++) {
      let getAngkaKedua = angkaKetiga.replace("#", j);
      if (Number(getAnkaPertama) * angkaKedua === Number(getAngkaKedua)) {
        result.push(i, j);
      }
    }
  }
  return result
}

console.log(pola("42#3 * 188 = 80#204"))
console.log(pola("8#61 * 895 = 78410#5"))