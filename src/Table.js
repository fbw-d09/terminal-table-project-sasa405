//1.Wir schreiben ein Programm zum anzeigen von tabellen in der Konsole.

//2.Wir benötigen eine Klasse, die die komplette Applikation beinhaltet.
/**
 * @class Table
 * 
 */
class Table
{


    //3.Wir nennen die Klasse "Table", da wir eine Tabelle damit erstellen wollen, und das der sinnvollste Name (laut konvention) ist.

    tableTitle;
    tableWidth;
    tableColumns;
    tableRows;


    /**
     * @constructor
     */
    constructor({ title, width, columns, rows } = {})
    {

    //3.1 Die Klasse sollte ein konfigurationsobjekt in den Constructor bekommen, um dynamisch einstellbar zu sein.

        //Wir brauchen eine Property die den Namen der Tabelle angibt, der über der Tabelle steht.
        //Wir brauchen eine Property die die Breite der Tabelle angibt, der Default Wert sollte die Breite der Konsole sein.
        //Wir brauchen eine Property die alle columns der Tabelle, und dessen Werte beinhaltet
        //Wir brauchen eine Property die alle Rows der Tabelle beinhaltet

        this.tableTitle = title || 'Unsere Tabelle';
        this.tableWidth = width || process.stdout.columns; 
        this.tableColumns = columns || [];
        this.tableRows = rows || [];
    }

    //3.2 Die Klasse sollte getter und setter haben, um diese einstellungen gegebenenfalls ändern zu können

        //Wir brauchen getter / setter für den Tabellen Titel
        //Wir brauchen getter / setter für die Tabellen Breite
        //Wir brauchen getter / setter für die Columns
        //Wir brauchen getter / setter für die Rows

        get title() { return this.tableTitle }
        get width() { return this.tableWidth }
        get columns() { return this.tableColumns }
        get rows() { return this.tableRows }

        set title(input) { this.tableTitle = input }
        set width(input) { this.tableWidth = input }
        set columns(input) {this.tableColumns = input }
        set rows(input) { this.tableRows = input }

    //3.3 Die Klasse sollte Methoden haben, um einige berechnungen zu machen

/**
 * @method createTitle
 * @description erstellt den zentrierten Titel über der Tabelle
 * @returns { string }
 */
    createTitle()
    {
        const padding = Math.round((this.width - this.title.length) / 2);

        //Wir erwarten das paddiing eine Zahl ausgibt, diese Zahl sollte die hälfte des Terminals minus die hälfte der länge des Titels.
        // console.log(padding);

        return `\n${ ' '.repeat(padding) }${ this.title }${ ' '.repeat(padding) }`;
    }

        //Wir brauchen eine Methode, die den Titel anzeigt und dieser Horizontal zentriert über der Tabelle steht.

        //Wir brauchen eine Methode, die eine Spalte erstellt
        /**
         * @method createColumn
         * @description Erstellt eine Spalte in der angegebenenbreite, mit dem Text, der in dieser Spalte stehen soll
         * @param { string }
         * @param { number }
         * @param { string }
         *          */
    createColumn = (text, width) =>
    {
        //Wir erstellen eine berechnung um die Spaltenbreite dadurch zu bekommen, das wir die angegebene Spaltenbreite minus den Inhalt der Spalte rechnen.
        const columnWidth = width - text.toString().length;

        // console.log(columnWidth);

        //AAAAAAAAAAAAAAAAAAAAAAAA  = width (25)
        //AAAAAAAAAAAAAA            = width - textlänge
        //AAAAAAAAAA                = width - textlänge -3
        //Hallo Welt                = text
        //  Hallo WeltAAAAAAAAAA |  = ergebnis
        return ' ' + text.toString() + ' '.repeat(columnWidth - 3) + '|';
    }


        //Wir brauchen eine Methode, die eine Zeile erstellt und die jeweiligen Spalten dort einfügt
        /**
         * @method creatRow
         * @description erstellt eine Zeile die die jeweiligen Spalten nacheinander darstellt
         * @param { object }
         * @param { string }
         */
    createRow = (rows) =>
    {
        //wir erstellen eine Variable in die wir die Inhalte der Zeile speichern und beginnen sie mit der linken pipe.
       
        let tempString = '|';
        //wir erstellen eine Variable in der wir die breite der Tabelle speichern
        

        for(let row in rows)
        {
            let width = this.width;

            this.columns.forEach((column, i) =>
                {
                if(column.key === row)
                    {
                        if(this.columns.length === i + 1)
                        {
                            tempString += this.createColumn(rows[row], width + 2);
                        }       
                        else
                        {
                            tempString += this.createColumn(rows[row], column.width);
                        }    

                    }

                    width -= column.width
                             
                });
        };
        
        return tempString;

    }

        //Wir brauchen eine Methode, die den Tabellen Header erstellt,also die Schlüssel über dem Spalteninhalt

      /**
        * @method createHeader
        * @description erstellt den Header
        * @returns { string }
        */

        createHeader = () =>
        {
            let tempString = ' ';
            let width = this.width;

            this.columns.forEach((column, i) =>
            {
                if(this.columns.length === i +1)
                {
                    tempString += this.createColumn(column.title, width +2);
                }
                else
                {
                    tempString += this.createColumn(column.title, column.width);
                }

                width -= column.width;
            });
                return tempString;
        }


        //Wir brauchen eine Methode, die den Divider erstellt

        /**
         * @method createDivider
         * @description erstellt den divider, mit dem definieren wir die längen der spalten
         * @returns { string }
         */
        createDivider = () =>
        {
            let tempString = '|';
            let width = this.width;

            this.columns.forEach((column, i) =>
            {
                if(this.columns.length === i +1)
                {
                    tempString += '-'.repeat(width) + '|';
                }
                else
                {
                    tempString += '-'.repeat(column.width - 2) + '|';
                }

                
                width -= column.width;

            }); 
                return tempString;
        }   

        //Wir brauchen eine Methode, die die Tabelle anzeigt
    /**
    * @method showTable
    * @description fügt alles zusammen und gibt es im Terminal aus
     */
    showTable = () =>
    {
        //wir geben den Titel der Tabelle aus
        console.log(this.createTitle());

        //wir geben die Headerzeile aus
        console.log(this.createHeader());

        //wir geben den divider 
        console.log(this.createDivider());

        //wir geben jede zeile der Tabelle aus
        this.rows.forEach((row, i) =>
        {
            console.log(this.createRow(row));
        });
        //am ende fügen wir noch eine leere zeile ein
            console.log();
    }
}
    //4.Wir müssen die Klasse exportieren um an die Inhalte zu kommen um es zu starten.
module.exports = Table;

