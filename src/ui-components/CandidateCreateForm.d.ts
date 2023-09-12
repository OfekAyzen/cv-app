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
export declare type CandidateCreateFormInputValues = {
    first_name?: string;
    last_name?: string;
    location?: string;
    email?: string;
    phone_number?: string;
    gender?: string;
    education?: string;
    work_experience?: string;
    skills?: string;
    position?: string;
    certifications?: string;
    role?: string;
    cognitoSub?: string;
    note?: string;
    status?: string;
};
export declare type CandidateCreateFormValidationValues = {
    first_name?: ValidationFunction<string>;
    last_name?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone_number?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    education?: ValidationFunction<string>;
    work_experience?: ValidationFunction<string>;
    skills?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
    certifications?: ValidationFunction<string>;
    role?: ValidationFunction<string>;
    cognitoSub?: ValidationFunction<string>;
    note?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CandidateCreateFormOverridesProps = {
    CandidateCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    first_name?: PrimitiveOverrideProps<TextFieldProps>;
    last_name?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone_number?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<TextFieldProps>;
    education?: PrimitiveOverrideProps<TextFieldProps>;
    work_experience?: PrimitiveOverrideProps<TextFieldProps>;
    skills?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
    certifications?: PrimitiveOverrideProps<TextFieldProps>;
    role?: PrimitiveOverrideProps<TextFieldProps>;
    cognitoSub?: PrimitiveOverrideProps<TextFieldProps>;
    note?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CandidateCreateFormProps = React.PropsWithChildren<{
    overrides?: CandidateCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CandidateCreateFormInputValues) => CandidateCreateFormInputValues;
    onSuccess?: (fields: CandidateCreateFormInputValues) => void;
    onError?: (fields: CandidateCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CandidateCreateFormInputValues) => CandidateCreateFormInputValues;
    onValidate?: CandidateCreateFormValidationValues;
} & React.CSSProperties>;
export default function CandidateCreateForm(props: CandidateCreateFormProps): React.ReactElement;
