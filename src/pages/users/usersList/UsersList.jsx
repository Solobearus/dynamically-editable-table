import React, { useCallback } from 'react';
import { Typography } from '@mui/material';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import { styled } from '@mui/material/styles';
import { useUserStore } from '../../../context/useUserStore';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const UsersListContainer = styled('div')({
  border: '1px solid #ccc',
  borderRadius: '4px',
  height: 'calc(100vh - 200px)',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const UsersListHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #ccc',
  borderRadius: '4px 4px 0 0',
  padding: '4px 16px',
  backgroundColor: '#1f2a62',
});

const UsersListContent = styled('div')({
  flex: 1,
  overflow: 'hidden',
  padding: '8px',
});

function UsersList() {
  const userIds = useUserStore((state) => state.userIds);
  const addUser = useUserStore((state) => state.addUser);

  const Row = ({ index, style }) => (
    <div style={style}>
      <UserRow userId={userIds[index]} />
    </div>
  );

  return (
    <UsersListContainer>
      <UsersListHeader>
        <Typography variant="h6" color="white">
          Users List ({userIds.length})
        </Typography>
        <AddButton handleClick={addUser} />
      </UsersListHeader>
      <UsersListContent>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={userIds.length}
              itemSize={50} // Adjust this value based on your row height
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </UsersListContent>
    </UsersListContainer>
  );
}

export default UsersList;
