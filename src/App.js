import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert("CEP is required");
      return;
    };

    try {
      const response = await api.get(`${input}/json`);

      setCep(response.data);
      setInput('');

    } catch (error) {
      alert('Ops... CEP not found!');
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title" >Search Cep</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Enter your cep"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {
        Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2>CEP: {cep.cep}</h2>

            <span>{cep.logradouro}</span>
            <span>Complemeto: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )
      }

    </div>

  );
}

export default App;
