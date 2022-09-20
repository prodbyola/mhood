import List from '@mui/material/List';

import DashboardIcon from '@mui/icons-material/Dashboard';
import CampaignIcon from '@mui/icons-material/Campaign';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ViewListIcon from '@mui/icons-material/ViewList';

import { NavLink, Collapsible } from './nav-link';

export const NavBar = () => {
    return (
        <List component="nav">
            <NavLink label="Dashboard" link="/dashboard/overview" icon={<DashboardIcon />} />
            <Collapsible label="Campaign" icon={<CampaignIcon />}>
                <NavLink label="Create" link="/dashboard/campaigns/create" icon={<AddCircleIcon />} />
                <NavLink label="Manage" link="/dashboard/campaigns/manage" icon={<ViewListIcon />} />
            </Collapsible>
        </List>
    )
}