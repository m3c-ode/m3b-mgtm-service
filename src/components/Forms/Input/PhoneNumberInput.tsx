import React, { useState } from 'react';
import { Input, InputNumber } from 'antd';

type Props = {
    value?: string,
    onChange?: (value: string) => void;
};

const PhoneNumberInput = ({ value, onChange }: Props) => {

    const [phone, setPhone] = useState(value || '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const formattedNumber = formatPhoneNumber(value);
        setPhone(formattedNumber);

        if (onChange) {
            onChange(formattedNumber);
        }
    };

    const formatPhoneNumber = (value: string) => {

        if (!value) return '';
        const phoneNumber = value.toString().replace(/\D/g, '');
        const phoneNumberLength = phoneNumber.length;

        if (phoneNumberLength <= 3) {
            return phoneNumber;
        }

        if (phoneNumberLength <= 6) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }

        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

    const parsePhoneNumber = (value?: string) => {
        // if (!value) return undefined;
        const phoneNumber = value?.toString().replace(/\D/g, '');
        return parseInt(phoneNumber!)!;
    };

    return (
        <Input
            type='tel'
            value={phone}
            onChange={handleChange}
            placeholder="(000) 000-0000"
        />
    );
};

export default PhoneNumberInput;