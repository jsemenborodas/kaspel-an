import { Space, Table, Button, Flex, Form, Input} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  FormOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined
} from '@ant-design/icons';

import './Table.css'
import { useEffect, useState } from 'react';
import { CreateModal } from '../modals/createModal';
import { EditModal } from '../modals/editModal';

export type DataSourceType = {
  key: string;
  name: string;
  date: number;
  value: number;
};

export function TableComponent() {
    const [form] = Form.useForm();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isNameAscending, setIsNameAcsending] = useState<boolean|undefined>(undefined);
    const [isDateAscending, setIsDateAscending] = useState<boolean|undefined>(undefined);
    const [isValueAscending, setIsValueAscending] = useState<boolean|undefined>(undefined);
    const [editData, setEditData] = useState<DataSourceType>({name: '', date: 0, value: 0, key: '0'})
    const [searchValue, setSearchValue] = useState('');
    const [isSearchStarted, setIsSearchStarted] = useState(false);
    const [searchFilteredData, setSearchFilteredData] = useState<DataSourceType[]>([]);
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
    {/*Я не подключал линтер, поэтому за структуру кода ...) */}

    const searchFunc = (value: string) => {
        changeSearchValue(value);
    }
    
    const changeSearchValue = (value: string) => {
        setSearchValue(value)
    }
    const sortByNames = () => {
        if(isNameAscending === undefined) {
            setIsNameAcsending(true);
        } else {
            setIsNameAcsending(!isNameAscending)
        }
        setIsDateAscending(undefined);
        setIsValueAscending(undefined);
        const sortedData = [...dataSource].sort((a,b) => {
            if(isNameAscending) {
                return a.name.localeCompare(b.name)
            } else {
                return b.name.localeCompare(a.name)
            }
        })
        setDataSource(sortedData);
    }
    const sortByDate = () => {
        if(isDateAscending === undefined) {
            setIsDateAscending(true);
        } else {
            setIsDateAscending(!isDateAscending)
        }
        setIsNameAcsending(undefined);
        setIsValueAscending(undefined);
        const sortedData = [...dataSource].sort((a,b) => {
            if(isDateAscending) {
                return a.date - b.date;
            } else {
                return b.date - a.date;
            }
        })
        setDataSource(sortedData);
    }
    const sortByValue = () => {
        if(isValueAscending === undefined) {
            setIsValueAscending(true);
        } else {
            setIsValueAscending(!isValueAscending)
        }
        setIsDateAscending(undefined);
        setIsNameAcsending(undefined);
        const sortedData = [...dataSource].sort((a,b) => {
            if(isValueAscending) {
                return a.value - b.value;
            } else {
                return b.value - a.value;
            }
        })
        setDataSource(sortedData);
    }


  
    const columns = [
        {
            title: (<span  onClick={() => sortByNames()} style={{cursor: 'pointer', userSelect: 'none', backgroundColor: isNameAscending !== undefined ? 'rgba(0, 0, 0, 0.1)': undefined}}>Name {isNameAscending ? <SortAscendingOutlined /> : <SortDescendingOutlined />}</span>),
            dataIndex: 'name',
            key: 'name',
            width: '30%'
        },
        {
             title: (<span onClick={() => sortByDate()} style={{ cursor: 'pointer',  userSelect: 'none',backgroundColor: isDateAscending !== undefined ? 'rgba(0, 0, 0, 0.1)': undefined}}>Date {isDateAscending ? <SortAscendingOutlined /> : <SortDescendingOutlined />}</span>),
            dataIndex: 'date',
            key: 'date',
             width: '30%'
        },
        {
              title: (<span onClick={() => sortByValue()} style={{cursor: 'pointer', userSelect: 'none', backgroundColor: isValueAscending !== undefined ? 'rgba(0, 0, 0, 0.1)': undefined}}>Value {isValueAscending ? <SortAscendingOutlined /> : <SortDescendingOutlined />}</span>),
             dataIndex: 'value',
             key: 'value',
              width: '30%'
            },  
            {
                title: (<span style={{userSelect: 'none'}}>Action</span>),
                key: 'action',
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

useEffect(() => {
    if(searchValue.length === 0) {
        setIsSearchStarted(false)
        return
    }setIsSearchStarted(true);
    const filteredData = dataSource.filter((item) => {
        const dateAsString = item.date.toString();
        const valueAsString = item.value.toString();
        return(
            item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            dateAsString.includes(searchValue) ||
            valueAsString.includes(searchValue)
        )
    })
    setSearchFilteredData(filteredData)
}, [searchValue])
return(<>
    <Flex className='CreateButtonWrapper' gap='2em'>
        <Form className='Search' form={form}><Form.Item name='searchValue'><Input onChange={(e) => searchFunc(e.target.value)} prefix={<SearchOutlined className='SearchIcon' />} placeholder='Search'/> </Form.Item></Form>
        <Button className='CreateButton' onClick={() => {
            setIsCreateModalOpen(!isCreateModalOpen);
        }}> <FormOutlined /><span className='CreateButtonSpan'> Create a new one</span></Button>
    </Flex>
    <Table pagination={false} columns={columns} dataSource={ isSearchStarted ? searchFilteredData.map((i) => i) : dataSource.map((i)=> i)} className='Table'/>
    <CreateModal isModalOpen = {isCreateModalOpen} setIsModalOpen={setIsCreateModalOpen} addToDataSource={AddToDataSource}/>
    <EditModal isModalOpen ={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} changeData={changeData} data={editData}/>
    <p>Не совсем понятно, нужно ли делать валидацию данных, поэтому она не делалась. Если нужно - то какого формата должны быть даты?<br />
    Помимо этого непонятно нужно-ли делать сохранение данных при перезагрузке страницы, поэтому это тоже не делалось.</p>
    </>)
}