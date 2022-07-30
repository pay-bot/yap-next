import { useForm } from 'react-hook-form';
import Submit from '../../button/Submit';
import InputContainer from '../../input/InputContainer';

function ArticleTagForm({ defaultValues, onFormSubmit }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = handleSubmit((data) => {
    console.log('submit', data);
    // setAddarray((prev) => [...prev, state]);
    onFormSubmit(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <InputContainer name="name" control={control} label="Name" errors={errors.name} />
      <Submit className="mt-0" />
    </form>
  );
}

export default ArticleTagForm;
