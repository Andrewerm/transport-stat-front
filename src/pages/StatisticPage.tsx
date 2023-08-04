import {Button, Card, DatePicker, Select, Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import React, {FC} from "react";

const {RangePicker} = DatePicker;

export const StatisticPage: FC = () => {
    const handleChange = () => {

    }

    interface StatisticDataTableType {
        key: React.Key;
        door_number: string;
        cameIn: number;
        cameOut: number;
    }

    const data: StatisticDataTableType[] = [];
    for (let i = 1; i <= 2; i++) {
        data.push({
            key: i,
            door_number: `Дверь № ${i}`,
            cameIn: i * 2,
            cameOut: i * 3,
        });
    }

    const columns: ColumnsType<StatisticDataTableType> = [
        {
            title: 'Двери',
            dataIndex: 'door_number',
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
        <Card title={'ООО Ромашка'}>
            <Space direction={'vertical'} size={'large'}>
                <Space>
                    <Select
                        showSearch
                        placeholder="Выберите Ваше ТС"
                        style={{width: 200}}
                        onChange={handleChange}
                        options={[
                            {value: 'А002АA116RUS'},
                            {value: 'А003АA116RUS'},
                            {value: 'А001АA116RUS'},
                            {value: 'А004АA116RUS'},
                        ]}
                    />
                    <RangePicker/>
                    <Button type={'primary'}>Получить данные</Button>
                </Space>
                <Table columns={columns} dataSource={data} pagination={{position: []}}/>
            </Space>
        </Card>
    </>
}
