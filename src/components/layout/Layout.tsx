import { AppShell, Burger } from "@mantine/core"
import Header from "../header/Header"
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import NavLinkConfig from "../navlink/NavLinkConfig";


function Layout() {

    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <div>
                    <Header />
                </div>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <NavLinkConfig />
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}

export default Layout