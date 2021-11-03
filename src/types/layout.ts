export type categoryType = { 
    label:string, 
    value:string 
}

export type menuType = {
    left:{ label:string, to:string, auth?:string }[]
    right:{ label:string, to:string, auth?:string }[]

};

export type routingTabType = { 
    label:string, 
    value:string 
}[]

export type statedTabType = { 
    label:string, 
    name:string,
    component:any, 
    Icon:any
}[]
