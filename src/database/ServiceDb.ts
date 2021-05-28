import { allServices, Service } from "./DBData";

export class ServiceDb{

    static services:Service[] = allServices

    static findByServiceCode({serviceCode}:{serviceCode:string}):Service|any{
        const search = ServiceDb.services.find((item)=>item.serviceCode==serviceCode)
        return search;
    }
    //Find All By Cat Code
    static findByCategoryCode({catCode}:{catCode:string}):Service[]{
        const search = ServiceDb.services.filter((item)=>item.categoryCode==catCode)
        return search;
    }
}