

// "use server"
// export const getAllServicesss = async ({query } : { query?: { [key: string]: string | string[] | undefined } }) => {

//     const params = new URLSearchParams()

//     if(query && query.searchTerm){
//         params.set("searchTerm", query.searchTerm as string)
//     }


//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services?${params.toString()}`, {

//         cache : "no-cache",
//         next : {
//             revalidate : 60 * 60 * 6,
//             tags : ["premium-posts"]
//         }
//     });

//     const result = await res.json();

//     return result;
// }























"use server";

export const getAllServicesss = async ({
  query,
}: {
  query?: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const params = new URLSearchParams();

  const getValue = (value: string | string[] | undefined) => {
    if (Array.isArray(value)) {
      return value[0];
    }

    return value;
  };

  const searchTerm = getValue(query?.searchTerm);
  const categoryId = getValue(query?.categoryId);
  const city = getValue(query?.city);
  const district = getValue(query?.district);
  const address = getValue(query?.address);
  const minRating = getValue(query?.minRating);
  const page = getValue(query?.page);
  const limit = getValue(query?.limit);

  if (searchTerm) {
    params.set("searchTerm", searchTerm);
  }

  if (categoryId) {
    params.set("categoryId", categoryId);
  }

  if (city) {
    params.set("city", city);
  }

  if (district) {
    params.set("district", district);
  }

  if (address) {
    params.set("address", address);
  }

  if (minRating) {
    params.set("minRating", minRating);
  }

  if (page) {
    params.set("page", page);
  }

  if (limit) {
    params.set("limit", limit);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  const result = await res.json();

  return result;
};