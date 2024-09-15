import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { BankView as BankViewType } from "./banks-api";
import { UpdateBank } from "./update-bank";

type BankViewProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  bank: BankViewType | null;
};

const BankDetail = (props: BankViewProps) => {
  const { isOpen, onOpenChange, bank } = props;
  const { isOpen: isEditModalOpen, onOpenChange: onEditModalOpenChange } =
    useDisclosure();
  return (
    // <div className="max-w-screen-lg mx-auto bg-white rounded-[16px] p-6">
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Company Details
              </ModalHeader>
              <ModalBody>
                <section className="py-2">
                  <p className="text-xl font-bold">Company Details</p>
                  <div className="grid grid-cols-2 py-3">
                    <BankInfo title="Bank" value={bank?.name ?? ""} />
                    <BankInfo title="Name" value={bank?.name ?? ""} />
                  </div>
                  <div className="grid grid-cols-2 py-3">
                    <BankInfo
                      title="Valid From"
                      value={bank?.valid_from ?? ""}
                    />
                    <BankInfo title="Valid To" value={bank?.valid_to ?? ""} />
                  </div>
                  <div className="grid grid-cols-2 py-3">
                    <BankInfo title="Address" value={bank?.address ?? ""} />
                  </div>
                </section>

                <section className="py-2">
                  <p className="text-xl font-bold">Contacts</p>
                  <div className="grid grid-cols-2 py-3">
                    <BankInfo title="Phone" value={bank?.phone ?? ""} />
                    <BankInfo title="Fax" value={bank?.fax ?? ""} />
                  </div>
                  <div className="grid grid-cols-2 py-3">
                    <BankInfo title="Email" value={bank?.email ?? ""} />
                    <BankInfo title="Website" value={bank?.website ?? ""} />
                  </div>
                  <div className="grid grid-cols-2 py-3">
                    <BankInfo title="SWIFT" value={bank?.code ?? ""} />
                  </div>
                </section>

                <section className="py-2">
                  <p className="text-xl font-bold my-3">Status</p>
                  <span> Active Status</span>{" "}
                  <span className="text-green-500"> {bank?.status === true ? "ON" : "OFF" }</span>
                </section>

                <section className="py-2">
                  <Button color="primary">Edit</Button>
                </section>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onEditModalOpenChange}>Edit</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <UpdateBank
        isOpen={isEditModalOpen}
        onOpenChange={onEditModalOpenChange}
        data={bank}
      />
    </>
  );
};

export default BankDetail;

type BankInfoProps = {
  title: string | undefined;
  value: string;
};

export const BankInfo = (props: BankInfoProps) => {
  const { title, value } = props;
  return (
    <div className="flex flex-col ">
      <p className="t-[#8D8D8D font-thin">{title}</p>
      <p>{value}</p>
    </div>
  );
};
