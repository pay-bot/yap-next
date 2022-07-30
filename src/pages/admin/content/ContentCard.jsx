import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import classnames from 'classnames';
import ReactHtmlParser from 'react-html-parser';
import swal from 'sweetalert';
import { fetchSections } from '../../../hooks/useSectionsData';
import Edit from '../../../components/button/Edit';
import request from '../../../utils/axios-utils';
import Delete from '../../../components/button/Delete';
import Remove from '../../../components/button/Remove';

export default function ContentCard({ data }) {
  const { pageId, sectionId } = useParams();
  console.log('cpnt', data);

  const queryClient = useQueryClient();

  const { data: section } = useQuery(['sections', { pageId }], fetchSections);

  console.log('id', section);
  const sectionIdSort = [];
  section?.data?.model?.sections?.map((sec) => {
    return sectionIdSort.push(sec);
  });

  const sortedCols = _.sortBy(sectionIdSort, 'list_order');

  const [sor, setSor] = useState(sortedCols);
  useEffect(() => {
    setSor(sortedCols);
  }, [section]);

  console.log('sssor', sor);

  const removeContent = async (id) => {
    return request({
      url: `/pages/${pageId}/sections/${sectionId}/content/${id}/remove`,
      method: 'post',
      data: {
        _id: `${id}`,
        // _method: 'delete'
      },
    });
  };

  const { mutateAsync: removeCont } = useMutation(removeContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('sections');
    },
  });

  const removeContents = async (id) => {
    console.log(id);
    await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        removeCont(id);
        swal('Poof! Your imaginary file has been deleted!', { icon: 'success' });
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };

  const deleteContent = async (id) => {
    return request({
      url: `/pages/${pageId}/sections/${sectionId}/content/${id}`,
      method: 'post',
      data: {
        _id: `${id}`,
        _method: 'delete',
      },
    });
  };

  const { mutateAsync: deleteCont } = useMutation(deleteContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('sections');
    },
  });

  const deleteContents = async (id) => {
    console.log(id);
    await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCont(id);
        swal('Poof! Your imaginary file has been deleted!', { icon: 'success' });
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  };

  console.log('dd', data);

  return (
    <div key={data.id} className=" border-b-2 p-3 bg-white">
      <div className="flex items-center">
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="text-xs ">{data.content_title}</div>
            <div
              className={classnames(
                'mx-1 px-1 rounded-sm text-xs  text-white h-fit ',
                `${data.content_category}` === 'Article' && 'bg-[#11C5DB]',
                `${data.content_category}` === 'Text' && 'bg-[#7a7b97]',
                `${data.content_category}` === 'Media' && 'bg-[#1bc943] ',
                `${data.content_category}` === 'Content' && 'bg-[#4191FF] '
              )}
            >
              {data.content_category}
            </div>
          </div>
          <div className="3xl:text-2xl text-xl font-bold">{ReactHtmlParser(data?.heading?.slice(0, 60))}</div>
          <div className="text-gray-400">{ReactHtmlParser(data?.content?.slice(0, 60))}</div>
          {data?.content_category &&
            data?.content_category === 'Media' &&
            data?.photos.map((pho) => (
              <div key={pho.id} className="flex">
                <img src={pho.url} alt="" className="w-24" />
              </div>
            ))}
        </div>
        <div className="ml-auto flex gap-x-1">
          <Edit tooltip={`Edit ${data.heading}`} link={`${data.id}/edit`} />
          <Remove tooltip={`Remove ${data.heading}`} onClick={() => removeContents(data.id)} />
          <Delete tooltip={`Delete ${data.heading}`} onClick={() => deleteContents(data.id)} />
        </div>
      </div>
    </div>
  );
}
