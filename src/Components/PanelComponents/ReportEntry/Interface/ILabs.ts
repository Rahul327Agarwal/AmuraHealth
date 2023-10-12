export interface ILabs {
  Vendors: Array<ILab>;
}

export interface ILab {
  Name: string;
}

const emptyLabs = (): ILabs => ({
  Vendors: [{ Name: '' }],
});

export const EmptyLabs = emptyLabs();
