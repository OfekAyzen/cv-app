/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Jobs } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function JobsUpdateForm(props) {
  const {
    id: idProp,
    jobs: jobsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    job_description: "",
    qualifications: "",
    job_title: "",
  };
  const [job_description, setJob_description] = React.useState(
    initialValues.job_description
  );
  const [qualifications, setQualifications] = React.useState(
    initialValues.qualifications
  );
  const [job_title, setJob_title] = React.useState(initialValues.job_title);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = jobsRecord
      ? { ...initialValues, ...jobsRecord }
      : initialValues;
    setJob_description(cleanValues.job_description);
    setQualifications(cleanValues.qualifications);
    setJob_title(cleanValues.job_title);
    setErrors({});
  };
  const [jobsRecord, setJobsRecord] = React.useState(jobsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Jobs, idProp)
        : jobsModelProp;
      setJobsRecord(record);
    };
    queryData();
  }, [idProp, jobsModelProp]);
  React.useEffect(resetStateValues, [jobsRecord]);
  const validations = {
    job_description: [],
    qualifications: [],
    job_title: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          job_description,
          qualifications,
          job_title,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(
            Jobs.copyOf(jobsRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "JobsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Job description"
        isRequired={false}
        isReadOnly={false}
        value={job_description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_description: value,
              qualifications,
              job_title,
            };
            const result = onChange(modelFields);
            value = result?.job_description ?? value;
          }
          if (errors.job_description?.hasError) {
            runValidationTasks("job_description", value);
          }
          setJob_description(value);
        }}
        onBlur={() => runValidationTasks("job_description", job_description)}
        errorMessage={errors.job_description?.errorMessage}
        hasError={errors.job_description?.hasError}
        {...getOverrideProps(overrides, "job_description")}
      ></TextField>
      <TextField
        label="Qualifications"
        isRequired={false}
        isReadOnly={false}
        value={qualifications}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_description,
              qualifications: value,
              job_title,
            };
            const result = onChange(modelFields);
            value = result?.qualifications ?? value;
          }
          if (errors.qualifications?.hasError) {
            runValidationTasks("qualifications", value);
          }
          setQualifications(value);
        }}
        onBlur={() => runValidationTasks("qualifications", qualifications)}
        errorMessage={errors.qualifications?.errorMessage}
        hasError={errors.qualifications?.hasError}
        {...getOverrideProps(overrides, "qualifications")}
      ></TextField>
      <TextField
        label="Job title"
        isRequired={false}
        isReadOnly={false}
        value={job_title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_description,
              qualifications,
              job_title: value,
            };
            const result = onChange(modelFields);
            value = result?.job_title ?? value;
          }
          if (errors.job_title?.hasError) {
            runValidationTasks("job_title", value);
          }
          setJob_title(value);
        }}
        onBlur={() => runValidationTasks("job_title", job_title)}
        errorMessage={errors.job_title?.errorMessage}
        hasError={errors.job_title?.hasError}
        {...getOverrideProps(overrides, "job_title")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || jobsModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || jobsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
