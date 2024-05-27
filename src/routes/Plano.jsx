import React, { useRef, useState, useEffect, useContext } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Progress, Badge } from 'antd';
import Highlighter from 'react-highlight-words';
import { ClientContext } from '../context/ClientsContext';
import PlanoDetails from '../components/Plano/PlanoDetails';



const Plano = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState([]);
    const searchInput = useRef(null);
    const { planos } = useContext(ClientContext)

    const formatarPlanoParaQueryParam = (plano) => {
        return plano.replace(/ /g, '%20');
    };

    useEffect(() => {
        if (planos && planos.length > 0) {
            const formattedData = planos.map((plano, index) => ({
                key: `${index + 1}`,
                name: plano.nomePlano,
                valorPlano: plano.valorPlano,
                nameQuery: formatarPlanoParaQueryParam(plano.nomePlano)

            }));

            setData(formattedData);

        }
    }, [planos]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
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
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>


                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex] !== undefined && record[dataIndex] !== null
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text !== undefined && text !== null ? text.toString() : ''}
                />
            ) : (
                text !== undefined && text !== null ? text.toString() : ''
            ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },

        {
            title: 'Valor',
            dataIndex: 'valorPlano',
            key: 'valorPlano',
            width: '20%',
            sorter: (a, b) => a.valorPlano - b.valorPlano,
            sortDirections: ['descend', 'ascend'],
            render: (valorPlano) => `R$${valorPlano.toFixed(2)}`

        },

        {
            title: 'Detalhes do plano',
            dataIndex: 'nameQuery',
            key: 'nameQuery',
            width: '20%',
            render: (nameQuery, record) => <PlanoDetails nameQuery={nameQuery} nomePlano={record.name} />

        },
    ];



    return (
        <>
            <h3 style={{ textAlign: 'center', fontFamily: 'Roboto, sans-serif', color: 'rgba(0, 0, 0, 0.45)', fontWeight: 100, marginBottom: '1em' }}>Planos</h3>

            <Table columns={columns} dataSource={data} />


        </>
    );
};

export default Plano;
