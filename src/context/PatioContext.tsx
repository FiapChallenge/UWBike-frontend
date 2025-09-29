import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Patio, getPatios } from "../service/patioService";

type PatioContextType = {
  patios: Patio[];
  patioAtual: Patio | null;
  selecionarPatio: (id: number) => Promise<void>;
  carregarPatios: () => Promise<void>;
  loading: boolean;
  refreshing: boolean;
};

const PatioContext = createContext<PatioContextType>({} as PatioContextType);

export function PatioProvider({ children }: { children: React.ReactNode }) {
  const [patios, setPatios] = useState<Patio[]>([]);
  const [patioAtual, setPatioAtual] = useState<Patio | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarPatios = async () => {
    try {
      setRefreshing(true);
      const lista = await getPatios();
      setPatios(lista);

      setPatioAtual((atual) => {
        if (!atual) return lista[0] || null;
        const aindaExiste = lista.find(p => p.id === atual.id);
        return aindaExiste || lista[0] || null;
      });
    } catch (e) {
      console.error("Erro ao carregar pátios:", e);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const lista = await getPatios();
        setPatios(lista);

        const saved = await AsyncStorage.getItem("patioAtual");
        if (saved) {
          const parsed: Patio = JSON.parse(saved);
          setPatioAtual(parsed);
        } else if (lista.length > 0) {
          setPatioAtual(lista[0]);
        }
      } catch (e) {
        console.error("Erro ao inicializar pátios:", e);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const selecionarPatio = async (id: number) => {
    const selected = patios.find((p) => p.id === id) || null;
    if (selected) {
      setPatioAtual(selected);
      await AsyncStorage.setItem("patioAtual", JSON.stringify(selected));
    }
  };

  return (
    <PatioContext.Provider value={{ patios, patioAtual, selecionarPatio, carregarPatios, loading, refreshing }}>
      {children}
    </PatioContext.Provider>
  );
}

export function usePatio() {
   const ctx = useContext(PatioContext);
  if (!ctx) throw new Error("usePatio deve ser usado dentro do PatioProvider");
  return ctx;
}