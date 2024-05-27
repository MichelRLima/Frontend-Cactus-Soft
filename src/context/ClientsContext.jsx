import React, { createContext, useState } from 'react';
import api from '../api/api';
export const ClientContext = createContext(); // Criando o contexto

export const ClientProvider = ({ children }) => {
    const [clients, setClients] = useState([])
    const [clientId, setClientId] = useState()
    const [planos, setPlanos] = useState([])
    const [clietsForPlano, SetClietsForPlano] = useState([])

    const getAllClients = async () => {
        try {
            const reponse = await api.get('findManyCliente');
            setClients(reponse.data)
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        }
    };

    const getAllPlanos = async () => {
        try {
            const reponse = await api.get('getAllPlanos');
            setPlanos(reponse.data)
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        }
    };

    const getClientesForPlano = async (plano) => {
        try {
            const reponse = await api.get(`getClientesForPlano?plano=${plano}`);
            SetClietsForPlano(reponse.data)
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        }
    };

    const getClienteById = async (id) => {
        try {
            const reponse = await api.get(`getClienteById?id=${id}`);
            setClientId(reponse.data)
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        }
    };




    return (
        <ClientContext.Provider value={
            {
                getAllClients, clients,
                getAllPlanos, planos,
                getClientesForPlano, clietsForPlano,
                getClienteById, clientId
            }}>
            {children}
        </ClientContext.Provider>
    );
};
