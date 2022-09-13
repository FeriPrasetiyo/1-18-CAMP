const fs = require('fs')
const input = process.argv;
const baca = JSON.parse(fs.readFileSync('data.json'), 'utf-8')
let index = parseInt(input[3]) - 1

switch (process.argv[2]) {
    case undefined:
        console.log(`
>>>JS TODO<<<
node todo.js <comand>
node todo.js list
node todo.js task <task_id>
node todo.js add <task title>
node todo.js delete <task_id>
node todo.js complete <task_id>
node todo.js uncomplete <task_id>
node todo.js list:outstanding asc|desc
node todo.js list:complete asc|desc
node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
node todo.js filter:<tag_name>`);
        process.exit(1);

    case "add":
        let output = ' ';
        for (let i = 3; i < input.length; i++) {
            output += input[i] + ' '
        };
        baca.push({
            'content': output,
            'status': false,
            'tag':[]
        })
        fs.writeFileSync('data.json', JSON.stringify(baca, null, 3))
        console.log(`"${output}" telah ditambahkan`)
        process.exit(0);
    case "list":
        console.log('Daftar pekerjaan')
        for (let i = 0; i < baca.length; i++) {
            console.log(`${i + 1}.${baca[i].status ? "[x]" : "[ ]"}${baca[i].content}`)
        };
        process.exit(0)
    case "task":
        console.log("Daftar pekerjaan")
        console.log(`${index + 1}. ${baca[index].status ? "[x]" : "[ ]"} ${baca[index].content}`)
        process.exit(0)
    case "delete":
        console.log(`"${baca[index]['content']}" telah dihapus`)
        baca.splice(index, 1)
        fs.writeFileSync('data.json', JSON.stringify(baca, null, 3))
        process.exit(0);
    case "complete":
        baca[index]['status'] = true
        console.log(`"${baca[index]['content']}" status selesai`)
        fs.writeFileSync('data.json', JSON.stringify(baca, null, 3))
        process.exit(0);
    case "uncomplete":
        baca[index]['status'] = false
        console.log(`${baca[index]['content']}" status selesai dibatalkan`)
        fs.writeFileSync('data.json', JSON.stringify(baca, null, 3))
        process.exit(0);
    case "list:outstanding":
        console.log('Daftar Pekerjaan')
        if (input[3] == 'asc')
            for (let i = 0; i < baca.length; i++) {
                if (baca[i].status == []) {
                    console.log(`${i + 1}.[ ] ${baca[i].content}`);
                }
            };
        process.exit(0);
    case 'list:completed':
        console.log('Daftar Pekerjaan')
        if (input[3] == 'asc')
            for (let i = 0; i < baca.length; i++) {
                if (baca[i].status == true) {
                    console.log(`${i + 1}.[x] ${baca[i].content}`);
                }
            };
        process.exit(0);
        case 'tag':
        for (let i = 4; i < input.length; i++) {
            if (!baca[index].tag.includes(input[i])) {
                baca[index].tag.push(input[i])
            }
        }
        baca[index].tag.length - 1;
        console.log(` tag '${baca[index].tag}' telah ditambahkan ke daftar ${baca[index].content}`);
        fs.writeFileSync("data.json", JSON.stringify(baca, null, 3))
        process.exit(0);
}

filtering(process.argv[2])

function filtering() { 
    console.log('Daftar Pekerjaan')
    let getfilter = process.argv[2]
    let getfilter2 = getfilter.slice(0, 7)
    if (getfilter2 == 'filter:') {
        baca.map((item, index) => {
            if (item.tag.includes(getfilter.slice(7))) {
                console.log(`${index + 1}. ${baca[index].status ? "[x]" : "[ ]"} ${item.content}`);
            }
        })
    };
};
