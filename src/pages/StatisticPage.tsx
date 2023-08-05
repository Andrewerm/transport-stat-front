import {App, Button, Card, DatePicker, Select, Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import React, {FC, useContext, useEffect, useState} from "react";
import {ProfileDataContext} from "../hooks/ProfileData";
import {IDoor, IDoorsList, IResponseFromServer, IVehicle, IVehiclesList} from "../types";
import axios, {AxiosError} from "axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import {DefaultOptionType} from "antd/es/select";
import {Dayjs} from "dayjs";

const {RangePicker} = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;

export const StatisticPage: FC = () => {
    const [selectedVehicleId, setSelectedVehicleId] = useState<number>();
    const [selectedStartRange, setSelectedStartRange] = useState<Dayjs>();
    const [selectedEndRange, setSelectedEndRange] = useState<Dayjs>();
    const [loadedVehicleData, setLoadedVehicleData] = useState<DefaultOptionType>();
    const [dataTable, setDataTable] = useState<StatisticDataTableType[]>([]);
    const handleSelectChange = (value: number) => {
        setSelectedVehicleId(value)
    }
    const rangePickerChange = (value: RangeValue) => {
        if (value && value[0]) setSelectedStartRange(value[0])
        if (value && value[1]) setSelectedEndRange(value[1])

    }
    const [loadingVehicles, setLoadingVehicles] = useState(true);
    const [loadingDoors, setLoadingDoors] = useState(false);
    const {notification} = App.useApp();
    const {getUserData} = useContext(ProfileDataContext);
    const [vehicles, setVehicles] = useState<DefaultOptionType[]>([]);
    const getVehicleById = () => vehicles.find(item => item.id === selectedVehicleId)
    const formIsNotFilled = () => !selectedVehicleId || !selectedStartRange || !selectedEndRange
    useEffect(() => {
        axios.get<IResponseFromServer<IVehiclesList>>(AjaxRoutes.GET_VEHICLES)
            .then(response => {
                if (response.data.data) setVehicles(response.data.data.vehicles.map((item: IVehicle) => ({
                    value: item.id,
                    label: item.gos_number
                })))
            })
            .catch((err: AxiosError<IResponseFromServer<null>>) => {
                notification.error({message: err.response?.data.message || err.message})
            })
            .finally(() => {
                setLoadingVehicles(false)
            })
    }, []);

    const getDoors = () => {
        setLoadingDoors(true)
        axios.get<IResponseFromServer<IDoorsList>>(AjaxRoutes.GET_DOORS, {
            withCredentials: true,
            params: {vehicle_id: selectedVehicleId, startRange: selectedStartRange, endRange: selectedEndRange}
        })
            .then(response => {
                console.log('response', response);
                if (response.data.data) {
                    setDataTable(response.data.data.doors.map((item: IDoor) => ({key: item.number, ...item})))
                    const vehicle = vehicles.find(item => item.id === selectedVehicleId)
                    if (vehicle) setLoadedVehicleData(vehicle)
                }
            })
            .catch((err: AxiosError<IResponseFromServer<null>>) => {
                notification.error({message: err.response?.data.message || err.message})
            })
            .finally(() => {
                setLoadingDoors(false)
            })
    }

    interface StatisticDataTableType extends IDoor {
        key: React.Key;
    }

    const columns: ColumnsType<IDoor> = [
        {
            title: 'Двери',
            dataIndex: 'number',
        },
        {
            title: 'Зашедшие',
            dataIndex: 'cameIn',
        },
        {
            title: 'Вышедшие',
            dataIndex: 'cameOut',
        },
    ];
    return <>
        <Card title={getUserData().company_name}>
            <Space direction={'vertical'} size={'large'}>
                <Space>
                    <Select
                        showSearch
                        placeholder="Выберите Ваше ТС"
                        style={{width: 200}}
                        onChange={handleSelectChange}
                        options={vehicles}
                        loading={loadingVehicles}
                    />
                    <RangePicker onChange={rangePickerChange}/>
                    <Button disabled={formIsNotFilled()} onClick={getDoors} loading={loadingDoors} type={'primary'}>Получить
                        данные</Button>
                </Space>
                <Table columns={columns} dataSource={dataTable} pagination={{position: []}}/>
            </Space>
        </Card>
    </>
}
