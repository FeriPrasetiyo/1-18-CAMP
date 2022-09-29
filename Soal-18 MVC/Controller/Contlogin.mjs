import ViewLogin from "../View/viewlogin.mjs"
import Utama, { rl } from "../Soal-18MVC.mjs"
import ModelLogin from "../Model/ModelLogin.mjs"

export default class users {
    static username() {
        rl.question('username : ', (username) => {
            ModelLogin.findUser(username, (err, data) => {
                if (err) {
                    console.log(`gagal ambil data users`, err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`user name tidak terdaftar`)
                    users.username()
                }
                users.password(data[0])
            })
        })
    }

    static password(user) {
        rl.question('password : ', (Password) => {
            if (Password == user.Password) {
                ViewLogin.line()
                console.log(`welcome, ${user.username}. Your acces level is : ${user.role.toUpperCase()}`)
                Utama.home()
            } else {
                console.log(`password yang anda masukan salah`)
                users.password(user)
            }
        })
    }
}