import React, { useEffect, useState, useContext } from 'react';
import { Flex, Progress, Badge, Statistic, Col } from 'antd';
import style from './header.module.css'
import { ClientContext } from '../../context/ClientsContext';
const Header = () => {


    const { getAllClients, clients, getAllPlanos } = useContext(ClientContext)
    const [online, setOnline] = useState(0);
    const [desativado, setDesativado] = useState(0);
    const [bloqueioM, setBloqueioM] = useState(0);
    const [bloqueioA, setBloqueioA] = useState(0);
    const [financeiroA, setFinanceiroA] = useState(0);
    const [aguardandoA, setAguardandoA] = useState(0);

    const [onlinePercentage, setOnlinePercentage] = useState(0);
    const [desativadoPercentage, setDesativadoPercentage] = useState(0);
    const [bloqueioMPercentage, setBloqueioMPercentage] = useState(0);
    const [bloqueioAPercentage, setBloqueioAPercentage] = useState(0);
    const [financeiroAPercentage, setFinanceiroAPercentage] = useState(0);
    const [aguardandoAPercentage, setAguardandoAPercentage] = useState(0);

    const Colors = {
        statusColor: online >= 70 ? '#52C41A' : (online >= 50 ? '#1677FF' : '#FF4D4F')
    };


    const formatNumber = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };


    useEffect(() => {
        const fetchClientCount = async () => {
            await getAllClients();
            await getAllPlanos()

        };
        fetchClientCount();
    }, []);

    useEffect(() => {
        const totalClients = clients.length;

        const onlineCount = clients.filter(client => client.statusInternet === 1).length;
        const desativadoCount = clients.filter(client => client.statusInternet === 2).length;
        const bloqueioMCount = clients.filter(client => client.statusInternet === 3).length;
        const bloqueioACount = clients.filter(client => client.statusInternet === 4).length;
        const financeiroACount = clients.filter(client => client.statusInternet === 5).length;
        const aguardandoACount = clients.filter(client => client.statusInternet === 6).length;

        const onlinePercent = clients.length > 0 ? (onlineCount / totalClients) * 100 : 0;
        const desativadoPercent = clients.length > 0 ? (desativadoCount / totalClients) * 100 : 0;
        const bloqueioMPercent = clients.length > 0 ? (bloqueioMCount / totalClients) * 100 : 0;
        const bloqueioAPercent = clients.length > 0 ? (bloqueioACount / totalClients) * 100 : 0;
        const financeiroPercent = clients.length > 0 ? (financeiroACount / totalClients) * 100 : 0;
        const aguardandoAPercent = clients.length > 0 ? (aguardandoACount / totalClients) * 100 : 0;

        setOnline(onlineCount);

        setDesativado(desativadoCount);
        setBloqueioM(bloqueioMCount);
        setBloqueioA(bloqueioACount);
        setFinanceiroA(financeiroACount);
        setAguardandoA(aguardandoACount);

        setOnlinePercentage(onlinePercent.toFixed(2));
        setDesativadoPercentage(desativadoPercent.toFixed(2));
        setBloqueioMPercentage(bloqueioMPercent.toFixed(2));
        setBloqueioAPercentage(bloqueioAPercent.toFixed(2));
        setFinanceiroAPercentage(financeiroPercent.toFixed(2));
        setAguardandoAPercentage(aguardandoAPercent.toFixed(2));
    }, [clients]);



    return (
        <div className={style.Header}>

            <div className={style.allUser}>

                <Col span={16}>
                    <Statistic className={style.totalClients} title="Total clientes" value={clients.length} formatter={formatNumber} />
                </Col>

            </div>
            <div className={style.graphiClient}>

                <Flex gap="middle">
                    <Flex className={style.ContainerGraphic} gap="small" wrap>
                        <Progress type="circle" percent={onlinePercentage} status={online === 0 ? "exception" : ""} strokeColor={'#49AA19'} />

                        <div className={style.counter}>
                            <Badge
                                status={'success'}
                                text={`${formatNumber(online)} Ativo`}
                            />

                        </div>
                    </Flex>

                </Flex>

                <Flex gap="middle">
                    <Flex className={style.ContainerGraphic} gap="small" wrap>
                        <Progress type="circle" percent={desativadoPercentage} status={online === 0 ? "exception" : ""} strokeColor={'#F0F0F0'} />

                        <div className={style.counter}>
                            <Badge
                                status={'default'}
                                text={`${formatNumber(desativado)} Desativado`}
                            />

                        </div>
                    </Flex>

                </Flex>

                <Flex gap="middle">
                    <Flex className={style.ContainerGraphic} gap="small" wrap>
                        <Progress type="circle" percent={bloqueioAPercentage} status={online === 0 ? "exception" : ""} strokeColor={'#EB2F96'} />

                        <div className={style.counter}>
                            <Badge
                                color={'magenta'}
                                text={`${formatNumber(bloqueioA)} Bloqueio Automático`}
                            />

                        </div>
                    </Flex>

                </Flex>

                <Flex gap="middle">
                    <Flex className={style.ContainerGraphic} gap="small" wrap>
                        <Progress type="circle" percent={bloqueioMPercentage} status={online === 0 ? "exception" : ""} strokeColor={'#FA541C'} />

                        <div className={style.counter}>
                            <Badge
                                color={'volcano'}
                                text={`${formatNumber(bloqueioM)} Bloqueio Manual`}
                            />

                        </div>
                    </Flex>

                </Flex>

                <Flex gap="middle">
                    <Flex className={style.ContainerGraphic} gap="small" wrap>
                        <Progress type="circle" percent={financeiroAPercentage} status={online === 0 ? "exception" : ""} strokeColor={'#FA8C16'} />

                        <div className={style.counter}>
                            <Badge
                                color={'orange'}
                                text={`${formatNumber(financeiroA)} Bloqueio Financeiro`}
                            />

                        </div>
                    </Flex>

                </Flex>

                <Flex gap="middle">
                    <Flex className={style.ContainerGraphic} gap="small" wrap>
                        <Progress type="circle" percent={aguardandoAPercentage} status={online === 0 ? "exception" : ""} strokeColor={'#A0D911'} />

                        <div className={style.counter}>
                            <Badge
                                color={'lime'}
                                text={`${formatNumber(aguardandoA)} Aguardando Assinatura`}
                            />

                        </div>
                    </Flex>

                </Flex>


            </div>






        </div>

    );
}
export default Header;