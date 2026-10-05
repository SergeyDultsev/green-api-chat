interface IPropsButton {
    onClick?: () => void;
    variant?: 'primary' | 'danger';
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
        variant = 'primary',
        children,
        icon,
        text,
        type,
        disabled,
        isActive,
        className
    }) =>
{
    const variantStyles = variant === 'danger'
        ? 'rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400 hover:bg-red-500/40'
        : 'rounded-md border border-blue-500/40 bg-blue-500/10 p-3 text-sm text-blue-400 hover:bg-blue-500/40';

    return (
        <button
            className={[
                'pt-2 pb-2 pr-3 pl-3 flex items-center justify-center gap-2 rounded cursor-pointer transition-colors',
                isActive && 'ring-2 ring-offset-1',
                variantStyles,
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