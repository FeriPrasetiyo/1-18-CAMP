export default class ViewJurusan {
    static line() {
        console.log("==============================")
    }
    static menuJRS() {
        console.log(`
silakan pilih opsi di bawah ini
[1] Daftar Jurusan
[2] Cari Jurusan
[3] Tambah Jurusan
[4] Hapus Jurusan
[5] Kembali`)
        ViewJurusan.line();
    }
}


