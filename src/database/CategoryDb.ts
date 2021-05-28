import { allCategories, Category } from "./DBData";

export class CategoryDb{

    static categories:Category[] = allCategories

    static findByCode({catCode}:{catCode:string}):Category|any{
        const search = CategoryDb.categories.find((item)=>item.categoryCode==catCode)
        return search;
    }

}