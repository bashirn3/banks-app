import { Button, Skeleton, useDisclosure } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router";
import { useGetBankQuery } from "./banks-api";
import { UpdateBank } from "./update-bank";


const Bank = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bank, isLoading } = useGetBankQuery({ id });
  const { isOpen: isEditModalOpen, onOpenChange: onEditModalOpenChange } =
    useDisclosure();

  const renderSkeleton = (width: string = "w-full", height: string = "h-4") => (
    <Skeleton className={`${width} ${height} rounded-lg`} />
  );

  const renderBankInfo = (title: string, value: string | undefined) => (
    <div className="flex flex-col">
      {isLoading ? (
        <>
          {renderSkeleton("w-1/2", "h-3 mb-2")}
          {renderSkeleton()}
        </>
      ) : (
        <BankInfo title={title} value={value ?? "--"} />
      )}
    </div>
  );

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <Button
          variant="light"
          onClick={() => navigate(-1)}
          className="text-white"
        >
          Back
        </Button>
      </div>
      <div className="max-w-screen-lg mx-auto bg-white rounded-[16px] p-6">
        <section className="py-2">
          <p className="text-xl font-bold mb-4">Company Details</p>
          <div className="grid grid-cols-2 gap-4">
            {renderBankInfo("Bank", bank?.name)}
            {renderBankInfo("Name", bank?.name)}
            {renderBankInfo("Valid From", bank?.valid_from)}
            {renderBankInfo("Valid To", bank?.valid_to)}
            {renderBankInfo("Address", bank?.address)}
          </div>
        </section>

        <section className="py-2 mt-6">
          <p className="text-xl font-bold mb-4">Contacts</p>
          <div className="grid grid-cols-2 gap-4">
            {renderBankInfo("Phone", bank?.phone)}
            {renderBankInfo("Fax", bank?.fax)}
            {renderBankInfo("Email", bank?.email)}
            {renderBankInfo("Website", bank?.website)}
            {renderBankInfo("SWIFT", bank?.code)}
          </div>
        </section>

        <section className="py-2 mt-6">
          <p className="text-xl font-bold mb-4">Status</p>
          {isLoading ? (
            renderSkeleton("w-24")
          ) : (
            <div>
               <StatusDisplay status={bank?.status} />
            </div>
          )}
        </section>

        <section className="py-2 mt-6">
          <Button color="primary" onClick={onEditModalOpenChange}>
            Edit
          </Button>
        </section>

        <UpdateBank
          isOpen={isEditModalOpen}
          onOpenChange={onEditModalOpenChange}
          data={bank}
        />
      </div>
    </>
  );
};

export default Bank;

type BankInfoProps = {
  title: string;
  value: string;
};

export const BankInfo = ({ title, value }: BankInfoProps) => (
  <div className="flex flex-col">
    <p className="text-[#8D8D8D] font-thin">{title}</p>
    <p>{value}</p>
  </div>
);


type StatusDisplayProps = {
  status: boolean | undefined
}

const StatusDisplay = ({ status }: StatusDisplayProps) => (
  <div>
    <span>Active Status </span>
    <span className={status ? 'text-green-500' : 'text-red-500'}>
      {status ? 'ON' : 'OFF'}
    </span>
  </div>
);