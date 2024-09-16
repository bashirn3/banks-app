import { useCallback} from "react";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Spinner,
  Pagination,
  useDisclosure,
  Input,
} from "@nextui-org/react";

import { CreateBank } from "./create-bank";
import { BankView } from "./banks-api";
import { useBanks } from "./use-banks";

const columns = [
  {
    key: "code",
    label: "Bank Code",
    sortable: true,
  },
  {
    key: "name",
    label: "Bank Name",
    sortable: true,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
  },
  {
    key: "valid_from",
    label: "Start date of valid",
    sortable: true,
  },
  {
    key: "valid_to",
    label: "End date of valid",
    sortable: true,
  },
  {
    key: "view",
    label: "",
  },
];

const Banks = () => {
  const {
    isBanksLoading,
    handlePageChange,
    page,
    pages,
    isBanksFetching,
    onSearchChange,
    onSortChange,
    filteredAndSortedBanks,
    filterValue,
    onClear,
    sortDescriptor,
    
  } = useBanks();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

 

  const navigate = useNavigate();

  const renderCell = useCallback((bank: BankView, columnKey: React.Key) => {
    const cellValue = bank[columnKey as keyof BankView];

    switch (columnKey) {
      case "status":
        return (
          <div
            style={{
              color: cellValue ? "green" : "red",
            }}
          >
            {cellValue ? "Active" : "Inactive"}
          </div>
        );

      case "view":
        return (
          <Button
            onPress={() => navigate(`/bank/${bank.id}`)}
            size="sm"
            variant="ghost"
            color="primary"
          >
            View
          </Button>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="my-3 flex justify-end">
        <Button size="md" className="bg-[#488E53] text-white" onPress={onOpen}>
          Add Bank
        </Button>
      </div>
      <div className="my-2">
        <Table
          aria-label="Example table with dynamic content"
          topContent={
            <div className="flex items-center gap-3">
              <span className="text-[#488E53] text-2xl">Filter</span>
              <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Search by name"
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
            </div>
          }
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                initialPage={1}
                page={page}
                total={pages}
                onChange={handlePageChange}
                variant="light"
              />
            </div>
          }
          sortDescriptor={sortDescriptor}
          onSortChange={onSortChange}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key} allowsSorting={column.sortable}>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={filteredAndSortedBanks ?? []}
            emptyContent={"No Banks to display"}
            isLoading={isBanksLoading || isBanksFetching}
            loadingContent={<Spinner label="Loading..." />}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CreateBank
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </div>
  );
};

export default Banks;
