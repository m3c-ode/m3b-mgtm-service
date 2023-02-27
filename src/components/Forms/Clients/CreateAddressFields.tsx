import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
// import { fetchAllCountries, fetchMerchantsCountries } from '../../../pages/api/services';
// import UserDataContext from '../../../context/user';
import toast from 'react-hot-toast';
// import { RoleEnums } from '../../../types';
import { AxiosResponse } from 'axios';
const { Option } = Select;

type Props = {};

function CreateAddressFields({ }: Props) {
    // const { merchantId, userRole } = useContext(UserDataContext);

    const [countriesList, setCountriesList] = useState<any | null>(null);

    // useEffect(() => {
    //     const getCountriesList = async () => {
    //         try {
    //             let countriesRes: AxiosResponse<any, any> | undefined;
    //             if (userRole === 'MerchantOwner') {
    //                 countriesRes = await fetchMerchantsCountries(merchantId);
    //             } else if (userRole === 'PlatformManager') {
    //                 countriesRes = await fetchAllCountries();
    //             }
    //             if (countriesRes?.data.result) setCountriesList(countriesRes.data.result);
    //             if (countriesRes?.data.message) toast.error("Couldn't fetch countries", countriesRes.data.message);
    //         } catch (error) {
    //             toast.error("Couldn't fetch countries");
    //         }
    //     };
    //     getCountriesList();
    // }, []);

    return (
        <>
            <Form.Item
                label="Name: "
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Company: "
                name="company">
                <Input />
            </Form.Item>
            <Form.Item
                label="Street Info 1:"
                name="street1"
                rules={[{ required: true, message: 'Please input your street1!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Street Info 2:"
                name="street2">
                <Input />
            </Form.Item>
            <Form.Item
                label="City:"
                name="city"
                rules={[{ required: true, message: 'Please input your city!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="State:"
                name="state"
                rules={[{ required: true, message: 'Please input your state!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Zip:"
                name="zip"
                rules={[{ required: true, message: 'Please input your zip!' }]}>
                <Input />
            </Form.Item>
            {countriesList && (
                <Form.Item
                    label="Country:"
                    name="country"
                    rules={[{ required: true, message: 'Please choose your country!' }]}>
                    <Select
                        showSearch
                        placeholder="Select a Country for your address"
                        allowClear
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.value ?? '').toString().toLowerCase().includes(input.toLowerCase()) ||
                            (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                        }
                    //TODO: consider using option props VS JSX
                    >
                        {countriesList.map((country: any, index: number) => (
                            <Option
                                key={index}
                                label={country.name}
                                value={country.code}>
                                {country.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            )}
            <Form.Item
                label="Phone:"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone number!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Notes:"
                name="notes">
                <Input />
            </Form.Item>
        </>
    );
}

export default CreateAddressFields;
