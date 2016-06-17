export const assembleTempObjFromResultObj = (result) => {
  return {
    id: result.id,
    temperature: result.get('temperature'),
    period: result.get('period'),
    date: result.get('date')
  };
};
