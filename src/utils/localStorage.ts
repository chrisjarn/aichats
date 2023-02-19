const read = (itemKey: string): any => {
	return JSON.parse(localStorage.getItem(itemKey));
};

const write = (itemKey: string, data: any): void => {
	localStorage.setItem(itemKey, JSON.stringify(data));
};

const remove = (itemKey: string): void => {
	localStorage.removeItem(itemKey);
};

export { read, write, remove };
