import { Button, Col, Form, FormInstance, FormListFieldData, InputNumber, Row, Space } from 'antd';
import React from 'react';
import { BeerData, EditBeerData } from '../../../types/beers';
import styles from './styles.module.scss';

type Props = {
    form?: FormInstance<any>;
    layout?: any;
    quantityData?:
    // BeerData | Partial<BeerData>
    | EditBeerData;
    fieldName?: number;
    field?: FormListFieldData;
    edit?: boolean;
    initialValues?: any;
};

const BeerVolumesFields = ({ form, layout: volumeLayout, quantityData, fieldName, field, edit, initialValues }: Props) => {
    // console.log("🚀 ~ file: BeerVolumesFields.tsx:14 ~ BeerVolumesFields ~ quantityData:", quantityData?.qty);

    // TODO: Responsiveness
    return (
        <>
            <div className={styles.volumeFields}>
                <Row
                // style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                // justify={'space-between'} align={'middle'}
                >
                    <Col
                        // style={{ display: 'flex' }}
                        span={8}
                    // className={styles.units}
                    >
                        <Form.Item
                            labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 8 }}
                            label='355 ml'
                        >

                            <Space
                            // style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px' }}
                            >
                                <Form.Item
                                    // {...volumeLayout}
                                    // labelCol={{ span: 14 }}
                                    // wrapperCol={{ offset: 2 }}
                                    // {...field}
                                    // label={'355 ml'}
                                    name={
                                        fieldName !== undefined ?
                                            [fieldName, 'qty', '355ml']
                                            :
                                            ['qty', '355ml']
                                    }
                                    initialValue={edit && quantityData?.qty!['355ml']}
                                    noStyle
                                >
                                    <InputNumber style={{ width: 70 }} min={0} max={quantityData?.qty!['355ml']} />
                                </Form.Item>
                                {!edit && quantityData && <span> (available: {quantityData.qty!['355ml']})</span>}
                            </Space>
                        </Form.Item>
                    </Col>
                    <Col
                        // className={styles.units}
                        span={8}>
                        <Form.Item
                            labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 8 }}
                            label='473 ml'
                        >

                            <Space>
                                <Form.Item
                                    // {...volumeLayout}
                                    // labelCol={{ span: 14 }}
                                    // {...field}
                                    // wrapperCol={{ offset: 2 }}
                                    // label={'473ml'}
                                    name={
                                        fieldName !== undefined ?
                                            [fieldName, 'qty', '473ml']
                                            :
                                            ['qty', '473ml']
                                    }
                                    initialValue={edit && quantityData?.qty!['473ml']}
                                    noStyle
                                >
                                    <InputNumber style={{ width: 70 }} min={0} max={quantityData?.qty!['473ml']} />
                                </Form.Item>
                                {!edit && quantityData && <span> (available: {quantityData.qty!['473ml'] ?? 0})</span>}
                            </Space>
                        </Form.Item>
                    </Col>

                    <Col
                        className={styles.units}
                        span={8}>
                        <Form.Item
                            labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 8 }}
                            label='650 ml'
                        >

                            <Space>
                                <Form.Item
                                    {...volumeLayout}
                                    // {...field}
                                    label={'650ml'}
                                    wrapperCol={{ offset: 2 }}
                                    name={
                                        fieldName !== undefined ?
                                            [fieldName, 'qty', '650ml']
                                            :
                                            ['qty', '650ml']
                                    }
                                    initialValue={edit && quantityData?.qty!['650ml']}
                                    noStyle
                                >
                                    <InputNumber style={{ width: 70 }} min={0} max={quantityData?.qty!['650ml']} />
                                </Form.Item>
                                {!edit && quantityData && <span> (available: {quantityData.qty!['650ml'] ?? 0})</span>}
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
                <Row
                // justify={'space-around'} align={'middle'}
                >
                    <Col
                        className={styles.kegs}
                        span={8}>
                        <Form.Item
                            labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 8 }}
                            label='19L Kegs'
                        >
                            <Space

                            // style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}

                            >
                                <Form.Item
                                    // {...volumeLayout}
                                    // {...field}
                                    // label={'19L Kegs'}
                                    // wrapperCol={{ offset: 0.5 }}
                                    name={fieldName !== undefined ?
                                        [fieldName, 'qty', '19Lkegs']
                                        : ['qty', '19Lkegs']
                                    }
                                    initialValue={edit && quantityData?.qty!['19Lkegs']}
                                    noStyle
                                >
                                    <InputNumber style={{ width: 70 }} min={0} max={quantityData?.qty!['19Lkegs']} />
                                </Form.Item>
                                {!edit && quantityData && <span> (available: {quantityData.qty!['19Lkegs'] ?? 0})</span>}
                            </Space>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 8 }}
                            label='38L Kegs'
                        >

                            <Space>
                                <Form.Item
                                    // {...volumeLayout}
                                    // {...field}
                                    label={'38L Kegs'}
                                    name={fieldName !== undefined ?
                                        [fieldName, 'qty', '38Lkegs']
                                        : ['qty', '38Lkegs']
                                    }
                                    initialValue={edit && quantityData?.qty!['38Lkegs']}
                                    noStyle
                                >
                                    <InputNumber style={{ width: 70 }} min={0} max={quantityData?.qty!['38Lkegs']} />
                                </Form.Item>
                                {!edit && quantityData && <span> (available: {quantityData.qty!['38Lkegs'] ?? 0})</span>}
                            </Space>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 8 }}
                            label='57L Kegs'
                        >

                            <Space>
                                <Form.Item
                                    // {...volumeLayout}
                                    // {...field}
                                    // label={'57L Kegs'}
                                    name={fieldName !== undefined ?
                                        [fieldName, 'qty', '57Lkegs']
                                        : ['qty', '57Lkegs']
                                    }
                                    initialValue={edit && quantityData?.qty!['57Lkegs']}
                                    noStyle
                                >
                                    <InputNumber style={{ width: 70 }} min={0} max={quantityData?.qty!['57Lkegs']} />
                                </Form.Item>
                                {!edit && quantityData && <span > (available: {quantityData.qty!['57Lkegs'] ?? 0})</span>}
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default BeerVolumesFields;