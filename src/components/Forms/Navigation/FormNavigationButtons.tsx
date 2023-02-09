import { Button, Form, Space, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React from 'react';

type Props = {
    prevStep?: () => void;
    nextStep?: () => void;
    stepIndex: number;
    stepsLength: number;
    sendToStart?: () => void;
};

const FormNavigationButtons = ({ prevStep, nextStep, stepIndex, stepsLength, sendToStart }: Props) => {
    return (
        <>
            {stepIndex < stepsLength - 1 ? (
                <>
                    <Button
                        type="text"
                        onClick={nextStep}>
                        Next
                        <RightOutlined />
                    </Button>
                </>
            ) : (
                <Form.Item>
                    <Space size="large">
                        <Tooltip
                            title="Create another package for this customer"
                            color={'blue'}>
                            <Button
                                type="primary"
                                onClick={sendToStart}>
                                Save and New
                            </Button>
                        </Tooltip>
                        <Tooltip
                            title="Save Package and set up Shipment"
                            color={'blue'}>
                            <Button
                                type="primary"
                                htmlType="submit">
                                Submit
                            </Button>
                        </Tooltip>
                    </Space>
                </Form.Item>
            )}
            {stepIndex > 0 && (
                <Button
                    type="text"
                    icon={<LeftOutlined />}
                    onClick={prevStep}>
                    Previous
                </Button>
            )}
        </>
    );
};

export default FormNavigationButtons;
