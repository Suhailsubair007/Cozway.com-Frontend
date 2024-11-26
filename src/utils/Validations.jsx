import * as Yup from "yup";

export const addressValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .trim("Name cannot include spaces")
    .strict(true),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Phone number is required"),
  address: Yup.string()
    .required("Address is required")
    .trim("Address cannot include spaces")
    .strict(true),
  district: Yup.string()
    .required("District is required")
    .trim("district cannot include spaces")
    .strict(true),
  state: Yup.string()
    .required("State is required")
    .trim("state cannot include spaces")
    .strict(true),
  city: Yup.string()
    .required("City is required")
    .trim("city cannot include spaces")
    .strict(true),
  pincode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(6, "Must be exactly 6 digits")
    .required("Pincode is required"),
  alternatePhone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  landmark: Yup.string()
  .required("Landmark is required"),
});

export const SignupValidation = Yup.object({
  name: Yup.string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .trim("Name cannot include spaces")
    .strict(true),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Mobile Number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .trim("password cannot include spaces")
    .strict(true),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required")
    .trim("password cannot include spaces")
    .strict(true),
});

export const addOfferValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Offer name is required")
    .trim("Name cannot include spaces")
    .strict(true),
  value: Yup.number()
    .required("Offer value is required")
    .positive("Value must be positive")
    .max(80, "Offer value cannot be more than 80%"),
  endDate: Yup.date()
    .required("End date is required")
    .min(new Date(), "End date must be in the future"),
  targetId: Yup.string()
    .trim()
    .required("You must select a product or category"),
  targetName: Yup.string()
    .trim()
    .required("Target name is required")
    .trim("target name cannot include spaces")
    .strict(true),
});

export const validateCouponForm = (formData) => {
  const errors = {};

  if (!formData.code?.trim()) {
    errors.code = "Coupon code is required";
  } else if (!/^[A-Z0-9]+$/.test(formData.code)) {
    errors.code = "Coupon code must be in capital letters and numbers only";
  }

  if (!formData.description.trim()) {
    errors.description = "Description is required";
  }

  if (!formData.discount_value) {
    errors.discount_value = "Discount value is required";
  } else if (
    formData.discount_type === "percentage" &&
    (formData.discount_value < 0 || formData.discount_value > 80)
  ) {
    errors.discount_value = "Percentage must be between 0 and 80";
  }

  if (!formData.min_purchase_amount) {
    errors.min_purchase_amount = "Minimum purchase amount is required";
  }

  if (!formData.max_discount_amount) {
    errors.max_discount_amount = "Maximum discount amount is required";
  }

  if (formData.min_purchase_amount && formData.max_discount_amount) {
    if (parseFloat(formData.max_discount_amount) > parseFloat(formData.min_purchase_amount)) {
        errors.max_discount_amount = "Maximum discount cannot be greater than minimum purchase amount";
    }
}

  if (!formData.expiration_date) {
    errors.expiration_date = "Expiration date is required";
  } else {
    const expirationDate = new Date(formData.expiration_date);
    const currentDate = new Date();
    if (expirationDate <= currentDate) {
      errors.expiration_date = "Expiration date must be in the future";
    }
  }

  if (!formData.usage_limit) {
    errors.usage_limit = "Usage limit is required";
  }

  return errors;
};



// export const validateCouponForm = (formData) => {
//   const errors = {};
  
//   // Validate coupon code (uppercase letters and numbers only)
//   if (!formData.code?.trim()) {
//     errors.code = "Coupon code is required";
//   } else if (!/^[A-Z0-9]+$/.test(formData.code)) {
//     errors.code = "Coupon code must be in capital letters and numbers only";
//   }
  
//   // Validate description
//   if (!formData.description?.trim()) {
//     errors.description = "Description is required";
//   }
  
//   // Validate discount value
//   const discountValue = Number(formData.discount_value);
//   if (!discountValue && discountValue !== 0) {
//     errors.discount_value = "Discount value is required";
//   } else if (
//     formData.discount_type === "percentage" &&
//     (discountValue < 0 || discountValue > 80)
//   ) {
//     errors.discount_value = "Percentage must be between 0 and 80";
//   } else if (discountValue < 0) {
//     errors.discount_value = "Discount value cannot be negative";
//   }
  
//   // Validate minimum purchase amount
//   const minPurchaseAmount = Number(formData.min_purchase_amount);
//   if (!minPurchaseAmount && minPurchaseAmount !== 0) {
//     errors.min_purchase_amount = "Minimum purchase amount is required";
//   } else if (minPurchaseAmount <= 0) {
//     errors.min_purchase_amount = "Minimum purchase amount must be greater than zero";
//   }
  
//   // Validate maximum discount amount
//   const maxDiscountAmount = Number(formData.max_discount_amount);
//   if (!maxDiscountAmount && maxDiscountAmount !== 0) {
//     errors.max_discount_amount = "Maximum discount amount is required";
//   } else if (maxDiscountAmount <= 0) {
//     errors.max_discount_amount = "Maximum discount amount must be greater than zero";
//   } else if (maxDiscountAmount > minPurchaseAmount) {
//     errors.max_discount_amount = "Maximum discount amount cannot exceed minimum purchase amount";
//   }
  
//   // Validate expiration date
//   if (!formData.expiration_date) {
//     errors.expiration_date = "Expiration date is required";
//   } else {
//     const expirationDate = new Date(formData.expiration_date);
//     const currentDate = new Date();
//     currentDate.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison
//     if (expirationDate < currentDate) {
//       errors.expiration_date = "Expiration date must be in the future";
//     }
//   }
  
//   // Validate usage limit
//   const usageLimit = Number(formData.usage_limit);
//   if (!usageLimit && usageLimit !== 0) {
//     errors.usage_limit = "Usage limit is required";
//   } else if (usageLimit <= 0) {
//     errors.usage_limit = "Usage limit must be greater than zero";
//   }
  
//   return errors;
// };
