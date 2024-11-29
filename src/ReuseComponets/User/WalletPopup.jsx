import { useState } from "react";
import { X } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function WalletPopup({ isOpen, onClose, onAddFunds }) {
  if (!isOpen) return null;

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .min(1, 'Amount must be greater than 0')
      .max(1000, 'Amount must be less than or equal to 1000')
      .required('Amount is required')
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Funds</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <Formik
          initialValues={{ amount: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onAddFunds(values.amount);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <p className="text-gray-700 mb-4">
                Enter the amount to add to your wallet.
              </p>
              <Field
                type="number"
                name="amount"
                placeholder="Amount"
                className="w-full p-2 border rounded-lg"
              />
              <ErrorMessage name="amount" component="div" className="text-red-500 mt-1" />
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded"
              >
                Add Funds
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

