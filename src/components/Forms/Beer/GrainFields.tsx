import { Button, Col, Divider, Form, FormInstance, Input, InputNumber, Row, Space } from 'antd';
import React, { useState } from 'react';
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

type Props = {
    form: FormInstance,
};

const GrainFields = ({ form }: Props) => {

    const [totalGrain, setTotalGrain] = useState(0);

    const getTotalWeight = (index?: number) => {
        let currentGrains: {
            weight: number,
            type: string,
        }[] = form.getFieldValue("grains") || [];
        if (index && !currentGrains[index]) return;
        if (!index) {
            let total = currentGrains.reduce((acc: number, item) => {
                return acc + item.weight;
            }, 0);
            setTotalGrain(total);
            return;
        } else {
            let deletedRow = currentGrains[index] ? currentGrains[index].weight : 0;
            setTotalGrain(totalGrain - deletedRow);
        }
    };
    return (
        <>
            <h3>Grain Bill</h3>
            <Form.List
                name="grains"
                rules={[
                    {
                        validator: async (_, grains) => {
                            if (!grains || grains.length < 1) {
                                return Promise.reject(new Error('At least 1 type of grain is required'));

                            }
                        },
                    },
                ]}
                initialValue={[undefined]}
            >

                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name }, index) => (
                            <>
                                <div className={styles.grainItems}>

                                    <Form.Item
                                        label={index === 0 ? 'Weight' : ''}
                                        name={[name, 'weight']}
                                        rules={[{ required: true, message: 'Missing weight' }]}
                                        style={{ width: '25%', maxWidth: '115px' }}
                                    >
                                        <InputNumber onChange={() => getTotalWeight()} step={0.01} style={{ width: '70%' }} placeholder="5" />
                                    </Form.Item>
                                    <Form.Item
                                        label={index === 0 ? 'Type' : ''}
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
                                            fontSize: '1rem',
                                            margin: '0 2rem 25px 5px',
                                            visibility: index == 0 ? 'hidden' : 'visible'


                                        }}
                                        onClick={() => {
                                            getTotalWeight(name);
                                            remove(name);
                                        }} />
                                </div>
                            </>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={(e: any) => {
                                getTotalWeight();
                                add();
                            }} block icon={<AiOutlinePlusCircle />}>
                                Add Grains
                            </Button>
                        </Form.Item>
                        <Form.Item
                            label="Total Weight"
                            name="totalGrain"
                            // rules={[{ required: true, message: 'Missing total weight' }]}
                            // wrapperCol={{ span: 4 }}
                            labelAlign='left'
                            labelCol={{ span: 3 }}
                        >
                            <span>{Math.round(totalGrain * 100) / 100} lbs</span>
                        </Form.Item>
                        <Divider style={{ margin: '1rem 0' }} />
                        <h3>Other</h3>
                        <Row
                            style={{
                                gap: '1rem',
                                justifyContent: 'space-around'

                            }}
                        >
                            <Form.Item
                                label="Expected OG"
                                name="expectedOG"
                                // rules={[{ required: true, message: 'Missing expected OG' }]}
                                // wrapperCol={{ span: 4 }}
                                labelAlign='left'
                                labelCol={{ span: 12 }}
                            >
                                <InputNumber step={0.001} placeholder={'1.050'} />
                            </Form.Item>
                            <Form.Item
                                label="Expected FG"
                                name="expectedFG"
                                // wrapperCol={{ span: 4 }}
                                labelAlign='left'
                                labelCol={{ span: 12 }}
                            >
                                <InputNumber step={0.001} placeholder={'1.015'} />
                            </Form.Item>
                            <Form.Item
                                label="Expected ABV"
                                name="expectedABV"
                                // wrapperCol={{ span: 4 }}
                                labelAlign='left'
                                labelCol={{ span: 12 }}
                            >
                                <InputNumber step={0.001} placeholder={'5.0'} /> <span>%</span>
                            </Form.Item>
                            <Form.Item
                                label="Yeast"
                                name="yeast"
                                // wrapperCol={{ span: 4 }}
                                labelAlign='left'
                                labelCol={{ span: 5 }}
                            >
                                <Input placeholder={'Lalbrew SF04'} />
                            </Form.Item>
                        </Row>
                        <Divider style={{ margin: '1rem 0' }} />


                    </>
                )
                }
            </Form.List>
        </>
    );
};

export default GrainFields;