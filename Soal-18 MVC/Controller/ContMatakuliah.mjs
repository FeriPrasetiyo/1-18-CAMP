import ModelMatakuliah from "../Model/ModelMatakuliah.mjs";
import ViewMatakuliah from "../View/viewMatakuliah.mjs";
import Table from "cli-table";
import Utama, { rl } from "../Soal-18MVC.mjs";



export default class Matakuliah {
    static menuMatkul() {
        ViewMatakuliah.menuMtkl()
        rl.question(`Masukan salah satu opsi di atas :`, (opsi) => {
            switch (opsi) {
                case '1':
                    Matakuliah.daftarMatkul();
                    break;
                case '2':
                    Matakuliah.cariMatkul();
                    break;
                case '3':
                    Matakuliah.tambahMatkul();
                    break;
                case '4':
                    Matakuliah.hapusMatkul();
                    break;
                case '5':
                    Utama.home();
                    break;
            }
        })
    }
    static daftarMatkul() {
        const tableJurusan = new Table({
            head: ['ID Matkul', 'Nama Matakuliah', 'SKS']
        });
        ModelMatakuliah.daftarMth((err, data) => {
            if (err) {
                console.log('gagal ambil data', err)
                process.exit(1)
            }
            data.forEach(item => {
                tableJurusan.push([
                    item.id_matkul,
                    item.Nama_matakuliah,
                    item.SKS
                ])
            });
            console.log(tableJurusan.toString())
            Matakuliah.menuMatkul()
        })
    }
    static cariMatkul() {
        rl.question('Masukkan ID Matakulih : ', (id_matkul) => {
            ModelMatakuliah.cariMth(id_matkul, (err, data) => {
                if (err) {
                    console.log('gagal ambil Matakuliah', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Matakuliah dengan ID ${id_matkul}, tidak terdaftar`)
                    Matakuliah.daftarMatkul()
                } else {
                    console.log(`
========================================
Detail Matakuliah dengan ID Matakuliah '${id_matkul}' :
ID Jurusan      : ${data[0].id_matkul}
Nama Jurusan    : ${data[0].Nama_matakuliah}
Jumlah SKS      : ${data[0].SKS}
            `);
                    Matakuliah.menuMatkul()
                }
            })
        })
    }
    static tambahMatkul() {
        console.log('Lengkapi data di bawah ini : ')
        rl.question('ID Matakuliah:', (id_matkul) => {
            rl.question('Nama Matakuliah: ', (Nama_matakuliah) => {
                rl.question('Jumlah SKS:', (SKS) => {
                    ModelMatakuliah.tambahMth(id_matkul, Nama_matakuliah, SKS, (err) => {
                        if (err) {
                            console.log('gagal menambah Matakuliah', err)
                            process.exit(1)
                        } else {
                            console.log('Jurusan telah ditambahkan')
                            Matakuliah.daftarMatkul()
                        }
                    })
                })
            })
        })
    }
    static hapusMatkul() {
        rl.question('Masukkan ID Matakuliah : ', (id_matkul) => {
            ModelMatakuliah.hapusMth(id_matkul, (err) => {
                if (err) {
                    console.log('gagal ambil Matakuliah', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data Matakuliah ${id_matkul}, telah dihapus`);
                    Matakuliah.daftarMatkul()
                }
            })
        })
    }
}