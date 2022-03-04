import { createContext, useContext } from "react";

import type { AppointmentData, WithId } from "../../common/models";

export interface AppointmentListContextData {
  list: WithId<AppointmentData>[];
  interactable: boolean;
  refresh: () => void;
}

const AppointmentListContext = createContext<AppointmentListContextData>({
  list: [],
  interactable: false,
  refresh: () => { /* no-op */},
});

export const AppointmentListProvider = AppointmentListContext.Provider;

export const useAppointmentList = (): AppointmentListContextData => {
  return useContext(AppointmentListContext);
};
