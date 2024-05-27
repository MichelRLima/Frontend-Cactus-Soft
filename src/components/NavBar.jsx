import React, { useState } from 'react';

import { AppstoreOutlined, DollarOutlined, ControlOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';


const scrollToTop = (valor) => {
    window.scrollTo({
        top: valor,
        behavior: 'smooth'
    });
};

const items = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: 'Clientes',
        children: [
            {
                key: '11',
                label: <Link onClick={() => scrollToTop(380)} to="/clients">Todos</Link>,
            },
            {
                key: '12',
                label: <Link onClick={() => scrollToTop(380)} to="/planos">Planos</Link>,
            },

        ],
    },
    {
        key: '3',
        icon: <DollarOutlined />,
        label: 'Financeiro',
        children: [
            {
                key: '31',
                label: <Link onClick={() => scrollToTop(380)} to="/metricas">Metricas</Link>,
            },

        ],
    },
];
const getLevelKeys = (items1) => {
    const key = {};

    const func = (items2, level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};
const levelKeys = getLevelKeys(items);
const NavBar = () => {
    const [stateOpenKeys, setStateOpenKeys] = useState(['1', '11']);
    const onOpenChange = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            style={{
                width: 256,

                height: '100vh',
                overflowY: 'auto',
            }}
            items={items}
        />
    );
};
export default NavBar;