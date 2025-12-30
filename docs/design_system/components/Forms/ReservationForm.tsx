import React from 'react';
import { Button, Input, Icon } from '../DesignSystem';

interface ReservationFormProps {
    onCancel: () => void;
    onSave: () => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ onCancel, onSave }) => {
    return (
        <div className="flex flex-col gap-6">
            <Input 
                label="Usuário" 
                icon="person_search" 
                placeholder="Buscar por nome ou ID..." 
                rightElement={<Icon name="arrow_drop_down" className="text-[#92adc9]" />}
            />

            <Input 
                label="Obra / Livro" 
                icon="menu_book" 
                placeholder="Buscar por título, autor ou ISBN..." 
                rightElement={<Icon name="search" className="text-[#92adc9]" />}
            />

            <div>
                <Input 
                    label="Data da Reserva" 
                    value="15 de Outubro, 2023" 
                    readOnly 
                    className="cursor-not-allowed opacity-80"
                    rightElement={<Icon name="calendar_today" className="text-[#92adc9]" />}
                    containerClassName="opacity-80"
                />
                <p className="text-xs text-[#58738e] mt-1">* A data é preenchida automaticamente com o dia atual.</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                <Button variant="ghost" className="border border-[#233648] w-full sm:w-auto min-w-[120px]" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button icon="check" className="w-full sm:w-auto min-w-[160px]" onClick={onSave}>
                    Confirmar Reserva
                </Button>
            </div>
        </div>
    );
};
