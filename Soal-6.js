function sentencesManipulation(sentence) {
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
    console.log(temp)
}
sentencesManipulation("ibu pergi ke pasar bersama aku")