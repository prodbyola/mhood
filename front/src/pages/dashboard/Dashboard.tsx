import { styled, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';

import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { Outlet, useNavigate } from 'react-router-dom'
import { Copyright } from '../../components/Copyright'
import { theme } from '../../theme';
import Avatar from '@mui/material/Avatar';


const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function DashboardContent() {
  const avatarSize = 44;
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => navigate("/dashboard/overview")}
              sx={{
                marginRight: '36px',
              }}
            >
              <HomeIcon sx={{ fontSize: 38 }} />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <AddIcon 
              className='mobile'
              onClick={ () => navigate("/dashboard/campaigns/create") } 
            />
            <Button 
              variant="outlined" 
              className='action-btn desktop' 
              startIcon={<AddIcon />}
              onClick={ () => navigate("/dashboard/campaigns/create") }
            >
              Create Campaign
            </Button>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar alt="Remy Sharp" src="/user.jpg" sx={{ height: avatarSize, width: avatarSize, cursor: 'pointer', marginLeft: '16px' }} />
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Container className='dashboard-page'>
              <Outlet />
            </Container>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}