export default class ViewReport {
    static line() {
        console.log("==================================")
    }
    static menuRpt() {
        ViewReport.line();
        console.log(`
    silakan pilih opsi di bawah ini
    [1] Daftar KRS
    [2] Cari Report KRS
    [3] Tambah Report 
    [4] Hapus Report
    [5] Kembali`)
        ViewReport.line();
    }
}


