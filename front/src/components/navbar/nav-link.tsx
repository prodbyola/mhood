import React, { PropsWithChildren, ReactNode, useState } from 'react'
import { NavLink as ReactNav, LinkProps as RouterLinkProps } from 'react-router-dom'

import Box  from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import DashboardIcon from '@mui/icons-material/Dashboard';

import { theme } from '../../theme';

type NavItemProps = { link?: string, label: string, icon?: ReactNode } & PropsWithChildren;

const textColor = theme.palette.text.secondary
const ReactNavLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => {
    const activeStyle = {
        color: 'white',
        fontWeight: 600,
        backgroundColor: theme.palette.secondary.light
    }

    return (
        <ReactNav 
            ref={ref} 
            {...props} 
            style={({isActive}) => isActive ? activeStyle : {color: textColor}} 
        />
    )
})

export const NavLink = (props: NavItemProps) => (
    <ListItemButton 
      to={props.link as string}
      component={ReactNavLink}
    >
      <ListItemIcon  style={{ color: 'inherit' }}>
        { props.icon }
      </ListItemIcon>
      <ListItemText primary={props.label} />
    </ListItemButton>
)

export const Collapsible = (props: NavItemProps) => {
    const [opened, open] = useState(false)

    return (
        <>
            <ListItemButton onClick={ () => open(!opened) } style={{ color: textColor }}>
                <ListItemIcon style={{ color: 'inherit' }}>
                    { props.icon }
                </ListItemIcon>
                <ListItemText primary={props.label} />
            </ListItemButton>
            <Box sx={{
                ml: 2
            }}>
                { opened && props.children }
            </Box>
        </>
    )
}