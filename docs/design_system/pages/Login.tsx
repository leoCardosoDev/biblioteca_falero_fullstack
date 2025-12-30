import React from 'react';
import { Icon } from '../components/UI/Components';

export const Login: React.FC = () => {
    return (
        <div className="w-full h-screen flex flex-col md:flex-row bg-[#101922] text-white overflow-hidden font-display">
            {/* Form Side */}
            <div className="w-full md:w-1/2 lg:w-5/12 xl:w-1/3 flex flex-col justify-center items-center p-8 md:p-12 lg:p-16 relative z-10 bg-[#111a22] border-r border-[#324d67] h-full shadow-2xl">
                <div className="w-full max-w-sm flex flex-col gap-8 animate-in fade-in slide-in-from-left-4 duration-700">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                <Icon name="local_library" className="text-2xl" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Falero</h1>
                        </div>
                        <p className="text-[#92adc9] text-base font-medium">Sistema de Gestão de Bibliotecas</p>
                    </div>
                    
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight text-white">Bem-vindo de volta</h2>
                        <p className="text-[#92adc9] text-sm">Por favor, insira suas credenciais para acessar.</p>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); window.location.href = '#/'; }}>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-white">Usuário</label>
                            <div className="relative flex items-center group">
                                <div className="absolute left-4 text-[#92adc9] group-focus-within:text-primary transition-colors">
                                    <Icon name="person" className="text-[20px]" />
                                </div>
                                <input 
                                    className="w-full h-12 rounded-lg border border-[#324d67] bg-[#192633] pl-12 pr-4 text-base text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" 
                                    placeholder="Digite seu login" 
                                    defaultValue="admin"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-white">Senha</label>
                                <a href="#" className="text-xs text-primary hover:text-[#106cc9] hover:underline">Esqueceu a senha?</a>
                            </div>
                            <div className="relative flex items-center group">
                                <div className="absolute left-4 text-[#92adc9] group-focus-within:text-primary transition-colors">
                                    <Icon name="lock" className="text-[20px]" />
                                </div>
                                <input 
                                    className="w-full h-12 rounded-lg border border-[#324d67] bg-[#192633] pl-12 pr-12 text-base text-white placeholder:text-[#58738e] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" 
                                    type="password" 
                                    placeholder="Digite sua senha" 
                                    defaultValue="password"
                                />
                                <button type="button" className="absolute right-4 text-[#58738e] hover:text-white transition-colors">
                                    <Icon name="visibility" className="text-[20px]" />
                                </button>
                            </div>
                        </div>
                        
                        <button 
                            className="h-12 mt-2 w-full bg-primary hover:bg-[#106cc9] text-white font-bold rounded-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <span>Entrar no Sistema</span>
                            <Icon name="arrow_forward" />
                        </button>
                    </form>

                    <div className="mt-4 pt-6 border-t border-[#324d67] text-center">
                        <p className="text-sm text-[#92adc9]">
                            Não tem uma conta? <a href="#" className="text-white font-medium hover:text-primary transition-colors">Contate o administrador</a>
                        </p>
                    </div>
                </div>
                
                {/* Footer Info */}
                <div className="absolute bottom-6 left-0 right-0 text-center">
                    <p className="text-xs text-[#58738e]">Falero v1.0.4 &copy; 2023</p>
                </div>
            </div>

            {/* Image Side */}
            <div className="hidden md:flex flex-1 relative bg-[#0b1219] overflow-hidden items-center justify-center">
                {/* Background Pattern/Image */}
                <div className="absolute inset-0 z-0 opacity-40" style={{ 
                    backgroundImage: 'url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2828&auto=format&fit=crop")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%) contrast(120%) brightness(60%)'
                }}></div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101922] via-[#101922]/80 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#111a22] to-transparent z-10"></div>

                {/* Content */}
                <div className="relative z-20 max-w-lg p-12 animate-in fade-in slide-in-from-right-8 duration-1000">
                    <div className="mb-6 w-16 h-1 bg-primary rounded-full"></div>
                    <blockquote className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                        "O conhecimento organizado é a base para a inovação."
                    </blockquote>
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-slate-700 bg-cover bg-center border-2 border-primary" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=3387&auto=format&fit=crop")'}}></div>
                        <div>
                            <p className="text-white font-bold">Dra. Helena Santos</p>
                            <p className="text-primary text-sm">Diretora da Biblioteca Central</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};