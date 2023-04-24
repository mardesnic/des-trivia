import React from 'react';
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ButtonBase,
} from '@mui/material';
import { Box } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/system';
import { EMAIL, GITHUB, NAME } from '../../const';

const DrawerContent = styled(Box)(({ theme }) => ({
  width: 300,
  maxWidth: '70vw',
  padding: theme.spacing(2),
}));

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
}));

export const CustomDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <DrawerContent>
        <List>
          <ListItem>
            <CustomAvatar alt={NAME} src='assets/avatar.jpeg' />
          </ListItem>
          <ListItem>
            <ListItemText primary={NAME} secondary={EMAIL} />
          </ListItem>
          <Divider />
          <ListItem>
            <ButtonBase component='a' href={GITHUB} target='_blank'>
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary='GitHub' />
            </ButtonBase>
          </ListItem>
        </List>
      </DrawerContent>
    </Drawer>
  );
};
