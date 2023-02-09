import { Divider, Form, Steps } from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Dashboard from '../../Dashboard';
import FormNavigationButtons from '../Navigation';
import BeerInfoFields from './BeerInfoFields';
import GrainFields from './GrainFields';
import HopsFields from './HopsFields';
import styles from './styles.module.scss';

const { Step } = Steps;

const BeerCreationSteps = ['General', 'Recipe - Grains', 'Recipe - Hops'];


type Props = {};

const BeerForm = (props: Props) => {
    const [stepForm] = Form.useForm();

    const [currentStep, setCurrentStep] = useState(BeerCreationSteps[0]);
    const [stepIndex, setStepIndex] = useState(0);

    const nextStep = () => {
        const formData = stepForm.getFieldsValue();
        console.log("🚀 ~ file: BeerForm.tsx:23 ~ nextStep ~ formData", formData);
        stepForm
            .validateFields()
            .then(() => setStepIndex(stepIndex + 1))
            .catch(errorInfo => {
                console.log('error info', errorInfo);
                if (errorInfo.errorFields.length > 0) {
                    errorInfo.errorFields.map((field: { errors: string[]; }, index: any) => {
                        toast.error(field.errors[0] as string);
                    });
                    return;
                }
            });
    };

    const prevStep = () => {
        const formData = stepForm.getFieldsValue();
        console.log("🚀 ~ file: BeerForm.tsx:23 ~ prevStep ~ formData", formData);
        stepForm
            .validateFields()
            .then(() => setStepIndex(stepIndex - 1))
            .catch(errorInfo => {
                console.log('error info', errorInfo);
                if (errorInfo.errorFields.length > 0) {
                    errorInfo.errorFields.map((field: { errors: string[]; }, index: any) => {
                        toast.error(field.errors[0] as string);
                    });
                    return;
                }
            });
    };

    // status will be automatically filled on creation
    const onFinish = (values: any) => {
        console.log('on finish', values);

    };

    const onReset = () => {
        stepForm.resetFields();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Dashboard>
            <Form
                form={stepForm}
                name="createBeerForm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={styles.createBeerForm}
            // layout="vertical"
            >
                <h2>Create New Beer</h2>
                <Divider />
                {/* Step form
                1-  General Info
                2 - Recipe info
                 */}
                <div className={styles.formWrapper}>
                    <div className={styles.progressBar}>
                        <Steps current={stepIndex}>
                            {BeerCreationSteps.map((step, index) => (
                                <Step
                                    key={index}
                                    title={step}
                                />
                            ))}
                        </Steps>
                    </div>
                    <div className={styles.formContent}>
                        {stepIndex === 0 && <BeerInfoFields />}
                        {stepIndex === 1 && <GrainFields form={stepForm} />}
                        {stepIndex === 2 && <HopsFields />}
                    </div>
                    <div className={styles.navButtons}>
                        <FormNavigationButtons
                            // sendToStart={createAnotherPackage}
                            stepsLength={BeerCreationSteps.length}
                            stepIndex={stepIndex}
                            prevStep={prevStep}
                            nextStep={nextStep}
                        />
                    </div>
                </div>

            </Form>


        </Dashboard >
    );
};

export default BeerForm;