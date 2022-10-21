import * as fs from 'fs';

export class Contenedor {

    constructor(fileName){
        this.fileName = fileName
    }

    async save(obj){
        try{
            const file = await fs.promises.readFile(`./src/${this.fileName}`, 'utf-8');
            const dataFileParse = JSON.parse(file);
            const id = dataFileParse.length
            
            obj.map((item,index)=> {
                item.id = id + (index + 1)
            });
            
            dataFileParse.push(...obj)
            await fs.promises.writeFile(`./src/${this.fileName}`,  JSON.stringify( [...dataFileParse] ) )

            return dataFileParse.length
        }
        catch(error){
            console.log(error)
        }
    }

    async getByID(id){
        try{
            const file = await fs.promises.readFile(`./src/${this.fileName}`, 'utf-8');
            const fileParse = JSON.parse(file);
            const element = fileParse.find(product => product.id == id);

            if(element){
                return element
            }
            else{
                return null
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async getAll(){
        try{
            const file = await fs.promises.readFile(`./src/${this.fileName}`, 'utf-8');
            const fileParse = JSON.parse(file);

            return fileParse
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteById(id){
        try{
            const file = await fs.promises.readFile(`./src/${this.fileName}`, 'utf-8');
            const fileParse = JSON.parse(file);

            const filterDelete = fileParse.filter(product => product.id !== id)
            await fs.promises.writeFile(`./src/${this.fileName}`, JSON.stringify(filterDelete))
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(`./src/${this.fileName}`, '[]')
        }
        catch(error){
            console.log(error)
        }

    }

}