import React, { useContext, useRef, useState, useEffect } from 'react';
import { Table, Badge, Input, Button, Space, Col, Row, Statistic, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import ProfileClient from '../components/ProfileClient/ProfileClient';
import { ClientContext } from '../context/ClientsContext';



const Clients = () => {
    const [data, setData] = useState([]);
    const { clients } = useContext(ClientContext)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filteredDataCount, setFilteredDataCount] = useState(data.length); // Estado para contar os dados filtrados
    const searchInput = useRef(null);


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    useEffect(() => {
        // Mapeamento dos dados da API para o formato desejado
        const formattedData = clients.map((client, index) => ({
            key: client.id,
            name: client.nomeCliente,
            statusClient: client.statusCliente,
            statusInternet: client.statusInternet,
            address: `${client.enderecoCliente} ${client.bairroCliente} ${client.cidadeCliente}`,
            concentrador: client.nomeConcentrador,
            profile: client.id, // Atributo fixo conforme o exemplo, pode ser ajustado conforme necessidade
        }));

        setData(formattedData)
        setFilteredDataCount(formattedData.length)

    }, [clients]);

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        { title: 'Name', dataIndex: 'name', width: '20%', ...getColumnSearchProps('name') },
        { title: 'Local', dataIndex: 'address', width: '30%', ...getColumnSearchProps('address') },
        {
            title: 'Concentrador',
            dataIndex: 'concentrador',
            filters: [
                { text: 'Concentrador Core', value: 'Concentrador_Core' },
                { text: 'Concentrador Giganet', value: 'Concentrador_Giganet' },
                { text: 'Concentrador Canivete', value: 'Concentrador_Canivete' },
                { text: 'Concentrador Juerana A', value: 'Concentrador_Juerana_A' },
                { text: 'Concentrador SOO 02', value: 'Concentrador_SOO_02' },
                { text: 'Concentrador Santa Luzia', value: 'Concentrador_Santa_Luzia' },
                { text: 'Concentrador Juerana B', value: 'Concentrador_Juerana_B' },
            ],
            onFilter: (value, record) => record.concentrador === value,
            width: '20%',
        },
        {
            title: 'Status Client',
            dataIndex: 'statusClient',
            filters: [
                { text: 'Ativo', value: true },
                { text: 'Inativo', value: false },
            ],
            onFilter: (value, record) => record.statusClient === value,
            render: (status) => <Badge status={status ? 'success' : 'error'} text={status ? 'Ativo' : 'Inativo'} />,
            width: '10%',
        },
        {
            title: 'Status Internet',
            dataIndex: 'statusInternet',
            filters: [
                { text: 'Desconhecido', value: 0 },
                { text: 'Ativo', value: 1 },
                { text: 'Desativado', value: 2 },
                { text: 'Bloqueio Manual', value: 3 },
                { text: 'Bloqueio Automático', value: 4 },
                { text: 'Financeiro em Atraso', value: 5 },
                { text: 'Aguardando Assinatura', value: 6 },
            ],
            onFilter: (value, record) => record.statusInternet === value,
            render: (status) =>
                <Tag text={status} color={status === 1 ? 'green'
                    : status === 2 ? 'red.'
                        : status === 3 ? 'volcano'
                            : status === 4 ? 'magenta'
                                : status === 5 ? 'orange'
                                    : status === 6 ? 'lime'
                                        : 'purple'}>
                    {status === 1 ? 'Ativo'
                        : status === 2 ? 'Desativado.'
                            : status === 3 ? 'Bloqueio Manual'
                                : status === 4 ? 'Bloqueio Automático'
                                    : status === 5 ? 'Financeiro em Atraso'
                                        : status === 6 ? 'Aguardando Assinatura'
                                            : 'Desconhecido'}
                </Tag>,
            width: '10%',
        },
        {
            title: 'Profile', dataIndex: 'profile', width: '10%', align: 'center',
            render: (key) => <ProfileClient id={key} />

        },
    ];

    // Função para atualizar a contagem de dados filtrados
    const updateFilteredDataCount = (filteredDataSource) => {
        setFilteredDataCount(filteredDataSource.length);
    };

    // Filtro de dados com base no texto de pesquisa

    const filteredData = data.filter((record) => {
        return Object.keys(record).some((key) => {
            const value = record[key];
            if (typeof value === 'string' && typeof searchText === 'string') {
                return value.toLowerCase().includes(searchText.toLowerCase());
            }
            return false;
        });
    });


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Row gutter={28} >
                <Col span={24}>
                    <Statistic value={filteredDataCount}
                        formatter={(value) => `${value} clientes`} title="Clientes Filtrados" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1em' }} />
                </Col>
            </Row>


            <Table
                columns={columns}
                dataSource={searchText ? filteredData : data}
                onChange={(_, __, sorter, extra) => {
                    if (extra.action === 'filter') {
                        updateFilteredDataCount(extra.currentDataSource);
                    } else if (extra.action === 'reset') {
                        setFilteredDataCount(data.length);
                    }
                }}
                style={{ width: '100%' }}
            />

        </div>
    );
};

export default Clients;
