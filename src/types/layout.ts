export type categoryType = { 
    label: string, 
    value: string 
}

export type menuType = { 
    label: string, 
    to: string, 
    auth?: string,
    /* TODO ts dont clearly published solution to typing thec case */
    component?: any,  
}[]

export type routingTabType = { 
    label: string, 
    value: string 
}[]

export type statedTabType = { 
    label: string, 
    name: string,
    /* TODO ts dont clearly published solution to typing thec case */
    component: any, 
    /* TODO ts dont clearly published solution to typing thec case */
    Icon: any
}[]

export type ApperianceType = {
  tone: number
  color: string 
}
