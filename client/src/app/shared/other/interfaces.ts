
// Интерфейсы


// Интерфейс для юзера
export interface User
{
    email: string,
    password: string
    name?: string
    _id?: string
    secondName?: string
    program?: string
    specialization?: string
}





//Интерфейс для сообщения
export interface Message
{
    message: string
}







// Интерфейс для материалайза
export interface MaterialInstance
{
    open?(): void
    close?(): void
    destroy?(): void
}



// Интерфейс для Юзера
export interface UserProfile
{
    socials: any
    compitations: any
    publication: any
    hobby: any
    family: any
    dopInfo: any
    languages: any
    skills: any
    education: any
    opyt: any
    functionsNapravlenie: any
    otraslSpec: any
    company: any
    program: any
    email: string
    password: string
    phone: string
    name: string
    secondName: string
    thirdName: string
    specialization: string
    workPos?: string
    xsAvatar?: any
    year? : string
    city? : string
    date? : Date
}




// Интерфейс для case
export interface Case
{
    orderViews?: number
    order?: any
    previewSrc?: any
    _id?: any
    title: any
    content: any
    date?: Date
    imageSrc?: any
    user?: any
    caseId?: any
    otraslSpec?: any
    functionsNapravlenie?: any
    comNum?: any
}















