import React from 'react';

const AdminBar = ({ currentUser, onLogout, onToggleEdit, isEditMode, children }) => {
  if (!currentUser) return null;

  return (
    <div className="bg-gray-800 text-white py-2 px-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span>Conectado como: <strong>{currentUser}</strong></span>

        <button 
          onClick={onToggleEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm"
        >
          {isEditMode ? 'Desactivar Edición' : 'Modo Edición'}
        </button>

        {/* 👇 Aquí los children SIEMPRE se renderizan */}
        <div className="flex items-center gap-2 ml-4">
          {children}
        </div>
      </div>

      <button 
        onClick={() => {
          onLogout();
          onToggleEdit(false);
        }}
        className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default AdminBar;
