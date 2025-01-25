import { RequestToken } from ".";

export type FormToken = { assets?: RequestToken; amount: string };

export type CompleteFormToken = Required<FormToken>;
