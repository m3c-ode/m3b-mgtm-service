import { Col, Form, FormInstance, FormListFieldData, InputNumber, Row, Space } from 'antd';
import React from 'react';
import type { EditBeerData } from '../../../types/beers';
import styles from './styles.module.scss';

type Props = {
    form?: FormInstance<any>;
    layout?: any;
    quantityData?:
    | EditBeerData;
    fieldName?: number;
    field?: FormListFieldData;
    edit?: boolean;
    initialValues?: any;
};

const BeerVolumesFields = ({ form, layout: numbersLayout, quantityData, fieldName, field, edit, initialValues }: Props) => {
    // TODO: Responsiveness
    return (
        <>
            <div className={styles.volumeFields}>
                <Row
                >
                    <Col
                        span={8}
                    >
                        <Form.Item
                            {...numbersLayout}
                            label='355 ml'
                        >

                            <Space
                            >
                                <Form.Item
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
                        span={8}>
                        <Form.Item
                            {...numbersLayout}
                            label='473 ml'
                        >

                            <Space>
                                <Form.Item
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
                            {...numbersLayout}
                            label='650 ml'
                        >

                            <Space>
                                <Form.Item
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
                >
                    <Col
                        className={styles.kegs}
                        span={8}>
                        <Form.Item
                            {...numbersLayout}
                            label='19L Kegs'
                        >
                            <Space
                            >
                                <Form.Item
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
                            {...numbersLayout}
                            label='38L Kegs'
                        >

                            <Space>
                                <Form.Item
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
                            {...numbersLayout}
                            label='57L Kegs'
                        >

                            <Space>
                                <Form.Item
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