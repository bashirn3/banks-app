import { useCallback, useState, useMemo } from "react";
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
  SortDescriptor
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
  const { banks, isBanksLoading, handlePageChange, page, pages } = useBanks();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  console.log(banks)

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "code",
    direction: "ascending",
  });

  const sortedBanks = useMemo(() => {
    if (!banks) return [];
    return [...banks].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof BankView];
      const second = b[sortDescriptor.column as keyof BankView];
      const cmp = (first < second) ? -1 : (first > second) ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [banks, sortDescriptor]);

  const onSortChange = (descriptor:SortDescriptor) => {
    setSortDescriptor(descriptor);
  };

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
            items={sortedBanks ?? []}
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
    </div>
  );
};

export default Banks;
