export const formatNumber = (value: any) =>
  `${value}`.replace(/\B(?<!\.\d)(?=(\d{3})+(?!\d))/g, ",");

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }