import { Space, Table, Button, Flex} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  FormOutlined
} from '@ant-design/icons';

import './Table.css'
import { useState } from 'react';
import { CreateModal } from '../modals/createModal';

type DataSourceType = {
  key: string;
  name: string;
  date: number;
  value: number;
};

export function TableComponent() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState<DataSourceType[]>([
    {
      key: '1',
      name: 'John Johnson',
      date: 32,
      value: 15,
    },
    {
      key: '2',
      name: 'John',
      date: 42,
      value: 10,
    },
  ]);

  const deleteData = (key: string) => {
    const filteredData = dataSource.filter((i) => i.key !== key);
    const data = filteredData.map((item, index) => ({
        ...item,
        key: (index + 1).toString(), 
    }));
    setDataSource(data);
  }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
             width: '30%'
        },
        {
             title: 'Value',
             dataIndex: 'value',
             key: 'value',
              width: '30%'
            },  
            {
                title: 'Action',
                key: 'action',
                align: 'center',
                width: '10%',
                render: (record: DataSourceType) => (
                <Space size="middle">
                    <Button><EditOutlined /></Button>
                    <Button onClick={() => deleteData(record.key)}><DeleteOutlined /></Button>
                    </Space>
                    ),
                },
            ];

const AddToDataSource = (name: string, date: number, value: number) => {
      const newData: DataSourceType = {
      key: (dataSource.length + 1).toString(),
      name,
      date,
      value,
    };
    setDataSource((prev) => [...prev, newData])
}
return(<>
    <Flex className='CreateButtonWrapper'>
        <Button className='CreateButton' onClick={() => {
            setIsCreateModalOpen(!isCreateModalOpen);
        }}> <FormOutlined /><span className='CreateButtonSpan'> Create a new one</span></Button>
    </Flex>
    <Table pagination={false} columns={columns} dataSource={dataSource.map((i)=> i)} className='Table'/>
    <CreateModal isModalOpen = {isCreateModalOpen} setIsModalOpen={setIsCreateModalOpen} addToDataSource={AddToDataSource}/>
    </>)
}