import React, { useRef } from 'react';
import { Form, FormInstance, Input } from 'antd';
import { usePlacesWidget } from 'react-google-autocomplete';
import { AddressData, NewAddressInput } from '../../../types/addresses';
import PhoneNumberInput from '../Input/PhoneNumberInput';

// const { Option } = Select;

type Props = {
    form: FormInstance<any>;
    data?: AddressData;
};


const PLACES_API_KEY = process.env.NEXT_PUBLIC_PLACES_API_KEY;

function CreateAddressFields({ form, data }: Props) {
    // const { merchantId, userRole } = useContext(UserDataContext);

    // const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
    const inputRef = useRef<any>(null);
    const street2Ref = useRef<any>(null);

    const options = {
        componentRestrictions: { country: ["ca", "us"] },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["address"]
    };
    // inputRef.current.focus();


    const { ref, autocompleteRef }: { ref: any, autocompleteRef: any; } = usePlacesWidget(
        {
            apiKey: PLACES_API_KEY,
            onPlaceSelected: (place, inputRef, something) => {
                const address = place.address_components;
                let { street1, street2, city, state, zip, country }: NewAddressInput = {
                    street1: place.name!,
                    street2: '',
                    city: '',
                    zip: '',
                    state: '',
                    country: ''
                };
                if (address) {
                    for (const component of address) {
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
                    }
                    form.setFieldsValue({
                        street1, city, state, zip, country
                    });
                    street2Ref.current.focus();
                }
            },
            options
        });

    // Set a countries list?
    // const [countriesList, setCountriesList] = useState<any | null>(null);

    return (
        <>
            <Form.Item
                label="Street Info 1:"
                name="street1"
                rules={[{ required: true, message: 'Please input your street1!' }]}>
                <Input
                    placeholder='Start typing for autofill...'
                    ref={(c) => {
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
                rules={[{ required: true, message: 'Please input your city!' }]}>
                <Input
                />
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
            <Form.Item
                label="Phone:"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone number!' }]}>
                <PhoneNumberInput />
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
