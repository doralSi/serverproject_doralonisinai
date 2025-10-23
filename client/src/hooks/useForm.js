import { useState } from "react";
import Joi from "joi";

export default function useForm(initialForm, schemaObj, onSubmit) {
  const [formDetails, setFormDetails] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const schema = Joi.object(schemaObj);

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormDetails((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));

    const fieldSchema = Joi.object({
      [fieldName]: schemaObj[fieldName],
    });

    const { error } = fieldSchema.validate({ [fieldName]: fieldValue });

    if (error) {
      setErrors({ [fieldName]: error.details[0].message });
    } else {
      setErrors((prev) => {
        delete prev[fieldName];
        return prev;
      });
    }
  };

  const handleSubmit = () => {
    console.log("🔍 Form submission started");
    console.log("📝 Form details:", formDetails);
    const { error } = schema.validate(formDetails, { abortEarly: false });
    console.log("❌ Validation error:", error);

    if (!error) {
      console.log("✅ Validation passed, calling onSubmit");
      onSubmit(formDetails);
    } else {
      console.log("❌ Validation failed:");
      error.details.forEach(detail => {
        console.log(`  - ${detail.path.join('.')}: ${detail.message}`);
      });
      
      // עדכון השגיאות כדי שהמשתמש יראה אותן
      const validationErrors = {};
      error.details.forEach(detail => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
    }
  };

  return {
    formDetails,
    errors,
    handleChange,
    handleSubmit,
    setFormDetails,
  };
}
