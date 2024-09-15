import React, { useCallback } from 'react';
import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import AutocompleteField from '../../../components/AutocompleteField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';
import countryOptions from '../../../data/countries.json';
import { useUserStore } from '../../../context/useUserStore';
import { validateField } from '../../../utils/validateField';

const EMPTY_ERRORS = {};

const UserRow = React.memo(({ userId }) => {
  const user = useUserStore((state) => state.users[userId] || state.stagedUsers[userId]);
  const updateStagedUser = useUserStore((state) => state.updateStagedUser);
  const updateErrorCount = useUserStore((state) => state.updateErrorCount);
  const errorCounts = useUserStore((state) => state.errorCounts[userId] || EMPTY_ERRORS);
  const deleteUser = useUserStore((state) => state.deleteUser);

  const handleInputChange = useCallback(
    (field, event) => {
      const value = event.target.value;
      const errorType = validateField(field, value);
      updateErrorCount(userId, field, errorType);
      updateStagedUser(userId, { [field]: value });
    },
    [userId, updateStagedUser, updateErrorCount]
  );

  const handleDelete = useCallback(() => {
    deleteUser(userId);
  }, [userId, deleteUser]);

  if (!user) return null;

  console.log({ errorCounts });
  return (
    <Grid container className={styles.userRow} gap={2}>
      <Grid item xs>
        <InputField
          defaultValue={user.name}
          onBlur={(e) => handleInputChange('name', e)}
          placeholder="Name"
          error={!!(errorCounts.name?.empty || errorCounts.name?.invalid)}
        />
      </Grid>
      <Grid item xs>
        <InputField
          defaultValue={user.email}
          onBlur={(e) => handleInputChange('email', e)}
          placeholder="Email"
          error={!!(errorCounts.email?.empty || errorCounts.email?.invalid)}
        />
      </Grid>
      <Grid item xs>
        <InputField
          defaultValue={user.phone}
          onBlur={(e) => handleInputChange('phone', e)}
          placeholder="Phone"
          error={!!(errorCounts.phone?.empty || errorCounts.phone?.invalid)}
        />
      </Grid>
      <Grid item xs>
        <AutocompleteField
          defaultValue={user.country}
          onBlur={(e) => handleInputChange('country', e)}
          options={countryOptions}
          placeholder="Country"
          error={!!(errorCounts.country?.empty || errorCounts.country?.invalid)}
        />
      </Grid>
      <Grid item>
        <TrashIconButton handleClick={handleDelete} />
      </Grid>
    </Grid>
  );
});

export default UserRow;
