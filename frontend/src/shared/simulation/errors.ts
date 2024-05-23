/**
 * Словарь ошибок при валидации схемы
 **/
export const schemaErrors = {
  noClosedLoop: "Нет замкнутого контура",
  voltmeterError: "Вольтметр соединён с амперметром",
  moreThenOneVoltmeter: "Более одного вольтметра на ветке",
  moreThenOneAmpermeter: "Более одного амперметра на ветке",
} as const;
