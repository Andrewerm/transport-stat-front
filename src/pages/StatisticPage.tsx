import {Button, Card, DatePicker, Select, Space, Table} from "antd";
import { ColumnsType } from "antd/es/table";
import {FC} from "react";

const { RangePicker } = DatePicker;

export const StatisticPage: FC = () => {
    const handleChange = () => {

    }

    interface DataType {
        key: React.Key;
        name: string;
        age: number;
        address: string;
    }

    const data: DataType[] = [];
    for (let i = 0; i < 2; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];
    return <>
        <Card title={'ООО Ромашка' }>
            <Space direction={'vertical'}>
            <Space>
                <Select
                    showSearch
                    placeholder="Выберите Ваше ТС"
                    style={{ width: 200 }}
                    onChange={handleChange}
                    options={[
                        { value: 'А002АA116RUS' },
                        { value: 'А003АA116RUS' },
                        { value: 'А001АA116RUS' },
                        { value: 'А004АA116RUS' },
                    ]}
                />
                <RangePicker />
                <Button type={'primary'}>Получить данные</Button>
            </Space>
                <Table columns={columns} dataSource={data} />
            </Space>
        </Card>
    </>
}
