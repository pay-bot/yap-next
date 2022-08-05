import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import InputContainer from '../../input/InputContainer';

function CollectionForm({ defaultValues, onFormSubmit }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = handleSubmit((data) => {
    console.log('submit', data);
    onFormSubmit(data);
  });

  const handleSubmitCollection = useSelector((state) => state.crud.submitReq);
  useEffect(() => {
    if (handleSubmitCollection.componentName === 'AddMenuCollection' || handleSubmitCollection.componentName === 'EditCollection') {
      onSubmit();
      console.log('cate', onFormSubmit);
    }
  }, [handleSubmitCollection]);


  return (
    <>
      {/* <div className="bg-white p-8 relative"> */}

      <div>
        <InputContainer name="name" control={control} label="Name" errors={errors.name} />
      </div>
      {/* </div> */}
    </>
  );
}

export default CollectionForm;
