export type Puppy = {
  name: string;
  breed: string;
  age: number;
  gender: string;
  size: string;
  isVaccinated: boolean;
  isNeutered: boolean;
  photoUrl: string;
  traits: string[];
};

export type PuppyWithId = Puppy & { _id: string };

export type Filters = {
  gender: string;
  size: string;
  age: string;
  breed: string;
};

export type FetchAllPuppies = {
  puppies: PuppyWithId[];
  lastPage: number;
};
