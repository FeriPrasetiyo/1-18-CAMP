export default class viewDosen {
    static line() {
        console.log('============================')
    }
    static menuDsn() {
        viewDosen.line();
        console.log(`
silakan pilih opsi di bawah ini
[1] Daftar Dosen
[2] Cari Dosen
[3] Tambah Dosen
[4] Hapus Dosen
[5] Kembali`)
        viewDosen.line();
    }
}

