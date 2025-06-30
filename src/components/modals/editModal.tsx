import { Modal } from "antd";

export function EditModal() {
    return(<>
    <Modal title='Create a new data' open={isModalOpen} onCancel={() => setIsModalOpen(!isModalOpen)} onOk={onSubmit}>
            <Form form={form}>
                <Form.Item name='name' label='name' rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item name='date' label='date' rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item name='value' label='value' rules={[{ required: true }]}><Input /></Form.Item>
            </Form>
    </Modal></>)
}