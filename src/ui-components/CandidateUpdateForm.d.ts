/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Candidate } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CandidateUpdateFormInputValues = {
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
export declare type CandidateUpdateFormValidationValues = {
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
export declare type CandidateUpdateFormOverridesProps = {
    CandidateUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type CandidateUpdateFormProps = React.PropsWithChildren<{
    overrides?: CandidateUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    candidate?: Candidate;
    onSubmit?: (fields: CandidateUpdateFormInputValues) => CandidateUpdateFormInputValues;
    onSuccess?: (fields: CandidateUpdateFormInputValues) => void;
    onError?: (fields: CandidateUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CandidateUpdateFormInputValues) => CandidateUpdateFormInputValues;
    onValidate?: CandidateUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CandidateUpdateForm(props: CandidateUpdateFormProps): React.ReactElement;
