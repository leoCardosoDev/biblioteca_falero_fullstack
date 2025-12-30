import React from 'react';
import { Button, Select, Input, TextArea, Icon } from '../DesignSystem';

interface LoanFormProps {
    onCancel: () => void;
    onSave: () => void;
}

export const LoanForm: React.FC<LoanFormProps> = ({ onCancel, onSave }) => {
    return (
        <div className="flex flex-col gap-6">
            <Select label="Leitor / Usuário" icon="person_search" defaultValue="">
                <option value="" disabled>Buscar por nome ou ID...</option>
                <option value="user1">Ana Silva (ID: 00124) - Membro Ativo</option>
                <option value="user2">Carlos Oliveira (ID: 00356) - Professor</option>
            </Select>

            <div>
                <Input 
                    label="Obra ou Exemplar" 
                    icon="qr_code_scanner" 
                    placeholder="Escaneie o ISBN ou busque por título/autor..." 
                />
                <div className="flex items-center gap-2 px-1 mt-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <p className="text-[#92adc9] text-sm">Status: <span className="text-emerald-400 font-medium">Disponível</span> (3 exemplares na estante A4)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                    label="Data do Empréstimo" 
                    type="date" 
                    value="2023-10-24" 
                    readOnly 
                    className="text-white/50 cursor-not-allowed"
                />
                <Input 
                    label="Devolução Prevista" 
                    type="date" 
                    defaultValue="2023-11-07" 
                />
            </div>

            <TextArea 
                label="Observações" 
                placeholder="Ex: Livro com capa levemente danificada..." 
            />

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#324d67]">
                <Button variant="secondary" className="w-full sm:w-auto" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button icon="check_circle" className="w-full sm:w-auto" onClick={onSave}>
                    Confirmar Empréstimo
                </Button>
            </div>
        </div>
    );
};
