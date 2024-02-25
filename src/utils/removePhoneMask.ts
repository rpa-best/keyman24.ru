export const removePhoneMask = (phone: string) => {
    return phone.replace(/[()+7_-]/g, '');
};
