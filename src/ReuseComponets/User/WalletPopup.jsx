import { useState } from "react";
import { X } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Amount must be a number")
    .min(1, "Amount must be at least 1")
    .max(1000, "Amount cannot exceed 1000")
    .required("Amount is required"),
});

export default function WalletPopup({ isOpen, onClose, onAddFunds }) {
  if (!isOpen) return null;

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
          initialValues={{ amount: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onAddFunds(Number(values.amount));
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  as={Input}
                  type="text"
                  name="amount"
                  placeholder="Enter amount"
                  className={`w-full ${
                    errors.amount && touched.amount ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage name="amount" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                Add Funds
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

