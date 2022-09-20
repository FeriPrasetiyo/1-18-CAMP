class Tyre {
    constructor(size, brandtype) {
        this.size = size;
        this.brand = brandtype;
    }

}

class Car {
    constructor(model, pembuatan, pintu, ban, bangku, year, warranty, tyre) {
        this.model = model;
        this.pembuatan = pembuatan;
        this.pintu = pintu;
        this.ban = ban;
        this.bangku = bangku;
        this.year = year;
        this.warranty = warranty;
        this.tyre = tyre;
    }
}

class Agya extends Car {
    constructor() {
        super("agya", 2019, 4, 4, 4, 2020, 3, new Tyre(4, "Accelera"))
    }
}

class Rush extends Car {
    constructor() {
        super("Rush", 2020, 4, 4, 6, 2021, 5, new Tyre(4, "Achilles"))
    }
}

class CarFactory {
    constructor(tipe1, tipe2) {
        this.tipe1 = tipe1;
        this.tipe2 = tipe2;
        this.cars = [];

    }
    static random() {
        return Math.floor(Math.random() * 10) + 1;
    }
    produksi(year) {
        let getAgya = 0;
        for (let i = 0; i < CarFactory.random(); i++) {
            this.cars.push(new Agya(year))
            getAgya++
        }
        let getRush = 0;
        for (let i = 0; i < CarFactory.random(); i++) {
            this.cars.push(new Rush(year))
            getRush++
        }
        console.log(`pada tahun ${year}, perusahaa TOYOTA ${this.tipe1} memproduksi ${getAgya} mobil, sedangkan tipe ${this.tipe2} memproduksi sebanyak ${getRush} mobil`)
    }

    garansi(year) {
        let count = 0;
        let y = year;
        console.log(`===TOYOTA===`)
        for (let i = 0; i < this.cars.length; i++) {
            if (year > (this.cars[i].pembuatan + this.cars[i].warranty)) {
                count++
                console.log(`no ${count}`)
                console.log(`Memiliki Ban ${this.cars[i].ban} bertipe ${this.cars[i].tyre} dan kursi sebanyak ${this.cars[i].bangku}`)
                console.log(`Tipe ${this.cars[i].model} Tahun Pembuatan ${this.cars[i].pembuatan} tahun,warranty sudah tidak AKTIF karena sudah melawati ${y}`)
                console.log("============================================================")
            } else {
                count++
                console.log()
                console.log(`no ${count}`)
                console.log(`Memiliki Ban ${this.cars[i].ban} bertipe ${this.cars[i].tyre} dan kursi sebanyak ${this.cars[i].bangku}`)
                console.log(`Tipe ${this.cars[i].model} Tahun Pembuatan ${this.cars[i].pembuatan} tahun,warranty masi Berlaku sampai ${y}`)
            }

        }

    }
}
let Toyota = new CarFactory('Agya', 'Rust');
let date = (Math.floor(Math.random() * 10) + 2020)
Toyota.produksi(date);
Toyota.garansi(date)