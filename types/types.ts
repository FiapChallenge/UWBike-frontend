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