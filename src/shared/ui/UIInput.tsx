import * as React from "react";

type tInputType = 'text';

export interface IInputProps {
    placeholder: string
    type: tInputType
    required?: boolean
    name?: string
    value?: string | number
    onChange?: (name: string, value: string | number) => void
}

const UIInput: React.FC<IInputProps> = (
    {
        placeholder,
        type,
        required,
        name,
        value,
        onChange,
    }
) => {
    return (
        <label className='block w-full'>
            <input
                className='bg-[#17181c] p-2 rounded border-2 border-[#ffffff0f] placeholder: text-[#FFFFFF] w-full outline-none'
                type={type}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={(e) => onChange && onChange(name || e.target.value, e.target.value)}
            />
        </label>
    );
};

export default UIInput;