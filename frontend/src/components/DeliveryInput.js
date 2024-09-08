import React from 'react';
import { AddressInput } from './Register';
import { useForm } from 'react-hook-form';

export default function DeliveryInput() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm({
    defaultValues: {},
  });
  return (
    <div className="delivery-insert">
      <form onSubmit={handleSubmit()}>
        <AddressInput register={register} setValue={setValue} errors={errors} />
      </form>
    </div>
  );
}
