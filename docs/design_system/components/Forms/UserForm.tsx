import React from 'react';
import { Button, Input, Select, Icon } from '../DesignSystem';

interface UserFormProps {
    onCancel: () => void;
    onSave: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onCancel, onSave }) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Informações Pessoais</h3>
                </div>
                
                <div className="md:col-span-2">
                    <Input 
                        label="Nome Completo" 
                        icon="person" 
                        placeholder="Ex: Ana Maria Souza" 
                        required 
                        rightElement={<Icon name="check_circle" className="text-success text-[20px]" />}
                    />
                </div>

                <Input label="CPF" icon="id_card" placeholder="000.000.000-00" required />
                <Input label="Email" type="email" icon="mail" placeholder="exemplo@email.com" required />
                <Input label="Telefone" type="tel" icon="call" placeholder="(00) 00000-0000" />
                <Input label="Endereço" icon="location_on" placeholder="Rua, Número, Bairro" />

                <div className="md:col-span-2 pt-2 border-t border-[#324d67]/50 mt-2">
                    <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Controle de Acesso</h3>
                </div>

                <Select label="Perfil de Acesso" icon="badge" required defaultValue="">
                    <option value="" disabled>Selecione o perfil</option>
                    <option value="admin">Administrador</option>
                    <option value="librarian">Bibliotecário</option>
                    <option value="assistant">Assistente</option>
                </Select>

                <Select label="Status da Conta" icon="toggle_on" required defaultValue="active">
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                    <option value="blocked">Bloqueado</option>
                </Select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#324d67]">
                <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
                <Button icon="save" onClick={onSave}>Salvar Usuário</Button>
            </div>
        </div>
    );
};
