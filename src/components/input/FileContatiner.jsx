import { Controller } from 'react-hook-form';
import classnames from 'classnames';

export default function FileContatiner({ name, control, label, errors }) {
  return (
    <div className="relative w-full ">
      <div>
        <Controller
          name={name}
          control={control}
          errors={errors}
          render={({ field: { onChange } }) => (
            <input
              // errors={errors.photo}
              type="file"
              id="component-simple"
              className={classnames('input-file-tailwind w-full rounded border border-gray-400', errors && 'border-[#d32f2f]')}
              onChange={(event) => onChange(event.currentTarget.files)}
            />
          )}
        />
        <label className="file-label" htmlFor="media">
          {label}
        </label>
      </div>
      {errors && <span className="capitalize text-xs text-[#d32f2f] text-left flex justify-start pl-6 pt-2">{errors?.message}</span>}
    </div>
  );
}
