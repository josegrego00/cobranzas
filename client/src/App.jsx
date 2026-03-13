import React, { useState } from "react";
import RegisterPage from "./components/04-pages/RegisterPage/RegisterPage";
// 🟢 [NUEVO] Importamos tu página de Login
import LoginPage from "./components/04-pages/LoginPage/LoginPage";

function App() {
  // 🟢 [NUEVO] Estado para decidir qué pantalla mostrar ("register" o "login")
  // Ponemos "login" por defecto para que lo pruebes apenas guardes
  const[vistaActual, setVistaActual] = useState("login");

  return (
    <div className="App">
      
      {/* 🟢 Menú temporal de navegación solo para pruebas */}
      <nav style={{ padding: "1rem", backgroundColor: "#eee", textAlign: "center", marginBottom: "2rem" }}>
        <button 
          onClick={() => setVistaActual("login")}
          style={{ marginRight: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Ir a Login
        </button>
        
        <button 
          onClick={() => setVistaActual("register")}
          style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Ir a Registro
        </button>
      </nav>

      {/* 🟢 Renderizado condicional (Si es login muestra LoginPage, si no, RegisterPage) */}
      {vistaActual === "login" ? <LoginPage /> : <RegisterPage />}
      
    </div>
  );
}

export default App;