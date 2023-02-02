export const getErrMessage = (err: any): string => {
  if (typeof err === "string") return err;

  if (err.shape?.message) return err.shape.message;

  if (err.message) return err.message as string;

  if (err.data?.message) return err.data.message;

  return "Unkown error";
};
