import { Box, NavLink } from '@mantine/core';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const data = [
    {
        label: 'CRUD',
        link: '/home',
    },
    {
        label: 'Products',
        link: '/products',
    },
];

function NavLinkConfig() {
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const items = data.map((item, index) => (
        <NavLink
          key={item.label}
          active={index === active}
          label={item.label}
          onClick={() => {
            navigate(item.link)
            setActive(index)
          }}
        />
    ));
    return <Box w={220}>{items}</Box>;
}

export default NavLinkConfig