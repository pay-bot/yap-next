import { useForm } from 'react-hook-form';
import Submit from '../../button/Submit';
import InputContainer from '../../input/InputContainer';

function TextForm({ defaultValues, onFormSubmit }) {
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
    <div className="p-2">
      <form onSubmit={onSubmit}>
        <div className="space-y-2">
          <div className="flex w-full gap-x-2">
            <div className="w-6/12 space-y-2">
              <InputContainer
                name="title"
                control={control}
                // defaultValue={defau}
                label="Title"
                errors={errors.name}
              />
              <InputContainer
                name="description"
                control={control}
                // defaultValue={defau}
                label="Description"
                errors={errors.name}
              />
            </div>
            <div className="w-6/12 space-y-2">
              <InputContainer
                name="title_in"
                control={control}
                // defaultValue={defau}
                label="Judul"
                errors={errors.name}
              />
              <InputContainer
                name="description_in"
                control={control}
                // defaultValue={defau}
                label="Deskripsi"
                errors={errors.name}
              />
            </div>
          </div>
          <InputContainer
            name="link"
            control={control}
            // defaultValue={defau}
            label="Link"
            errors={errors.name}
          />
        </div>

        <Submit className="mt-4 flex justify-start" />
      </form>
    </div>
  );
}

export default TextForm;
