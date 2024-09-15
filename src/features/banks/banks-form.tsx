import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  DatePicker,
  Switch,
} from "@nextui-org/react";

import {parseDate} from "@internationalized/date";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarIcon } from "../../assets/Icons/calender-icon";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { BankView } from "./banks-api";

type BanksFormProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  isEditMode?: boolean;
  data?: BankView | null;
  onSubmit: (value: any) => Promise<void> | any;
  isSubmitting: boolean;
  isSubmitted: boolean;
  onClose: () => void;
};

const validationSchema = yup.object({
  name: yup.string().label("Company Name").required(),
  phone: yup
    .string()
    .matches(
      /^\d{11,13}$/,
      "Phone number must be a numeric type with a minimum of 11 digits and a maximum of 13 digits."
    )
    .required(),
  address: yup.string().label("Address").required(),
  email: yup.string().email().label("Email").required(),
  code: yup.number().typeError("Only Numbers Allowed").label("Swift").required(),
  fax: yup.number().typeError("Only Numbers Allowed").label("Fax"),
  valid_from: yup.string().label("Valid From Date"),
  valid_to: yup.string().label("Valid To Date"),
  website: yup.string().label("Webpage"),
  status: yup.bool().label("Active Status"),
});

export const BanksForm = (props: BanksFormProps) => {
  const {
    isOpen,
    onOpenChange,
    isEditMode = false,
    isSubmitting,
    isSubmitted,
    onSubmit,
    onClose,
    data,
  } = props;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const _onSubmit = (data: any) => {
    onSubmit(data);
  };

  const onCustomClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (isSubmitted) {
      reset();
      onOpenChange();
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (isEditMode && data) {
      setValue("name", data.name);
      setValue("phone", data.phone);
      setValue("address", data.address);
      setValue("email", data.email),
        setValue("code", data.code as any),
        setValue("fax", data.fax as any),
        setValue("valid_from", data.valid_from),
        setValue("valid_to", data.valid_to),
        setValue("website", data.website),
        setValue("status", data.status);
    }
  }, [isEditMode, data]);

  const {
    name,
    phone,
    address,
    email,
    code,
    fax,
    valid_from,
    valid_to,
    website,
    status,
  } = watch();




  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onCustomClose}
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
                {isEditMode ? "Edit" : "Add"} Company Details
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 my-3 gap-3">
                  <Input
                    type="text"
                    label="Bank"
                    labelPlacement="outside"
                    placeholder="Enter your bank"
                    radius="sm"
                    
                  />

                  <Input
                    type="text"
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Enter your company name"
                    radius="sm"
                    isInvalid={errors.name && true}
                    errorMessage={errors.name?.message}
                    {...register("name")}
                    value={name}
                  />
                </div>
                <div className="grid grid-cols-2 my-3 gap-3">
                  <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-3">
                    <DatePicker
                      label="Valid From"
                      labelPlacement="outside"
                      endContent={
                        <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      onChange={(value) =>
                        setValue("valid_from", value as any as string)
                      }
                      value={valid_from ? parseDate(valid_from) : null}
                      isInvalid={errors.valid_from && true}
                      errorMessage={errors.valid_from?.message}
                      radius="sm"
                    />
                    <DatePicker
                      label="Valid To"
                      labelPlacement="outside"
                      endContent={
                        <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      onChange={(value) =>
                        setValue("valid_to", value as any as string)
                      }
                      value={valid_to ? parseDate(valid_to) : null}
                      errorMessage={errors.valid_to?.message}
                      isInvalid={errors.valid_to && true}
                      radius="sm"
                    />
                  </div>
                  <Input
                    type="text"
                    label="Address"
                    labelPlacement="outside"
                    placeholder="Enter your addresss"
                    errorMessage={errors.address?.message}
                    value={address}
                    isInvalid={errors.address && true}
                    {...register("address")}
                    radius="sm"
                  />
                </div>
                <p className="font-bold text-xl">Contacts</p>
                <div className="grid grid-cols-2 my-3 gap-3">
                  <Input
                    type="text"
                    label="Telephone"
                    labelPlacement="outside"
                    placeholder="Enter your phone number"
                    value={phone}
                    errorMessage={errors.phone?.message}
                    isInvalid={errors.phone && true}
                    {...register("phone")}
                    radius="sm"
                  />

                  <Input
                    type="text"
                    label="Fax"
                    labelPlacement="outside"
                    value={fax as any as string}
                    placeholder="Enter your fax number"
                    {...register("fax")}
                    errorMessage={errors.fax?.message}
                    isInvalid={errors.fax && true}
                    radius="sm"
                  />
                </div>
                <div className="grid grid-cols-2 my-3 gap-3">
                  <Input
                    type="email"
                    label="Email"
                    labelPlacement="outside"
                    placeholder="Enter email"
                    value={email}
                    {...register("email")}
                    errorMessage={errors.email?.message}
                    isInvalid={errors.email && true}
                    name="email"
                    radius="sm"
                  />

                  <Input
                    type="text"
                    label="Web page"
                    labelPlacement="outside"
                    placeholder="Enter your web page"
                    {...register("website")}
                    value={website}
                    name="website"
                    errorMessage={errors.website?.message}
                    isInvalid={errors.website && true}
                    radius="sm"
                  />
                </div>
                <div className="grid grid-cols-2 my-3 gap-3">
                  <Input
                    type="text"
                    label="SWIFT"
                    labelPlacement="outside"
                    placeholder="Enter swift"
                    value={code as any as string}
                    errorMessage={errors.code?.message}
                    isInvalid={errors.code && true}
                    {...register("code")}
                    radius="sm"
                  />
                </div>

                <h1>Status</h1>
                <div className="flex gap-3 items-center">
                  <p className="text-xs">Active Status</p>
                  <Switch
                    classNames={{
                      wrapper: "t-xs",
                    }}

                    size="md"
                    color="success"
                    startContent={<p className="t-[8px] text-white">ON</p>}
                    endContent={<p className="t-[8px]">OFF</p>}
                    {...register("status")}
                  />
                </div>
                {errors.status && (
                  <p className="text-red-500">{errors?.status.message}</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={handleSubmit(_onSubmit)}
                  isLoading={isSubmitting}
                  className="bg-[#488E53]"
                  color="primary"
                >
                  {isEditMode ? "Edit" : "Add"} Bank
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
