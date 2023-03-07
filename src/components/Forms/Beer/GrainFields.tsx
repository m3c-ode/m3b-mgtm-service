import { Button, Col, Divider, Form, FormInstance, Input, InputNumber, Row, Space } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
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
    console.log("🚀 ~ file: GrainFields.tsx:33 ~ GrainFields ~ totalGrain:", totalGrain);

    const getTotalWeight = (index?: number) => {
        console.log("🚀 ~ file: GrainFields.tsx:35 ~ getTotalWeight ~ index:", index);
        let currentGrains: {
            quantity: number,
            name: string,
        }[] = form.getFieldValue("grains") || [];
        let totalWeight: number = 0;
        if (index && !currentGrains[index]) return;
        if (!index) {
            let total = currentGrains.reduce((acc: number, item) => {
                return acc + item.quantity;
            }, 0);
            totalWeight = total;
        } else {
            let deletedRow = currentGrains[index] ? currentGrains[index].quantity : 0;
            totalWeight = totalGrain - deletedRow;
        }
        setTotalGrain(totalWeight);
        form.setFieldValue('totalGrains', totalWeight);
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
                                        label={index === 0 ? 'Weight (lbs)' : ''}
                                        name={[name, 'quantity']}
                                        rules={[{ required: true, message: 'Missing quantity' }]}
                                        style={{ width: '25%', maxWidth: '115px' }}
                                    >
                                        <InputNumber min={0} onChange={() => getTotalWeight()} step={0.01} style={{ width: '80%' }} placeholder="5" />
                                    </Form.Item>
                                    <Form.Item
                                        label={index === 0 ? 'name' : ''}
                                        name={[name, 'name']}
                                        rules={[{ required: true, message: 'Missing name of grain type' }]}
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
                            <Button
                                type="dashed"
                                onClick={(e: any) => {
                                    getTotalWeight();
                                    add();
                                }}
                                block
                                icon={<AiOutlinePlusCircle />}>
                                Add Grains or Product
                            </Button>
                        </Form.Item>
                    </>
                )
                }
            </Form.List>
            <Form.Item
                label="Total Weight"
                name="totalGrains"
                // rules={[{ required: true, message: 'Missing total weight' }]}
                // wrapperCol={{ span: 4 }}
                labelAlign='left'
                labelCol={{ span: 3 }}
            // getValueFromEvent={setTotalGrain}
            // hidden
            // getValueProps
            >
                <span>{Math.round(totalGrain * 100) / 100} lbs</span>
                {/* <InputNumber value={totalGrain} hidden style={{ display: 'none' }} /> */}
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
                    name="og"
                    // rules={[{ required: true, message: 'Missing expected OG' }]}
                    // wrapperCol={{ span: 4 }}
                    labelAlign='left'
                    labelCol={{ span: 12 }}
                >
                    <InputNumber min={0} step={0.001} placeholder={'1.050'} />
                </Form.Item>
                <Form.Item
                    label="Expected FG"
                    name="fg"
                    // wrapperCol={{ span: 4 }}
                    labelAlign='left'
                    labelCol={{ span: 12 }}
                >
                    <InputNumber min={0} step={0.001} placeholder={'1.015'} />
                </Form.Item>
                <Form.Item
                    label="Expected ABV"
                    name="abv"
                    // wrapperCol={{ span: 1 }}
                    labelAlign='left'
                    labelCol={{ span: 12 }}
                >
                    <InputNumber
                        min={0.1 as number}
                        max={20}
                        formatter={(value) => `${value}%`}
                        parser={(value) => +value!.replace('%', '')}
                        step={0.1} placeholder={'5.0%'} />
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
    );
};

export default GrainFields;