import { useState } from "react";

import {
  BankView,
  useCreateBankMutation,
  useGetBanksQuery,
  useUpdateBankMutation,
} from "./banks-api";

export const useBanks = () => {
  const [page, setPage] = useState(0);

  const rowsPerPage = 5;
  const start = page * rowsPerPage;
  const end = rowsPerPage - 1;
  const { data: banks, isLoading: isBanksLoading } = useGetBanksQuery({
    start,
    end,
  });


  const [selectedBank, setSelectedBank] = useState<BankView | null>(null);
  const [createBank, { isLoading: isBankCreating, isSuccess: isBankCreated }] =
    useCreateBankMutation();
  const [updateBank, { isLoading: isBankUpdating, isSuccess: isBankUpdated }] =
    useUpdateBankMutation();

  return {
    banks,
    isBanksLoading,
    createBank,
    isBankCreating,
    isBankCreated,
    updateBank,
    isBankUpdating,
    isBankUpdated,
    selectedBank,
    setSelectedBank,
    page,
    setPage,
  };
};
