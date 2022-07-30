import { useForm } from 'react-hook-form';

function ArticleMediaForm({ defaultValues, onFormSubmit }) {
  const { register, handleSubmit } = useForm({ defaultValues });

  const onSubmit = handleSubmit((data) => {
    console.log('submit', data);
    // setAddarray((prev) => [...prev, state]);
    onFormSubmit(data);
  });

  return (
    <div className="">
      <form onSubmit={onSubmit}>
        <input {...register('file')} type="file" name="file" />
        <button type="button">Submit</button>
      </form>
    </div>
  );
}

export default ArticleMediaForm;
