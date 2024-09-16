import { useState } from "react";

import {
  BankView,
  useCreateBankMutation,
  useGetBanksQuery,
  useUpdateBankMutation,
} from "./banks-api";

export const useBanks = () => {

  const [page, setPage] = useState(1); 
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage - 1;
 
  const { data, isLoading: isBanksLoading, isFetching: isBanksFetching } = useGetBanksQuery({
    start,
    end
  });

  const banks = data?.data || [];
  const totalCount = data?.count || 0;
  const pages = totalCount/rowsPerPage;


  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1); 
  };


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
    pages,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    isBanksFetching,
  };
};
