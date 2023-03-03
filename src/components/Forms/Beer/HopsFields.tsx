import { Button, Col, Divider, Form, FormInstance, Input, InputNumber, Row, Space } from 'antd';
import React, { useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import styles from './styles.module.scss';

type Props = {
    form: FormInstance,
};

const HopsFields = ({ form }: Props) => {

    const [totalHops, setTotalHops] = useState(0);

    const getTotalWeight = (index?: number) => {
        let currentHops: {
            weight: number,
            type: string,
        }[] = form.getFieldValue("hops") || [];
        let totalWeight: number = 0;
        if (index && !currentHops[index]) return;
        if (!index) {
            let total = currentHops.reduce((acc: number, item) => {
                return acc + item.weight;
            }, 0);
            totalWeight = total;
        } else {
            let deletedRow = currentHops[index] ? currentHops[index].weight : 0;
            totalWeight = totalHops - deletedRow;
        }
        setTotalHops(totalWeight);
        form.setFieldValue('totalHops', totalWeight);

    };
    return (
        <>
            <h3>Hops and Schedule</h3>
            {/* <div className={styles.grainsLabels}>
                    //     <span className={styles.grainsLabel} style={{ width: '50%' }}>Variety</span>
                    //     <span className={styles.grainsLabel} style={{ width: '50%' }}>Type</span>
                    //     <span className={styles.grainsLabel} style={{ width: '25%', maxWidth: '140px' }}>Weight</span>
                    //     <span className={styles.grainsLabel} style={{ width: '25%' }}>A.A</span>
                    //     <span className={styles.grainsLabel} style={{ width: '25%' }}>Boil Time</span>
                    // </div> */}
            <Form.List
                name="hops"
                rules={[
                    {
                        validator: async (_, hops) => {
                            if (!hops || hops.length < 1) {
                                return Promise.reject(new Error('At least 1 type fo grain is required'));

                            }
                        },
                    },
                ]}
                initialValue={[undefined]}
            >

                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name }, index) => (
                            // <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <>
                                {/* <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="start"> */}
                                <div className={styles.hopItems}>
                                    <div className={styles.hopStringInput}>

                                        <Form.Item
                                            // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            // wrapperCol={{ span: 8 }}
                                            // {...formItemLayout}
                                            label={'Variety'}
                                            // labelCol={(index === 0 ? { span: 24 } : { span: 0, offset: 4 })}
                                            // wrapperCol={{ span: 8 }}
                                            name={[name, 'variety']}
                                            rules={[{ required: true, message: 'Missing variety' }]}
                                            style={{ width: '50%',/*  maxWidth: '115px' */ }}

                                        >
                                            <Input
                                                // style={{ width: '100%' }}
                                                placeholder="Centennial" />

                                        </Form.Item>
                                        <Form.Item
                                            // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            // wrapperCol={{ span: 8 }}
                                            // {...formItemLayout}
                                            label={'Type'}
                                            // labelCol={(index === 0 ? { span: 24 } : { span: 0, offset: 4 })}
                                            // wrapperCol={{ span: 8 }}
                                            name={[name, 'type']}
                                            rules={[{ required: true, message: 'Missing type' }]}
                                            style={{ width: '40%',/*  maxWidth: '115px' */ }}

                                        >
                                            <Input
                                                // style={{ width: '100%' }}
                                                placeholder="Pellets" />

                                        </Form.Item>
                                    </div>
                                    <div className={styles.hopNumberInput}>

                                        <Form.Item
                                            // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            // wrapperCol={{ span: 48 }}
                                            label={'Weight (oz)'}
                                            name={[name, 'weight']}
                                            rules={[{ required: true, message: 'Missing weight of hops' }]}
                                            style={{ width: '25%', minWidth: '110px' }}
                                        >
                                            <InputNumber min={0}
                                                onChange={() => getTotalWeight()}
                                                step={0.01} style={{ width: '70%' }} placeholder="5" />
                                        </Form.Item>
                                        <Form.Item
                                            // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            // wrapperCol={{ span: 48 }}
                                            label={'A.A %'}
                                            name={[name, 'a.a']}
                                            rules={[{ required: true, message: 'Missing a.a of hops' }]}
                                            style={{ width: '25%', minWidth: '95px' }}
                                        >
                                            <InputNumber min={0} step={0.1} style={{ width: '70%' }} placeholder="5" />
                                        </Form.Item>
                                        <Form.Item
                                            // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            // wrapperCol={{ span: 48 }}
                                            label={'Boil Time (min)'}
                                            name={[name, 'boilTime']}
                                            rules={[{ required: true, message: 'Missing boilTime of hops' }]}
                                            style={{ width: '25%', minWidth: '80px' }}
                                        >
                                            <InputNumber min={0} step={1} style={{ width: '70%' }} placeholder="5" />
                                        </Form.Item>
                                        <AiOutlineMinusCircle
                                            style={{
                                                // position: 'relative', top: 'rem', 
                                                fontSize: '1.5rem',
                                                // marginTop: '5px',
                                                // marginLeft: '5px',
                                                // marginBottom: '25px',
                                                margin: '41px 0 25px 0',
                                                // padding: '1px',
                                                minWidth: '30px',

                                                // paddingLeft: '5px',
                                                visibility: index == 0 ? 'hidden' : 'visible'


                                            }}
                                            onClick={() => {
                                                getTotalWeight(name);
                                                remove(name);
                                            }} />
                                        {/* </Space> */}
                                    </div>
                                </div>
                            </>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => {
                                console.log(form.getFieldValue("hops"));
                                add();
                            }
                            } block icon={<AiOutlinePlusCircle />}>
                                Add Hops
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Row
                style={{
                    // gap: '1rem',
                    // justifyContent: 'space-between',
                    // margin: '0 1rem'

                }}
            >
                <Col md={12} sm={24} >
                    <Form.Item
                        label="Total Weight"
                        name="totalHops"
                        // rules={[{ required: true, message: 'Missing total weight' }]}
                        labelAlign='left'
                        labelCol={{
                            xs: { span: 24 },
                            sm: { span: 20 },
                            md: { span: 12 },
                            lg: { span: 8 },
                            xl: { span: 6 }
                        }}
                        wrapperCol={{
                            // span: 14,
                            xs: { span: 24 },
                            sm: { span: 16 },
                            md: { span: 12 },
                            lg: { span: 8 },
                            xl: { span: 6 }
                        }}
                        style={{
                            // width: '200px !important',
                            // display: 'flex',
                            // flexWrap: 'wrap'
                        }}
                    >
                        <span style={{
                            // display: 'inline-block',
                            // width: '100px',
                            // flexWrap: 'wrap'
                        }}>{Math.round(totalHops * 100) / 100} oz</span>
                    </Form.Item>
                </Col>
                <Col md={12} sm={24}>
                    <Form.Item
                        label="Expected IBU"
                        name="ibu"
                        labelCol={{
                            // xs: { span: 24 },
                            sm: { span: 7 },
                            md: { span: 12 },
                            lg: { span: 16 },
                            xl: { span: 17 }
                            // sm: { span: 24, offset: 0 }
                        }}
                        wrapperCol={{
                            // span: 6,
                            sm: { span: 6, offset: 10 },
                            md: { span: 12, offset: 1 },
                            // lg: { span: 16 },
                            // xl: { span: 16 }
                        }}
                    >
                        <InputNumber step={1} placeholder={'20'}
                        // style={{ width: '100%' }}
                        />

                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default HopsFields;