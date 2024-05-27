import React, { useState, useContext, useEffect } from 'react';
import { Button, Drawer, Space, Descriptions, Tag } from 'antd';
import { ClientContext } from '../../context/ClientsContext';

const PlanoDetails = ({ nameQuery, nomePlano }) => {
    const { getClientesForPlano, clietsForPlano } = useContext(ClientContext);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [onlineCount, setOnlineCount] = useState(0);
    const [offlineCount, setOfflineCount] = useState(0);


    useEffect(() => {
        if (open && clietsForPlano && clietsForPlano.length > 0) {
            const countOnline = clietsForPlano.filter(cliente => cliente.statusInternet === 1).length;
            setOnlineCount(countOnline);
            const countOffline = clietsForPlano.filter(cliente => cliente.statusInternet !== 1).length;
            setOfflineCount(countOffline);
            setLoading(false); // Dados foram carregados, desativa o loading
        }
    }, [clietsForPlano, open]);

    const showLoading = async () => {
        setLoading(true); // Ativa o loading antes de buscar os dados
        await getClientesForPlano(nameQuery);
        setOpen(true);
    };

    let tagColor = 'success'; // Por padrão, assume sucesso
    if (offlineCount > onlineCount) {
        tagColor = 'warning'; // Se offline for maior que online, muda para warning
    }

    const items = [
        { key: '1', label: 'Total de clientes', children: clietsForPlano.length },
        { key: '2', label: 'Clientes Online', children: onlineCount },
        { key: '3', label: 'Clientes Offline', children: offlineCount },
        { key: '5', label: 'Status', children: <Tag color={tagColor}>{tagColor}</Tag> }
    ];

    return (
        <>
            <Space>
                <Button type="primary" onClick={showLoading}>
                    Detalhes
                </Button>
            </Space>
            <Drawer
                closable
                destroyOnClose
                title={<p>Loading Drawer</p>}
                placement="bottom"
                open={open}
                onClose={() => setOpen(false)}
            >
                {loading ? (
                    <p>No data available</p>
                ) : (
                    clietsForPlano && clietsForPlano.length > 0 ? (
                        <Descriptions title={nomePlano} layout="vertical" items={items} />
                    ) : (
                        <p>No data available</p>
                    )
                )}
            </Drawer>
        </>
    );
};

export default PlanoDetails;
