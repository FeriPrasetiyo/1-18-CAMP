import ViewJurusan from "../View/viewJurusan.mjs";
import Utama, { rl } from "../Soal-18MVC.mjs";
import Table from "cli-table";
import ModelJurusan from "../Model/ModelJurusan.mjs";

export default class Jurusan {
    static menuJurusan() {
        ViewJurusan.menuJRS()
        rl.question(`Masukan salah satu opsi di atas :`, (opsi) => {
            switch (opsi) {
                case '1':
                    Jurusan.daftarJurusan();
                    break;
                case '2':
                    Jurusan.cariJurusan();
                    break;
                case '3':
                    Jurusan.tambahJurusan();
                    break;
                case '4':
                    Jurusan.hapusJurusan();
                    break;
                case '5':
                    Utama.home();
                    break;
            }
        })
    }
    static daftarJurusan() {
        const tableJurusan = new Table({
            head: ['ID Jurusan', 'Nama Jurusan']
        });
        ModelJurusan.daftarJurusan((err, data) => {
            if (err) {
                console.log('gagal ambil data', err)
                process.exit(1)
            }
            data.forEach(item => {
                tableJurusan.push([
                    item.id_jurusan,
                    item.Nama_Jurusan
                ])
            });
            console.log(tableJurusan.toString())
            Jurusan.menuJurusan()
        })
    }
    static cariJurusan() {
        rl.question('Masukkan ID Jurusan : ', (id_jurusan) => {
            ModelJurusan.cariJurusan(id_jurusan, (err, data) => {
                if (err) {
                    console.log('gagal ambil Dosen', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Dosen dengan nim ${id_jurusan}, tidak terdaftar`)
                    Dosen.daftarDosen()
                } else {
                    console.log(`
========================================
Detail Jurusan dengan ID jurusan '${id_jurusan}' :
ID Jurusan      : ${data[0].id_jurusan}
Nama Jurusan    : ${data[0].Nama_Jurusan}
            `);
                    Jurusan.menuJurusan()
                }
            })
        })
    }
    static tambahJurusan() {
        console.log('Lengkapi data di bawah ini : ')
        rl.question('ID Jurusan :', (id_jurusan) => {
            rl.question('Nama Jurusan: ', (Nama_Jurusan) => {
                ModelJurusan.tambahJurusan(id_jurusan, Nama_Jurusan, (err) => {
                    if (err) {
                        console.log('gagal menambah Jurusan', err)
                        process.exit(1)
                    } else {
                        console.log('Jurusan telah ditambahkan')
                        Jurusan.daftarJurusan()
                    }
                })
            })
        })
    }
    static hapusJurusan() {
        rl.question('Masukkan ID Jurusan : ', (id_jurusan) => {
            ModelJurusan.hapusJurusan(id_jurusan, (err) => {
                if (err) {
                    console.log('gagal ambil mahasiswa', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data Mahasiswa ${id_jurusan}, telah dihapus`);
                    Jurusan.daftarJurusan()
                }
            })
        })
    }
}