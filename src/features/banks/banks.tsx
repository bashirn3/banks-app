import { useCallback, useState, useMemo } from "react";
import { BankView } from "./banks-api";
import { Button, Spinner, Pagination, useDisclosure } from "@nextui-org/react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { CreateBank } from "./create-bank";
import { useBanks } from "./use-banks";

import BankDetail from "./bank-detail";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    key: "code",
    label: "Bank Code",
    sortable: true,
  },
  {
    key: "name",
    label: "Bank Name",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "valid_from",
    label: "Start date of valid",
  },
  {
    key: "valid_to",
    label: "End date of valid",
  },
  {
    key: "view",
    label: "",
  },
];

const Banks = () => {
  const {
    banks,
    isBanksLoading,
    setSelectedBank,
    selectedBank,
    setPage,
    page,
  } = useBanks();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { isOpen: isOpen2, onOpenChange: onOpenChange2 } = useDisclosure();

  console.log(page);

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
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={40}
                // Since I am using server side pagination the server is 
                // supposed to send count but it doesnt thus I am going to hard code total
                onChange={(page) => setPage(page)}
                variant="light"
              />
            </div>
          }
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key} allowsSorting>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={banks ?? []}
            emptyContent={"No Banks to display"}
            isLoading={isBanksLoading}
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
      <BankDetail
        isOpen={isOpen2}
        onOpenChange={onOpenChange2}
        bank={selectedBank}
      />
    </div>
  );
};

export default Banks;
