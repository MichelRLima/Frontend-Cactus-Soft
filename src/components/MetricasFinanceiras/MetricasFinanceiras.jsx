import React, { useContext } from 'react';
import { Row, Statistic } from 'antd';
import { ClientContext } from '../../context/ClientsContext';
import styles from './metricasfinanceiras.module.css';

const MetricasFinanceiras = () => {
    const { clients } = useContext(ClientContext);

    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    // Calcular o total dos valores dos planos de todos os clientes
    const totalValorPlanos = clients.reduce((acc, client) => acc + client.valorPlano, 0);

    // Filtrar clientes com statusInternet === 1
    const filteredClients = clients.filter(client => client.statusInternet === 1);

    // Calcular o total dos valores dos planos dos clientes com statusInternet === 1
    const totalValorPlanosFiltrados = filteredClients.reduce((acc, client) => acc + client.valorPlano, 0);

    // Filtrar clientes sem statusInternet === 1
    const filteredClientsWithoutInternet = clients.filter(client => client.statusInternet !== 1);

    // Calcular o total dos valores dos planos dos clientes sem statusInternet === 1
    const totalValorPlanosSemInternet = filteredClientsWithoutInternet.reduce((acc, client) => acc + client.valorPlano, 0);

    return (
        <div className={styles.teste}>
            <h3 className={styles.Titulo}>Métricas Financeiras</h3>
            <Row className={styles.MetricaUm} gutter={14}>
                <Statistic title="Todos os clientes" value={formatNumber(clients.length)} style={{ marginRight: '10em', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} />
                <Statistic title="Total Valor Planos (R$)" value={formatNumber(totalValorPlanos)} precision={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} />
            </Row>

            <Row className={styles.MetricaDois} gutter={14}>
                <Statistic title="Clientes Ativos" value={formatNumber(filteredClients.length)} style={{ marginRight: '10em', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} />
                <Statistic title="Total Valor Planos (R$)" value={formatNumber(totalValorPlanosFiltrados)} precision={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} />
            </Row>

            <Row className={styles.MetricaTres} gutter={14}>
                <Statistic title="Clientes Inativos" value={formatNumber(filteredClientsWithoutInternet.length)} style={{ marginRight: '10em', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} />
                <Statistic title="Total Valor Planos (R$)" value={formatNumber(totalValorPlanosSemInternet)} precision={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} />
            </Row>
        </div>
    );
};

export default MetricasFinanceiras;
