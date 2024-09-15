import { BankView } from "./banks-api";
import { BanksForm } from "./banks-form";
import { useBanks } from "./use-banks";

type UpdateBankProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  data: BankView | undefined

};
export const UpdateBank = (props: UpdateBankProps) => {
  const { isOpen, onOpenChange, data: propsData} = props;

  const {updateBank, isBankUpdated, isBankUpdating} = useBanks()

  const  _updateBank = (data: any) => {
    updateBank({ id: propsData?.id, ...data });
};



  return (
    <>
      <BanksForm
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={_updateBank}
        isSubmitted={isBankUpdated}
        isSubmitting={isBankUpdating}
        isEditMode
        data={propsData}
        onClose={()=>{}}
      />
    </>
  );
};
