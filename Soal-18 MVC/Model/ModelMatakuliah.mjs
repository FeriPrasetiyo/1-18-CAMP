import { db } from "../Soal-18MVC.mjs";

export default class ModelMatakuliah {
    static daftarMth(callback) {
        db.all('SELECT * FROM Matakuliahs', (err, data) => {
            callback(err, data)
        })
    }
    static cariMth(id_matkul, callback) {
        db.all('SELECT * FROM Matakuliahs WHERE Matakuliahs.id_matkul = ?', [id_matkul], (err, data) => {
            callback(err, data)
        })
    }
    static tambahMth(id_matkul, Nama_matakuliah, SKS, callback) {
        db.run('INSERT INTO Matakuliahs VALUES (?, ?, ?)', [id_matkul, Nama_matakuliah, SKS], (err) => {
            callback(err)
        })
    }
    static hapusMth(id_matkul ,callback) {
        db.all('DELETE FROM Matakuliahs WHERE Matakuliahs.id_matkul = ?', [id_matkul], (err) =>{
            callback(err)
        })
    }
}