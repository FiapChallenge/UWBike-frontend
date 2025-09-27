import { fetchWithTimeout } from "../utils/fetchWithTimeout";


export type Usuario = {
  id: string;
  nome: string;
  email: string;
  senha?: string;  
};

export type ApiResponse<T = any> = {
  success: boolean;      
  message?: string;    
  data?: T;
  errors?: any[];
  links?: any[];
};

// const BASE_URL = 'http://10.3.33.13:8080'; 
const BASE_URL = 'http://10.3.33.13:5241/api'; 

export async function registerRequest({nome, email, senha} : {nome: string, email: string, senha: string}): Promise<ApiResponse<Usuario>> {
    try {
        const response = await fetchWithTimeout(`${BASE_URL}/Usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({nome, email, senha}),
        });
        
        if (!response.ok) {
            const text = await response.text();
            return { success: false, message: `HTTP ${response.status}: ${text}` };
        }
        
        const data: ApiResponse<Usuario> = await response.json();
        return data;
    } catch (error: any) {
        console.error('Erro ao criar conta:', error);
        return { success: false, message: 'Erro de rede no registro' };
    }
}

export async function loginRequest({email, senha}: {email: string, senha: string}): Promise<ApiResponse<Usuario>> {
    try{
        const url = `${BASE_URL}/Usuarios/buscar?email=${email}`;
        console.log(url

        );
        

        const response = await fetchWithTimeout(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {
            const text = await response.text();
            return { success: false, message: `HTTP ${response.status}: ${text}` };
        }

        const data: ApiResponse<Usuario> = await response.json();
        if (data.data?.senha !== senha) {
            return { success: false, message: "Senha incorreta" };
        }

        return data;
    } catch (error: any) {
        console.error('Erro ao fazer login:', error);
        return {
        success: false,
        message:
            error.name === "AbortError"
            ? "Tempo limite atingido. Servidor não respondeu."
            : "Erro de rede. Verifique sua conexão.",
        };
    }
}