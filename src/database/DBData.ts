import IMAGES from "../utils/Images";
export interface Category{
    categoryName:string,
    categoryCode:string,
    image:any,
}
export const allCategories:Category[] = [
    { 
        categoryName: "Pre-Incorporation", 
        categoryCode: '01', 
        image: IMAGES["cat-pre-incorporation"] 
    },
    { 
        categoryName: "Company Secretarial Services", 
        categoryCode: '02', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        categoryName: "Post-Incorporation", 
        categoryCode: '03', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        categoryName: "Review of Legal Documents", 
        categoryCode: '04', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        categoryName: "Legal Advice and Consultancy", 
        categoryCode: '05', 
        image: IMAGES["cat-pre-incorporation"] 
    },
    { 
        categoryName: "Legal Drafting", 
        categoryCode: '06', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        categoryName: "Registration", 
        categoryCode: '07', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        categoryName: "Land Documents", 
        categoryCode: '08', 
        image: IMAGES["cat-company-reg"] 
    },
];


export interface Service{
    serviceCode:String,
    serviceName:String,
    categoryCode:String,
    image:any,
}
export const allServices:Service[] = [
    //-->Company name registration
    { 
        serviceCode: '01', 
        serviceName: "Company name registration",  
        categoryCode: '01', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        serviceCode: '02', 
        serviceName: "Company registration",  
        categoryCode: '01', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        serviceCode: '03', 
        serviceName: "registration of Incorporated trustees",  
        categoryCode: '01', 
        image: IMAGES["cat-company-reg"] 
    },
    //-->Company Secretarial Services
    { 
        serviceCode: '04', 
        serviceName: "Advisory services",  
        categoryCode: '02', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        serviceCode: '05', 
        serviceName: "Filling of annual tax returns",  
        categoryCode: '02', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        serviceCode: '06', 
        serviceName: "Attestation and execution of company documents",  
        categoryCode: '02', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        serviceCode: '07', 
        serviceName: "Organize both Board and Annual General Meetings",  
        categoryCode: '02', 
        image: IMAGES["cat-company-reg"] 
    },
    //-->Post-Incorporation
    { 
        serviceCode: '08', 
        serviceName: "Change of Registered Address",  
        categoryCode: '03', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        serviceCode: '09', 
        serviceName: "Notice of change of Directors",  
        categoryCode: '03', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        serviceCode: '10', 
        serviceName: "Increase of Shared Capitals",  
        categoryCode: '03', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        serviceCode: '11', 
        serviceName: "Change of trustees",  
        categoryCode: '03', 
        image: IMAGES["cat-company-reg"] 
    },
    //-->Review of Legal Documents
    { 
        serviceCode: '12', 
        serviceName: "Contract analysis and Review",  
        categoryCode: '04', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        serviceCode: '13', 
        serviceName: "Demand letters review",  
        categoryCode: '04', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        serviceCode: '14', 
        serviceName: "Joint ventures agreement review/Partnership agreement Review",  
        categoryCode: '04', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        serviceCode: '15', 
        serviceName: "Review of artist management Agreement",  
        categoryCode: '04', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        serviceCode: '16', 
        serviceName: "Reconstructuring of pre-drafted contracts",  
        categoryCode: '04', 
        image: IMAGES["cat-company-reg"] 
    },
    //--> Legal Advice and Consultancy
    { 
        serviceCode: '17', 
        serviceName: "Legal advice on joint venture agreements, indirect taxes, and real estate transactions",  
        categoryCode: '05', 
        image: IMAGES["cat-company-reg"] 
    },
    {
        serviceCode: '18', 
        serviceName: "Trademark consultancy",  
        categoryCode: '05', 
        image: IMAGES["cat-company-reg"] 
    },
    //--> Legal Drafting
    {
        serviceCode: '19', 
        serviceName: "Drafting petitions and reply to petitions, Negotiation & Review of Real Estate Agreement, Negotiation of Record Label agreement",  
        categoryCode: '06', 
        image: IMAGES["cat-company-reg"] 
    },
    { 
        serviceCode: '20', 
        serviceName: "Artist management agreement (Songwriters and Producers)",  
        categoryCode: '06', 
        image: IMAGES["cat-company-reg"] 
    },
    //--> Registration
    {
        serviceCode: '21', 
        serviceName: "Trademark, Copyright and Patents and design registration",  
        categoryCode: '07', 
        image: IMAGES["cat-company-reg"] 
    },
    //--> Land Documents
    {
        serviceCode: '22', 
        serviceName: "Perfection of Title, Drafting of deed of assignment",  
        categoryCode: '08', 
        image: IMAGES["cat-company-reg"] 
    },
]