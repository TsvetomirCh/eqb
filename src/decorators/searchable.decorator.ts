import { Transform } from 'class-transformer';

export function Searchable(key: string) {
  return Transform(({ value }) => {
    return { where: { [key]: value } };
  });
}
