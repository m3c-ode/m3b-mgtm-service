import { Divider, Form, Steps } from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BeerData, BeersStatusEnum, NewBeerData } from '../../../types/beers';
import Dashboard from '../../Dashboard';
import FormNavigationButtons from '../Navigation';
import BeerInfoFields from './BeerInfoFields';
import GrainFields from './GrainFields';
import HopsFields from './HopsFields';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { createBeer } from '../../../pages/api/services';
import { useDomainStore } from '../../../stores/domain';

const { Step } = Steps;

const BeerCreationSteps = ['General', 'Recipe - Grains', 'Recipe - Hops'];


type Props = {};

const BeerForm = (props: Props) => {
    const router = useRouter();

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
        // if (formData.grains) {
        //     stepForm.setFieldValue('grains.totalGrains', )
        // }
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
    const onFinish = async (values: any) => {
        console.log('on finish', values);
        const formData = stepForm.getFieldsValue(true);
        console.log("🚀 ~ file: BeerForm.tsx:62 ~ onFinish ~ formData", formData);
        // const currentBeerList = beerData;
        const data: NewBeerData = {
            name: formData.name,
            domain: formData.domain,
            description: formData.description,
            style: formData.style,
            status: BeersStatusEnum.Projected,
            brewedOn: formData.brewedOn.format('YYYY-MM-DD'),
            availableOn: formData.availableOn.format('YYYY-MM-DD'),
            qty: {
                total: formData.qty,
            },
            abv: formData.abv,
            ibu: formData.ibu,
            grains: {
                ...formData.grains,
                totalGrains: formData.totalGrains,
            },
            hops: {
                ...formData.hops,
                totalHops: formData.totalHops,
            }

        };
        // hops: formData.hops,
        // grains: formData.grains

        // with MongoDB
        const beerRes = await createBeer(data);
        console.log("🚀 ~ file: BeerForm.tsx:93 ~ onFinish ~ beerRes", beerRes);
        router.push('/dashboard/beers');
        toast.success('Beer created successfully');
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
                // initialValues={{ remember: true }}
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
                        <Steps
                            current={stepIndex}
                            items={BeerCreationSteps.map((step) => {
                                return {
                                    title: step
                                };
                            })}
                        >
                        </Steps>
                    </div>
                    <div className={styles.formContent}>
                        {stepIndex === 0 && <BeerInfoFields />}
                        {stepIndex === 1 && <GrainFields form={stepForm} />}
                        {stepIndex === 2 && <HopsFields form={stepForm} />}
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