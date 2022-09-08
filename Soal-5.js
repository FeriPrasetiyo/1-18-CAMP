function stringManipulation(word) {
    let latter = word.charAt(0)
    if(latter === "a" || latter === "i" || latter === "u" ||latter === "e" || latter ==="o"||latter === "A" || latter ==="I" || latter ==="U" ||latter==="E"||latter==="O"){
        return`${word}`
    }else{
        return`${word.substr(1)}${word[0]}nyo`
        }   
}
console.log(stringManipulation("ITIK"))
console.log(stringManipulation("bebek"))
