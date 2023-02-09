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

    const getTotalGrain = () => {
        let currentGrains: {
            weight: number,
            type: string,
        }[] = form.getFieldValue("grains") || [];
        // } = form.getFieldValue("grains")
        console.log("🚀 ~ file: GrainFields.tsx:134 ~ GrainFields ~ currentGrains", currentGrains);

        let total = currentGrains.reduce((acc: number, item) => {
            console.log("🚀 ~ file: GrainFields.tsx:134 ~ acc ~ item", item);
            console.log("🚀 ~ file: GrainFields.tsx:136 ~ acc ~ acc", acc);
            return acc + item.weight;
        }, 0);
        console.log("🚀 ~ file: GrainFields.tsx:134 ~ GrainFields ~ total", total);
        setTotalGrain(total);
    };
    return (
        <>
            {/* <Row> */}
            {/* <Col span={11} style={{ marginRight: '10px' }} > */}
            <h3>Grain Bill</h3>
            {/* <div className={styles.grainsLabels}>
                <span className={styles.grainsLabel} style={{ width: '25%', maxWidth: '140px' }}>Weight</span>
                <span className={styles.grainsLabel} style={{ width: '70%' }}>Type</span>
            </div> */}
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
                initialValue={[undefined]}
            >

                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, fieldKey, name }, index) => (
                            // <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <>
                                {/* <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="start"> */}
                                <div className={styles.grainItems}>

                                    <Form.Item
                                        // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                        // wrapperCol={{ span: 8 }}
                                        // {...formItemLayout}
                                        label={index === 0 ? 'Weight' : ''}
                                        // labelCol={(index === 0 ? { span: 24 } : { span: 0, offset: 4 })}
                                        // wrapperCol={{ span: 8 }}
                                        name={[name, 'weight']}
                                        rules={[{ required: true, message: 'Missing weight' }]}
                                        style={{ width: '25%', maxWidth: '115px' }}
                                    // getValueProps


                                    >
                                        <InputNumber /* onChange={getTotalGrain} */ step={0.01} style={{ width: '70%' }} placeholder="5" />
                                    </Form.Item>
                                    <Form.Item
                                        // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                        label={index === 0 ? 'Type' : ''}
                                        // wrapperCol={{ span: 48 }}
                                        name={[name, 'type']}
                                        rules={[{ required: true, message: 'Missing type of grain name' }]}
                                        style={{ width: '75%' }}
                                    >
                                        <Input
                                            style={{ width: '100%' }}
                                            placeholder="Canadian Pilsner" />
                                    </Form.Item>
                                    {/* {index >= 1 && */}
                                    <AiOutlineMinusCircle
                                        style={{
                                            // position: 'relative', top: 'rem', 
                                            fontSize: '1rem',
                                            // marginTop: '5px',
                                            // marginLeft: '5px',
                                            // marginBottom: '25px',
                                            margin: '0 2rem 25px 5px',
                                            // paddingLeft: '5px',
                                            visibility: index == 0 ? 'hidden' : 'visible'


                                        }}
                                        onClick={() => {
                                            getTotalGrain();
                                            remove(name);
                                        }} />
                                    {/* } */}
                                    {/* </Space> */}
                                </div>
                            </>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={(e: any) => {
                                getTotalGrain();
                                add();
                            }} block icon={<AiOutlinePlusCircle />}>
                                Add Grains
                            </Button>
                        </Form.Item>
                        <Form.Item
                            label="Total"
                            // wrapperCol={{ span: 4 }}
                            labelAlign='left'
                            labelCol={{ span: 2 }}
                        >
                            {Math.round(totalGrain * 100) / 100} lbs
                        </Form.Item>

                    </>
                )
                }
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                {/* <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button> */}
            </Form.Item>

            {/* </Col> */}
            {/* <Divider type={'vertical'} /> */}

            {/* <Col span={11} offset={0} > */}

            {/* </Col> */}
            {/* </Row> */}

        </>
    );
};

export default GrainFields;