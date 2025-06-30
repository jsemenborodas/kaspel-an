import { Space, Table, Button, Flex} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  FormOutlined
} from '@ant-design/icons';

import './Table.css'
import { useState } from 'react';
import { CreateModal } from '../modals/createModal';
import { EditModal } from '../modals/editModal';

export type DataSourceType = {
  key: string;
  name: string;
  date: number;
  value: number;
};

export function TableComponent() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState<DataSourceType>({name: '', date: 0, value: 0, key: '0'})
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
                    <Button onClick={() => {setIsEditModalOpen(!isEditModalOpen); setEditData({name: record.name, date: record.date, value: record.value, key: record.key})}}><EditOutlined /></Button>
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
const deleteData = (key: string) => {
    const filteredData = dataSource.filter((i) => i.key !== key);
    const data = filteredData.map((item, index) => ({
        ...item,
        key: (index + 1).toString(), 
    }));
    setDataSource(data);
  }
const changeData = (key: string, name: string, date: number, value: number) => {
    setDataSource((prevData) => 
        prevData.map((item) => 
            item.key === key ? { ...item, name, date, value } : item
        )
    );
};
return(<>
    <Flex className='CreateButtonWrapper'>
        <Button className='CreateButton' onClick={() => {
            setIsCreateModalOpen(!isCreateModalOpen);
        }}> <FormOutlined /><span className='CreateButtonSpan'> Create a new one</span></Button>
    </Flex>
    <Table pagination={false} columns={columns} dataSource={dataSource.map((i)=> i)} className='Table'/>
    <CreateModal isModalOpen = {isCreateModalOpen} setIsModalOpen={setIsCreateModalOpen} addToDataSource={AddToDataSource}/>
    <EditModal isModalOpen ={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} changeData={changeData} data={editData}/>
    </>)
}