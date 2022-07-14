import React, { useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Editor, Preview, Form } from '@components/WritePage/index';
import { useState } from 'react';
import { WriteAPI } from '@api/writeAPI';
import axios from 'axios';
import { IForm } from '@typings/write.interface';

const cx = classNames.bind(styles);

const Write = () => {
  const { postId } = useParams<string>();
  const navigate = useNavigate();
  const [form, setForm] = useState<IForm>({
    title: '',
    body: '',
    tags: [],
    thumbnail: '',
  });
  const [tag, setTag] = useState<string>('');
  const [toggleForm, setToggleForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (postId) {
      (async () => {
        try {
          const { title, body, tags, thumbnail } = await WriteAPI.get(postId);
          const tagsInit = !tags ? [] : tags
          setForm({
            title,
            body,
            tags: tagsInit,
            thumbnail
          })
        } catch (err) {
          return navigate('/')
        }
      })();
    }
  }, [postId, navigate]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }, [form])

  const handleTag: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.target.value.slice(-1) === ',') return;
    setTag(e.target.value);
  }, []);

  const addTags: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    if (!tag.length) return;
    if (e.key === 'Enter' || e.key === ',') {
      setForm({
        ...form,
        tags: [...form?.tags, tag]
      })
      setTag('');
    }
  }, [form, tag]);

  const removeTags: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    if (!form?.tags.length) return;
    if (e.key === 'Backspace') {
      setForm({
        ...form,
        tags: form.tags.slice(0, form.tags.length - 1)
      })
    }
  }, [form]);

  const handleToggleForm = useCallback(() => {
    setToggleForm((prev) => !prev);
  }, []);

  const handleThumbnail: React.ChangeEventHandler<HTMLInputElement> = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'mdzig526');
      axios.post('https://api.cloudinary.com/v1_1/dhdllpzl9/image/upload', formData)
        .then(response => {
          setForm({ ...form, thumbnail: response.data.url });
          setLoading(false);
        });
    }
  }, [form]);

  const handleRemoveThumbnail: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setForm({
      ...form,
      thumbnail: '',
    });
  }, [form]);

  const onSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data: { id }, status } = await WriteAPI.post(form);
    if (status === 201) {
      return navigate(`/post/${id}`);
    }
  };

  const onSubmitPatch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postId) {
      const { data: { id }, status } = await WriteAPI.patch(postId, form);
      if (status === 200) {
        console.log(id, status);
        return navigate(`/post/${id}`);
      }
    }
  };

  console.log('loading', loading)

  if (postId && !form.title) return <div>Loading...</div>

  return (
    <section className={cx('container')}>
      <div className={cx('contents')}>
        <Editor
          handleTag={handleTag}
          handleChange={handleChange}
          addTags={addTags}
          removeTags={removeTags}
          handleToggleForm={handleToggleForm}
          form={form}
          tag={tag}
        />
        <Preview
          form={form}
        />
        {<Form
          toggleForm={toggleForm}
          handleToggleForm={handleToggleForm}
          onSubmitPost={onSubmitPost}
          onSubmitPatch={onSubmitPatch}
          handleThumbnail={handleThumbnail}
          handleRemoveThumbnail={handleRemoveThumbnail}
          bodySumamry={form.body.slice(0, 150)}
          thumbnail={form.thumbnail}
          loading={loading}
        />}
      </div>
    </section>
  );
}

export default Write;
