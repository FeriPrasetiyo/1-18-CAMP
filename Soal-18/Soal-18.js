const readline = require('readline');
const Table = require('cli-table');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('./dataMahasiswa.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log(`tidak terhunung di databese`,)
});

//Pembuatan login

class users {
    static username() {
        rl.question('username : ', (username) => {
            db.all('SELECT * FROM user WHERE user.username = ?', [username], (err, data) => {
                if (err) {
                    console.log(`gagal ambil data users`, err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`user name tidak terdaftar`)
                    users.username()
                }
                users.password(data[0])
            })
        })
    }

    static password(user) {
        rl.question('password : ', (Password) => {
            if (Password == user.Password) {
                Greet.line()
                console.log(`welcome, ${user.username}. Your acces level is : ${user.role.toUpperCase()}`)
                Utama.home()
            } else {
                console.log(`password yang anda masukan salah`)
                users.password(user)
            }
        })
    }
}
class Greet {
    static line() {
        console.log(`=========================================`)
    }
    static logout() {
        console.log(`==============Anda telah keluar============`)
        process.exit(0)
    }
    static home() {
        Greet.line()
        console.log(`
            [1] Mahasiswa
            [2] Jurusan
            [3] Dosen
            [4] Matakuliah
            [5] Report
            [6] Keluar
        `)
        Greet.line();
    }
    static welcome() {
        Greet.line()
        console.log(`Welcome to Universitas Pendidikan Indonesia`)
        console.log(`Jl. Setiabudhi no. 255`)
        Greet.line()
    }
    static menuMhs() {
        Greet.line();
        console.log(`
        silakan pilih opsi di bawah ini
        [1] Daftar Mahasiswa
        [2] Cari Mahasiswa
        [3] Tambah Mahasiswa
        [4] Hapus Mahasiswa
        [5] Kembali`)
        Greet.line();
    }
    static menuJRS() {
        console.log(`
        silakan pilih opsi di bawah ini
        [1] Daftar Jurusan
        [2] Cari Jurusan
        [3] Tambah Jurusan
        [4] Hapus Jurusan
        [5] Kembali`)
        Greet.line();
    }
    static menuDsn() {
        Greet.line();
        console.log(`
        silakan pilih opsi di bawah ini
        [1] Daftar Dosen
        [2] Cari Dosen
        [3] Tambah Dosen
        [4] Hapus Dosen
        [5] Kembali`)
        Greet.line();
    }
    static menuMtkl() {
        Greet.line();
        console.log(`
        silakan pilih opsi di bawah ini
        [1] Daftar Matakuliah
        [2] Cari Matakuliah
        [3] Tambah Matakuliah
        [4] Hapus Matakuliah
        [5] Kembali`)
        Greet.line();
    }
    static menuRpt() {
        Greet.line();
        console.log(`
        silakan pilih opsi di bawah ini
        [1] Daftar KRS
        [2] Cari Report KRS
        [3] Tambah Report 
        [4] Hapus Report
        [5] Kembali`)
        Greet.line();
    }
}
// Pembuatan utama
class Utama {
    static login() {
        Greet.welcome()
        users.username()
    }
    static home() {
        Greet.home();
        rl.question('masukan salah satu dari nomor opsi di atas:', (opsi) => {
            switch (opsi) {
                case '1':
                    Mahasiswa.Mahasiswa();
                    break
                case '2':
                    Jurusan.menuJurusan();
                    break
                case '3':
                    Dosen.menuDosen();
                    break
                case '4':
                    Matakuliah.menuMatkul();
                    break
                case '5':
                    Report.menuReport();
                    break
                case '6':
                    Greet.logout();
                    Utama.logout();
            }
        })
    }
};
class Mahasiswa {
    static Mahasiswa() {
        Greet.menuMhs()
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
            head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan']
        });
        db.all('SELECT * FROM Mahasiswas', (err, data) => {
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
                    item.Jurusan
                ])
            });
            console.log(tableMahasiswa.toString())
            Mahasiswa.Mahasiswa()
        })
    }
    static cariMahasiswa() {
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            db.all('SELECT * FROM mahasiswas WHERE mahasiswas.nim = ?', [nim], (err, data) => {
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
                    rl.question('Jurusan: ', (Jurusan) => {
                        rl.question('Tanggal Lahir: ', (dob) => {
                            db.run('INSERT INTO Mahasiswas VALUES (?, ?, ?, ?, ?)', [Nim, Nama, Alamat, Jurusan, dob], (err) => {
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
    }

    static hapusMahasiswa() {
        rl.question('Masukkan NIM Mahasiswas : ', (nim) => {
            db.all('DELETE FROM Mahasiswas WHERE Mahasiswas.Nim = ?', [nim], (err) => {
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
//===================================
//pembuatan dosen
class Dosen {
    static menuDosen() {
        Greet.menuDsn()
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
        db.all('SELECT * FROM Dosens', (err, data) => {
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
            db.all('SELECT * FROM Dosens WHERE Dosens.Nip = ?', [Nip], (err, data) => {
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
                db.run('INSERT INTO Dosens VALUES (?, ?)', [Nip, Nama_dosen], (err) => {
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
            db.all('DELETE FROM Dosens WHERE Dosens.Nip = ?', [Nip], (err) => {
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
//Pembuatan Jurusan
//==========================

class Jurusan {
    static menuJurusan() {
        Greet.menuJRS()
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
        db.all('SELECT * FROM Jurusans', (err, data) => {
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
            db.all('SELECT * FROM Jurusans WHERE Jurusans.id_jurusan = ?', [id_jurusan], (err, data) => {
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
                db.run('INSERT INTO Jurusans VALUES (?, ?)', [id_jurusan, Nama_Jurusan], (err) => {
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
            db.all('DELETE FROM Jurusans WHERE Jurusans.id_jurusan = ?', [id_jurusan], (err) => {
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
//Pembuatan Matakuliah
class Matakuliah {
    static menuMatkul() {
        Greet.menuMtkl()
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
        db.all('SELECT * FROM Matakuliahs', (err, data) => {
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
            db.all('SELECT * FROM Matakuliahs WHERE Matakuliahs.id_matkul = ?', [id_matkul], (err, data) => {
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
                    db.run('INSERT INTO Matakuliahs VALUES (?, ?, ?)', [id_matkul, Nama_matakuliah, SKS], (err) => {
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
            db.all('DELETE FROM Matakuliahs WHERE Matakuliahs.id_matkul = ?', [id_matkul], (err) => {
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
// Membuat Report
class Report {
    static menuReport() {
        Greet.menuRpt()
        rl.question(`Masukan salah satu opsi di atas :`, (opsi) => {
            switch (opsi) {
                case '1':
                    Report.daftarReport();
                    break;
                case '2':
                    Report.cariReport();
                    break;
                case '3':
                    Report.tambahReport();
                    break;
                case '4':
                    Report.hapusReport();
                    break;
                case '5':
                    Utama.home();
                    break;
            }
        })
    }
    static daftarReport() {
        const tableReport = new Table({
            head: ['ID', 'NIM', 'ID MATAKULIAH', 'NIP', 'ID JURUSAN', 'NILAI']
        });
        db.all('SELECT * FROM Report', (err, data) => {
            if (err) {
                console.log('gagal ambil data', err)
                process.exit(1)
            }
            data.forEach(item => {
                tableReport.push([
                    item.id,
                    item.Nim,
                    item.id_matakuliah,
                    item.Nip,
                    item.id_jurusan,
                    item.Nilai
                ])
            });
            console.log(tableReport.toString())
            Report.menuReport()
        })
    }
    static cariReport() {
        rl.question('Masukkan ID Report : ', (id_report) => {
            db.all('SELECT * FROM Report WHERE Report.id = ?', [id_report], (err, data) => {
                if (err) {
                    console.log('gagal ambil Data report', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Report dengan ID ${id_report}, tidak terdaftar`)
                    Report.menuReport()
                } else {
                    console.log(`
========================================
Detail mahasiswa dengan NIM '${id_report}' :
ID             : ${data[0].id}
NIM            : ${data[0].Nim}
ID MATAKULIAH  : ${data[0].id_matakuliah}
NIP            : ${data[0].Nip}
ID JURUSAN     : ${data[0].id_jurusan}
NILAI          : ${data[0].Nilai}
            `);
                    Report.menuReport()
                }
            })
        })
    }

    static tambahReport() {
        console.log('Lengkapi data di bawah ini : ')
        rl.question('ID :', (id) => {
            rl.question('NIM: ', (Nim) => {
                rl.question('ID matakuliah: ', (id_matakuliah) => {
                    rl.question('NIP: ', (Nip) => {
                        rl.question('ID JURUSAN: ', (id_jurusan) => {
                            rl.question('Nilai: ', (Nilai) => {
                                db.run('INSERT INTO Report VALUES (?, ?, ?, ?, ?, ?)', [id, Nim, id_matakuliah, Nip, id_jurusan, Nilai], (err) => {
                                    if (err) {
                                        console.log('gagal menambah Report mahasiswa', err)
                                        process.exit(1)
                                    } else {
                                        console.log('Report mahasiswa telah ditambahkan')
                                        Report.daftarReport()
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    static hapusReport() {
        rl.question('Masukkan ID Report : ', (id_report) => {
            db.all('DELETE FROM Report WHERE Report.id = ?', [id_report], (err) => {
                if (err) {
                    console.log('gagal ambil Report', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data Mahasiswa ${id_report}, telah dihapus`);
                    Report.daftarReport()
                }
            })
        })
    }
}

Utama.login()