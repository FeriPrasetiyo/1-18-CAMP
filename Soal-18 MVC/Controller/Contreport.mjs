import ModelReport from "../Model/modelreport.mjs";
import ViewReport from "../View/viewReport.mjs";
import Utama, { rl } from "../Soal-18MVC.mjs";
import Table from "cli-table";


export default class Report {
    static menuReport() {
        ViewReport.menuRpt()
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
        ModelReport.daftarReport((err, data) => {
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
            ModelReport.cariReport(id_report, (err, data) => {
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
                                ModelReport.tambahReport(id, Nim, id_matakuliah, Nip, id_jurusan, Nilai, (err) => {
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
            ModelReport.hapusReport(id_report, (err) => {
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