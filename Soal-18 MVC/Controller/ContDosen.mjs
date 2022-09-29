import modelDosen from "../Model/ModelDosen.mjs";
import viewDosen from "../View/viewDosen.mjs";
import Utama, { rl } from "../Soal-18MVC.mjs";
import Table from "cli-table";

export default class Dosen {
    static menuDosen() {
        viewDosen.menuDsn()
        rl.question(`Masukan salah satu opsi di atas :`, (opsi) => {
            switch (opsi) {
                case '1':
                    Dosen.daftarDosen();
                    break;
                case '2':
                    Dosen.cariDosen();
                    break;
                case '3':
                    Dosen.tambahDosen();
                    break;
                case '4':
                    Dosen.hapusDosen();
                    break;
                case '5':
                    Utama.home();
                    break;
            }
        })
    }
    static daftarDosen() {
        const tableDosen = new Table({
            head: ['Nip', 'Nama']
        });
        modelDosen.daftarDosen((err, data) => {
            if (err) {
                console.log('gagal ambil data', err)
                process.exit(1)
            }
            data.forEach(item => {
                tableDosen.push([
                    item.Nip,
                    item.Nama_dosen
                ])
            });
            console.log(tableDosen.toString())
            Dosen.menuDosen()
        })
    }
    static cariDosen() {
        rl.question('Masukkan NIP Dosen : ', (Nip) => {
            modelDosen.cariDosen(Nip, (err, data) => {
                if (err) {
                    console.log('gagal ambil Dosen', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Dosen dengan nim ${Nip}, tidak terdaftar`)
                    Dosen.daftarDosen()
                } else {
                    console.log(`
========================================
Detail Dosen dengan NIM '${Nip}' :
NIM     : ${data[0].Nip}
Nama    : ${data[0].Nama_dosen}
            `);
                    Dosen.menuDosen()
                }
            })
        })
    }
    static tambahDosen() {
        console.log('Lengkapi data di bawah ini : ')
        rl.question('NIM :', (Nip) => {
            rl.question('Nama: ', (Nama_dosen) => {
                modelDosen.tambahDosen(Nip, Nama_dosen, (err) => {
                    if (err) {
                        console.log('gagal menambah Dosen', err)
                        process.exit(1)
                    } else {
                        console.log('Dosen telah ditambahkan')
                        Dosen.daftarDosen()
                    }
                })
            })
        })
    }
    static hapusDosen() {
        rl.question('Masukkan ID Dosen : ', (Nip) => {
            modelDosen.hapusDosen(Nip, (err) => {
                if (err) {
                    console.log('gagal ambil mahasiswa', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data Mahasiswa ${Nip}, telah dihapus`);
                    Dosen.daftarDosen()
                }
            })
        })
    }
}