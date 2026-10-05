import * as React from "react";

type tInputType = 'text';

export interface IInputProps {
    placeholder: string,
    type: tInputType,
    required?: boolean,
    name?: string,
    value?: string | number,
    onChange?: (name: string, value: string | number) => void,
    className?: string,
    isError?: boolean
}

const UIInput: React.FC<IInputProps> = (
    {
        placeholder,
        type,
        required,
        name,
        value,
        onChange,
        className,
        isError,
    }
) => {
    return (
        <label className='block w-full'>
            <input
                className={[
                    'bg-[#17181c] p-2 rounded border-2 border-[#ffffff0f] placeholder: text-[#FFFFFF] w-full outline-none',
                    isError && 'border-red-500/40 text-red-400',
                    className,
                ].filter(Boolean).join(' ')}
                type={type}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={(e) => onChange && onChange(name || e.target.value, e.target.value)}
                autoComplete='off'
            />
        </label>
    );
};

export default UIInput;