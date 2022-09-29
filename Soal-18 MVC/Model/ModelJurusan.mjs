import { db } from "../Soal-18MVC.mjs";

export default class ModelJurusan {
    static daftarJurusan(callback) {
        db.all('SELECT * FROM Jurusans', (err, data) => {
            callback(err, data)
        })
    }
    static cariJurusan(id_jurusan, callback) {
        db.all('SELECT * FROM Jurusans WHERE Jurusans.id_jurusan = ?', [id_jurusan], (err, data) => {
            callback(err, data)
        })
    }
    static tambahJurusan(id_jurusan, Nama_Jurusan, callback) {
        db.run('INSERT INTO Jurusans VALUES (?, ?)', [id_jurusan, Nama_Jurusan], (err) => {
            callback(err)
        })
    }
    static hapusJurusan(id_jurusan, callback) {
        db.all('DELETE FROM Jurusans WHERE Jurusans.id_jurusan = ?', [id_jurusan], (err) => {
            callback(err)
        })
    }

}