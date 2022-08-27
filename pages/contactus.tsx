import Head from 'next/head';
import { useState } from 'react';
import * as Yup from 'yup';
// import { toast } from 'react-toastify';

// import { Form, Validate } from '../../components';

import Form from '../components/Form/Form';
import Validate from '../components/Form/Validation';

import { submitContactForm } from '../helpers/user';
import { ContactFormInterface } from '../types/requestData';

function Contactus() {
  // eslint-disable-next-line
  const [submitting, setSubmitting] = useState(false);

  const fields = {
    name: 'Contact Us',
    submitValue: 'Send',
    inputs: [
      {
        name: 'name',
        type: 'text',
        field: 'input',
        placeholder: 'Name',
      },
      {
        name: 'email',
        type: 'email',
        field: 'input',
        placeholder: 'Email',
      },
      {
        name: 'message',
        type: 'text',
        field: 'message',
        placeholder: 'Enter yor Message here...',
      },
    ],
  };

  const contactUsSchema = Yup.object().shape({
    name: Validate.name,
    email: Validate.email,
    message: Validate.message,
  });

  const onSubmit = async (values: ContactFormInterface) => {
    try {
      setSubmitting(true);
      await submitContactForm(values);
      // toast(res.data.message);
    } catch (err) {
      // toast('Error');
    } finally {
      setSubmitting(false);
    }
  };

  const formik = {
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: contactUsSchema,
    onSubmit,
  };

  return (
    <>
      <Head>
        <title>Contact us - Movielust</title>
      </Head>
      <Form formik={formik} fields={fields} isSubmitting={submitting} />;
    </>
  );
}

export default Contactus;
