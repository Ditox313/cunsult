
// Интерфейсы


// Интерфейс для юзера
export interface User
{
    email: string,
    password: string
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
    email: string
    password: string
    phone: string
    name: string
    secondName: string
    thirdName: string
    groupName: string
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
    title: any
    content: any
    date?: Date
    imageSrc?: any
    user?: any
    caseId?: any
}















