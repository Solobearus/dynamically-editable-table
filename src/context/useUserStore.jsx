import { create } from 'zustand';
import data from '../data/initialUsersData.json';
import { validateField } from '../utils/validateField';

const calculateTotalErrors = (errorCounts) => {
  return Object.values(errorCounts).reduce(
    (acc, userErrors) => {
      Object.values(userErrors).forEach((fieldErrors) => {
        if (fieldErrors.empty) acc.empty++;
        if (fieldErrors.invalid) acc.invalid++;
      });
      return acc;
    },
    { empty: 0, invalid: 0 }
  );
};
const newUser = {
  name: '',
  country: '',
  email: '',
  phone: '',
};

export const useUserStore = create((set, get) => ({
  users: {},
  userIds: [],
  newUsersIds: [],
  stagedUsers: {},
  loading: true,
  errorCounts: {},
  fetchUsers: () => {
    set({ loading: true });
    setTimeout(() => {
      let usersObject = {};
      let userIds = [];
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        usersObject = JSON.parse(storedUsers);
        userIds = Object.keys(usersObject);
      } else {
        usersObject = data.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});
        userIds = data.map((user) => user.id);
      }
      set({
        users: usersObject,
        userIds,
        loading: false,
      });
    }, 800);
  },
  addUser: () =>
    set((state) => {
      const id = Date.now().toString();
      return {
        stagedUsers: { ...state.stagedUsers, [id]: newUser },
        userIds: [id, ...state.userIds],
        newUsersIds: [...state.newUsersIds, id],
      };
    }),
  updateStagedUser: (id, data) =>
    set((state) => ({
      stagedUsers: { ...state.stagedUsers, [id]: { ...state.stagedUsers[id], ...data } },
    })),
  deleteUser: (id) =>
    set((state) => {
      const newUsers = Object.fromEntries(
        Object.entries(state.users).filter(([key]) => key !== id)
      );
      localStorage.setItem('users', JSON.stringify(newUsers));
      return {
        users: newUsers,
        stagedUsers: Object.fromEntries(
          Object.entries(state.stagedUsers).filter(([key]) => key !== id)
        ),
        userIds: state.userIds.filter((userId) => userId !== id),
        newUsersIds: state.newUsersIds.filter((userId) => userId !== id),
        errorCounts: Object.fromEntries(
          Object.entries(state.errorCounts).filter(([key]) => key !== id)
        ),
      };
    }),
  resetUserState: () =>
    set((state) => ({
      userIds: state.userIds.filter((id) => !state.newUsersIds.includes(id)),
      newUsersIds: [],
      stagedUsers: {},
      errorCounts: {},
      totalErrors: { empty: 0, invalid: 0 },
    })),
  updateErrorCount: (id, field, errorType) =>
    set((state) => {
      const currentErrors = state.errorCounts[id] || {};
      const newErrors = { ...currentErrors };

      if (!newErrors[field]) {
        newErrors[field] = { empty: false, invalid: false };
      }

      if (errorType === 'empty') {
        newErrors[field].empty = true;
        newErrors[field].invalid = false;
      } else if (errorType === 'invalid') {
        newErrors[field].invalid = true;
        newErrors[field].empty = false;
      } else {
        newErrors[field].empty = false;
        newErrors[field].invalid = false;
      }

      const newErrorCounts = { ...state.errorCounts, [id]: newErrors };

      return {
        errorCounts: newErrorCounts,
        totalErrors: calculateTotalErrors(newErrorCounts),
      };
    }),

  saveChanges: () => {
    const { users, stagedUsers, userIds, newUsersIds, updateErrorCount } = get();
    let hasErrors = false;

    const updatedUsers = { ...users };
    const updatedUserIds = [...userIds];

    Object.entries(stagedUsers).forEach(([id, stagedUser]) => {
      const currentUser = users[id] || {};
      const updatedUser = { ...currentUser, ...stagedUser };
      updatedUsers[id] = updatedUser;

      if (!userIds.includes(id)) {
        updatedUserIds.unshift(id); // Add new users to the beginning of the array
      }

      const errors = {};
      Object.keys(stagedUser).forEach((field) => {
        const errorType = validateField(field, stagedUser[field]);
        if (errorType) {
          errors[field] = errorType;
          updateErrorCount(id, field, errorType);
        }
      });

      if (Object.keys(errors).length > 0) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      return false;
    }

    // Create a new object with new users first, then existing users
    const sortedUsers = {};
    updatedUserIds.forEach((id) => {
      sortedUsers[id] = updatedUsers[id];
    });

    localStorage.setItem('users', JSON.stringify(sortedUsers));
    set({
      users: sortedUsers,
      userIds: updatedUserIds,
      newUsersIds: [],
      stagedUsers: {},
      errorCounts: {},
      totalErrors: { empty: 0, invalid: 0 },
    });
    return true;
  },
  totalErrors: { empty: 0, invalid: 0 },
  calculateTotalErrors: () =>
    set((state) => {
      const totalErrors = Object.values(state.errorCounts).reduce(
        (acc, userErrors) => {
          Object.values(userErrors).forEach((fieldErrors) => {
            if (fieldErrors.empty) acc.empty++;
            if (fieldErrors.invalid) acc.invalid++;
          });
          return acc;
        },
        { empty: 0, invalid: 0 }
      );
      return { totalErrors };
    }),
}));
