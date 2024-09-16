import { useState, useCallback, useMemo } from "react";

import {
  BankView,
  useCreateBankMutation,
  useGetBanksQuery,
  useUpdateBankMutation,
} from "./banks-api";
import { SortDescriptor } from "@nextui-org/react";

export const useBanks = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage - 1;

  const {
    data,
    isLoading: isBanksLoading,
    isFetching: isBanksFetching,
  } = useGetBanksQuery({
    start,
    end,
  });

  const banks = data?.data || [];
  const totalCount = data?.count || 0;
  const pages = Math.ceil(totalCount / rowsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "code",
    direction: "ascending",
  });

  const [filterValue, setFilterValue] = useState("");

  const filteredAndSortedBanks = useMemo(() => {
    if (!banks) return [];

    let filteredBanks = [...banks];

    if (filterValue) {
      filteredBanks = filteredBanks.filter((bank) =>
        bank.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredBanks.sort((a, b) => {
      const first = a[sortDescriptor.column as keyof BankView];
      const second = b[sortDescriptor.column as keyof BankView];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [banks, filterValue, sortDescriptor]);

  const onSortChange = (descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
  };

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

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
    pages,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    isBanksFetching,
    onSearchChange,
    onSortChange,
    filteredAndSortedBanks,
    filterValue,
    onClear,
    sortDescriptor,
  };
};
