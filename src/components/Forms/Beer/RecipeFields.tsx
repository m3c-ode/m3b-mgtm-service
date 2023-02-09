import { Button, Col, Form, Input, InputNumber, Row, Space } from 'antd';
import React from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import styles from './styles.module.scss';


// const formItemLayout = {
//     labelCol: {
//         span: 24
//     },
//     wrapperCol: {
//         span: 24
//     }
// };

// const formItemLayoutWithOutLabel = {
//     labelCol: {
//         span: 24
//     },
//     wrapperCol: {
//         span: 24,
//         offset: 0
//     }
// };

type Props = {};

const RecipeFields = (props: Props) => {
    return (
        <>
            <Row>
                <Col span={12} >
                    <h3>Grains</h3>
                    <div className={styles.grainsLabels}>
                        <span className={styles.grainsLabel} style={{ width: '25%' }}>Weigth</span>
                        <span className={styles.grainsLabel} style={{ width: '70%' }}>Type</span>
                    </div>
                    <Form.List
                        name="grains"
                        rules={[
                            {
                                validator: async (_, grains) => {
                                    if (!grains || grains.length < 1) {
                                        return Promise.reject(new Error('At least 1 type fo grain is required'));

                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name }, index) => (
                                    // <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <>
                                        {/* <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="start"> */}
                                        <div className={styles.grainItems}>

                                            <Form.Item
                                                // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                // wrapperCol={{ span: 8 }}
                                                // {...formItemLayout}
                                                // label={index === 0 ? 'Weight' : ''}
                                                // labelCol={(index === 0 ? { span: 24 } : { span: 0, offset: 4 })}
                                                // wrapperCol={{ span: 8 }}
                                                name={[name, 'weight']}
                                                rules={[{ required: true, message: 'Missing weight' }]}
                                                style={{ width: '25%' }}

                                            >
                                                <InputNumber step={0.01} style={{ width: '70%' }} placeholder="5" />
                                            </Form.Item>
                                            <Form.Item
                                                // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                // label={index === 0 ? 'Type' : ''}
                                                // wrapperCol={{ span: 48 }}
                                                name={[name, 'type']}
                                                rules={[{ required: true, message: 'Missing type of grain name' }]}
                                                style={{ width: '75%' }}
                                            >
                                                <Input
                                                    style={{ width: '100%' }}
                                                    placeholder="Canadian Pilsner" />
                                            </Form.Item>
                                            <AiOutlineMinusCircle
                                                style={{
                                                    // position: 'relative', top: 'rem', 
                                                    fontSize: '1rem',
                                                    marginTop: '5px',
                                                    marginLeft: '5px'
                                                    // paddingLeft: '5px',

                                                }}
                                                onClick={() => remove(name)} />
                                            {/* </Space> */}
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

                </Col>
                <Col span={12} offset={0} >
                    <h3>Hops</h3>
                </Col>
            </Row>

        </>
    );
};

export default RecipeFields;