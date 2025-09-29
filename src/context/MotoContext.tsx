import React, { createContext, useContext, useState, ReactNode } from "react";
import { getMotosByPatio, Moto } from "../service/patioService";

type MotoContextType = {
  motos: Moto[];
  carregarMotos: (patioId: number) => Promise<void>;
};

const MotoContext = createContext<MotoContextType>({
  motos: [],
  carregarMotos: async () => {},
});

export const MotoProvider = ({ children }: { children: ReactNode }) => {
  const [motos, setMotos] = useState<Moto[]>([]);

  const carregarMotos = async (patioId: number) => {
    try {
      const res = await getMotosByPatio(patioId);
      if (res.success && res.data) {
        setMotos(res.data);
      }
    } catch (error) {
      console.error("Erro ao carregar motos:", error);
    }
  };

  return (
    <MotoContext.Provider value={{ motos, carregarMotos }}>
      {children}
    </MotoContext.Provider>
  );
};

export const useMoto = () => useContext(MotoContext);
