import { Form, Divider, Input, Select, Button, InputNumber } from 'antd';
import form from 'antd/es/form';
import { useRouter } from 'next/router';
import React, { useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { addressParser } from '../../../../lib/functions';
import { createDelivery } from '../../../pages/api/services';
import { AddressData } from '../../../types/addresses';
import { BeerData, BeersStatusEnum } from '../../../types/beers';
import { ClientData } from '../../../types/clients';
import { NewDeliveryInput } from '../../../types/deliveries';
import Dashboard from '../../Dashboard';
import BeerVolumesFields from '../Beer/BeerVolumesFields';
import formStyles from '../styles.module.scss';
// import styles from './styles.module.scss';

const { Option } = Select;

type Props = {
    clientData?: ClientData;
    beersData?: BeerData[];
    userInfo?: string;
    domainAddress?: string | AddressData;
};

const volumeLayout = {
    labelCol: { span: 14 },
    // wrapperCol: { span: 20 },
};

const NewDeliveryForm = ({ clientData, beersData, userInfo, domainAddress }: Props) => {

    const router = useRouter();
    const [form] = Form.useForm();

    const formRef = useRef<any>(null);

    const clientAddress = addressParser(clientData?.address!);

    const userAddresses: AddressData[] = [
        // {
        // street1: '7347 Fraser st',
        // city: 'Vancouver',
        // zip: 'V5X3W1',
        // state: 'BC',
        // country: 'Canada',
        // }
    ];

    domainAddress && userAddresses.push(domainAddress as AddressData);

    const availableBeers = beersData?.filter((beer) => beer.status === BeersStatusEnum.Ready);


    const [selectedBeers, setSelectedBeers] = useState<BeerData[]>([]);
    console.log("🚀 ~ file: NewDeliveryForm.tsx:46 ~ selectedBeers:", selectedBeers);
    // const [selectedBeer, setSelectedBeer] = useState<BeerData | undefined>(undefined);

    const availableOptions = availableBeers!.filter((beer) => {
        // if (selectedBeers.length > 0) {
        const isSelected = selectedBeers?.some((selectedBeer) => selectedBeer && selectedBeer._id === beer._id);
        return !isSelected;

        // } else {
        //     return availableBeers;
        // }
    });

    const onFinish = async (values: any) => {
        console.log("🚀 ~ file: NewDeliveryForm.tsx:12 ~ onFinish ~ values:", values);
        const formData = form.getFieldsValue(true);
        console.log("🚀 ~ file: NewDeliveryForm.tsx:14 ~ onFinish ~ formData:", formData);

        const newDeliveryData: NewDeliveryInput = {
            clientId: clientData?._id,
            // businessId: merchantId,
            fromAddress: values.userAddress,
            toAddress: values.clientAddress,
            products: values.products,
        };
        console.log("🚀 ~ file: NewDeliveryForm.tsx:31 ~ onFinish ~ newDeliveryData:", newDeliveryData);

        // TODO: Create confirmaton modal

        try {
            const res = await createDelivery(newDeliveryData);
            console.log("🚀 ~ file: NewDeliveryForm.tsx:56 ~ onFinish ~ res:", res);

            if (res.status === 201) {
                toast.success("Delivery creation successful");
                router.push('/dashboard/deliveries');
            };

        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message);
            // toast.error(JSON.parse(error.request.responseText).message as string);
        }
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

    // TODO: Responsiveness
    return (
        <Dashboard>
            <Form
                ref={formRef}
                form={form}
                name="newDeliveryForm"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
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
                <Form.Item
                    label="Client name: "
                    name="clientName"
                // rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <span>{clientData?.name}</span>
                </Form.Item>
                <Form.Item
                    label="Client address: "
                    name="clientAddress"
                // rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <span>{clientAddress}</span>
                </Form.Item>
                <Form.Item
                    label="Your addresses: "
                    name="userAddress"
                    rules={[{ required: true, message: 'Please select an address to ship from!' }]}>
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
                    {/* TODO: report issue with label of select field showing value of _id instead of name, if I don't use labelInValue */}
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => {
                                // return {
                                const handleBeerSelection = (object: any) => {
                                    // console.log("🚀 ~ file: NewDeliveryForm.tsx:181 ~ handleBeerSelection ~ value:", object);
                                    const selectedOption = availableBeers?.find((beer) => beer._id === object.value);
                                    setSelectedBeers(prevSelectedBeers => {
                                        const newSelectedBeers = [...prevSelectedBeers];
                                        newSelectedBeers[field.name] = selectedOption!;
                                        return newSelectedBeers;
                                    });
                                };

                                console.log("🚀 ~ file: NewDeliveryForm.tsx:206 ~ NewDeliveryForm ~ field:", field);
                                return (
                                    <>
                                        <div className={formStyles.beerItems}>
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
                                                    name={[field.name, 'beer']}
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
                                                        labelInValue={true}
                                                        options={availableOptions?.map((beer, index) => {
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
                                                <BeerVolumesFields
                                                    form={form}
                                                    quantityData={selectedBeers[field.name]}
                                                    fieldName={field.name}
                                                    field={field}
                                                    layout={volumeLayout}
                                                />
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
                                        </div>
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
                                // style={{ width: '90%' }}
                                >
                                    {' '} Add Beers or Product
                                </Button>
                            </Form.Item>
                        </>

                    )}
                </Form.List>
                <Form.Item style={{
                    display: 'flex', justifyContent: 'center',
                    marginLeft: '8%',
                    // paddingRight: '2.5rem'
                }}>
                    <Button type="primary" htmlType="submit">
                        Confirm
                    </Button>
                </Form.Item>
            </Form>
        </Dashboard>
    );
};

export default NewDeliveryForm;