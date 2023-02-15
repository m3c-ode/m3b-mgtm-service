import { Form, Divider, Input, Select, Col, DatePicker, InputNumber, Row, Switch, Checkbox, Button } from 'antd';
import dayjs from 'dayjs';
import router from 'next/router';
import React, { useState } from 'react';
import { beerData } from '../../../seed';
import { BeerData, BeersStylesEnum } from '../../../types/beers';
import Dashboard from '../../Dashboard';
import styles from './styles.module.scss';
const { TextArea } = Input;
const { Option } = Select;


type Props = {
    data: BeerData;
};

const EditBeerForm = ({ data }: Props) => {
    console.log("🚀 ~ file: EditBeerForm.tsx:14 ~ EditBeerForm ~ data", data);
    const [form] = Form.useForm();

    const [isFormDisabled, setIsFormDisabled] = useState(true);
    // const router = useRouter();
    // console.log('router query', router.query);

    // extract data
    const { id, name, description, style, status, abv, ibu, brewedOn, availableOn, qty } = data;
    // console.log("🚀 ~ file: [id].tsx:19 ~ Beer ~ params", params);

    const switchMode = ({ disabled }: { disabled: boolean; }) => {
        console.log("🚀 ~ file: EditBeerForm.tsx:28 ~ switchMode ~ checked", disabled);
        setIsFormDisabled(disabled);
    };

    const onFinish = (values: any) => {
        console.log("edit form values", values);
        const data: BeerData = {
            id: id,
            name: values.name,
            description: values.description,
            style: values.style,
            status: values.status,

            brewedOn: values.brewedOn.format('YYYY-MM-DD'),
            availableOn: values.availableOn.format('YYYY-MM-DD'),
            qty: {
                total: values.qty,
            },
            abv: values.abv,
            ibu: values.ibu,
        };
        // hops: formData.hops,
        // grains: formData.grains
        beerData[beerData.findIndex((beer) => id === beer.id)] = data;
        console.log("🚀 ~ file: BeerForm.tsx:79 ~ onFinish ~ beerData", beerData);
        router.push('/dashboard');
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
    };

    return (
        <Dashboard>
            <h2>Beer details</h2>
            <Divider />
            <h3>General information</h3>
            <Checkbox
                checked={!isFormDisabled}
                onChange={(e) => setIsFormDisabled(!e.target.checked)}
            >
                Edit mode
            </Checkbox>
            <Form
                form={form}
                name="createBeerForm"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={styles.createBeerForm}
                onValuesChange={switchMode}
                disabled={isFormDisabled}
            // layout="vertical"
            >
                <Form.Item
                    initialValue={name}
                    name="name" label="Name">
                    <Input
                        value={name}
                    // defaultValue={name}
                    />
                </Form.Item>
                <Form.Item
                    initialValue={description}
                    name="description" label="Description">
                    <TextArea
                        value={description}
                        defaultValue={description}
                    />
                </Form.Item>
                <Form.Item
                    label="Style"
                    name="style"
                    initialValue={style}
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
                    label="Status"
                    name="status"
                    initialValue={status}
                    rules={[{ required: true, message: 'Please input beer status!' }]}
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
                <Row>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 9 }}
                            wrapperCol={{ span: 10 }}
                            // labelAlign=
                            label="Brewed On"
                            name="brewedOn"
                            initialValue={dayjs(brewedOn)}
                            rules={[{ required: true, message: 'Please input brewedd on date!' }]}
                        >
                            <DatePicker /* defaultValue={dayjs()} */ format={'YYYY/MM/DD'}
                            // placeholder={dayjs().format('YYYY/MM/DD')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 9 }}
                            wrapperCol={{ span: 10 }}
                            label="Available On"
                            name="availableOn"
                            initialValue={dayjs(availableOn)}
                            rules={[{ required: true, message: 'Please input available on date!' }]}
                        >
                            <DatePicker /* defaultValue={dayjs().add(4, 'week')} */ format={'YYYY/MM/DD'}
                            // placeholder={dayjs().add(4, 'week').format('YYYY/MM/DD')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 9 }}
                            wrapperCol={{ span: 10 }}
                            label="Total Vol. (L)"
                            name="qty"
                            initialValue={qty.total}
                            rules={[{ required: true, message: 'Please input total volume!' }]}
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 9 }}
                            wrapperCol={{ span: 10 }}
                            label="ABV"
                            name="abv"
                            initialValue={abv}
                            rules={[{ required: true, message: 'Please input abv!' }]}
                        >
                            <InputNumber min={0} step={0.1} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 9 }}
                            wrapperCol={{ span: 10 }}
                            label="IBU"
                            name="ibu"
                            initialValue={ibu}
                            rules={[{ required: true, message: 'Please input ibu!' }]}
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '2.5rem' }}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Dashboard >
    );
};

export default EditBeerForm;