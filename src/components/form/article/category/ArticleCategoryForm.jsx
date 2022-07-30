import { useForm } from 'react-hook-form';
import Submit from '../../../button/Submit';
// import { schema } from "../../category/validationry/validation";
import InputContainer from '../../../input/InputContainer';

function ArticleCategoryForm({ defaultValues, onFormSubmit }) {
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
    // setAddarray((prev) => [...prev, state]);
    onFormSubmit(data);
  });

  // console.log('cate', defaultValues)

  return (
    <form onSubmit={onSubmit}>
      <InputContainer name="name" control={control} label="Name" errors={errors.name} />
      <Submit className="mt-0" />
    </form>
  );
}

export default ArticleCategoryForm;
