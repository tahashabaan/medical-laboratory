type Units = 'minutes' | 'hours' | 'days' | 'months' | 'weeks' | 'years';
export declare const DateHelper: {
    addToDate: (initialDate: Date, unit: Units, value: number) => Date;
};
export {};
