CREATE TABLE Jurusans(
    id_jurusan VARCHAR(10) NOT NULL PRIMARY KEY,
    Nama_jurusan VARCHAR(10) NOT NULL
);

CREATE TABLE Mahasiswas(
    Nim VARCHAR(10) NOT NULL PRIMARY KEY,
    nama VARCHAR(50) NOT NULL,
    alamat text,
    jurusan VARCHAR(30) NOT NULL,
    dob data not null FOREIGN KEY (kodeJurusan) REFERENCES jurusan(kodeJurusan)
);

CREATE TABLE dosens(
    nip VARCHAR(11) NOT NULL PRIMARY KEY,
    Nama_dosen VARCHAR(100) NOT NULL
);

CREATE TABLE matakuliahs(
    id_matakuliah VARCHAR (11) NOT NULL PRIMARY KEY,
    Nama_matakuliah VARCHAR(100) NOT NULL,
    sks INTEGER (2) Not null
);

CREATE TABLE rapot(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Nim varchar(11) NOT NULL,
    id_matakuliah varchar(6) NOT NULL,
    nip varchar(11) NOT NULL,
    id_jurusan varchar(10) not null nilai varchar(5),
    FOREIGN KEY (Nim) REFERENCES Mahasiswas (Nim),
    FOREIGN KEY (id_matakuliah) REFERENCES mataKuliah (id_matakuliah),
    FOREIGN KEY (nip) REFERENCES dosen (nip)
);

INSERT INTO
    Jurusans
VALUES
    ('A001', 'TEKNIK MESIN'),
    ('A002', 'TEKNIK INDUSTRI'),
    ('A003', 'TEKNIK INFORMATIKA'),
    ('A004', 'TEKNIK ELECTRO'),
    ('A005', 'AKUTANSI'),
    ('A006', 'MANAGAMEN'),
    ('A007', 'HUKUM'),
    ('A008', 'PGSD'),
INSERT INTO
    Mahasiswas
VALUES
    ('2015230001', 'FERI', 'TANGERANG', 'A001'),
    ('2015230002', 'TAJUDDIN', 'JAKARTA', 'A002'),
    ('2015230003', 'RISKI', 'BALI', 'A003'),
    ('2015230004', 'BUDI', 'SURABAYA', 'A004'),
    ('2015230005', 'ALAN', 'JAKARTA SELATAN', 'A005'),
    ('2015230006', 'SITI', 'MEDAN', 'A006'),
    ('2015230007', 'BAYU', 'ACEH', 'A007'),
    ('2015230008', 'AGUNG', 'MALANG', 'A008'),
    ('2015230009', 'FARAH', 'BANDUNG', 'A002'),
    ('2015230010', 'LUTFI', 'CIREBON', 'A004');

INSERT INTO
    matakuliahs
VALUES
    ('MK01', 'JAVA', 3),
    ('MK02', 'KALKULUS', 3),
    ('MK03', 'MANAGEMEN KEUANGAN', 2),
    ('MK04', 'PEDATA', 3),
    ('MK05', 'PENJAS', 1);

INSERT INTO
    dosens
VALUES
    ('D2201', 'BOBON SANTOSO'),
    ('D2202', 'LORD RANGGA'),
    ('D2203', 'GUS SAMSUDIN'),
    ('D2204', 'PESULAP MERAH'),
    ('D2205', 'RIGEN');

INSERT INTO
    Report('Nim', 'kodeMatkul', 'nip', 'nilai')
VALUES
    ('2015230001', 'MK01', 'D2201', 'A001', 'A'),
    ('2015230002', 'MK01', 'D2201', 'A002', 'A+'),
    ('2015230003', 'MK04', 'D2204', 'A003', 'B'),
    ('2015230004', 'MK02', 'D2202', 'A004', 'B+'),
    ('2015230008', 'MK01', 'D2203', 'A005', 'B+'),
    ('2015230007', 'MK05', 'D2202', 'A006', 'A'),
    ('2015230006', 'MK04', 'D2204', 'A007', 'B+'),
    ('2015230005', 'MK01', 'D2203', 'A008', 'C+');

UPDATE
    Report
SET
    nilai = 'D+'
WHERE
    id_matakuliah = 'MK01';

UPDATE
    Report
SET
    nilai = 'E-'
WHERE
    nip = 'D2204';

UPDATE
    mataKuliah
SET
    namaMatkul = 'data mining'
WHERE
    id_matakuliah = 'MK01';

