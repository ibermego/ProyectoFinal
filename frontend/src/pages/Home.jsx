import React from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      textAlign: 'center',
      padding: '3rem',
      fontFamily: 'serif',
      backgroundColor: '#f6f1e9',
      minHeight: '100vh'
    }}>
      <h1>Bienvenido a La Taberna de Egia</h1>
      <p data-testid="p-hola">¿Quién eres?</p>
      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => navigate('/cliente')} style={btnStyle}>Soy Cliente</button>
        <button onClick={() => navigate('/camarero')} style={btnStyle}>Soy Camarero</button>
      </div>
    </div>
  );
}

const btnStyle = {
  // margin: '1rem',
  // padding: '1rem 2rem',
  // fontSize: '1.2rem',
  // cursor: 'pointer',
  // borderRadius: '10px',
  // border: 'none',
  // backgroundColor: '#c19a6b',
  // color: 'white'
};

export default Home;
