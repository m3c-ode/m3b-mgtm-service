import { Col, Form, FormInstance, FormListFieldData, InputNumber, Row, Space } from 'antd';
import React from 'react';
import { BeerData } from '../../../types/beers';

type Props = {
    form?: FormInstance<any>;
    layout?: any;
    quantityData?: BeerData;
    fieldName?: number;
    field?: FormListFieldData;
};

const BeerVolumesFields = ({ form, layout: volumeLayout, quantityData, fieldName, field }: Props) => {
    // console.log("🚀 ~ file: BeerVolumesFields.tsx:14 ~ BeerVolumesFields ~ fieldName:", fieldName);
    console.log("🚀 ~ file: BeerVolumesFields.tsx:14 ~ BeerVolumesFields ~ quantityData:", quantityData?.qty);
    return (
        <>

            <Row>
                <Col span={8}>
                    {/* <Space> */}
                    <Form.Item
                        {...volumeLayout}
                        {...field}
                        label={'355 ml'}
                        name={fieldName !== undefined ?
                            [fieldName, 'qty', '355ml']
                            : ['qty', '355ml']
                        }
                    >
                        <InputNumber min={0} max={quantityData?.qty['355ml']} />
                        {quantityData && <span> (available: {quantityData?.qty['355ml']})</span>}
                    </Form.Item>
                    {/* </Space> */}
                </Col>
                <Col span={8}>
                    <Form.Item
                        {...volumeLayout}
                        {...field}
                        label={'473ml'}
                        name={fieldName ?
                            [fieldName, 'qty', '473ml']
                            : ['qty', '473ml']
                        }
                    >
                        <InputNumber min={0} max={quantityData?.qty['473ml']} />
                        {quantityData && <span> (available: {quantityData?.qty['473ml']})</span>}
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        {...volumeLayout}
                        {...field}
                        label={'650ml'}
                        name={fieldName ?
                            [fieldName, 'qty', '650ml']
                            : ['qty', '650ml']
                        }
                    >
                        <InputNumber min={0} max={quantityData?.qty['650ml']} />
                        {quantityData && <span> (available: {quantityData?.qty['650ml']})</span>}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Form.Item
                        {...volumeLayout}
                        {...field}
                        label={'19L Kegs'}
                        name={fieldName ?
                            [fieldName, 'qty', '19Lkegs']
                            : ['qty', '19Lkegs']
                        }                    >
                        <InputNumber min={0} max={quantityData?.qty['19Lkegs']} />
                        {quantityData && <span> (available: {quantityData?.qty['19Lkegs']})</span>}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        {...volumeLayout}
                        {...field}
                        label={'38L Kegs'}
                        name={fieldName ?
                            [fieldName, 'qty', '38Lkegs']
                            : ['qty', '38Lkegs']
                        }
                    >
                        <InputNumber min={0} max={quantityData?.qty['38Lkegs']} />
                        {quantityData && <span> (available: {quantityData?.qty['38Lkegs']})</span>}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        {...volumeLayout}
                        {...field}
                        label={'57L Kegs'}
                        name={fieldName ?
                            [fieldName, 'qty', '57Lkegs']
                            : ['qty', '57Lkegs']
                        }
                    >
                        <InputNumber min={0} max={quantityData?.qty['57Lkegs']} />
                        {quantityData && <span> (available: {quantityData?.qty['57Lkegs']})</span>}
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default BeerVolumesFields;