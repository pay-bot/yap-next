import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteText } from '../../../hooks/useTextsData';
import { closeLoading, isReactLoading } from '../../../features/reactLoadingSlice';
import request from '../../../utils/axios-utils';

function TextFormEdit({ defaultValues, id }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  const dispatch = useDispatch();

  const [readOn, setReadOn] = useState({ shown: false, id: '' });
  const handleReadOn = async (data) => {
    setReadOn({ shown: !readOn.shown, data });
  };

  console.log('is', readOn.shown);

  const queryClient = useQueryClient();
  const { mutateAsync: deleteTexts } = useMutation(deleteText, {
    onSuccess: () => {
      queryClient.invalidateQueries('sectionsContent');
    },
  });
  const removeText = async (data) => {
    await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteTexts(data);
        swal('Poof! Your imaginary file has been deleted!', { icon: 'success' });
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };

  const updateText = (article) => {
    return request({
      url: `/texts/${readOn.id}`,
      method: 'put',
      data: {
        ...article,
        // sectionable_id: pageId,
        sectionable_type: 'App\\Models\\Page',
      },
    });
  };

  const { mutateAsync: updText } = useMutation(updateText, {
    onSuccess: (e) => {
      if (e.request.status === 200) {
        toast.success('Text has been updated', { position: 'top-right' });
        dispatch(closeLoading());
      } else {
        toast.error('Text failed to update  ', { position: 'top-right' });
        dispatch(closeLoading());
      }
    },
  });

  const onSubmit = async (data) => {
    dispatch(isReactLoading());
    await updText(data);
    setReadOn({ shown: !readOn.shown, id });
    // dispatch(closeLoading());
  };

  // const editMode =

  const editMode = (
    <label htmlFor="" className="floating-label">
      Edit Mode
    </label>
  );

  return (
    <div className="w-full my-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* {(() => {
            if (readOn.shown && defaultValues.id === readOn.id)
              return (
                <>
                  <div>
                    <div className="absolute -mt-8 rounded bg-emerald-400 px-1 text-sm font-bold capitalize text-white">
                      edit mode
                    </div>
                  </div>
                </>
              );
          })()} */}

        <div className="flex">
          <div className="flex w-11/12 space-x-4">
            <div className="floating-group w-4/12">
              {(() => {
                if (readOn.shown && defaultValues.id === readOn.id)
                  return (
                    <>
                      <input
                        className="floating-group"
                        type="text"
                        id="title"
                        // readOnly
                        name="title"
                        {...register('title')}
                      />
                      {editMode}
                    </>
                  );
                return <input className="floating-group" type="text" id="title" readOnly name="title" {...register('title')} />;
              })()}
              {/* <label className="label" htmlFor="fullname">
                Title
              </label> */}
            </div>
            <div className="floating-group w-4/12">
              {(() => {
                if (readOn.shown && defaultValues.id === readOn.id)
                  return (
                    <>
                      <input
                        className="floating-group"
                        type="text"
                        id="description"
                        // readOnly
                        name="description"
                        {...register('description')}
                      />
                      {editMode}
                    </>
                  );
                return <input className="floating-group" type="text" id="description" readOnly name="description" {...register('description')} />;
              })()}

              {/* <label className="label" htmlFor="fullname">
                Description
              </label> */}
            </div>
            <div className="floating-group w-4/12">
              {(() => {
                if (readOn.shown && defaultValues.id === readOn.id)
                  return (
                    <>
                      <input
                        className="floating-group"
                        type="text"
                        id="link"
                        // readOnly
                        name="link"
                        {...register('link')}
                      />
                      {editMode}
                    </>
                  );
                return <input className="floating-group" type="text" id="link" readOnly name="link" {...register('link')} />;
              })()}
            </div>
            {/* <Submit /> */}
          </div>
          <div className="flex w-32 justify-around items-center">
            <button type="button" onClick={() => handleReadOn(defaultValues.id)} className="bg-[rgba(65,145,255,.15)] hover:bg-[#4191ff] h-fit p-1 rounded-sm">
              <img src="/edit.svg" alt="" className="mr-1 w-4" />
            </button>
            <button type="button" onClick={() => removeText(defaultValues.id)} className="bg-[rgba(248,50,69,.15)] hover:bg-[#f83245] p-1 rounded-sm">
              <img src="/trash.svg" alt="" className="mr-1 w-4" />
            </button>

            <button type="submit" className="h-fit bg-black px-2 text-white rounded-sm hover:text-blue-400">
              S
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TextFormEdit;
