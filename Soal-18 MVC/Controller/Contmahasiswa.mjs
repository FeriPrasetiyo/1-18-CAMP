import ViewMahasiswa from "../View/viewmahasiswa.mjs";
import Utama, { rl } from "../Soal-18MVC.mjs";
import Table from "cli-table";
import ModelMahasiswa from "../Model/ModelMahasiswa.mjs";
import ModelJurusan from "../Model/ModelJurusan.mjs";



export default class Mahasiswa {
    static Mahasiswa() {
        ViewMahasiswa.menuMhs()
        rl.question(`Masukan salah satu opsi di atas :`, (opsi) => {
            switch (opsi) {
                case '1':
                    Mahasiswa.daftarMahasiswa();
                    break;
                case '2':
                    Mahasiswa.cariMahasiswa();
                    break;
                case '3':
                    Mahasiswa.tambahMahasiswa();
                    break;
                case '4':
                    Mahasiswa.hapusMahasiswa();
                    break;
                case '5':
                    Utama.home();
                    break;
            }
        })
    }
    static daftarMahasiswa() {
        const tableMahasiswa = new Table({
            head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan', 'Nama Jurusan']
        });
        ModelMahasiswa.daftarMhs((err, data) => {
            if (err) {
                console.log('gagal ambil data', err)
                process.exit(1)
            }
            data.forEach(item => {
                tableMahasiswa.push([
                    item.Nim,
                    item.Nama,
                    item.dob,
                    item.Alamat,
                    item.Jurusan,
                    item.Nama_Jurusan
                ])
            });
            console.log(tableMahasiswa.toString())
            Mahasiswa.Mahasiswa()
        })
    }
    static cariMahasiswa() {
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            ModelMahasiswa.cariMhs(nim, (err, data) => {
                if (err) {
                    console.log('gagal ambil mahasiswa', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Mahasiswa dengan nim ${nim}, tidak terdaftar`)
                    Mahasiswa.MenuMahasiswa()
                } else {
                    console.log(`
========================================
Detail mahasiswa dengan NIM '${nim}' :
NIM     : ${data[0].Nim}
Nama    : ${data[0].Nama}
Alamat  : ${data[0].Alamat}
Jurusan : ${data[0].Jurusan}
            `);
                    Mahasiswa.Mahasiswa()
                }
            })
        })
    }

    static tambahMahasiswa() {
        console.log('Lengkapi data di bawah ini : ')
        rl.question('NIM :', (Nim) => {
            rl.question('Nama: ', (Nama) => {
                rl.question('Alamat: ', (Alamat) => {
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
                    rl.question('Jurusan: ', (Jurusan) => {
                        rl.question('Tanggal Lahir: ', (dob) => {
                            ModelMahasiswa.tambahMhs(Nim, Nama, Alamat, Jurusan, dob, (err) => {
                                if (err) {
                                    console.log('gagal menambah mahasiswa mahasiswa', err)
                                    process.exit(1)
                                } else {
                                    console.log('mahasiswa telah ditambahkan')
                                    Mahasiswa.daftarMahasiswa()
                                }
                            })
                        })
                    })
                })
            })
        })
    })
}

    static hapusMahasiswa() {
        rl.question('Masukkan NIM Mahasiswas : ', (nim) => {
            ModelMahasiswa.hapusMhs(nim, (err) => {
                if (err) {
                    console.log('gagal ambil mahasiswa', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data Mahasiswa ${nim}, telah dihapus`);
                    Mahasiswa.Mahasiswa()
                }
            })
        })
    }
}