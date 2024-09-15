import React, { useEffect } from 'react';
import { useUserStore } from '../../context/useUserStore';
import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import Loader from '../../components/Loader';
import ErrorDisplay from '../../components/ErrorDisplay';
import { styled } from '@mui/material/styles';
import { toast, Toaster } from 'react-hot-toast';

const PageRoot = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '30px',
  height: 'calc(100vh - 150px)',
});

const PageContentContainer = styled('div')({
  width: '890px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const RightButtonContainer = styled('div')({
  marginLeft: 'auto',
  marginTop: '10px',
});

function UsersPage() {
  const loading = useUserStore((state) => state.loading);
  const resetUserState = useUserStore((state) => state.resetUserState);
  const saveChanges = useUserStore((state) => state.saveChanges);

  useEffect(() => {
    return () => {
      resetUserState();
    };
  }, [resetUserState]);

  const handleSave = () => {
    const success = saveChanges();
    if (success) {
      toast.success('Changes saved successfully');
    } else {
      toast.error('Failed to save changes due to validation errors');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageRoot>
        <PageContentContainer>
          <UsersList />
          <ErrorDisplay />
          <RightButtonContainer>
            <PrimaryButton handleClick={handleSave}>Save</PrimaryButton>
          </RightButtonContainer>
        </PageContentContainer>
      </PageRoot>
      <Toaster position="top-right" />
    </>
  );
}

export default UsersPage;
