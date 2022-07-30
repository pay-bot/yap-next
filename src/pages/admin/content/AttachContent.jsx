import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import SelectListApi from '../../../components/input/SelectListApi';
import Submit from '../../../components/button/Submit';

export default function AttachContent({ dataContent, onFormSubmit }) {
  const { handleSubmit, control } = useForm();
  const { sectionId } = useParams();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('content_id', data.content_id);
    formData.append('section_id', sectionId);
    formData.append('attach', 'true');
    onFormSubmit(formData);
  };

  console.log('opt', dataContent);
  return (
    <div>
      <div className="w-full ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <span className="flex justify-start py-2 text-xs capitalize">
              {dataContent.length > 0 ? 'Attach from exixting Content Component' : 'Not found content to attach for this section'}
            </span>
            <div className="flex gap-x-2 items-center">
              <SelectListApi
                control={control}
                name="content_id"
                label="Content"
                fullWidth
                sx={{ marginBottom: '20px' }}
                size="small"
                options={dataContent}
                // placeholder='d'
                // error={!!errors.age}
                // helperText={errors.age?.message}
              />
              <Submit />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
