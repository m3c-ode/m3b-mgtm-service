import { DatePicker, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { BeersStylesEnum } from '../../../types/beers';

const { Option } = Select;

const today = dayjs();
// .format('YYYY/MM/DD');


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
            <Form.Item
                label="Brewed On"
                name="brewedOn"
                // initialValue={new Date()}
                rules={[{ required: true, message: 'Please input brewedd on date!' }]}
            >
                <DatePicker defaultValue={dayjs()} format={'YYYY/MM/DD'} placeholder={dayjs().format('YYYY/MM/DD')} />
            </Form.Item>
        </>

    );
};

export default BeerInfoFields;