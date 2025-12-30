import React, { useEffect } from 'react';

// =============================================================================
// ATOMS
// =============================================================================

// --- Icon ---
export const Icon: React.FC<{ name: string; className?: string; fill?: boolean }> = ({ name, className = "", fill = false }) => (
    <span className={`material-symbols-outlined ${fill ? 'icon-fill' : ''} ${className} select-none`}>
        {name}
    </span>
);

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    icon?: string;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, fullWidth = false, className = "", ...props }) => {
    const baseStyles = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#101922]";
    
    const variants = {
        primary: "bg-primary hover:bg-blue-600 text-white shadow-lg shadow-primary/20 focus:ring-primary",
        secondary: "bg-surface-dark hover:bg-surface-highlight text-white border border-white/10 focus:ring-slate-500",
        danger: "bg-danger hover:bg-red-600 text-white shadow-lg shadow-danger/20 focus:ring-danger",
        ghost: "bg-transparent hover:bg-white/5 text-text-secondary hover:text-white focus:ring-slate-500"
    };

    return (
        <button 
            className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`} 
            {...props}
        >
            {icon && <Icon name={icon} className="text-[20px]" />}
            {children}
        </button>
    );
};

// --- Badge ---
export const Badge: React.FC<{ label: string; color: 'success' | 'warning' | 'danger' | 'primary' | 'neutral' }> = ({ label, color }) => {
    const styles = {
        success: "bg-success/10 text-success border-success/20",
        warning: "bg-warning/10 text-warning border-warning/20",
        danger: "bg-danger/10 text-danger border-danger/20",
        primary: "bg-primary/10 text-primary border-primary/20",
        neutral: "bg-slate-700/30 text-slate-400 border-slate-600/30"
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[color]}`}>
            <span className={`size-1.5 rounded-full bg-current opacity-70`}></span>
            {label}
        </span>
    );
};

// --- Avatar ---
export const Avatar: React.FC<{ src: string; alt?: string; size?: 'sm' | 'md' | 'lg' }> = ({ src, alt = "Avatar", size = 'md' }) => {
    const sizes = { sm: "size-8", md: "size-10", lg: "size-16" };
    return (
        <div 
            className={`${sizes[size]} rounded-full bg-cover bg-center border border-white/10 bg-surface-dark shrink-0`} 
            style={{ backgroundImage: `url('${src}')` }}
            aria-label={alt}
            role="img"
        />
    );
};

// --- Switch ---
interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    description?: string;
}
export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
        <div className="flex flex-col">
            {label && <span className="text-sm font-medium text-white">{label}</span>}
            {description && <span className="text-xs text-slate-400">{description}</span>}
        </div>
        <label className="flex items-center cursor-pointer relative">
            <input 
                type="checkbox" 
                className="sr-only" 
                checked={checked} 
                onChange={(e) => onChange(e.target.checked)} 
            />
            <div className={`w-11 h-6 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-slate-700'}`}></div>
            <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
        </label>
    </div>
);

// =============================================================================
// MOLECULES (Form Elements)
// =============================================================================

interface BaseInputProps {
    label?: string;
    icon?: string;
    error?: string;
    rightElement?: React.ReactNode;
    containerClassName?: string;
}

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, BaseInputProps {}

export const Input: React.FC<InputProps> = ({ label, icon, error, rightElement, containerClassName = "", className = "", required, ...props }) => {
    return (
        <div className={`flex flex-col gap-2 ${containerClassName}`}>
            {label && (
                <label className="text-white text-sm font-medium flex items-center gap-1">
                    {label}
                    {required && <span className="text-danger">*</span>}
                </label>
            )}
            <div className="relative group">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Icon name={icon} className="text-[#92adc9] text-[20px] group-focus-within:text-primary transition-colors" />
                    </div>
                )}
                <input 
                    className={`w-full h-12 rounded-lg bg-surface-dark border ${error ? 'border-danger' : 'border-white/10'} text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all ${icon ? 'pl-11' : 'px-4'} ${rightElement ? 'pr-10' : 'pr-4'} ${className}`} 
                    {...props} 
                />
                {rightElement && (
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                        {rightElement}
                    </div>
                )}
            </div>
            {error && <span className="text-xs text-danger">{error}</span>}
        </div>
    );
};

// --- Select ---
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>, BaseInputProps {}

export const Select: React.FC<SelectProps> = ({ label, icon, error, children, containerClassName = "", className = "", required, ...props }) => {
    return (
        <div className={`flex flex-col gap-2 ${containerClassName}`}>
            {label && (
                <label className="text-white text-sm font-medium flex items-center gap-1">
                    {label}
                    {required && <span className="text-danger">*</span>}
                </label>
            )}
            <div className="relative group">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Icon name={icon} className="text-[#92adc9] text-[20px] group-focus-within:text-primary transition-colors" />
                    </div>
                )}
                <select 
                    className={`w-full h-12 rounded-lg bg-surface-dark border ${error ? 'border-danger' : 'border-white/10'} text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none appearance-none cursor-pointer transition-all ${icon ? 'pl-11' : 'px-4'} pr-10 ${className}`} 
                    {...props}
                >
                    {children}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#92adc9]">
                    <Icon name="expand_more" />
                </div>
            </div>
            {error && <span className="text-xs text-danger">{error}</span>}
        </div>
    );
};

// --- TextArea ---
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps {}

export const TextArea: React.FC<TextAreaProps> = ({ label, icon, error, containerClassName = "", className = "", required, ...props }) => {
    return (
        <div className={`flex flex-col gap-2 ${containerClassName}`}>
            {label && (
                <label className="text-white text-sm font-medium flex items-center justify-between">
                    <span>
                        {label}
                        {required && <span className="text-danger ml-1">*</span>}
                    </span>
                    {!required && <span className="text-[#92adc9] text-xs font-normal opacity-70">Opcional</span>}
                </label>
            )}
            <div className="relative group">
                <textarea 
                    className={`w-full min-h-[100px] rounded-lg bg-surface-dark border ${error ? 'border-danger' : 'border-white/10'} text-white p-4 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-[#58738e] resize-y transition-all ${className}`} 
                    {...props} 
                />
            </div>
        </div>
    );
};


// =============================================================================
// ORGANISMS / CONTAINERS
// =============================================================================

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`bg-card-dark rounded-xl border border-white/5 shadow-sm ${className}`}>
        {children}
    </div>
);

// --- Modal ---
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-2xl' }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            ></div>
            <div className={`relative w-full ${maxWidth} bg-[#111a22] border border-[#324d67] rounded-xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200`}>
                <div className="flex items-start justify-between px-6 py-5 border-b border-[#324d67] bg-[#151f2b]/50 rounded-t-xl shrink-0">
                    <div>
                        <h2 className="text-white text-xl font-bold leading-tight tracking-tight">{title}</h2>
                        {subtitle && <p className="text-[#92adc9] text-sm mt-1">{subtitle}</p>}
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-[#92adc9] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#324d67]/50"
                        aria-label="Close modal"
                    >
                        <Icon name="close" className="text-2xl" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};
