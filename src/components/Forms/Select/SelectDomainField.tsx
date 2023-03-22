import { Form, Select } from 'antd';
import React from 'react';
import { useDomainStore } from '../../../stores/domain';

type Props = {};

const SelectDomainField = (props: Props) => {
    const domainsList = useDomainStore(state => state.domainsList);
    console.log("🚀 ~ file: BeerForm.tsx:31 ~ BeerForm ~ domainsList:", domainsList);
    return (
        <Form.Item
            label="Domain"
            name="domain"
            rules={[{ required: true, message: 'Please input beer domain!' }]}
        >
            <Select
                showSearch
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={domainsList?.map((value, index) => ({ value, label: value }))}
            >
            </Select>
        </Form.Item>
    );
};

export default SelectDomainField;