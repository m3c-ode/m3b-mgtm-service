import { Form, Divider, Input, Select, Col, DatePicker, InputNumber, Row, Switch, Checkbox, Button } from 'antd';
import dayjs from 'dayjs';
import router from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { dbUpdateBeer } from '../../../../lib/beers';
import { updateBeerData } from '../../../pages/api/services';
import { EditBeerData, BeersStatusEnum, BeersStylesEnum } from '../../../types/beers';
import Dashboard from '../../Dashboard';
import BeerVolumesFields from './BeerVolumesFields';
import styles from './styles.module.scss';
const { TextArea } = Input;
const { Option } = Select;


type Props = {
    data: EditBeerData;
};

// const volumeLayout = {
//     labelCol: { span: 9 },
//     // wrapperCol: { span: 2 },
// };

const numbersLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 10 }
};

const EditBeerForm = ({ data }: Props) => {
    console.log("🚀 ~ file: EditBeerForm.tsx:25 ~ data:", data);
    const [form] = Form.useForm();

    const [isFormDisabled, setIsFormDisabled] = useState(true);

    // extract data
    const { _id, name, description, style, status, abv, ibu, brewedOn, availableOn, qty } = data;
    const [beerStatus, setBeerStatus] = useState<BeersStatusEnum>(status!);

    const switchMode = ({ disabled }: { disabled: boolean; }) => {
        console.log("🚀 ~ file: EditBeerForm.tsx:28 ~ switchMode ~ checked", disabled);
        setIsFormDisabled(disabled);
    };

    const onFinish = async (values: any) => {
        console.log("edit form values", values);

        const formData = form.getFieldsValue();
        console.log("🚀 ~ file: EditBeerForm.tsx:43 ~ onFinish ~ formData:", formData);

        // TODO: volume verification before update

        const data: EditBeerData = {
            _id: _id,
            name: values.name,
            description: values.description,
            style: values.style,
            status: values.status,
            brewedOn: values.brewedOn.format('YYYY-MM-DD'),
            availableOn: values.availableOn.format('YYYY-MM-DD'),
            qty: {
                '355ml': formData.qty['355ml'],
                '473ml': formData.qty['473ml'],
                '650ml': formData.qty['650ml'],
                '19Lkegs': formData.qty['19Lkegs'],
                '38Lkegs': formData.qty['38Lkegs'],
                '57Lkegs': formData.qty['57Lkegs'],
                total: values.qty['total'],
            },
            abv: values.abv,
            ibu: values.ibu,
        };
        console.log("🚀 ~ file: EditBeerForm.tsx:52 ~ onFinish ~ beer update data", data);
        // hops: formData.hops,
        // grains: formData.grains

        // DB change
        try {
            const beerUpdateRes = await updateBeerData(_id!, data);
            // const beerUpdateRes = await dbUpdateBeer(_id, data);
            console.log("🚀 ~ file: EditBeerForm.tsx:60 ~ onFinish ~ beerUpdateRes", beerUpdateRes);
            toast.success('Beer updated successfully');
            router.push('/dashboard/beers');

        } catch (error) {
            console.log("🚀 ~ file: EditBeerForm.tsx:66 ~ onFinish ~ edit error", error);
            toast.error('Beer update failed');

        }
        // if (beerUpdateRes) {
        // }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
    };

    return (
        <Dashboard>

            <div className={styles.preFormHeader}>
                <h2>Beer details</h2>
                <Divider />
                <h3>General information</h3>
                <Checkbox
                    className={styles.checkBox}
                    checked={!isFormDisabled}
                    onChange={(e) => setIsFormDisabled(!e.target.checked)}
                >
                    Edit mode
                </Checkbox>
            </div>
            <Form
                form={form}
                name="createBeerForm"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}
                initialValues={{
                    ...data,
                    brewedOn: dayjs(brewedOn),
                    availableOn: dayjs(availableOn),

                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={styles.createBeerForm}
                onValuesChange={switchMode}
                disabled={isFormDisabled}
                labelWrap
            // layout="vertical"
            >
                <Form.Item
                    // initialValue={name}
                    name="name" label="Name">
                    <Input
                        value={name}
                    // defaultValue={name}
                    />
                </Form.Item>
                <Form.Item
                    // initialValue={description}
                    name="description" label="Description">
                    <TextArea
                        value={description}
                        defaultValue={description}
                    />
                </Form.Item>
                <Form.Item
                    label="Style"
                    name="style"
                    // initialValue={style}
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
                    // initialValue={status}
                    rules={[{ required: true, message: 'Please input beer status!' }]}
                >
                    <Select
                        onChange={(value) => setBeerStatus(value)}
                    >
                        {Object.values(BeersStatusEnum).map((value, index) => (

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
                            {...numbersLayout}
                            label="Brewed On"
                            name="brewedOn"
                            // initialValue={dayjs(brewedOn)}
                            rules={[{ required: true, message: 'Please input brewedd on date!' }]}
                        >
                            <DatePicker /* defaultValue={dayjs()} */ format={'YYYY/MM/DD'}
                            // placeholder={dayjs().format('YYYY/MM/DD')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...numbersLayout}
                            label="Available On"
                            name="availableOn"
                            // initialValue={dayjs(availableOn)}
                            rules={[{ required: true, message: 'Please input available on date!' }]}
                        >
                            <DatePicker /* defaultValue={dayjs().add(4, 'week')} */ format={'YYYY/MM/DD'}
                            // placeholder={dayjs().add(4, 'week').format('YYYY/MM/DD')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...numbersLayout}
                            label="Total Vol. (L)"
                            name={["qty", 'total']}
                            rules={[{ required: true, message: 'Please input total volume!' }]}
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            {...numbersLayout}
                            label="ABV"
                            name="abv"
                            rules={[{ required: true, message: 'Please input abv!' }]}
                        >
                            <InputNumber min={0} step={0.1} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...numbersLayout}
                            label="IBU"
                            name="ibu"
                            // initialValue={ibu}
                            rules={[{ required: true, message: 'Please input ibu!' }]}
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <div className={styles.preFormHeader}>
                    <h3>Bottling information</h3>
                </div>
                {
                    beerStatus === BeersStatusEnum.Ready
                        ?
                        (
                            <>
                                <BeerVolumesFields
                                    layout={numbersLayout}
                                    form={form}
                                    quantityData={data}
                                    edit
                                />
                                <Divider />
                            </>
                        )
                        : (

                            <div className={styles.notReadyMsg}> Beer not ready to be bottled</div>
                        )

                }
                <Form.Item style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Dashboard >
    );
};

export default EditBeerForm;