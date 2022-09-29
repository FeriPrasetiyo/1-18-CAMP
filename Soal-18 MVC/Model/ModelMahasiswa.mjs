import { db } from "../Soal-18MVC.mjs";

export default class ModelMahasiswa {
    static daftarMhs(callback) {
        db.all('SELECT * FROM Mahasiswas join Jurusans on Mahasiswas.Jurusan = Jurusans.id_jurusan', (err, data) => {
            callback(err, data)
        })
    }
    static cariMhs(Nim, callback) {
        db.all('SELECT * FROM mahasiswas WHERE mahasiswas.nim = ?', [Nim], (err, data) => {
            callback(err, data)
        })
    }
    static tambahMhs(Nim, Nama, Alamat, Jurusan, dob, callback) {
        db.run('INSERT INTO Mahasiswas VALUES (?, ?, ?, ?, ?)', [Nim, Nama, Alamat, Jurusan, dob], (err) => {
            callback(err)
        })
    }
    static hapusMhs(Nim, callback) {
        db.all('DELETE FROM Mahasiswas WHERE Mahasiswas.Nim = ?', [Nim], (err) => {
            callback(err)
        })
    }
}