export class Menu{
name:string;
actions:Action[];
// actions:{
//     actionType:string;
//     httpType:string;
//     definition:string;
//     code:string;
// }[];
//Bu sekilde de tanımlanabilirdi.

}

export class Action{
    actionType:string;
    httpType:string;
    definition:string;
    code:string;
}

