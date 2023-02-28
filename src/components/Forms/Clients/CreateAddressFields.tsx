import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, FormInstance, Input, Select } from 'antd';
// import { fetchAllCountries, fetchMerchantsCountries } from '../../../pages/api/services';
// import UserDataContext from '../../../context/user';
import toast from 'react-hot-toast';
// import { RoleEnums } from '../../../types';
import { AxiosResponse } from 'axios';
import Script from 'next/script';
import { usePlacesWidget } from 'react-google-autocomplete';
import { NewAddressInput } from '../../../types/addresses';
const { Option } = Select;

type Props = {
    form: FormInstance<any>;
};


const PLACES_API_KEY = process.env.NEXT_PUBLIC_PLACES_API_KEY;
// console.log("🚀 ~ file: NewClientForm.tsx:13 ~ PLACES_API_KEY:", PLACES_API_KEY);
// const LOC_PLACES_API_KEY = process.env.PLACES_API_KEY;
// console.log("🚀 ~ file: NewClientForm.tsx:15 ~ LOC_PLACES_API_KEY:", LOC_PLACES_API_KEY);

function CreateAddressFields({ form }: Props) {
    // const { merchantId, userRole } = useContext(UserDataContext);

    // const [foundAddress, setFoundAddress] = useState<NewAddressInput | null>(null);
    // const [city, setCity] = useState<string | null>(null);

    // const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
    const inputRef = useRef<any>(null);
    const street2Ref = useRef<any>(null);

    // console.log("🚀 ~ file: CreateAddressFields.tsx:24 ~ CreateAddressFields ~ inputRef:", inputRef);
    const options = {
        componentRestrictions: { country: ["ca", "us"] },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["address"]
    };
    // inputRef.current.focus();


    const { ref, autocompleteRef } = usePlacesWidget({
        apiKey: PLACES_API_KEY,
        onPlaceSelected: (place, inputRef, something) => {
            console.log('place selected', place);
            const address = place.address_components;
            // let newAddress: NewAddressInput = {
            //     street1: '',
            //     street2: '',
            //     city: '',
            //     zip: '',
            //     state: '',
            //     country: ''
            // };
            let { street1, street2, city, state, zip, country }: NewAddressInput = {
                street1: place.name!,
                street2: '',
                city: '',
                zip: '',
                state: '',
                country: ''
            };
            if (address) {
                console.log('going through found address');
                for (const component of address) {
                    console.log("🚀 ~ file: CreateAddressFields.tsx:63 ~ CreateAddressFields ~ component:", component);
                    const type = component.types[0];
                    switch (type) {
                        // case "street_number":
                        //     street1 = `${component.long_name} ${street1}`;
                        //     break;
                        // case "route": {
                        //     street1 += component.short_name;
                        //     break;
                        // }

                        case "postal_code": {
                            zip = `${component.long_name}${zip}`;
                            break;
                        }

                        case "locality":
                            // (document.querySelector("#locality") as HTMLInputElement).value =
                            //     component.long_name;
                            city = `${component.long_name}${city}`;
                            break;

                        case "administrative_area_level_1": {
                            // (document.querySelector("#state") as HTMLInputElement).value =
                            //     component.short_name;
                            state = `${component.short_name}${state}`;
                            break;
                        }

                        case "country":
                            // (document.querySelector("#country") as HTMLInputElement).value =
                            //     component.long_name;
                            country = `${component.short_name}${country}`;
                            break;

                        default:
                            break;
                    }
                    // newAddress.city = 
                }
                // let street1 = address.
                // setFoundAddress({ street1, street2, city, state, zip, country });
                console.log('results', { street1, street2, city, state, zip, country });
                form.setFieldsValue({
                    street1, city, state, zip, country
                });
                street2Ref.current.focus();
            }
        },
        options
    });
    console.log("🚀 ~ file: CreateAddressFields.tsx:41 ~ CreateAddressFields ~ autocompleteRef:", autocompleteRef);

    // const handleChange = (event: any) => {
    //     console.log('found add', foundAddress);
    //     console.log("🚀 ~ file: CreateAddressFields.tsx:54 ~ handleChange ~ event:", event);
    //     console.log('name', event.target.name);
    //     const name = event.target.name;
    //     console.log('value', event.target.value);
    //     const value = event.target.value;
    //     setFoundAddress({ ...foundAddress!, [event.target.name]: event.target.value });
    //     if (name === 'city') {
    //         setCity(value);
    //     }

    // };

    // useEffect(() => {
    //     if (typeof window.google !== 'undefined') {
    //         autoCompleteRef.current = new window.google.maps.places.Autocomplete(
    //             inputRef.current,
    //             options
    //         );
    //         autoCompleteRef.current.addListener("place_changed", async function () {
    //             const place = await autoCompleteRef.current?.getPlace();
    //             console.log('finding for places', { place });
    //         });

    //     };
    // }, []);

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
            {/* <Script src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA1oJiPasx6wn42mLLf-NdhqE3bQAMwU8Y&libraries=places&callback=Function.prototype`} async /> */}

            {/* <Script src={`https://maps.googleapis.com/maps/api/js?key=${LOC_PLACES_API_KEY}&libraries=places&callback=initMap`} /> */}
            <Form.Item
                label="Name: "
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input
                // onChange={handleChange}
                />
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
                <Input
                    placeholder=''
                    ref={(c) => {
                        // console.log("🚀 ~ file: CreateAddressFields.tsx:98 ~ CreateAddressFields ~ c:", c);
                        inputRef.current = c;
                        if (c) ref.current = c.input;
                    }}
                // ref={inputRef}
                />
            </Form.Item>
            <Form.Item
                label="Street Info 2:"
                name="street2">
                <Input
                    ref={street2Ref}
                />
            </Form.Item>
            <Form.Item
                label="City:"
                name="city"
                // initialValue={foundAddress?.city ? foundAddress.city : ''}
                // getValueFromEvent={handleChange}
                // getValueProps={(v) => {
                //     return ({ name: 'city', value: v });
                // }}
                rules={[{ required: true, message: 'Please input your city!' }]}>
                <Input
                // onChange={handleChange}
                // value={city!
                //     // ? foundAddress.city : ''
                // }
                // placeholder={foundAddress?.city}
                />
            </Form.Item>
            {/* <input
                name={"city"}
                value={foundAddress?.city}
                placeholder={"City"}
                onChange={handleChange}
            /> */}
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
            {/* {countriesList && ( */}
            <Form.Item
                label="Country:"
                name="country"
                rules={[{ required: true, message: 'Please choose your country!' }]}>
                {/* <Select
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
                    </Select> */}
                <Input />
            </Form.Item>
            {/* )} */}
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
            {/* <Script src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA1oJiPasx6wn42mLLf-NdhqE3bQAMwU8Y&libraries=places&callback=Function.prototype`} async /> */}
            {/* <script
                async
                type='text/javascript'
                src='https://maps.googleapis.com/maps/api/js?key=AIzaSyA1oJiPasx6wn42mLLf-NdhqE3bQAMwU8Y&libraries=places&callback=Function.prototype'
            ></script> */}
        </>
    );
}
export default CreateAddressFields;
