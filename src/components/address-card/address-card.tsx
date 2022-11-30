import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, Form, useField } from "formik";
import { closeModal } from "@redq/reuse-modal";
import TextField from "components/forms/text-field";
import { Button } from "components/button/button";
import { FieldWrapper, Heading } from "./address-card.style";
import { ProfileContext } from "contexts/profile/profile.context";
import { FormattedMessage } from "react-intl";
import Select from "components/select/select";
import { User } from "services/user";

// Shape of form values
interface FormValues {
  id?: number | null;
  userId?: number;
  type: { value: string; label: string } | null;
  addressLine1: string;
  addressLine2: string;
  district: string;
  state: string;
  country: { value: string; label: string } | null;
  pincode: string;
}

// The type of props MyForm receives
interface MyFormProps {
  item?: any | null;
}

const addressOptions = [
  {
    value: "HOME",
    label: "Home",
  },
  {
    value: "OFFICE",
    label: "Office",
  },
  {
    value: "OTHERS",
    label: "Others",
  },
];

const countries = [
  {
    value: "india",
    label: "India",
  },
];
// Wrap our form with the using withFormik HoC
const FormEnhancer = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      id: props.item.id || null,
      type: props.item.type || null,
      addressLine1: props.item.addressLine1 || "",
      addressLine2: props.item.addressLine2 || "",
      district: props.item.district || "",
      state: props.item.state || "",
      country: props.item.country || null,
      pincode: props.item.pincode || "",
    };
  },
  validationSchema: Yup.object().shape({
    type: Yup.string().required("Please select Option"),
    addressLine1: Yup.string().required("Address is required"),
    addressLine2: Yup.string(),
    district: Yup.string().required("District is required!"),
    state: Yup.string().required("State is required!"),
    country: Yup.string().required("Country is required!"),
    pincode: Yup.string().required("Pincode is required!").trim().min(6).max(6),
  }),
  handleSubmit: (values) => {},
});

const UpdateAddress = (props: FormikProps<FormValues> & MyFormProps) => {
  const {
    isValid,
    item,
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,

    handleReset,
    isSubmitting,
  } = props;

  const [c, d, addressHelpers] = useField("type");
  const [a, b, countryHelpers] = useField("country");

  const [loading, setLoading] = useState(false);

  const addressValue = {
    id: values.id,
    type: values.type,
    addressLine1: values.addressLine1,
    addressLine2: values.addressLine2,
    district: values.district,
    state: values.state,
    country: values.country,
    pincode: values.pincode,
  };

  const { state, dispatch } = useContext(ProfileContext);

  // const [addressMutation, { data }] = useMutation(UPDATE_ADDRESS);

  const handleSubmit = async () => {
    if (isValid) {
      setLoading(true);
      console.log(values);

      const addressValues = {
        addressId: 0,
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        country: values.country.value,
        district: values.district,
        pinCode: values.pincode,
        state: values.state,
        type: values.type.value,
        id: values.id ? values.id : null,
      };

      console.log(addressValues);
      User.addOrUpdateAddresses(addressValues).then((response) => {
        console.log(response);
        setLoading(false);
        closeModal();
      });
    }
    // if (isValid) {
    //   const addressData = await addressMutation({
    //     variables: { addressInput: JSON.stringify(addressValue) },
    //   });
    //   console.log(addressData, 'address data');
    //   dispatch({ type: 'ADD_OR_UPDATE_ADDRESS', payload: addressValue });
    //   closeModal();
    // }
  };
  return (
    <Form>
      <Heading>{item && item.id ? "Edit Address" : "Add New Address"}</Heading>
      <FieldWrapper>
        <Select
          id="type"
          placeholder="Select Type"
          onChange={(option) => addressHelpers.setValue(option)}
          value={values.type}
          options={addressOptions}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="addressLine1"
          type="text"
          placeholder="House No, Street or locality"
          error={touched.addressLine1 && errors.addressLine1}
          value={values.addressLine1}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="addressLine2"
          type="text"
          placeholder="City name"
          error={touched.addressLine2 && errors.addressLine2}
          value={values.addressLine2}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="district"
          type="text"
          placeholder="Enter District"
          error={touched.district && errors.district}
          value={values.district}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="state"
          type="text"
          placeholder="Enter State"
          error={touched.state && errors.state}
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Select
          id="counry"
          placeholder="Select Country"
          onChange={(option) => countryHelpers.setValue(option)}
          value={values.country}
          options={countries}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="pincode"
          type="text"
          placeholder="Enter pincode"
          error={touched.pincode && errors.pincode}
          value={values.pincode}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <Button
        onClick={handleSubmit}
        type="submit"
        loading={loading}
        style={{ width: "100%", height: "44px" }}
      >
        <FormattedMessage id="savedAddressId" defaultMessage="Save Address" />
      </Button>
    </Form>
  );
};

export default FormEnhancer(UpdateAddress);
