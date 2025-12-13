export function getPagination(query: any) {
  const page = query.page ? Number(query.page) : 1;
  const limit = query.limit ? Number(query.limit) : 10;

  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

export function getSorting(sort?: string) {
  if (!sort) return undefined;

  const [field, order] = sort.split('_');

  return {
    [field]: order === 'desc' ? 'desc' : 'asc',
  };
}
