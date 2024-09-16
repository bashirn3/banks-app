import baseApi from "../../lib/base-api";
import { supabase } from "../../lib/superbase";

export const banksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanks: builder.query<BanksResponse, BanksArgs>({
      queryFn: async ({ start, end,  }) => {
        const { data, error, count  } = await supabase
          .from("banks")
          .select("*", { count: 'exact' })
          .range(start, end);

        if (error) {
          return { error };
        }

        return { data: { data: data || [], count: count || 0 } };
      },
      providesTags: ["BANKS"],
    }),

    getBank: builder.query<BankView, BankArg>({
      queryFn: async ({ id }) => {
        const { data, error } = await supabase
          .from("banks")
          .select()
          .eq("id", id)
          .single();

        if (error) {
          return { error };
        }

        return { data };
      },
      providesTags: ["BANKS"],
    }),

    createBank: builder.mutation<unknown, BankCreate>({
      async queryFn(body) {
        const { data, error } = await supabase
          .from("banks")
          .insert([body])
          .select();

        if (error) {
          return { error };
        }

        return { data };
      },
      invalidatesTags: ["BANKS"],
    }),

    updateBank: builder.mutation<unknown, BankUpdate>({
      async queryFn({ id, ...body }) {
        const { data, error } = await supabase
          .from("banks")
          .update(body)
          .eq("id", id)
          .select();

        if (error) {
          return { error };
        }

        return { data };
      },
      invalidatesTags: ["BANKS"],
    }),
  }),
});

export const {
  useGetBanksQuery,
  useCreateBankMutation,
  useGetBankQuery,
  useUpdateBankMutation,
} = banksApi;

export default banksApi;

export interface BankView {
  id: number;
  created_at: string;
  code: string;
  name: string;
  valid_from: string;
  valid_to: string;
  address: string;
  phone: string;
  email: string;
  fax: string;
  website: string;
  status: boolean;
}

export interface BanksResponse {
  data: BankView[];
  count: number;
}

export interface BankCreate {
  bank: string;
  code: string;
  name: string;
  valid_from: string;
  valid_to: string;
  address: string;
  phone: string;
  email: string;
  fax: string;
  website: string;
  status: boolean;
}

export interface BankArg {
  id: number | string | undefined;
}

export interface BanksArgs {
  start: number;
  end: number;
}

export interface BankUpdate extends BankCreate {
  id: number;
}
