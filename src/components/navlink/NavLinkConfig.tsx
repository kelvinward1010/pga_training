import { Box, NavLink } from '@mantine/core';
import React, { useState } from 'react'

const data = [
    {
        label: 'CRUD',
        link: '/home',
    },
    {
        label: 'Table',
        link: '/table',
    },
];

function NavLinkConfig() {
    const [active, setActive] = useState(0);
    const items = data.map((item, index) => (
        <NavLink
          href={item.link as string}
          key={item.label}
          active={index === active}
          label={item.label}
          onClick={() => setActive(index)}
    
        />
    ));
    return <Box w={220}>{items}</Box>;
}

export default NavLinkConfig