ALTER TABLE
    mahasiswas
ADD
    dob date;

UPDATE
    mahasiswas
SET
    dob = '2002-09-12'
WHERE
    nama = 'FERI';

UPDATE
    mahasiswas
SET
    dob = '2001-11-30'
WHERE
    nama = 'TAJUDDIN';

UPDATE
    mahasiswas
SET
    dob = '2000-12-23'
WHERE
    nama = 'RISKI';

UPDATE
    mahasiswas
SET
    dob = '1999-08-11'
WHERE
    nama = 'BUDI';

UPDATE
    mahasiswas
SET
    dob = '2000-01-29'
WHERE
    nama = 'ALAN';

UPDATE
    mahasiswas
SET
    dob = '2000-05-30'
WHERE
    nama = 'SITI';

UPDATE
    mahasiswas
SET
    dob = '2001-06-01'
WHERE
    nama = 'BAYU';

UPDATE
    mahasiswas
SET
    dob = '1998-03-09'
WHERE
    nama = 'AGUNG';

UPDATE
    mahasiswas
SET
    dob = '2000-10-10'
WHERE
    nama = 'FARAH';

UPDATE
    mahasiswas
SET
    dob = '2001-02-17'
WHERE
    nama = 'LUTFI';

SELECT
    Mahasiswas.Nim,
    Mahasiswas.nama,
    Mahasiswas.alamat,
    Jurusans.Nama_jurusan
FROM
    Jurusans
    JOIN mahasiswas ON Mahasiswas.jurusan = Jurusans.id_jurusan;

--1
SELECT
    Mahasiswas.nama,
    Mahasiswas.dob,
    (
        cast(
            strftime('%Y.%m%d', 'now') - strftime('%Y.%m%d', dob) as int
        )
    ) AS umur
FROM
    Mahasiswas
WHERE
    umur < 20;

--2
SELECT
    Mahasiswas.Nim,
    Mahasiswas.Nama,
    Report.Nilai
FROM
    Mahasiswas
    JOIN rapot ON Report.Nim = mahasiswa.Nim
WHERE
    Nilai like 'B%'
    or Nilai like 'A%';

--3
SELECT
    Mahasiswas.Nama,
    Report.Nim,
    SUM(Matakuliahs.sks)
FROM
    Report
    JOIN Mahasiswas ON Mahasiswas.Nim = Report.Nim
    JOIN matakuliahs ON matakuliahs.id_matkul = Report.id_matakuliah
GROUP BY
    Mahasiswas.nama
HAVING
    SUM(Matakuliahs.sks) > 10;

--4
SELECT
    Mahasiswas.nama,
    Report.Nim,
    matakuliahs.Nama_matakuliah
FROM
    Report
    JOIN Mahasiswas ON Mahasiswas.Nim = Report.Nim
    JOIN matakuliahs ON Matakuliahs.id_matkul = Report.id_matakuliah
WHERE
    matakuliahs.Nama_matakuliah = 'data mining';

--5 
SELECT
    Report.nip,
    dosens.Nama_dosen,
    COUNT(DISTINCT Report.Nim),
    Mahasiswas.nama
FROM
    Report
    JOIN Mahasiswas ON Mahasiswas.Nim = Report.Nim
    JOIN dosens ON dosens.nip = Report.nip
GROUP BY
    dosens.nip;

-- 6
SELECT
    Mahasiswas.nama,
    Mahasiswas.dob,
    (
        cast(
            strftime('%Y.%m%d', 'now') - strftime('%Y.%m%d', dob) as int
        )
    ) AS umur
FROM
    Mahasiswas
ORDER BY
    umur ASC;

--7
SELECT
    *
FROM
    Report
    JOIN dosens ON dosens.nip = Report.nip
    JOIN Mahasiswas ON Mahasiswas.Nim = Report.Nim
WHERE
    nilai like 'D%'
    or nilai like 'E%';

--8
SELECT
    Report.id,
    mahasiswas.nim,
    mahasiswas.nama,
    mahasiswas.id_matakuliah,
    mahasiswas.id_jurusan,
    Report.nip,
    Report.nilai,
    dosens.nama
FROM
    Report,
    Mahasiswas,
    dosen
WHERE
    UPPER (Report.nilai) > 'C'
    AND Mahasiswas.Nim = Report.nim
    AND Report.id_matakuliah = matakuliahs.id_matkul
    AND Report.nip = dosens.nip;