var CryptoJS = require("crypto-js");

export function encrypt(password, key){
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(password), key).toString();
    return ciphertext;
}

export function decrypt(ciphertext, key){
    var bytes = CryptoJS.AES.decrypt(ciphertext, key);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}

export function passwordDisplay(password){
    var passwordEncrypt = ""
    for (var i = 0; i < password.length; i++){
        passwordEncrypt += "*"
    }
    return passwordEncrypt
}

export function setCharAt(str, index, char){
    if (index> str.length - 1){
        return str;
    }
    return str.substring(0, index) + char + str.substring(index + 1);
}