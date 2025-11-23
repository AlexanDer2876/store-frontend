export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  accessToken: Scalars["String"]["output"];
  company?: Maybe<CompanyOutput>;
  user?: Maybe<UserOutputDto>;
};

export type CategoryOutput = {
  __typename?: "CategoryOutput";
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  slug?: Maybe<Scalars["String"]["output"]>;
};

export type CompanyOutput = {
  __typename?: "CompanyOutput";
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type CreateCategoryInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateProductInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  images?: Array<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  price: Scalars["Float"]["input"];
  stock?: Scalars["Int"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createCategory: CategoryOutput;
  createProduct: ProductOutput;
  deleteProduct: Scalars["Boolean"]["output"];
  removeCategory: Scalars["Boolean"]["output"];
  signInCompany: AuthPayload;
  signInUser: AuthPayload;
  signUpCompany: AuthPayload;
  signUpUser: AuthPayload;
  updateCategory: CategoryOutput;
  updateProduct: ProductOutput;
};

export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};

export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type MutationDeleteProductArgs = {
  id: Scalars["String"]["input"];
};

export type MutationRemoveCategoryArgs = {
  id: Scalars["String"]["input"];
};

export type MutationSignInCompanyArgs = {
  input: SignInCompanyInput;
};

export type MutationSignInUserArgs = {
  input: SignInUserInput;
};

export type MutationSignUpCompanyArgs = {
  input: SignUpCompanyInput;
};

export type MutationSignUpUserArgs = {
  input: SignUpUserInput;
};

export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};

export type MutationUpdateProductArgs = {
  id: Scalars["String"]["input"];
  input: UpdateProductInput;
};

export type ProductOutput = {
  __typename?: "ProductOutput";
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  imageUrl?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  ownerId: Scalars["String"]["output"];
  price: Scalars["Int"]["output"];
  stock?: Maybe<Scalars["Int"]["output"]>;
};

export type Query = {
  __typename?: "Query";
  categoriesAll: Array<CategoryOutput>;
  myProducts: Array<ProductOutput>;
  products: Array<ProductOutput>;
  whoAmI: Scalars["String"]["output"];
};

export type SignInCompanyInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type SignInUserInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type SignUpCompanyInput = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type SignUpUserInput = {
  email: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  password: Scalars["String"]["input"];
};

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateProductInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  images?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  price?: InputMaybe<Scalars["Float"]["input"]>;
  stock?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UserOutputDto = {
  __typename?: "UserOutputDto";
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  roles: Array<UserRole>;
};

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
