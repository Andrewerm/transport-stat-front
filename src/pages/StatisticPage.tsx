import {App, Button, Card, Col, DatePicker, Row, Select, Space, Table, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import React, {FC, useContext, useEffect, useState} from "react";
import {ProfileDataContext} from "../hooks/ProfileData";
import {
    IDoor,
    IDoorsList,
    IGetDoorsParams,
    IResponseFromServer,
    ISelectorData,
    IVehicle,
    IVehiclesList
} from "../types";
import axios, {AxiosError} from "axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";
import dayjs, {Dayjs} from "dayjs";
import {useNavigate} from "react-router-dom";

const {RangePicker} = DatePicker;
const {Title} = Typography
type RangeValue = [Dayjs | null, Dayjs | null] | null;

export const StatisticPage: FC = () => {
    const dateFormat = 'DD.MM.YYYY';
    const [selectedVehicleId, setSelectedVehicleId] = useState<number>();
    const [selectedStartRange, setSelectedStartRange] = useState<Dayjs>(dayjs().subtract(1, 'day'));
    const [selectedEndRange, setSelectedEndRange] = useState<Dayjs>(dayjs().subtract(1, 'day'));
    const [loadedVehicleData, setLoadedVehicleData] = useState<IGetDoorsParams>();
    const [dataTable, setDataTable] = useState<StatisticDataTableType[]>([]);
    const handleSelectChange = (value: number) => {
        setSelectedVehicleId(value)
    }
    const rangePickerChange = (value: RangeValue) => {
        if (value && value[0]) setSelectedStartRange(value[0])
        if (value && value[1]) setSelectedEndRange(value[1])
    }
    const {clearDataUser} = useContext(ProfileDataContext);
    const navigate = useNavigate();
    const [loadingVehicles, setLoadingVehicles] = useState(true);
    const [loadingDoors, setLoadingDoors] = useState(false);
    const {notification} = App.useApp();
    const {getUserData} = useContext(ProfileDataContext);
    const [vehicles, setVehicles] = useState<ISelectorData[]>([]);
    const getVehicleById = (id: number) => vehicles.find(item => item.value === id)?.label
    const formIsNotFilled = () => !selectedVehicleId
    const [summa, setSumma] = useState(0);

    useEffect(() => {
        axios.get<IResponseFromServer<IVehiclesList>>(AjaxRoutes.GET_VEHICLES)
            .then(response => {
                if (response.data.data && response.data.data.vehicles.length > 0) {
                    setVehicles(response.data.data.vehicles.map((item: IVehicle) => ({
                        value: item.id,
                        label: item.gos_number
                    })))
                }
            })
            .catch((err: AxiosError<IResponseFromServer<null>>) => {
                notification.error({message: err.response?.data.message || err.message})
                if (err.response?.status === 403) {
                    clearDataUser()
                    navigate(AjaxRoutes.ROUTE_LOGIN)
                }
            })
            .finally(() => {
                setLoadingVehicles(false)
            })
    }, [navigate, notification, clearDataUser]);
    const getDoors = () => {
        if (selectedVehicleId && selectedStartRange && selectedEndRange) {
            setLoadingDoors(true)
            const params: IGetDoorsParams = {
                vehicle_id: selectedVehicleId,
                start_ts: selectedStartRange,
                end_ts: selectedEndRange
            }
            axios.post<IResponseFromServer<IDoorsList>>(AjaxRoutes.POST_REPORT, {
                ...params
            }, {withCredentials: true})
                .then(response => {
                    if (response.data.data) {
                        setDataTable(response.data.data.doors.map((item: IDoor) => ({key: item.number, ...item})))
                        setLoadedVehicleData(params)
                        const countComeIn = response.data.data.doors.reduce(((summa: number, item: IDoor) => item.cameIn + summa), 0)
                        setSumma(countComeIn)
                    }
                })
                .catch((err: AxiosError<IResponseFromServer<null>>) => {
                    notification.error({message: err.response?.data.message || err.message})
                })
                .finally(() => {
                    setLoadingDoors(false)
                })
        }
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
    const statisticTitle = loadedVehicleData &&
        `Статистика по: ${getVehicleById(loadedVehicleData.vehicle_id)}, период с ${loadedVehicleData.start_ts.format("DD-MM-YYYY")} по ${loadedVehicleData.end_ts.format("DD-MM-YYYY")}`
    return <>
        <Card title={getUserData().company_name} style={{overflow: 'auto'}}>
            <Space direction={'vertical'} size={'large'}>
                <Row gutter={[7, 4]}>
                    <Col> <Select
                        showSearch
                        placeholder="Выберите Ваше ТС"
                        style={{width: 200}}
                        defaultActiveFirstOption
                        onChange={handleSelectChange}
                        options={vehicles}
                        loading={loadingVehicles}
                        filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                    />
                    </Col>
                    <Col>
                        <RangePicker
                            defaultValue={[dayjs().subtract(1, 'day'), dayjs()]}
                            onChange={rangePickerChange}
                            format={dateFormat}

                        />
                    </Col>
                    <Col>
                        <Button disabled={formIsNotFilled() || loadingDoors} onClick={getDoors}
                                type={'primary'}>Получить
                            данные</Button>
                    </Col>
                </Row>
                {loadedVehicleData && <Title level={5}>{statisticTitle}</Title>}
                <Table loading={loadingDoors} columns={columns} dataSource={dataTable} pagination={{position: []}}/>
                {statisticTitle && <Title level={5}>Итого перевезено (чел.): {summa}</Title>}
            </Space>
        </Card>
    </>
}
