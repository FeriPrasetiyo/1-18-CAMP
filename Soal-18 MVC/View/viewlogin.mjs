export default class ViewLogin {
    static line() {
        console.log(`==========================================`)
    }
    static logout() {
        console.log(`==============Anda telah keluar============`)
        ViewLogin.line()
    }
    static home() {
        ViewLogin.line()
        console.log(`
            [1] Mahasiswa
            [2] Jurusan
            [3] Dosen
            [4] Matakuliah
            [5] Report
            [6] Keluar
        `)
        ViewLogin.line();
    }
    static welcome() {
        ViewLogin.line()
        console.log(`Welcome to Universitas Pendidikan Indonesia`)
        console.log(`Jl. Setiabudhi no. 255`)
        ViewLogin.line()
    }
}