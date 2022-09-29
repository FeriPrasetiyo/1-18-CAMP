import { db } from "../Soal-18MVC.mjs";

export default class ModelReport {
    static daftarReport(callback) {
        db.all('SELECT * FROM Report', (err, data) => {
            callback(err, data)
        })
    }
    static cariReport(id_report, callback) {
        db.all('SELECT * FROM Report WHERE Report.id = ?', [id_report], (err, data) => {
            callback(err, data)
        })
    }
    static tambahReport(id, Nim, id_matakuliah, Nip, id_jurusan, Nilai, callback) {
        db.run('INSERT INTO Report VALUES (?, ?, ?, ?, ?, ?)', [id, Nim, id_matakuliah, Nip, id_jurusan, Nilai], (err) => {
            callback(err)
        })
    }
    static hapusReport(id_report, callback) {
        db.all('DELETE FROM Report WHERE Report.id = ?', [id_report], (err) => {
            callback(err)
        })
    }
}