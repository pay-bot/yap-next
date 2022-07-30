import { useForm } from 'react-hook-form';
import Submit from '../../button/Submit';
import SelectListApi from '../../input/SelectListApi';
import { useArticleCategoriesData } from '../../../hooks/useArticleCategoriesData';

function CollectionForm({ defaultValues, onFormSubmit }) {
  const { handleSubmit, control } = useForm({ defaultValues });

  const onSubmit = handleSubmit((data) => {
    console.log('submit', data);
    // setAddarray((prev) => [...prev, state]);
    onFormSubmit(data);
  });

  const {
    // isLoading,
    data: categories,
  } = useArticleCategoriesData();
  const category = categories?.data?.map((cat) => cat);

  return (
    <form onSubmit={onSubmit}>
      <div className="w-full">
        <SelectListApi
          control={control}
          name="category_id"
          label="Category"
          fullWidth
          sx={{ marginBottom: '20px' }}
          size="small"
          options={category}
          // error={!!errors.age}
          // helperText={errors.age?.message}
        />
      </div>
      <Submit className="mt-0" />
    </form>
  );
}

export default CollectionForm;
