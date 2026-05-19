import { createContext, useContext, useEffect, useState } from "react";

const TiendaConfigContext = createContext();

export function TiendaConfigProvider({ children }) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      const res = await fetch("https://vdncosmetics.com/api/get_info_pagina.php");
      const data = await res.json();
      setConfig(data);
    } catch (err) {
      console.error("Error cargando config:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <TiendaConfigContext.Provider value={{ config, loading, refetch: fetchConfig }}>
      {children}
    </TiendaConfigContext.Provider>
  );
}

export const useTiendaConfig = () => {
  const context = useContext(TiendaConfigContext);

  if (!context) {
    throw new Error("useTiendaConfig debe usarse dentro del Provider");
  }

  return context;
};