import { useForm } from "react-hook-form";

import Spinner from "../../ui/Spinner";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      breakfastPrice,
      maxBookingLength,
      maxGuestsPerBooking,
      minBookingLength,
    } = {},
    isPending: isSettingsLoading,
  } = useSettings();

  const { updateSettings, isPending: isUpdating } = useUpdateSettings();

  const { formState } = useForm();
  const { errors } = formState;

  if (isSettingsLoading) return <Spinner />;

  /*
    APPROACH 1: Use the event object of the input field to construct the property name and its respective value
    APPROACH 2: Pass the event object along with the correct property name. Value can be extracted from the event object.
                If the id of the input field is not as per the DB columns, then APPROACH 2 would be a good choice
  */
  function handleChange(event) {
    const value = event.target.value;

    if (!value) return;

    updateSettings({ [event.target.id]: Number(value) });
  }

  return (
    <Form>
      <FormRow
        label={"Minimum nights/booking"}
        error={errors?.minBookingLength}
      >
        <Input
          type="number"
          id="minBookingLength"
          disabled={isUpdating}
          onBlur={handleChange}
          defaultValue={minBookingLength}
        />
      </FormRow>
      <FormRow
        label={"Maximum nights/booking"}
        error={errors?.maxBookingLength}
      >
        <Input
          type="number"
          id="maxBookingLength"
          disabled={isUpdating}
          onBlur={handleChange}
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow
        label={"Maximum guests/booking"}
        error={errors?.maxGuestsPerBooking}
      >
        <Input
          type="number"
          id="maxGuestsPerBooking"
          disabled={isUpdating}
          onBlur={handleChange}
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow label={"Breakfast price"} error={errors?.breakfastPrice}>
        <Input
          type="number"
          id="breakfastPrice"
          disabled={isUpdating}
          onBlur={handleChange}
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
