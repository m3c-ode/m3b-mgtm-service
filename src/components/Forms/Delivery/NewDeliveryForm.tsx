import { Form, Divider, Input, Select, Button, InputNumber } from 'antd';
import form from 'antd/es/form';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { addressParser } from '../../../../lib/functions';
import { AddressData } from '../../../types/addresses';
import { BeerData, BeersStatusEnum } from '../../../types/beers';
import { ClientData } from '../../../types/clients';
import { NewDeliveryInput } from '../../../types/deliveries';
import Dashboard from '../../Dashboard';
import BeerVolumesFields from '../Beer/BeerVolumesFields';
import formStyles from '../styles.module.scss';

type Props = {
    clientData?: ClientData;
    beersData?: BeerData[];
    userInfo?: string;
};

const volumeLayout = {
    labelCol: { span: 12 },
    // wrapperCol: { span: 20 },
};

const NewDeliveryForm = ({ clientData, beersData, userInfo }: Props) => {
    const [form] = Form.useForm();

    const formRef = useRef<any>(null);

    const clientAddress = addressParser(clientData?.address!);

    const userAddresses: AddressData[] = [{
        street1: '7347 Fraser st',
        city: 'Vancouver',
        zip: 'V5X3W1',
        state: 'BC',
        country: 'Canada',
    }];

    const availableBeers = beersData?.filter((beer) => beer.status === BeersStatusEnum.Ready);

    const [selectedBeers, setSelectedBeers] = useState<BeerData[] | undefined>(undefined);
    const [selectedBeer, setSelectedBeer] = useState<BeerData | undefined>(undefined);

    const onFinish = async (values: any) => {
        console.log("🚀 ~ file: NewDeliveryForm.tsx:12 ~ onFinish ~ values:", values);
        const formData = form.getFieldsValue(true);
        console.log("🚀 ~ file: NewDeliveryForm.tsx:14 ~ onFinish ~ formData:", formData);
        // const newDeliveryData: NewDeliveryInput = {
        //     // clientId: customerId,
        //     // businessId: merchantId,
        //     fromAddress: values.userAddress,
        //     toAddress: values.clientAddress,
        //     products: values.products,


        // };
        // console.log("🚀 ~ file: NewDeliveryForm.tsx:31 ~ onFinish ~ newDeliveryData:", newDeliveryData);

        // try {
        //     const res = await createDelivery(newDeliveryData);
        //     console.log("🚀 ~ file: NewDeliveryForm.tsx:56 ~ onFinish ~ res:", res);

        //     if (res.status === 201) toast.success("Delivery creation successful");

        // } catch (error: any) {
        //     // toast.error(JSON.parse(error.request.responseText).message as string);
        //     toast.error(error.response.data.message);
        //     console.log(error.response);
        // }
    };


    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        if (errorInfo.errorFields.length > 0) {
            errorInfo.errorFields.map((field: { errors: string[]; }, index: any) => {
                toast.error(field.errors[0] as string);
            });
        }
    };

    // TODO: Fix the reset button
    const onReset = () => {
        console.log('hello');
        console.log(formRef);
    };

    return (
        <Dashboard>
            <Form
                ref={formRef}
                form={form}
                name="newDeliveryForm"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 22 }}
                initialValues={{
                    clientName: clientData?.name,
                    clientAddress: clientAddress,

                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="createForm"
                layout="horizontal"
            >
                <h2>Create a New Delivery</h2>
                <Divider />
                {/* <DeliveryInfoFields form={form} /> */}
                <Form.Item
                    label="Client name: "
                    name="clientName"
                    rules={[{ required: true, message: 'Please input your name!' }]}>
                    {/* <Input /> */}
                    <span>{clientData?.name}</span>
                </Form.Item>
                <Form.Item
                    label="Client address: "
                    name="clientAddress"
                    rules={[{ required: true, message: 'Please input your name!' }]}>
                    {/* <Input /> */}
                    <span>{clientAddress}</span>
                </Form.Item>
                <Form.Item
                    label="Your addresses: "
                    name="userAddress"
                    rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Select
                        placeholder="Select an address to deliver from"
                        allowClear
                        onChange={value => { console.log(value); return value; }}
                        options={userAddresses.map((add, index) => {
                            return { label: addressParser(add), value: addressParser(add) };
                        })}
                    >
                    </Select>
                </Form.Item>
                <h3>Beer Inventory</h3>
                <Divider />
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

                                console.log("🚀 ~ file: NewDeliveryForm.tsx:206 ~ NewDeliveryForm ~ field:", field);
                                return (
                                    <>
                                        {/* <div className={styles.beerItems}> */}

                                        <Form.Item
                                            label={'Beer: '}
                                            name={[field.name, 'name']}
                                            rules={[{ required: true, message: 'Please select product' }]}
                                        // style={{ width: '25%', maxWidth: '115px' }}
                                        >
                                            <Select
                                                placeholder="Select a beer product from the list"
                                                allowClear
                                                onChange={value => setSelectedBeer(availableBeers?.find((beer) => beer.name === value))}
                                                options={availableBeers?.map((beer, index) => {
                                                    return { label: beer.name, value: beer.name, key: index };
                                                })}
                                            >

                                            </Select>
                                        </Form.Item>
                                        {/* {selectedBeer && */}
                                        <BeerVolumesFields
                                            form={form}
                                            quantityData={selectedBeer}
                                            fieldName={field.name}
                                            field={field}
                                            layout={volumeLayout}
                                        />
                                        {/* } */}
                                        <AiOutlineMinusCircle
                                            style={{
                                                fontSize: '1rem',
                                                margin: '0 2rem 25px 5px',
                                                visibility: index == 0 ? 'hidden' : 'visible'
                                            }}
                                            onClick={() => {
                                                // getTotalWeight(name);
                                                remove(field.name);
                                            }} />
                                        {/* </div> */}
                                    </>
                                );
                            })
                            }
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={(e: any) => {
                                        // getTotalWeight();
                                        add();
                                    }}
                                    block
                                    icon={<AiOutlinePlusCircle />}>
                                    {' '} Add Beers or Product
                                </Button>
                            </Form.Item>
                        </>

                    )
                    }
                </Form.List>
                <Form.Item style={{ display: 'flex', justifyContent: 'center', paddingRight: '2.5rem' }}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Dashboard >
    );
};

export default NewDeliveryForm;