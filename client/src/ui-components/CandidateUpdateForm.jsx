/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Candidate } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function CandidateUpdateForm(props) {
  const {
    id: idProp,
    candidate: candidateModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    first_name: "",
    last_name: "",
    location: "",
    email: "",
    phone_number: "",
    gender: "",
    education: "",
    work_experience: "",
    skills: "",
    position: "",
    certifications: "",
    role: "",
    cognitoSub: "",
  };
  const [first_name, setFirst_name] = React.useState(initialValues.first_name);
  const [last_name, setLast_name] = React.useState(initialValues.last_name);
  const [location, setLocation] = React.useState(initialValues.location);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone_number, setPhone_number] = React.useState(
    initialValues.phone_number
  );
  const [gender, setGender] = React.useState(initialValues.gender);
  const [education, setEducation] = React.useState(initialValues.education);
  const [work_experience, setWork_experience] = React.useState(
    initialValues.work_experience
  );
  const [skills, setSkills] = React.useState(initialValues.skills);
  const [position, setPosition] = React.useState(initialValues.position);
  const [certifications, setCertifications] = React.useState(
    initialValues.certifications
  );
  const [role, setRole] = React.useState(initialValues.role);
  const [cognitoSub, setCognitoSub] = React.useState(initialValues.cognitoSub);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = candidateRecord
      ? { ...initialValues, ...candidateRecord }
      : initialValues;
    setFirst_name(cleanValues.first_name);
    setLast_name(cleanValues.last_name);
    setLocation(cleanValues.location);
    setEmail(cleanValues.email);
    setPhone_number(cleanValues.phone_number);
    setGender(cleanValues.gender);
    setEducation(cleanValues.education);
    setWork_experience(cleanValues.work_experience);
    setSkills(cleanValues.skills);
    setPosition(cleanValues.position);
    setCertifications(cleanValues.certifications);
    setRole(cleanValues.role);
    setCognitoSub(cleanValues.cognitoSub);
    setErrors({});
  };
  const [candidateRecord, setCandidateRecord] =
    React.useState(candidateModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Candidate, idProp)
        : candidateModelProp;
      setCandidateRecord(record);
    };
    queryData();
  }, [idProp, candidateModelProp]);
  React.useEffect(resetStateValues, [candidateRecord]);
  const validations = {
    first_name: [{ type: "Required" }],
    last_name: [{ type: "Required" }],
    location: [],
    email: [{ type: "Email" }],
    phone_number: [{ type: "Required" }],
    gender: [],
    education: [],
    work_experience: [],
    skills: [],
    position: [],
    certifications: [],
    role: [],
    cognitoSub: [],
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
          first_name,
          last_name,
          location,
          email,
          phone_number,
          gender,
          education,
          work_experience,
          skills,
          position,
          certifications,
          role,
          cognitoSub,
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
            Candidate.copyOf(candidateRecord, (updated) => {
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
      {...getOverrideProps(overrides, "CandidateUpdateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={true}
        isReadOnly={false}
        value={first_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name: value,
              last_name,
              location,
              email,
              phone_number,
              gender,
              education,
              work_experience,
              skills,
              position,
              certifications,
              role,
              cognitoSub,
            };
            const result = onChange(modelFields);
            value = result?.first_name ?? value;
          }
          if (errors.first_name?.hasError) {
            runValidationTasks("first_name", value);
          }
          setFirst_name(value);
        }}
        onBlur={() => runValidationTasks("first_name", first_name)}
        errorMessage={errors.first_name?.errorMessage}
        hasError={errors.first_name?.hasError}
        {...getOverrideProps(overrides, "first_name")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={true}
        isReadOnly={false}
        value={last_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name: value,
              location,
              email,
              phone_number,
              gender,
              education,
              work_experience,
              skills,
              position,
              certifications,
              role,
              cognitoSub,
            };
            const result = onChange(modelFields);
            value = result?.last_name ?? value;
          }
          if (errors.last_name?.hasError) {
            runValidationTasks("last_name", value);
          }
          setLast_name(value);
        }}
        onBlur={() => runValidationTasks("last_name", last_name)}
        errorMessage={errors.last_name?.errorMessage}
        hasError={errors.last_name?.hasError}
        {...getOverrideProps(overrides, "last_name")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={false}
        isReadOnly={false}
        value={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              location: value,
              email,
              phone_number,
              gender,
              education,
              work_experience,
              skills,
              position,
              certifications,
              role,
              cognitoSub,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              location,
              email: value,
              phone_number,
              gender,
              education,
              work_experience,
              skills,
              position,
              certifications,
              role,
              cognitoSub,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phone number"
        isRequired={true}
        isReadOnly={false}
        value={phone_number}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              location,
              email,
              phone_number: value,
              gender,
              education,
              work_experience,
              skills,
              position,
              certifications,
              role,
              cognitoSub,
            };
            const result = onChange(modelFields);
            value = result?.phone_number ?? value;
          }
          if (errors.phone_number?.hasError) {
            runValidationTasks("phone_number", value);
          }
          setPhone_number(value);
        }}
        onBlur={() => runValidationTasks("phone_number", phone_number)}
        errorMessage={errors.phone_number?.errorMessage}
        hasError={errors.phone_number?.hasError}
        {...getOverrideProps(overrides, "phone_number")}
      ></TextField>
      <TextField
        label="Gender"
        isRequired={false}
        isReadOnly={false}
        value={gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              location,
              email,
              phone_number,
              gender: value,
              education,
              work_experience,
              skills,
              position,
              certifications,
              role,
              cognitoSub,
            };
            const result = onChange(modelFields);
            value = result?.gender ?? value;
          }
          if (errors.gender?.hasError) {
            runValidationTasks("gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("gender", gender)}
        errorMessage={errors.gender?.errorMessage}
        hasError={errors.gender?.hasError}
        {...getOverrideProps(overrides, "gender")}
      ></TextField>
      <TextField
        label="Education"
        isRequired={false}
        isReadOnly={false}
        value={education}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              location,
              email,
              phone_number,
              gender,
              education: value,
              work_experience,
              skills,
              position,
              certifications,
              role,
              cognitoSub,
            };
            const result = onChange(modelFields);
            value = result?.education ?? value;
          }
          if (errors.education?.hasError) {
            runValidationTasks("education", value);
          }
          setEducation(value);
        }}
        onBlur={() => runValidationTasks("education", education)}
        errorMessage={errors.education?.errorMessage}
        hasError={errors.education?.hasError}
        {...getOverrideProps(overrides, "education")}
      ></TextField>
      <TextField
        label="Work experience"
        isRequired={false}
        isReadOnly={false}
        value={work_experience}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              location,
              email,
              phone_number,
              gender,
              education,
              work_experience: value,
              skills,
              position,
              certifications,
              role,
              cognitoSub,
            };
            const result = onChange(modelFields);
            value = result?.work_experience ?? value;
          }
          if (errors.work_experience?.hasError) {
            runValidationTasks("work_experience", value);
          }
          setWork_experience(value);
        }}
        onBlur={() => runValidationTasks("work_experience", work_experience)}
        errorMessage={errors.work_experience?.errorMessage}
        hasError={errors.work_experience?.hasError}
        {...getOverrideProps(overrides, "work_experience")}
      ></TextField>
      <TextField
        label="Skills"
        isRequired={false}
        isReadOnly={false}
        value={skills}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              location,
              email,
              phone_number,
              gender,
              education,
              work_experience,
              skills: value,
              position,
              certifications,
              role,
              cognitoSub,
            };
            const result = onChange(modelFields);
            value = result?.skills ?? value;
          }
          if (errors.skills?.hasError) {
            runValidationTasks("skills", value);
          }
          setSkills(value);
        }}
        onBlur={() => runValidationTasks("skills", skills)}
        errorMessage={errors.skills?.errorMessage}
        hasError={errors.skills?.hasError}
        {...getOverrideProps(overrides, "skills")}
      ></TextField>
      <TextField
        label="Position"
        isRequired={false}
        isReadOnly={false}
        value={position}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              location,
              email,
              phone_number,
              gender,
              education,
              work_experience,
              skills,
              position: value,
              certifications,
              role,
              cognitoSub,
            };
            const result = onChange(modelFields);
            value = result?.position ?? value;
          }
          if (errors.position?.hasError) {
            runValidationTasks("position", value);
          }
          setPosition(value);
        }}
        onBlur={() => runValidationTasks("position", position)}
        errorMessage={errors.position?.errorMessage}
        hasError={errors.position?.hasError}
        {...getOverrideProps(overrides, "position")}
      ></TextField>
      <TextField
        label="Certifications"
        isRequired={false}
        isReadOnly={false}
        value={certifications}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              location,
              email,
              phone_number,
              gender,
              education,
              work_experience,
              skills,
              position,
              certifications: value,
              role,
              cognitoSub,
            };
            const result = onChange(modelFields);
            value = result?.certifications ?? value;
          }
          if (errors.certifications?.hasError) {
            runValidationTasks("certifications", value);
          }
          setCertifications(value);
        }}
        onBlur={() => runValidationTasks("certifications", certifications)}
        errorMessage={errors.certifications?.errorMessage}
        hasError={errors.certifications?.hasError}
        {...getOverrideProps(overrides, "certifications")}
      ></TextField>
      <TextField
        label="Role"
        isRequired={false}
        isReadOnly={false}
        value={role}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              location,
              email,
              phone_number,
              gender,
              education,
              work_experience,
              skills,
              position,
              certifications,
              role: value,
              cognitoSub,
            };
            const result = onChange(modelFields);
            value = result?.role ?? value;
          }
          if (errors.role?.hasError) {
            runValidationTasks("role", value);
          }
          setRole(value);
        }}
        onBlur={() => runValidationTasks("role", role)}
        errorMessage={errors.role?.errorMessage}
        hasError={errors.role?.hasError}
        {...getOverrideProps(overrides, "role")}
      ></TextField>
      <TextField
        label="Cognito sub"
        isRequired={false}
        isReadOnly={false}
        value={cognitoSub}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              location,
              email,
              phone_number,
              gender,
              education,
              work_experience,
              skills,
              position,
              certifications,
              role,
              cognitoSub: value,
            };
            const result = onChange(modelFields);
            value = result?.cognitoSub ?? value;
          }
          if (errors.cognitoSub?.hasError) {
            runValidationTasks("cognitoSub", value);
          }
          setCognitoSub(value);
        }}
        onBlur={() => runValidationTasks("cognitoSub", cognitoSub)}
        errorMessage={errors.cognitoSub?.errorMessage}
        hasError={errors.cognitoSub?.hasError}
        {...getOverrideProps(overrides, "cognitoSub")}
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
          isDisabled={!(idProp || candidateModelProp)}
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
              !(idProp || candidateModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
