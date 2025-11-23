import * as Types from "../generated/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type DeleteProductMutationVariables = Types.Exact<{
  deleteProductId: Types.Scalars["String"]["input"];
}>;

export type DeleteProductMutation = {
  __typename?: "Mutation";
  deleteProduct: boolean;
};

export type CreateProductMutationVariables = Types.Exact<{
  input: Types.CreateProductInput;
}>;

export type CreateProductMutation = {
  __typename?: "Mutation";
  createProduct: {
    __typename?: "ProductOutput";
    id: string;
    name: string;
    description?: string | null;
    price: number;
    stock?: number | null;
    imageUrl?: string | null;
    ownerId: string;
  };
};

export type MyProductsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MyProductsQuery = {
  __typename?: "Query";
  myProducts: Array<{
    __typename?: "ProductOutput";
    id: string;
    name: string;
    description?: string | null;
    price: number;
    stock?: number | null;
    imageUrl?: string | null;
    ownerId: string;
  }>;
};

export type ProductsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ProductsQuery = {
  __typename?: "Query";
  products: Array<{
    __typename?: "ProductOutput";
    id: string;
    name: string;
    description?: string | null;
    price: number;
    stock?: number | null;
    imageUrl?: string | null;
    ownerId: string;
  }>;
};

export const DeleteProductDocument = gql`
  mutation DeleteProduct($deleteProductId: String!) {
    deleteProduct(id: $deleteProductId)
  }
`;
export type DeleteProductMutationFn = Apollo.MutationFunction<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      deleteProductId: // value for 'deleteProductId'
 *   },
 * });
 */
export function useDeleteProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >(DeleteProductDocument, options);
}
export type DeleteProductMutationHookResult = ReturnType<
  typeof useDeleteProductMutation
>;
export type DeleteProductMutationResult =
  Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;
export const CreateProductDocument = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      price
      stock
      imageUrl
      ownerId
    }
  }
`;
export type CreateProductMutationFn = Apollo.MutationFunction<
  CreateProductMutation,
  CreateProductMutationVariables
>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProductMutation,
    CreateProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(CreateProductDocument, options);
}
export type CreateProductMutationHookResult = ReturnType<
  typeof useCreateProductMutation
>;
export type CreateProductMutationResult =
  Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export const MyProductsDocument = gql`
  query MyProducts {
    myProducts {
      id
      name
      description
      price
      stock
      imageUrl
      ownerId
    }
  }
`;

/**
 * __useMyProductsQuery__
 *
 * To run a query within a React component, call `useMyProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyProductsQuery,
    MyProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyProductsQuery, MyProductsQueryVariables>(
    MyProductsDocument,
    options,
  );
}
export function useMyProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyProductsQuery,
    MyProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyProductsQuery, MyProductsQueryVariables>(
    MyProductsDocument,
    options,
  );
}
export function useMyProductsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        MyProductsQuery,
        MyProductsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<MyProductsQuery, MyProductsQueryVariables>(
    MyProductsDocument,
    options,
  );
}
export type MyProductsQueryHookResult = ReturnType<typeof useMyProductsQuery>;
export type MyProductsLazyQueryHookResult = ReturnType<
  typeof useMyProductsLazyQuery
>;
export type MyProductsSuspenseQueryHookResult = ReturnType<
  typeof useMyProductsSuspenseQuery
>;
export type MyProductsQueryResult = Apollo.QueryResult<
  MyProductsQuery,
  MyProductsQueryVariables
>;
export const ProductsDocument = gql`
  query Products {
    products {
      id
      name
      description
      price
      stock
      imageUrl
      ownerId
    }
  }
`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    options,
  );
}
export function useProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductsQuery,
    ProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    options,
  );
}
export function useProductsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ProductsQuery, ProductsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    options,
  );
}
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<
  typeof useProductsLazyQuery
>;
export type ProductsSuspenseQueryHookResult = ReturnType<
  typeof useProductsSuspenseQuery
>;
export type ProductsQueryResult = Apollo.QueryResult<
  ProductsQuery,
  ProductsQueryVariables
>;
