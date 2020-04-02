import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';

export default function App() {


  // Crie uma conta no openweathermap.org, depois logue nela e vá até "API Keys"
  // Troque o valor dessa key pela sua chave do site openweathermap.org
  const key = 'Sua chave da api deve estar aqui dentro'

  const [cidade, setCidade] = useState('Araguaína');
  const [cidadeName, setCidadeName] = useState('');
  const [temp, setTemp] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [pais, setPais] = useState('');

  const dataFormat = (d) => {
    let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    let dia = dias[d.getDay()];
    let data = d.getDate();
    let mes = meses[d.getMonth()];
    let ano = d.getFullYear();
    return `${dia}, ${data} ${mes} ${ano}`
  }

  async function loadTemp() {
    const response = await api.get(`weather?q=${cidade}&units=metric&APPID=${key}&lang=pt_br`);
    const result = response.data;
    setTemp(result.main.temp);
    setDescricao(result.weather[0].description);
    setCidadeName(result.name);
    setPais(result.sys.country);
  }

  useEffect(() => {
    loadTemp();
  }, [cidade]);

  return (
    <div className="container">
      <h1>Temporale</h1>
      <div className="search">
        <input
          placeholder="Digite aqui o nome da cidade..."
          value={cidade}
          onChange={e => setCidade(e.target.value)}
          target="_black"
        />
        <FiSearch size={50} color="#fff"
          className="btnSearch"
          onClick={() => loadTemp()}
        />
      </div>
      <div class="main-agileits">
        <div class="main-wthree-row">
          <div class="agileinfo-text">
            <div class="date">
              {dataFormat(new Date())}
            </div>
            <h2>{Math.round(temp)}<span>°</span></h2>
            <h4>{cidadeName}, {pais}</h4>
            <h6>{descricao}</h6>
          </div>
        </div>
      </div>
      <div class="copy-rights wthree">
        <p>© 2020 All Rights Reserved | <a href="http://www.github.com/lacerda53"
          target="_blank">Guilherme Andrade Laceda</a> </p>
      </div>
    </div>
  );
}
