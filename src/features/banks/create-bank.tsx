import { BanksForm } from "./banks-form";
import { useBanks } from "./use-banks";

type CreateBankProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;

};
export const CreateBank = (props: CreateBankProps) => {
  const { isOpen, onOpenChange, onClose} = props;

  const {createBank, isBankCreated, isBankCreating} = useBanks()

  return (
    <>
      <BanksForm
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={createBank}
        isSubmitted={isBankCreated}
        isSubmitting={isBankCreating}
        onClose={onClose}
      />
    </>
  );
};
