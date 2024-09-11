class MemoryJugueteDAO {
    constructor() {
        this.juguetes = []
    }

    async crearJuguete(datosJuguete){
        try {
            this.juguetes.push(datosJuguete);
            return datosJuguete; 
        } catch (error) {
            throw new Error("Error al crear en juguete en Memoria"); 
        }
    }

    async obtenerJuguetes(){
        try {
            return this.juguetes; 
        } catch (error) {
            throw new Error("Error al obtener los juguetes de Memoria");
        }
    }

}

export default MemoryJugueteDAO; 