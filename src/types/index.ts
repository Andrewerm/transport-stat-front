export interface IVehicle {
    id: number,
    gos_number: string
}

export interface IVehiclesList {
    vehicles: Array<IVehicle>
}

export interface IDoor {
    number: number,
    cameIn: number,
    cameOut: number
}

export interface IDoorsList {
    doors: IDoor[]
}


export interface IUserProfile {
    email: string,
    company_name: string
}

export interface IGetUserData {
    user_data: IUserProfile
}


export interface IResponseFromServer<T> {
    error: number,
    message: string,
    data?: T | null
}

export interface ILoginParams {
    email: string,
    password: string
}
