import mock from "./axios"
import {AjaxRoutes} from "./ajaxRoutes";
import {IDoorsList, IGetUserData, ILoginParams, IResponseFromServer, IVehiclesList} from "../types";
import {loginParams} from "./testLogin";


const NotFoundPage: IResponseFromServer<null> = {error: 404, message: 'Нет такого эндпоинта'}
const LoginSuccessful: IResponseFromServer<IGetUserData> = {
    error: 0, message: 'Аутентификация успешна',
    data: {user_data: {company_name: 'ООО Ромашка', email: 'adads@dsdfs.ru'}}
}
const LoginFail: IResponseFromServer<null> = {error: 401, message: 'Аутентификация не успешна'}
const LogOut: IResponseFromServer<null> = {error: 200, message: 'Выход из сессии успешен'}

const vehicles: IVehiclesList = {
    vehicles: [
        {id: 1, gos_number: 'A111BA116RUS'},
        {id: 3, gos_number: 'A333AA116RUS'},
        {id: 4, gos_number: 'A443MM116RUS'},
        {id: 5, gos_number: 'A989MA116RUS'},
        {id: 6, gos_number: 'A001MA116RUS'},
        {id: 2, gos_number: 'A222AB116RUS'},
    ]
}

const doors: IDoorsList = {
    doors: [
        {
            number: 1,
            cameIn: 12,
            cameOut: 13
        },
        {
            number: 2,
            cameIn: 14,
            cameOut: 15
        }
    ]
}

mock
    .onAny()
    .passThrough()
    .onPost(AjaxRoutes.LOGIN)
    .reply<IResponseFromServer<null>>(function (config) {
        const data: ILoginParams = JSON.parse(config.data)
        if (data.email === loginParams.email && data.password === loginParams.password) return [200, LoginSuccessful]
        else return [LoginFail.error, LoginFail]
    })
    .onPost(AjaxRoutes.LOGOUT)
    .reply<IResponseFromServer<null>>(() => [LogOut.error, LogOut])
    .onGet(AjaxRoutes.GET_VEHICLES)
    .reply<IResponseFromServer<IVehiclesList>>(() => [200, {data: vehicles}])
    .onPost(AjaxRoutes.POST_REPORT)
    .reply<IResponseFromServer<IDoorsList>>(() => [200, {data: doors}])
    .onAny()
    .reply(() => [404, NotFoundPage])
