interface IPropsButton {
    onClick?: () => void;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    text?: React.ReactNode;
    type?: string,
    disabled?: boolean;
    isActive?: boolean;
    className?: string;
}

const UIButton: React.FC<IPropsButton> = (
    {
        onClick,
        children,
        icon,
        text,
        type,
        disabled,
        isActive,
        className
    }) =>
{
    return (
        <button
            className={[
                'pt-2 pb-2 pr-3 pl-3 flex items-center justify-center gap-2 rounded cursor-pointer hover:bg-[#0a68cd]',
                'bg-[#007aff] text-white/80',
                isActive && 'ring-2 ring-offset-1',
                disabled && 'opacity-50 cursor-not-allowed',
                className,
            ].filter(Boolean).join(' ')}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {icon}
            {children ?? text}
        </button>
    );
};

export default UIButton;