import create from "zustand";
import { persist } from "zustand/middleware";

import { Administrator, Permission } from "types/user";

type UserStoreType = {
  token?: string;
  user?: Administrator;
};

export const useUser = create<UserStoreType>(
  persist<UserStoreType>(
    () => ({
      token: undefined,
      user: {
        user: {
          roles: [
            {
              // permissions: [Permission.REPORTS_PERIODIC_FINANCIAL_VIEW],
            },
          ],
        },
      } as Administrator,
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    },
  ),
);

export const UserState = {
  setToken: (token: string) => useUser.setState({ token: `Bearer ${token}` }),
  removeToken: (token: string) => useUser.setState({ token: null }),
  userCan:
    (permission: Permission | Permission[]) =>
    (state = useUser.getState()) => {
      const perms =
        state?.user?.user?.roles.flatMap((r:any) => r.permissions) || [];

      return Array.isArray(permission)
        ? perms.some((p:any) => permission.includes(p))
        : perms.includes(permission);
    },
};