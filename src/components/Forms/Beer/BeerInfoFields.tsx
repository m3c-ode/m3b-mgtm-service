import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { BeersStylesEnum } from '../../../types/beers';

const { Option } = Select;

const today = dayjs();
// .format('YYYY/MM/DD');

// TODO: delete date-fns?


type Props = {};

const BeerInfoFields = (props: Props) => {
    return (
        <>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input beer name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Style"
                name="style"
                rules={[{ required: true, message: 'Please input beer style!' }]}
            >
                <Select>
                    {Object.values(BeersStylesEnum).map((value, index) => (

                        <Option
                            key={index}
                            value={value}
                        >
                            {value}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            {/* <Form.Item
                label="Brewer"
                name="brewer"
                rules={[{ required: true, message: "Please input brewer's name!" }]}
            >
                // {/* will be a list of active brewers under this company/brewery
                <Select>
                    {Object.values(BeersStylesEnum).map((value, index) => (

                        <Option
                            key={index}
                            value={value}
                        >
                            {value}
                        </Option>
                    ))}
                </Select>
            </Form.Item> */}
            <Row>
                <Col span={8}>
                    <Form.Item
                        // labelCol={{ span: 24 }}
                        // labelAlign=
                        label="Brewed On"
                        name="brewedOn"
                        initialValue={dayjs()}
                        rules={[{ required: true, message: 'Please input brewedd on date!' }]}
                    >
                        <DatePicker /* defaultValue={dayjs()} */ format={'YYYY/MM/DD'} placeholder={dayjs().format('YYYY/MM/DD')} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}

                        label="Available On"
                        name="availableOn"
                        initialValue={dayjs().add(4, 'week')}
                        rules={[{ required: true, message: 'Please input available on date!' }]}
                    >
                        <DatePicker /* defaultValue={dayjs().add(4, 'week')} */ format={'YYYY/MM/DD'} placeholder={dayjs().add(4, 'week').format('YYYY/MM/DD')} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}

                        label="Projected Volume (L)"
                        name="qty"
                        // initialValue={new Date()}
                        rules={[{ required: true, message: 'Please input expected volume!' }]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                </Col>
            </Row>


            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                {/* <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button> */}
            </Form.Item>
        </>

    );
};

export default BeerInfoFields;