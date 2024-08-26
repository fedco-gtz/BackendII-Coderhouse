import { Command } from "commander";
const program = new Command(); 

program
    .option("-p <port>", "Puerto en donde se inicia el servidor", 8080)
    .option("--mode <mode>", "modo de trabajo", "desarrollo")
program.parse(); 

export default program; 