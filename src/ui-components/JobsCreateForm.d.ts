/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type JobsCreateFormInputValues = {
    job_description?: string;
    qualifications?: string;
    job_title?: string;
};
export declare type JobsCreateFormValidationValues = {
    job_description?: ValidationFunction<string>;
    qualifications?: ValidationFunction<string>;
    job_title?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type JobsCreateFormOverridesProps = {
    JobsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    job_description?: PrimitiveOverrideProps<TextFieldProps>;
    qualifications?: PrimitiveOverrideProps<TextFieldProps>;
    job_title?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type JobsCreateFormProps = React.PropsWithChildren<{
    overrides?: JobsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: JobsCreateFormInputValues) => JobsCreateFormInputValues;
    onSuccess?: (fields: JobsCreateFormInputValues) => void;
    onError?: (fields: JobsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: JobsCreateFormInputValues) => JobsCreateFormInputValues;
    onValidate?: JobsCreateFormValidationValues;
} & React.CSSProperties>;
export default function JobsCreateForm(props: JobsCreateFormProps): React.ReactElement;
