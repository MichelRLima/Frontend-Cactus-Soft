import React, { useContext } from 'react';
import { Button, Drawer, Descriptions, Timeline, Tag } from 'antd';
import style from './profilecliente.module.css'
import { ClientContext } from '../../context/ClientsContext';

const ProfileClient = (id) => {
    const { getClienteById, clientId } = useContext(ClientContext)

    const formatDate = (isoDate) => {
        // Cria um objeto Date a partir da string ISO
        const date = new Date(isoDate);

        // Extrai os componentes da data
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0
        const year = date.getUTCFullYear();
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');

        // Formata a data no formato desejado
        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

        return formattedDate;
    }

    const showCurrentDateTime = () => {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0
        const year = now.getFullYear();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return (formattedDateTime);
    }



    const timelineItems = [
        {
            color: 'green',
            children: (
                <>
                    <p>Conexão inicial</p>
                    <p>{formatDate(clientId?.conexaoInicial) ?? 'Não disponível'}</p>
                </>
            ),
        },
        {
            color: clientId && clientId.conexaoFinal !== null ? 'red' : 'gray',  // Verifica se clientId e clientId.conexaoFinal não são null
            children: (
                <>
                    <p>{clientId && clientId.conexaoFinal !== null ? 'Conexão final' : 'Nenhum reporta identificado'}</p>
                    <p>{clientId && clientId.conexaoFinal !== null ? formatDate(clientId.conexaoFinal) : showCurrentDateTime()}</p>
                </>
            ),
        },
    ];


    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const showLoading = async () => {

        await getClienteById(id.id)

        setOpen(true);
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const items = [
        { key: '1', label: 'Cliente', children: clientId && clientId.nomeCliente ? clientId.nomeCliente : 'Não disponível' },
        { key: '2', label: 'Status do Cliente', children: clientId && clientId.statusCliente !== undefined ? <Tag color={clientId.statusCliente ? 'green' : 'red'}>{clientId.statusCliente ? 'Ativo' : 'Inativo'}</Tag> : 'Não disponível' },
        {
            key: '3',
            label: 'Status Internet',
            children: clientId && clientId.statusInternet !== undefined
                ? <Tag color={
                    clientId.statusInternet === 1 ? 'green'
                        : clientId.statusInternet === 2 ? 'red'
                            : clientId.statusInternet === 3 ? 'volcano'
                                : clientId.statusInternet === 4 ? 'magenta'
                                    : clientId.statusInternet === 5 ? 'orange'
                                        : clientId.statusInternet === 6 ? 'lime'
                                            : 'purple'
                }>
                    {
                        clientId.statusInternet === 1 ? 'Ativo'
                            : clientId.statusInternet === 2 ? 'Desativado'
                                : clientId.statusInternet === 3 ? 'Bloqueio Manual'
                                    : clientId.statusInternet === 4 ? 'Bloqueio Automático'
                                        : clientId.statusInternet === 5 ? 'Financeiro em Atraso'
                                            : clientId.statusInternet === 6 ? 'Aguardando Assinatura'
                                                : 'Desconhecido'
                    }
                </Tag>
                : 'Não disponível'
        },
        { key: '4', label: 'Local', span: 2, children: clientId && clientId.bairroCliente && clientId.cidadeCliente ? `${clientId.bairroCliente} ${clientId.cidadeCliente}` : 'Não disponível' },
        { key: '5', label: 'Plano', children: clientId && clientId.planoContrato ? clientId.planoContrato : 'Não disponível' },
        { key: '6', label: 'Valor Plano', children: clientId && clientId.valorPlano ? `R$${clientId.valorPlano}` : 'Não disponível' },
        { key: '7', label: 'IP Concentrador', children: clientId && clientId.ipConcentrador ? clientId.ipConcentrador : 'Não disponível' },
        { key: '8', label: 'Nome Concentrador', children: clientId && clientId.nomeConcentrador ? clientId.nomeConcentrador : 'Não disponível' },
        { key: '9', label: 'Tempo conectado', children: clientId && clientId.tempoConectado ? `${(clientId.tempoConectado / 3600).toFixed(2)} Horas` : 'Não disponível' },
        { key: '10', label: 'Download', children: clientId && clientId.consumoDownload ? `${(clientId.consumoDownload / (1024 * 1024)).toFixed(2)} MB` : 'Não disponível' },
        { key: '11', label: 'Upload', children: clientId && clientId.consumoUpload ? `${(clientId.consumoUpload / (1024 * 1024)).toFixed(2)} MB` : 'Não disponível' },
        { key: '12', label: 'Ponto de presença', children: clientId && clientId.popCliente ? clientId.popCliente : 'Não disponível' },
    ];


    return (
        <>
            <Button type="primary" onClick={showLoading}>
                Detalhes
            </Button>

            <Drawer
                closable
                destroyOnClose
                placement="bottom"
                open={open}
                loading={loading}
                onClose={() => setOpen(false)}

            >


                <div className={style.teste}>
                    <Descriptions style={{ width: '80%' }} title="Detalhes" layout="vertical" items={items} />

                    <Timeline items={timelineItems} />
                </div>



            </Drawer>


        </>
    );
};
export default ProfileClient;