import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

function HeaderNavbar() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';


    return ( 
    <div className='navbar'>
        <ActionIcon
            className='night-switch'
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
            >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
        </ActionIcon>
    </div>
     );
}


 
export default HeaderNavbar;