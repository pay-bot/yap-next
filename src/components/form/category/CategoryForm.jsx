import { useForm } from 'react-hook-form';
// import Submit from "../../button/Submit";
import Submit from '../../button/Submit';
// import { schema } from "./validation";
// import InputContainer from "../../input/InputContainer";
import InputContainer from '../../input/InputContainer';

function CategoryForm({ defaultValues, onFormSubmit, isLoading, name }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // resolver: schema,
    defaultValues,
  });
  const onSubmit = handleSubmit((data) => {
    console.log('submit', data);
    onFormSubmit(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <InputContainer name="name" control={control} label="Name" errors={errors.name} />

      {name === 'AddShopStatus' && <InputContainer name="category" control={control} label="Badge Color" errors={errors.name} />}
      {name === 'EditShopStatus' && <InputContainer name="category" control={control} label="Badge Color" errors={errors.name} />}
      <Submit className="mt-0" />
    </form>
  );
}

export default CategoryForm;
