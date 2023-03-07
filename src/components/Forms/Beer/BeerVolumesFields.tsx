import { Button, Col, Form, FormInstance, FormListFieldData, InputNumber, Row, Space } from 'antd';
import React from 'react';
import { BeerData, EditBeerData } from '../../../types/beers';

type Props = {
    form?: FormInstance<any>;
    layout?: any;
    quantityData?:
    // BeerData | Partial<BeerData>
    | EditBeerData;
    fieldName?: number;
    field?: FormListFieldData;
    edit?: boolean;
};

const BeerVolumesFields = ({ form, layout: volumeLayout, quantityData, fieldName, field, edit }: Props) => {
    console.log("🚀 ~ file: BeerVolumesFields.tsx:14 ~ BeerVolumesFields ~ quantityData:", quantityData?.qty);

    return (
        <>

            <Row
            // justify={'space-around'} align={'middle'}
            >
                <Col span={8}>
                    <Space
                    // style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px' }}
                    >
                        <Form.Item
                            // {...volumeLayout}
                            labelCol={{ span: 12 }}
                            wrapperCol={{ offset: 2 }}
                            // {...field}
                            label={'355 ml'}
                            name={
                                fieldName !== undefined ?
                                    [fieldName, 'qty', '355ml']
                                    :
                                    ['qty', '355ml']
                            }
                            initialValue={edit && quantityData?.qty!['355ml']}
                        // noStyle
                        >
                            <InputNumber style={{ width: 70 }} min={0} max={quantityData?.qty!['355ml']} />
                        </Form.Item>
                        {!edit && quantityData && <span style={{ position: 'relative', bottom: '.8rem', left: '1.5rem' }}> (available: {quantityData.qty!['355ml']})</span>}
                    </Space>
                </Col>
                <Col span={8}>
                    <Space>
                        <Form.Item
                            {...volumeLayout}
                            // {...field}
                            wrapperCol={{ offset: 2 }}
                            label={'473ml'}
                            name={
                                fieldName !== undefined ?
                                    [fieldName, 'qty', '473ml']
                                    :
                                    ['qty', '473ml']
                            }
                            initialValue={edit && quantityData?.qty!['473ml']}
                        >
                            <InputNumber style={{ width: 70 }} min={0} max={quantityData?.qty!['473ml']} />
                        </Form.Item>
                        {!edit && quantityData && <span style={{ position: 'relative', bottom: '.8rem', left: '1.5rem' }}> (available: {quantityData.qty!['473ml'] ?? 0})</span>}
                    </Space>
                </Col>

                <Col span={8}>
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
                        >
                            <InputNumber style={{ width: 70 }} min={0} max={quantityData?.qty!['650ml']} />
                        </Form.Item>
                        {!edit && quantityData && <span style={{ position: 'relative', bottom: '.8rem', left: '1.5rem' }}> (available: {quantityData.qty!['650ml'] ?? 0})</span>}
                    </Space>
                </Col>
            </Row>
            <Row
            // justify={'space-around'} align={'middle'}
            >
                <Col span={8}>
                    <Space
                    // style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}

                    >
                        <Form.Item
                            {...volumeLayout}
                            // {...field}
                            label={'19L Kegs'}
                            wrapperCol={{ offset: 0.5 }}
                            name={fieldName !== undefined ?
                                [fieldName, 'qty', '19Lkegs']
                                : ['qty', '19Lkegs']
                            }
                            initialValue={edit && quantityData?.qty!['19Lkegs']}
                        >
                            <InputNumber style={{ width: 70 }} min={0} max={quantityData?.qty!['19Lkegs']} />
                        </Form.Item>
                        {!edit && quantityData && <span style={{ position: 'relative', bottom: '.8rem', left: '.6rem' }}> (available: {quantityData.qty!['19Lkegs'] ?? 0})</span>}
                    </Space>
                </Col>
                <Col span={8}>
                    <Space>
                        <Form.Item
                            {...volumeLayout}
                            // {...field}
                            label={'38L Kegs'}
                            name={fieldName !== undefined ?
                                [fieldName, 'qty', '38Lkegs']
                                : ['qty', '38Lkegs']
                            }
                            initialValue={edit && quantityData?.qty!['38Lkegs']}
                        >
                            <InputNumber style={{ width: 70 }} min={0} max={quantityData?.qty!['38Lkegs']} />
                        </Form.Item>
                        {!edit && quantityData && <span style={{ position: 'relative', bottom: '.8rem', left: '.3rem' }}> (available: {quantityData.qty!['38Lkegs'] ?? 0})</span>}
                    </Space>
                </Col>
                <Col span={8}>
                    <Space>
                        <Form.Item
                            {...volumeLayout}
                            // {...field}
                            label={'57L Kegs'}
                            name={fieldName !== undefined ?
                                [fieldName, 'qty', '57Lkegs']
                                : ['qty', '57Lkegs']
                            }
                            initialValue={edit && quantityData?.qty!['57Lkegs']}
                        >
                            <InputNumber style={{ width: 70 }} min={0} max={quantityData?.qty!['57Lkegs']} />
                        </Form.Item>
                        {!edit && quantityData && <span style={{ position: 'relative', bottom: '.8rem', left: '.3rem' }}> (available: {quantityData.qty!['57Lkegs'] ?? 0})</span>}
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export default BeerVolumesFields;