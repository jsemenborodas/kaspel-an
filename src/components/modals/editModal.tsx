import { Form, Input, Modal } from "antd";
import type { DataSourceType } from "../table/Table";
import { useEffect } from "react";


type CreateModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    changeData: (key: string, name: string, date: number, value: number) => void;
    data: DataSourceType
}


export function EditModal({isModalOpen, setIsModalOpen, changeData, data}: CreateModalProps) {
    const [form] = Form.useForm();
    const onSubmit = () => {
        form.validateFields()
        .then(values => {
            const {name, date, value} = values;
            changeData(data.key, name, date, value);
            form.resetFields();
            setIsModalOpen(!isModalOpen)
        }) 
    }
    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                name: data.name,
                date: data.date,
                value: data.value,
            });
        }
    }, [data, form]);
    return(<>

    <Modal title='Change Data' open={isModalOpen} onCancel={() => {setIsModalOpen(!isModalOpen);}} onOk={onSubmit}>
            <Form form={form}>
                <Form.Item name='name' label='name' rules={[{ required: true, message: 'Please type a name' }]}><Input /></Form.Item>
                <Form.Item name='date' label='date' rules={[{ required: true, message: 'Please type a date' }]}><Input /></Form.Item>
                <Form.Item name='value' label='value' rules={[{ required: true, message: 'Please type a value' }]}><Input /></Form.Item>
            </Form>
    </Modal></>)
}