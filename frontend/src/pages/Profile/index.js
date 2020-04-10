import React, {useEffect, useState} from 'react';
import logoImg from '../../assets/logo.svg'; 
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

export default function(){
    const ongID = localStorage.getItem('ongID');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    const [incidents, setIndidents] = useState([])

    /**
     * o useEffect recebe dois parametros
     * 
     * 1º : A função que é suposto correr.
     * 2º : O que faz com que a função corra.
     *      Caso queiramos que esta função corra apenas uma vez, colocar []
     *      Caso queiramos que esta função corra dependendo do estado de uma variável, colocar essa mesma variável nas dependencias.
     * 
     *      É importante colocar tudo qeu seja necessário ao pedido, nas dependencias.
     *          para caso por algum motivo o estado da variável mudar, correr
     *          a função de novo 
     */
    useEffect(()=>{
        api.get('profile', {
            headers: {
                Authorization: ongID
            }
        }).then(response => {
            setIndidents(response.data);
        })
    }, [ongID]); 

    async function handleDeleteIncident(id){ 
        try{
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongID
                }
            })

            setIndidents(incidents.filter(s=> s.id !== id));
        }catch(ex){
            alert('Erro ao apagar caso. Tente novamente.');
        }
    }

    function hangleLogout(){
        localStorage.removeItem('ongID');
        localStorage.removeItem('ongName');

        history.push('/'); 
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>
                
                <Link  to="/incidents/new" className="button">Registar novo caso</Link>
                <button onClick={hangleLogout} type="button">
                    <FiPower size="18px" color="#E02041"/> 
                </button>
            </header>

            <h1>Casos Registados</h1>

            <ul>
                {incidents.map(s=> (
                <li key={s.id}>
                    <strong>CASO:</strong>
                    <p>{s.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{s.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-PT', {style:'currency', currency:'EUR'}).format(s.value)}</p>

                    <button onClick={()=> handleDeleteIncident(s.id)} type="button">
                        <FiTrash2 size="20px" colocr="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}