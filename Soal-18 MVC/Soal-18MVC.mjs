import readline from 'readline';
import sqlite3 from 'sqlite3';

import ViewLogin from './View/viewlogin.mjs';
import users from './Controller/Contlogin.mjs';
import Mahasiswa from './Controller/Contmahasiswa.mjs';
import Jurusan from './Controller/ContJurusan.mjs';
import Dosen from './Controller/ContDosen.mjs';
import Matakuliah from './Controller/ContMatakuliah.mjs';
import Report from './Controller/Contreport.mjs';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const db = new sqlite3.Database('dataMahasiswa.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log(`tidak terhubung di databese`,)
});
export default class Utama {
    static login() {
        ViewLogin.welcome()
        users.username()
    }
    static home() {
        ViewLogin.home();
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
                    ViewLogin.logout();
                    process.exit(0);
            }
        })
    }
};

Utama.login()