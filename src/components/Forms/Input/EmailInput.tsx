import React from 'react';
import { Input } from 'antd';

type Props = {
    value?: string,
};

const EmailInput = ({ value }: Props) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const validateEmail = (value: string) => {
        console.log("🚀 ~ file: EmailInput.tsx:12 ~ validateEmail ~ value:", value);
        if (!value) return Promise.resolve();
        if (emailRegex.test(value)) {
            console.log("🚀 ~ file: EmailInput.tsx:15 ~ validateEmail ~ emailRegex.test(value):", emailRegex.test(value));
            return Promise.resolve();
        }
        return Promise.reject('Please enter a valid email address');
    };

    return (
        <Input
            placeholder="Enter your email address"
            type="email"
            onBlur={(event) => validateEmail(event.target.value)}
        />
    );
};

export default EmailInput;