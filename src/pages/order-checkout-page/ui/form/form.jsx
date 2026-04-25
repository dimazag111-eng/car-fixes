import cn from "classnames";
import { Api } from "../../../../api/api";
import { Input } from "../../../../components/input/input";
import { Select } from "../../../../components/select/select";
import { useQuery } from "../../../../services/api-query/use-query";
import { carBrandsOptions, carModelsOptions } from "../../model/car-brand-and-model-options";
import styles from "./form.module.css";
import { useForm } from "../../model/use-form";

export const Form = (props) => {
  const { className, formId } = props;

  const {
    data: { carBrandsData, carModelsData },
    isLoading,
  } = useQuery({
    carBrandsData: {
      queryKey: ["getCarBrands"],
      queryFn: () => Api.getCarBrands(),
      initialData: null,
    },
    carModelsData: {
      queryKey: ["getCarModels"],
      queryFn: () => Api.getCarModels(),
      initialData: null,
    },
  });

  const { formValues, setFormValues, handleSubmit } = useForm();

  return (
    <form className={cn(styles.form, className)} id={formId} onSubmit={handleSubmit(formValues)}>
      <Select
        name="brand"
        value={formValues.brand ?? ""}
        onChange={(event) => setFormValues((prev) => ({ ...prev, brand: event.target.value, model: null }))}
        options={carBrandsOptions(carBrandsData ?? [])}
        onReset={() => setFormValues((prev) => ({ ...prev, brand: null, model: null }))}
        placeholder="Марка авто"
        required
        disabled={isLoading}
      />
      <Select
        name="model"
        value={formValues.model ?? ""}
        onChange={(event) => setFormValues((prev) => ({ ...prev, model: event.target.value }))}
        onReset={() => setFormValues((prev) => ({ ...prev, model: null }))}
        options={carModelsOptions(formValues.brand)(carModelsData ?? [])}
        placeholder="Модель авто"
        disabled={isLoading || !formValues.brand}
        required
      />
      <Input
        type="text"
        name="fullName"
        value={formValues.fullName}
        onChange={(event) => setFormValues((prev) => ({ ...prev, fullName: event.target.value }))}
        placeholder="Имя Фамилия"
        required
      />
      <Input
        type="tel"
        name="phone"
        value={formValues.phone}
        onChange={(event) => setFormValues((prev) => ({ ...prev, phone: event.target.value }))}
        placeholder="Телефон"
        required
      />
      <Input
        type="email"
        name="email"
        value={formValues.email}
        onChange={(event) => setFormValues((prev) => ({ ...prev, email: event.target.value }))}
        placeholder="E-mail"
        required
      />
    </form>
  );
};
