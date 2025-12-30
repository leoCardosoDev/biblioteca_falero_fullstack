import React from 'react';
import { Button, Icon, Input, Select, TextArea } from '../DesignSystem';

interface BookFormProps {
    onCancel: () => void;
    onSave: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({ onCancel, onSave }) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Upload Section */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <label className="block text-sm font-medium text-slate-200">Capa da Obra</label>
                    <div className="flex-1 min-h-[320px] lg:h-auto border-2 border-dashed border-[#324d67] rounded-xl bg-[#151f2b] hover:bg-[#192633] transition-colors flex flex-col items-center justify-center p-6 text-center cursor-pointer group">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Icon name="add_photo_alternate" className="text-primary text-3xl" />
                        </div>
                        <p className="text-sm font-medium text-white">Clique para fazer upload</p>
                        <p className="text-xs text-[#92adc9] mt-1">ou arraste e solte o arquivo aqui</p>
                        <p className="text-[10px] text-[#58738e] mt-4 uppercase tracking-wider">PNG, JPG ATÉ 5MB</p>
                    </div>
                </div>

                {/* Fields Section */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="grid grid-cols-1 gap-6">
                        <Input label="Título da Obra" placeholder="Ex: Dom Casmurro" required />
                        <Input label="Subtítulo" placeholder="Ex: Edição Comemorativa" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Autor(es)" placeholder="Ex: Machado de Assis" required />
                        <Input label="Editora" placeholder="Ex: Companhia das Letras" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input 
                            label="ISBN" 
                            placeholder="000-0-00-000000-0" 
                            required 
                            rightElement={<Icon name="barcode_reader" className="text-[#92adc9]" />} 
                        />
                        <Input label="Ano" type="number" placeholder="2024" required />
                        <Input label="Edição" placeholder="1ª Ed." />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Select label="Gênero" defaultValue="">
                            <option value="" disabled>Selecione</option>
                            <option>Romance</option>
                            <option>Ficção Científica</option>
                            <option>Fantasia</option>
                            <option>Técnico</option>
                        </Select>
                        
                        <Select label="Idioma" defaultValue="Português">
                            <option>Português</option>
                            <option>Inglês</option>
                            <option>Espanhol</option>
                        </Select>

                        <Input label="Nº Páginas" type="number" placeholder="0" />
                    </div>

                    <TextArea 
                        label="Resumo / Sinopse" 
                        placeholder="Digite uma breve descrição sobre a obra..." 
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#324d67]">
                <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
                <Button icon="check" onClick={onSave}>Salvar Obra</Button>
            </div>
        </div>
    );
};
