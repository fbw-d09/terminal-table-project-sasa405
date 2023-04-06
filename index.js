// Wir Importieren unsere Table Class
const Table = require('./src/Table');

const columns =
[
    {
        key: 'id',
        title: '#',
        width: 10
    },

    {
        key: 'name',
        title: 'Name',
        width: 25
    },

    {
        key: 'group',
        title: 'Gruppe',
        width: 15
    },

    {
        key: 'role',
        title: 'Rolle',
        width: 50
    }
];

//Wir erstellen unsree Rows

const rows =
[
    {
        id: 1,
        name: 'Pawel',
        group: 'Klasse',
        role: 'Student'
    },

    {
        id: 2,
        name: 'Sasha',
        group: 'Klasse',
        role: 'Student'
    },

    {
        id: 3,
        name: 'Roman',
        group: 'Klasse',
        role: 'Student'
    },

    {
        id: 4,
        name: 'Oleg',
        group: 'Klasse',
        role: 'Student'
    }
];

//Wir erstellen eine Instanz von Table
const table = new Table({
    title: 'Unsere Tabelle',
    width:100,
    columns,
    rows
});
    

//Wir erwarten das die table Klasse ausgegeben wird
// console.log(table);


// //wir erwarten, das uns eine Spalte ausgegeben wird 
// console.log(table.createTitle());

// //wir erwarten das der Titel in der Mitte ausgegeben wird
// console.log(table.createColumn('Hallo Welt', 25));


// //wir erwarten, dass uns eine ganze Zeile ausgegeben wird
// console.log(table.createRow(rows[0]));

// console.log('='.repeat(process.stdout.columns));

table.showTable();
