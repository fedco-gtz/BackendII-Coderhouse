class JugueteDTO {
    constructor(nombre, categoria, precio) {
        this.nombre = nombre; 
        this.categoria = categoria; 
        this.fullname = `${nombre} ${categoria}`; 
        this.precio = precio; 
    }

}

export default JugueteDTO; 