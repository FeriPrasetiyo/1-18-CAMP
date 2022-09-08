function indexPrime(num) {
    let result = [];
    for (let i=2;i; i++) {
        let prime=true
        for (let j=2; j<i; j++) {
            if(i%j===0){
                prime=false
                break;
            }
        }
        if(prime){
            result.push(i)
        }
        if(result.length==num){
            break;
        }
    }
    result.push[result.length-1]
    return result[result.length-1]
}
console.log(indexPrime(4)) //result => 7
console.log(indexPrime(500)) //result => 3571
console.log(indexPrime(37786)) //result => 450881