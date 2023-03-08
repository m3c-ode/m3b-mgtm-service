import { Form, Select, Button } from 'antd';
import React, { useRef, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import BeerVolumesFields from '../Beer/BeerVolumesFields';

type Props = {};

const FormTest = (props: Props) => {
    const [form] = Form.useForm();

    const formRef = useRef<any>(null);

    const availableBeers = [{
        _id: '2k34jk324nk23n',
        name: 'Beer 1',

    },
    {
        _id: '2k34jk324nk23n2',
        name: 'Beer 2',
    }
    ];

    const [selectedBeers, setSelectedBeers] = useState<any[]>([]);

    const onFinish = async (values: any) => {
        console.log("🚀 ~ file: NewDeliveryForm.tsx:12 ~ onFinish ~ values:", values);
        const formData = form.getFieldsValue(true);
        console.log("🚀 ~ file: NewDeliveryForm.tsx:14 ~ onFinish ~ formData:", formData);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            ref={formRef}
            form={form}
            name="newDeliveryForm"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="createForm"
            layout="horizontal"
        >
            <Form.List
                name="products"
                rules={[
                    {
                        validator: async (_, products) => {
                            if (!products || products.length < 1) {
                                return Promise.reject(new Error('Please choose at least 1 beer'));

                            }
                        },
                    },
                ]}
                initialValue={[{}]}
            >

                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field, index) => {
                            // return {
                            const handleBeerSelection = (object: any) => {
                                console.log("🚀 ~ file: NewDeliveryForm.tsx:181 ~ handleBeerSelection ~ value:", object);
                                const selectedOption = availableBeers?.find((beer) => beer._id === object);
                                setSelectedBeers(prevSelectedBeers => {
                                    const newSelectedBeers = [...prevSelectedBeers];
                                    newSelectedBeers[field.name] = selectedOption!;
                                    return newSelectedBeers;
                                });
                            };

                            console.log("🚀 ~ file: NewDeliveryForm.tsx:206 ~ NewDeliveryForm ~ field:", field);
                            return (
                                <>
                                    {/* <div className={formStyles.beerItems}> */}
                                    <Form.Item
                                        labelCol={{ span: 3 }}
                                        wrapperCol={{ span: 21 }}
                                        label={'Beer: '}
                                        // name={[field.name, 'id']}
                                        rules={[{ required: true, message: 'Please select product' }]}
                                        style={{ width: '95%' }}
                                    >

                                        <Form.Item
                                            // label={'Beer: '}
                                            name={[field.name, 'id']}
                                            rules={[{ required: true, message: 'Please select product' }]}
                                            style={{ width: '100%' }}
                                        // noStyle
                                        >
                                            <Select
                                                placeholder="Select a beer product from the list"
                                                allowClear
                                                // value={selectedBeers && selectedBeers[field.name]?._id}
                                                // onChange={value => setSelectedBeer(availableBeers?.find((beer) => beer.name === value))}
                                                // onChange={value => setSelectedBeers(selectedBeers => [...selectedBeers, availableBeers?.find((beer) => beer._id === value)!])}
                                                onChange={handleBeerSelection
                                                }
                                                // onSelect={ }
                                                // labelInValue={true}
                                                options={availableBeers?.map((beer, index) => {
                                                    return { value: beer._id, label: beer.name, key: index };
                                                })}
                                            // style={{ width: '80%' }}
                                            >
                                                {/* {availableOptions?.map((beer, index) => (
                                                        <Option
                                                            key={index}
                                                            value={beer._id}
                                                            label={beer.name}
                                                        >
                                                            {beer.name}
                                                        </Option>
                                                    ))} */}

                                            </Select>
                                        </Form.Item>
                                    </Form.Item>
                                    <AiOutlineMinusCircle
                                        style={{
                                            fontSize: '1.5rem',
                                            margin: 'auto 0',
                                            visibility: index == 0 ? 'hidden' : 'visible',
                                            width: '1.5rem'
                                        }}
                                        onClick={() => {
                                            // getTotalWeight(name);
                                            remove(field.name);
                                        }} />
                                </>
                            );
                        })
                        }
                        <Form.Item
                            // labelCol={{ span: 24 }}
                            wrapperCol={{ offset: 2 }}
                        >
                            <Button
                                type="dashed"
                                onClick={(e: any) => {
                                    // getTotalWeight();
                                    add();
                                }}
                                block
                                icon={<AiOutlinePlusCircle />}
                                style={{ width: '90%' }}
                            >
                                {' '} Add Beers or Product
                            </Button>
                        </Form.Item>
                    </>

                )}
            </Form.List>
            <Form.Item style={{ display: 'flex', justifyContent: 'center', paddingRight: '2.5rem' }}>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormTest

