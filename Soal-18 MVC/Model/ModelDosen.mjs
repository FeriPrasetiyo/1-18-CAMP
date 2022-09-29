import { db } from "../Soal-18MVC.mjs";


export default class modelDosen {
    static daftarDosen(callback) {
        db.all('SELECT * FROM Dosens', (err, data) => {
            callback(err, data)
        })
    }
    static cariDosen(Nip, callback) {
        db.all('SELECT * FROM Dosens WHERE Dosens.Nip = ?', [Nip], (err, data) => {
            callback(err, data)
        })
    }
    static tambahDosen(Nip, Nama_dosen, callback) {
        db.run('INSERT INTO Dosens VALUES (?, ?)', [Nip, Nama_dosen], (err) => {
            callback(err)
        })
    }
    static hapusDosen(Nip, callback) {
        db.all('DELETE FROM Dosens WHERE Dosens.Nip = ?', [Nip], (err) => {
            callback(err)
        })
    }
}