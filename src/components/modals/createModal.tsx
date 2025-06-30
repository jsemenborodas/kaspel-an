import { Form, Input, Modal } from "antd";

type CreateModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    addToDataSource: (name: string, date: number, value: number) => void;
}


export function CreateModal({isModalOpen, setIsModalOpen, addToDataSource}: CreateModalProps){
    const [form] = Form.useForm();
    const onSubmit = () => {
        form.validateFields()
        .then(values => {
            const {name, date, value} = values;
            console.log(value)
            addToDataSource(name, date, value);
            form.resetFields();
            setIsModalOpen(!isModalOpen)
        }) 
    }
    return(<>
         <Modal title='Create a new data' open={isModalOpen} onCancel={() => setIsModalOpen(!isModalOpen)} onOk={onSubmit}>
            <Form form={form}>
                <Form.Item name='name' label='name' rules={[{ required: true, message: 'Please type a name' }]}><Input /></Form.Item> {/* Надо добавить валидацию с помощью комплексных чисел, непонятно только, какой формат у дат) */}
                <Form.Item name='date' label='date' rules={[{ required: true, message: 'Please type a date' }]}><Input /></Form.Item>
                <Form.Item name='value' label='value' rules={[{ required: true, message: 'Please type a value' }]}><Input /></Form.Item>
            </Form>
        </Modal>
    </>)
}