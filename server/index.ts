import express from "express"
import cors from "cors"
import fs from "fs/promises"
import { IUser } from "./types/IUserList";

const PORT = 3600;
const dataFilePath = './src/usersList.json';
const logsFilePath = `logs/${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.txt`;

const app = express();
app.use(cors());

const userList: Array<IUser> = [];

async function dataLoading(){
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        const parseData = JSON.parse(data);
        userList.push(...parseData);
    } catch (error) {
        console.error('Произошла ошибка. ', error);
        fs.writeFile(logsFilePath, `${new Date().toJSON()}: ${error} \n`, {encoding: "utf8", flag: "a"});
    }
}

function usersFilter(email: string, number: string): IUser[]{
    
    let users: IUser[] = [];
    if(number){
        users = userList.filter(elem => elem.email === email && elem.number === number);
    } else{
        users = userList.filter(elem => elem.email === email);
    }
    return users
}

dataLoading();

app.get('/', (req, res) => {
    const { email, phone } = req.query;
    
    req.on('aborted', () => {
        console.log('Запрос был прерван');
    })

    setTimeout(() => {
        const result = usersFilter(email as string, phone as string);
        res.json(result);
    }, 5000);
    
})


app.listen(PORT, ()=> console.log("Server is working"))