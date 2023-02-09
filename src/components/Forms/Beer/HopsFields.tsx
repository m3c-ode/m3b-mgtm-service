import { Button, Col, Divider, Form, Input, InputNumber, Row, Space } from 'antd';
import React from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import styles from './styles.module.scss';

type Props = {};

const HopsFields = (props: Props) => {
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
                                            label={'Weight (lbs)'}
                                            name={[name, 'weight']}
                                            rules={[{ required: true, message: 'Missing weight of hops' }]}
                                            style={{ width: '25%', minWidth: '110px' }}
                                        >
                                            <InputNumber step={0.01} style={{ width: '70%' }} placeholder="5" />
                                        </Form.Item>
                                        <Form.Item
                                            // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            // wrapperCol={{ span: 48 }}
                                            label={'A.A %'}
                                            name={[name, 'a.a']}
                                            rules={[{ required: true, message: 'Missing a.a of hops' }]}
                                            style={{ width: '25%', minWidth: '95px' }}
                                        >
                                            <InputNumber step={0.1} style={{ width: '70%' }} placeholder="5" />
                                        </Form.Item>
                                        <Form.Item
                                            // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            // wrapperCol={{ span: 48 }}
                                            label={'Boil Time (min)'}
                                            name={[name, 'boilTime']}
                                            rules={[{ required: true, message: 'Missing boilTime of hops' }]}
                                            style={{ width: '25%', minWidth: '80px' }}
                                        >
                                            <InputNumber step={1} style={{ width: '70%' }} placeholder="5" />
                                        </Form.Item>
                                        <AiOutlineMinusCircle
                                            style={{
                                                // position: 'relative', top: 'rem', 
                                                fontSize: '1.5rem',
                                                // marginTop: '5px',
                                                // marginLeft: '5px',
                                                // marginBottom: '25px',
                                                margin: '41px 2rem 25px 5px',
                                                // paddingLeft: '5px',
                                                visibility: index == 0 ? 'hidden' : 'visible'


                                            }}
                                            onClick={() => remove(name)} />
                                        {/* </Space> */}
                                    </div>
                                </div>
                            </>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<AiOutlinePlusCircle />}>
                                Add Grains
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </>

    );
};

export default HopsFields;