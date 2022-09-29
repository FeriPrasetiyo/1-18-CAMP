import { db } from "../Soal-18MVC.mjs"

export default class ModelLogin {
    static findUser(username, callback) {
        db.all('SELECT * FROM user WHERE user.username = ?', [username], (err, data) => {
            callback(err, data)
        })
    }
}