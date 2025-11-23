import * as Types from "../generated/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type SignUpUserMutationVariables = Types.Exact<{
  input: Types.SignUpUserInput;
}>;

export type SignUpUserMutation = {
  __typename?: "Mutation";
  signUpUser: {
    __typename?: "AuthPayload";
    accessToken: string;
    user?: {
      __typename?: "UserOutputDto";
      id: string;
      email: string;
      name?: string | null;
    } | null;
  };
};

export type SignInUserMutationVariables = Types.Exact<{
  input: Types.SignInUserInput;
}>;

export type SignInUserMutation = {
  __typename?: "Mutation";
  signInUser: {
    __typename?: "AuthPayload";
    accessToken: string;
    user?: {
      __typename?: "UserOutputDto";
      id: string;
      email: string;
      name?: string | null;
    } | null;
  };
};

export type SignUpCompanyMutationVariables = Types.Exact<{
  input: Types.SignUpCompanyInput;
}>;

export type SignUpCompanyMutation = {
  __typename?: "Mutation";
  signUpCompany: {
    __typename?: "AuthPayload";
    accessToken: string;
    company?: {
      __typename?: "CompanyOutput";
      id: string;
      name: string;
      email: string;
    } | null;
  };
};

export type SignInCompanyMutationVariables = Types.Exact<{
  input: Types.SignInCompanyInput;
}>;

export type SignInCompanyMutation = {
  __typename?: "Mutation";
  signInCompany: { __typename?: "AuthPayload"; accessToken: string };
};

export const SignUpUserDocument = gql`
  mutation SignUpUser($input: SignUpUserInput!) {
    signUpUser(input: $input) {
      accessToken
      user {
        id
        email
        name
      }
    }
  }
`;
export type SignUpUserMutationFn = Apollo.MutationFunction<
  SignUpUserMutation,
  SignUpUserMutationVariables
>;

/**
 * __useSignUpUserMutation__
 *
 * To run a mutation, you first call `useSignUpUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpUserMutation, { data, loading, error }] = useSignUpUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpUserMutation,
    SignUpUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpUserMutation, SignUpUserMutationVariables>(
    SignUpUserDocument,
    options,
  );
}
export type SignUpUserMutationHookResult = ReturnType<
  typeof useSignUpUserMutation
>;
export type SignUpUserMutationResult =
  Apollo.MutationResult<SignUpUserMutation>;
export type SignUpUserMutationOptions = Apollo.BaseMutationOptions<
  SignUpUserMutation,
  SignUpUserMutationVariables
>;
export const SignInUserDocument = gql`
  mutation SignInUser($input: SignInUserInput!) {
    signInUser(input: $input) {
      accessToken
      user {
        id
        email
        name
      }
    }
  }
`;
export type SignInUserMutationFn = Apollo.MutationFunction<
  SignInUserMutation,
  SignInUserMutationVariables
>;

/**
 * __useSignInUserMutation__
 *
 * To run a mutation, you first call `useSignInUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInUserMutation, { data, loading, error }] = useSignInUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInUserMutation,
    SignInUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInUserMutation, SignInUserMutationVariables>(
    SignInUserDocument,
    options,
  );
}
export type SignInUserMutationHookResult = ReturnType<
  typeof useSignInUserMutation
>;
export type SignInUserMutationResult =
  Apollo.MutationResult<SignInUserMutation>;
export type SignInUserMutationOptions = Apollo.BaseMutationOptions<
  SignInUserMutation,
  SignInUserMutationVariables
>;
export const SignUpCompanyDocument = gql`
  mutation SignUpCompany($input: SignUpCompanyInput!) {
    signUpCompany(input: $input) {
      accessToken
      company {
        id
        name
        email
      }
    }
  }
`;
export type SignUpCompanyMutationFn = Apollo.MutationFunction<
  SignUpCompanyMutation,
  SignUpCompanyMutationVariables
>;

/**
 * __useSignUpCompanyMutation__
 *
 * To run a mutation, you first call `useSignUpCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpCompanyMutation, { data, loading, error }] = useSignUpCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpCompanyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpCompanyMutation,
    SignUpCompanyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SignUpCompanyMutation,
    SignUpCompanyMutationVariables
  >(SignUpCompanyDocument, options);
}
export type SignUpCompanyMutationHookResult = ReturnType<
  typeof useSignUpCompanyMutation
>;
export type SignUpCompanyMutationResult =
  Apollo.MutationResult<SignUpCompanyMutation>;
export type SignUpCompanyMutationOptions = Apollo.BaseMutationOptions<
  SignUpCompanyMutation,
  SignUpCompanyMutationVariables
>;
export const SignInCompanyDocument = gql`
  mutation SignInCompany($input: SignInCompanyInput!) {
    signInCompany(input: $input) {
      accessToken
    }
  }
`;
export type SignInCompanyMutationFn = Apollo.MutationFunction<
  SignInCompanyMutation,
  SignInCompanyMutationVariables
>;

/**
 * __useSignInCompanyMutation__
 *
 * To run a mutation, you first call `useSignInCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInCompanyMutation, { data, loading, error }] = useSignInCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInCompanyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInCompanyMutation,
    SignInCompanyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SignInCompanyMutation,
    SignInCompanyMutationVariables
  >(SignInCompanyDocument, options);
}
export type SignInCompanyMutationHookResult = ReturnType<
  typeof useSignInCompanyMutation
>;
export type SignInCompanyMutationResult =
  Apollo.MutationResult<SignInCompanyMutation>;
export type SignInCompanyMutationOptions = Apollo.BaseMutationOptions<
  SignInCompanyMutation,
  SignInCompanyMutationVariables
>;
